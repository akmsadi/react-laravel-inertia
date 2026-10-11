<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderItemRequest;
use App\Http\Requests\UpdateOrderItemRequest;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Services\CouponService;
use App\Services\InventoryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderItemController extends Controller
{
    public function __construct(
        private InventoryService $inventory,
        private CouponService $coupons,
    ) {}

    public function store(StoreOrderItemRequest $request, Order $order): RedirectResponse
    {
        $product = Product::findOrFail($request->integer('product_id'));
        $variant = $request->filled('variant_id')
            ? ProductVariant::findOrFail($request->integer('variant_id'))
            : null;

        $unitPrice = $request->filled('unit_price')
            ? (float) $request->input('unit_price')
            : (float) ($variant?->price ?? $product->base_price);
        $quantity = $request->integer('quantity');

        DB::transaction(function () use ($request, $order, $product, $variant, $unitPrice, $quantity): void {
            if ($this->isStockCommitted($order)) {
                $this->inventory->assertAvailable($product, $variant, $quantity);
                $this->inventory->reserveForOrder($order, $product, $variant, $quantity, $request->user()->id);
            }

            $order->items()->create([
                'product_id' => $product->id,
                'variant_id' => $variant?->id,
                'product_name' => $variant?->name ? "{$product->name} - {$variant->name}" : $product->name,
                'sku' => $variant?->sku ?? $product->sku,
                'quantity' => $quantity,
                'unit_price' => $unitPrice,
                'tax_amount' => 0,
                'total_price' => round($unitPrice * $quantity, 2),
            ]);

            $this->recalculate($order);
        });

        return back();
    }

    public function update(UpdateOrderItemRequest $request, Order $order, OrderItem $item): RedirectResponse
    {
        DB::transaction(function () use ($request, $order, $item): void {
            $delta = $request->integer('quantity') - $item->quantity;

            if ($this->isStockCommitted($order) && $delta !== 0 && $item->product !== null) {
                if ($delta > 0) {
                    $this->inventory->assertAvailable($item->product, $item->variant, $delta);
                    $this->inventory->reserveForOrder($order, $item->product, $item->variant, $delta, $request->user()->id);
                } else {
                    $this->inventory->releaseForOrder($order, $item->product, $item->variant, -$delta, $request->user()->id);
                }
            }

            $item->update([
                'quantity' => $request->integer('quantity'),
                'unit_price' => $request->input('unit_price'),
                'total_price' => round((float) $request->input('unit_price') * $request->integer('quantity'), 2),
            ]);

            $this->recalculate($order);
        });

        return back();
    }

    public function destroy(Request $request, Order $order, OrderItem $item): RedirectResponse
    {
        DB::transaction(function () use ($request, $order, $item): void {
            if ($this->isStockCommitted($order) && $item->product !== null) {
                $this->inventory->releaseForOrder($order, $item->product, $item->variant, $item->quantity, $request->user()->id);
            }

            $item->delete();

            $this->recalculate($order);
        });

        return back();
    }

    private function isStockCommitted(Order $order): bool
    {
        return $order->status !== 'cancelled';
    }

    private function recalculate(Order $order): void
    {
        $this->coupons->syncDiscount($order);
    }
}
