<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(Request $request): Response
    {
        $cart = $request->session()->get('cart', []);
        $cart = is_array($cart) ? $cart : [];
        $productIds = collect($cart)
            ->filter(fn ($item) => is_array($item))
            ->pluck('product_id')
            ->filter(fn ($id) => is_numeric($id))
            ->unique();

        $products = Product::query()
            ->with(['images', 'variants.attributes.attribute'])
            ->whereKey($productIds)
            ->get()
            ->keyBy('id');

        $items = collect($cart)
            ->map(function ($line, $key) use ($products) {
                if (! is_array($line)) {
                    return null;
                }

                $product = $products->get((int) ($line['product_id'] ?? 0));

                if ($product === null) {
                    return null;
                }

                $variantId = isset($line['variant_id'])
                    ? (int) $line['variant_id']
                    : null;
                $variant = $variantId === null
                    ? null
                    : $product->variants->firstWhere('id', $variantId);
                $quantity = max(1, (int) ($line['quantity'] ?? 1));
                $unitPrice = (float) ($variant?->price ?? $product->base_price);
                $hasUnselectedVariant = $variantId === null && $product->variants->isNotEmpty();
                $isAvailable = $product->is_active
                    && ! $hasUnselectedVariant
                    && ($variantId === null || ($variant !== null && $variant->is_active))
                    && ($variant?->stock_quantity ?? ($variantId === null ? $product->stock_quantity : 0)) >= $quantity;
                $image = $product->images->firstWhere('is_primary', true)
                    ?? $product->images->first();

                return [
                    'key' => (string) $key,
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'variant_id' => $variantId,
                    'variant_name' => $variant?->name,
                    'attributes' => $variant?->attributes
                        ->map(fn ($value) => [
                            'name' => $value->attribute?->name,
                            'value' => $value->value,
                        ])
                        ->filter(fn ($attribute) => $attribute['name'] !== null)
                        ->values() ?? [],
                    'sku' => $variant?->sku ?? $product->sku,
                    'image_url' => $image?->image_url,
                    'quantity' => $quantity,
                    'stock_quantity' => $variant?->stock_quantity ?? $product->stock_quantity,
                    'unit_price' => $unitPrice,
                    'line_total' => round($unitPrice * $quantity, 2),
                    'is_available' => $isAvailable,
                ];
            })
            ->filter()
            ->values();

        $visibleKeys = $items->pluck('key')->all();
        $cart = array_intersect_key($cart, array_flip($visibleKeys));
        $request->session()->put('cart', $cart);

        return Inertia::render('cart/index', [
            'items' => $items,
            'itemCount' => $items->sum('quantity'),
            'subtotal' => round($items->sum('line_total'), 2),
        ]);
    }

    public function store(Request $request, Product $product): RedirectResponse
    {
        abort_unless($product->is_active, 404);

        $validated = $request->validate([
            'variant_id' => ['nullable', 'integer'],
        ]);

        $hasVariants = $product->variants()->exists();
        $variantId = $validated['variant_id'] ?? null;

        if ($hasVariants && $variantId === null) {
            throw ValidationException::withMessages([
                'variant_id' => 'Choose a product option before adding it to your cart.',
            ]);
        }

        $variant = null;

        if ($variantId !== null) {
            $variant = $product->variants()
                ->whereKey($variantId)
                ->where('is_active', true)
                ->first();

            if ($variant === null) {
                throw ValidationException::withMessages([
                    'variant_id' => 'The selected product option is unavailable.',
                ]);
            }
        }

        $stockQuantity = $variant?->stock_quantity ?? $product->stock_quantity;
        $cart = $request->session()->get('cart', []);
        $cartKey = $variant === null
            ? "product_{$product->id}"
            : "variant_{$variant->id}";
        $currentQuantity = (int) ($cart[$cartKey]['quantity'] ?? 0);

        if ($currentQuantity >= $stockQuantity) {
            throw ValidationException::withMessages([
                'cart' => 'There is not enough stock available for this item.',
            ]);
        }

        $cart[$cartKey] = [
            'product_id' => $product->id,
            'variant_id' => $variant?->id,
            'quantity' => $currentQuantity + 1,
        ];

        $request->session()->put('cart', $cart);

        return back()->with('status', 'Added to cart.');
    }

    public function update(Request $request, string $item): RedirectResponse
    {
        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);
        $cart = $request->session()->get('cart', []);
        abort_unless(is_array($cart) && isset($cart[$item]) && is_array($cart[$item]), 404);

        $line = $cart[$item];
        $product = Product::query()->find($line['product_id'] ?? null);

        if ($product === null || ! $product->is_active) {
            throw ValidationException::withMessages([
                'quantity' => 'This product is no longer available.',
            ]);
        }

        $variantId = isset($line['variant_id']) ? (int) $line['variant_id'] : null;
        $variant = $variantId === null
            ? null
            : $product->variants()->whereKey($variantId)->first();

        if (
            ($variantId !== null && ($variant === null || ! $variant->is_active))
            || ($variantId === null && $product->variants()->exists())
        ) {
            throw ValidationException::withMessages([
                'quantity' => 'This product option is no longer available.',
            ]);
        }

        $stockQuantity = $variant?->stock_quantity ?? $product->stock_quantity;

        if ($validated['quantity'] > $stockQuantity) {
            throw ValidationException::withMessages([
                'quantity' => 'The requested quantity exceeds available stock.',
            ]);
        }

        $cart[$item]['quantity'] = $validated['quantity'];
        $request->session()->put('cart', $cart);

        return redirect()->route('cart.index')->with('status', 'Cart updated.');
    }

    public function destroy(Request $request, string $item): RedirectResponse
    {
        $cart = $request->session()->get('cart', []);
        abort_unless(is_array($cart) && array_key_exists($item, $cart), 404);

        unset($cart[$item]);
        $request->session()->put('cart', $cart);

        return redirect()->route('cart.index')->with('status', 'Item removed from cart.');
    }
}
