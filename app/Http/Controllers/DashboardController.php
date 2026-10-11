<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Services\InventoryService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $threshold = InventoryService::LOW_STOCK_THRESHOLD;
        $paid = Order::query()->where('payment_status', 'paid')->where('status', '!=', 'cancelled');

        $lowStockProducts = Product::query()
            ->whereDoesntHave('variants')
            ->where('is_active', true)
            ->where('stock_quantity', '<=', $threshold);
        $lowStockVariants = ProductVariant::query()
            ->where('is_active', true)
            ->where('stock_quantity', '<=', $threshold);

        return Inertia::render('dashboard', [
            'shop' => [
                'stats' => [
                    'revenue' => (string) (clone $paid)->sum('total_amount'),
                    'revenue_30_days' => (string) (clone $paid)->where('created_at', '>=', now()->subDays(30))->sum('total_amount'),
                    'orders_today' => Order::query()->whereDate('created_at', today())->count(),
                    'pending_orders' => Order::query()->where('status', 'pending')->count(),
                    'customers' => Customer::count(),
                    'products' => Product::count(),
                    'low_stock' => (clone $lowStockProducts)->count() + (clone $lowStockVariants)->count(),
                ],
                'recent_orders' => Order::query()
                    ->with('customer:id,name')
                    ->latest('id')
                    ->limit(5)
                    ->get(['id', 'customer_id', 'order_number', 'status', 'payment_status', 'total_amount', 'created_at']),
                'low_stock_items' => $lowStockProducts->orderBy('stock_quantity')->limit(5)
                    ->get(['id', 'name', 'sku', 'stock_quantity'])
                    ->map(fn (Product $product) => [
                        'name' => $product->name,
                        'sku' => $product->sku,
                        'stock_quantity' => $product->stock_quantity,
                    ])
                    ->concat(
                        $lowStockVariants->with('product:id,name')->orderBy('stock_quantity')->limit(5)->get()
                            ->map(fn (ProductVariant $variant) => [
                                'name' => trim($variant->product?->name.' - '.$variant->name, ' -'),
                                'sku' => $variant->sku,
                                'stock_quantity' => $variant->stock_quantity,
                            ])
                    )
                    ->sortBy('stock_quantity')
                    ->take(5)
                    ->values(),
            ],
        ]);
    }
}
