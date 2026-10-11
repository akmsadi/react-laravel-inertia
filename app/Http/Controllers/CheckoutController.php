<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use App\Services\CouponService;
use App\Services\InventoryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function __construct(
        private InventoryService $inventory,
        private CouponService $coupons,
    ) {}

    public function index(Request $request): Response|RedirectResponse
    {
        $items = $this->resolveCartItems($request);

        if ($items->isEmpty()) {
            return redirect()->route('cart.index')->with('status', 'Your cart is empty.');
        }

        /** @var Customer $customer */
        $customer = $request->user('customer');

        return Inertia::render('checkout/index', [
            'items' => $items->map(fn (array $item) => Arr::except($item, ['product', 'variant']))->values(),
            'subtotal' => round($items->sum('line_total'), 2),
            'customer' => [
                'name' => $customer->name,
                'email' => $customer->email,
                'phone' => $customer->phone,
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $items = $this->resolveCartItems($request);

        if ($items->isEmpty()) {
            return redirect()->route('cart.index')->with('status', 'Your cart is empty.');
        }

        if ($items->contains(fn (array $item) => ! $item['is_available'])) {
            throw ValidationException::withMessages([
                'cart' => 'Some items in your cart are no longer available. Please update your cart.',
            ]);
        }

        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'street_address' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'state' => ['nullable', 'string', 'max:255'],
            'postal_code' => ['required', 'string', 'max:20'],
            'country' => ['required', 'string', 'max:255'],
            'notes' => ['nullable', 'string', 'max:1000'],
            'coupon_code' => ['nullable', 'string', 'max:50'],
        ]);

        /** @var Customer $customer */
        $customer = $request->user('customer');
        $subtotal = round($items->sum('line_total'), 2);

        $coupon = filled($validated['coupon_code'] ?? null)
            ? $this->coupons->resolve($validated['coupon_code'], $subtotal)
            : null;

        $order = DB::transaction(function () use ($items, $validated, $customer, $subtotal, $coupon) {
            $order = Order::create([
                'customer_id' => $customer->id,
                'order_number' => $this->generateOrderNumber(),
                'status' => 'pending',
                'payment_status' => 'pending',
                'subtotal' => $subtotal,
                'tax_amount' => 0,
                'shipping_amount' => 0,
                'discount_amount' => 0,
                'total_amount' => $subtotal,
                'notes' => $validated['notes'] ?? null,
            ]);

            foreach ($items as $item) {
                $order->items()->create([
                    'product_id' => $item['product_id'],
                    'variant_id' => $item['variant_id'],
                    'product_name' => $item['product_name'],
                    'sku' => $item['sku'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total_price' => $item['line_total'],
                ]);

                $this->inventory->reserveForOrder(
                    $order,
                    $item['product'],
                    $item['variant'],
                    $item['quantity'],
                );
            }

            $order->shippingAddress()->create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'phone' => $validated['phone'] ?? null,
                'email' => $validated['email'],
                'street_address' => $validated['street_address'],
                'city' => $validated['city'],
                'state' => $validated['state'] ?? null,
                'postal_code' => $validated['postal_code'],
                'country' => $validated['country'],
            ]);

            if ($coupon !== null) {
                $this->coupons->apply($order, $coupon);
            }

            return $order;
        });

        $request->session()->forget('cart');

        return redirect()->route('checkout.confirmation', $order)
            ->with('status', 'Your order has been placed.');
    }

    public function confirmation(Request $request, Order $order): Response
    {
        abort_unless($order->customer_id === $request->user('customer')->id, 404);

        $order->load('items', 'shippingAddress', 'coupons');

        return Inertia::render('checkout/confirmation', [
            'order' => $order,
        ]);
    }

    /**
     * @return Collection<int, array<string, mixed>>
     */
    private function resolveCartItems(Request $request): Collection
    {
        $cart = $request->session()->get('cart', []);
        $cart = is_array($cart) ? $cart : [];
        $productIds = collect($cart)
            ->filter(fn ($item) => is_array($item))
            ->pluck('product_id')
            ->filter(fn ($id) => is_numeric($id))
            ->unique();

        $products = Product::query()
            ->with('variants')
            ->whereKey($productIds)
            ->get()
            ->keyBy('id');

        return collect($cart)
            ->map(function ($line) use ($products) {
                if (! is_array($line)) {
                    return null;
                }

                $product = $products->get((int) ($line['product_id'] ?? 0));

                if ($product === null) {
                    return null;
                }

                $variantId = isset($line['variant_id']) ? (int) $line['variant_id'] : null;
                $variant = $variantId === null
                    ? null
                    : $product->variants->firstWhere('id', $variantId);
                $quantity = max(1, (int) ($line['quantity'] ?? 1));
                $unitPrice = (float) ($variant?->price ?? $product->base_price);
                $hasUnselectedVariant = $variantId === null && $product->variants->isNotEmpty();
                $stockQuantity = $variant?->stock_quantity ?? ($variantId === null ? $product->stock_quantity : 0);
                $isAvailable = $product->is_active
                    && ! $hasUnselectedVariant
                    && ($variantId === null || ($variant !== null && $variant->is_active))
                    && $stockQuantity >= $quantity;

                return [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'variant_id' => $variantId,
                    'variant_name' => $variant?->name,
                    'sku' => $variant?->sku ?? $product->sku,
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'line_total' => round($unitPrice * $quantity, 2),
                    'is_available' => $isAvailable,
                    'product' => $product,
                    'variant' => $variant,
                ];
            })
            ->filter()
            ->values();
    }

    private function generateOrderNumber(): string
    {
        do {
            $orderNumber = 'ORD-'.now()->format('Ymd').'-'.Str::upper(Str::random(6));
        } while (Order::query()->where('order_number', $orderNumber)->exists());

        return $orderNumber;
    }
}
