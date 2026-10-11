<?php

namespace App\Services;

use App\Models\InventoryTransaction;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;

class InventoryService
{
    public const LOW_STOCK_THRESHOLD = 10;

    /**
     * Change stock by a signed amount and record the movement.
     */
    public function adjust(
        Product $product,
        ?ProductVariant $variant,
        int $delta,
        string $type,
        ?Model $reference = null,
        ?string $notes = null,
        ?int $userId = null,
    ): void {
        if ($delta === 0) {
            return;
        }

        ($variant ?? $product)->increment('stock_quantity', $delta);

        InventoryTransaction::create([
            'product_id' => $product->id,
            'variant_id' => $variant?->id,
            'transaction_type' => $type,
            'quantity' => $delta,
            'reference_type' => $reference?->getMorphClass(),
            'reference_id' => $reference?->getKey(),
            'notes' => $notes,
            'created_by' => $userId,
        ]);
    }

    /**
     * Make sure the stock can cover taking the given quantity.
     *
     * @throws ValidationException
     */
    public function assertAvailable(Product $product, ?ProductVariant $variant, int $quantity, string $field = 'quantity'): void
    {
        $available = (int) ($variant ?? $product)->fresh()->stock_quantity;

        if ($quantity > $available) {
            throw ValidationException::withMessages([
                $field => "Only {$available} in stock.",
            ]);
        }
    }

    /**
     * Take stock for an order line (positive delta of items added to the order).
     */
    public function reserveForOrder(Order $order, Product $product, ?ProductVariant $variant, int $quantity, ?int $userId = null): void
    {
        $this->adjust($product, $variant, -$quantity, 'out', $order, "Order {$order->order_number}", $userId);
    }

    public function releaseForOrder(Order $order, Product $product, ?ProductVariant $variant, int $quantity, ?int $userId = null): void
    {
        $this->adjust($product, $variant, $quantity, 'return', $order, "Order {$order->order_number}", $userId);
    }

    /**
     * Put every item of a cancelled order back in stock.
     */
    public function releaseOrder(Order $order, ?int $userId = null): void
    {
        $order->items()->with(['product', 'variant'])->get()->each(function (OrderItem $item) use ($order, $userId): void {
            if ($item->product !== null) {
                $this->releaseForOrder($order, $item->product, $item->variant, $item->quantity, $userId);
            }
        });
    }

    /**
     * Take stock again for a previously cancelled order.
     *
     * @throws ValidationException
     */
    public function reserveOrder(Order $order, ?int $userId = null): void
    {
        $items = $order->items()->with(['product', 'variant'])->get();

        foreach ($items as $item) {
            if ($item->product !== null) {
                $this->assertAvailable($item->product, $item->variant, $item->quantity, 'status');
            }
        }

        foreach ($items as $item) {
            if ($item->product !== null) {
                $this->reserveForOrder($order, $item->product, $item->variant, $item->quantity, $userId);
            }
        }
    }
}
