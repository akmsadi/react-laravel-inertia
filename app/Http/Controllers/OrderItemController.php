<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderItemRequest;
use App\Http\Requests\UpdateOrderItemRequest;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class OrderItemController extends Controller
{
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

        DB::transaction(function () use ($order, $product, $variant, $unitPrice, $quantity): void {
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
            $item->update([
                'quantity' => $request->integer('quantity'),
                'unit_price' => $request->input('unit_price'),
                'total_price' => round((float) $request->input('unit_price') * $request->integer('quantity'), 2),
            ]);

            $this->recalculate($order);
        });

        return back();
    }

    public function destroy(Order $order, OrderItem $item): RedirectResponse
    {
        DB::transaction(function () use ($order, $item): void {
            $item->delete();

            $this->recalculate($order);
        });

        return back();
    }

    private function recalculate(Order $order): void
    {
        $subtotal = round((float) $order->items()->sum('total_price'), 2);

        $order->update([
            'subtotal' => $subtotal,
            'total_amount' => round(
                $subtotal + (float) $order->tax_amount + (float) $order->shipping_amount - (float) $order->discount_amount,
                2,
            ),
        ]);
    }
}
