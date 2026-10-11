<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderManagementController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->string('status')->toString();
        $search = trim($request->string('search')->toString());

        $orders = Order::query()
            ->with('customer:id,name,email')
            ->withCount('items')
            ->when($status !== '', fn ($query) => $query->where('status', $status))
            ->when($search !== '', fn ($query) => $query->where(function ($query) use ($search) {
                $query->where('order_number', 'like', "%{$search}%")
                    ->orWhereHas('customer', fn ($customer) => $customer
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%"));
            }))
            ->latest('id')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/orders/index', [
            'orders' => $orders,
            'filters' => ['status' => $status, 'search' => $search],
            'statuses' => Order::query()->distinct()->orderBy('status')->pluck('status'),
            'stats' => [
                'total_orders' => Order::count(),
                'pending_orders' => Order::where('status', 'pending')->count(),
                'paid_revenue' => (string) Order::where('payment_status', 'paid')->sum('total_amount'),
                'unpaid_orders' => Order::where('payment_status', '!=', 'paid')->count(),
            ],
        ]);
    }

    public function show(Order $order): Response
    {
        $order->load(['customer:id,name,email,phone', 'items', 'shippingAddress', 'coupons']);

        return Inertia::render('admin/orders/edit', [
            'order' => $order,
            'statuses' => Order::STATUSES,
            'paymentStatuses' => Order::PAYMENT_STATUSES,
            'products' => Product::query()
                ->where('is_active', true)
                ->with(['variants' => fn (HasMany $query) => $query->where('is_active', true)->select('id', 'product_id', 'name', 'sku', 'price')])
                ->orderBy('name')
                ->get(['id', 'name', 'sku', 'base_price']),
        ]);
    }

    public function update(UpdateOrderRequest $request, Order $order): RedirectResponse
    {
        $order->update($request->validated());

        return back();
    }
}
