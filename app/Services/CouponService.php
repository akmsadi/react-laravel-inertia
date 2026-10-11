<?php

namespace App\Services;

use App\Models\Coupon;
use App\Models\Order;
use Illuminate\Validation\ValidationException;

class CouponService
{
    /**
     * Find a coupon by code and make sure it can be used for the given subtotal.
     *
     * @throws ValidationException
     */
    public function resolve(string $code, float $subtotal, string $field = 'coupon_code'): Coupon
    {
        $coupon = Coupon::query()->where('code', strtoupper(trim($code)))->first();

        $error = match (true) {
            $coupon === null => 'This coupon code is invalid.',
            ! $coupon->is_active => 'This coupon is not active.',
            $coupon->starts_at !== null && $coupon->starts_at->isFuture() => 'This coupon is not valid yet.',
            $coupon->expires_at !== null && $coupon->expires_at->isPast() => 'This coupon has expired.',
            $coupon->max_usage !== null && $coupon->usage_count >= $coupon->max_usage => 'This coupon has reached its usage limit.',
            $coupon->min_order_amount !== null && $subtotal < (float) $coupon->min_order_amount => 'Order total is below the minimum of '.number_format((float) $coupon->min_order_amount, 2).' for this coupon.',
            default => null,
        };

        if ($error !== null) {
            throw ValidationException::withMessages([$field => $error]);
        }

        return $coupon;
    }

    public function discountFor(Coupon $coupon, float $subtotal): float
    {
        $discount = $coupon->discount_type === 'percentage'
            ? $subtotal * (float) $coupon->discount_value / 100
            : (float) $coupon->discount_value;

        return round(min($discount, $subtotal), 2);
    }

    /**
     * Attach a coupon to an order, replacing any existing one.
     */
    public function apply(Order $order, Coupon $coupon): void
    {
        $this->remove($order);

        $order->coupons()->attach($coupon->id, [
            'discount_amount' => $this->discountFor($coupon, (float) $order->subtotal),
        ]);
        $coupon->increment('usage_count');

        $this->syncDiscount($order);
    }

    public function remove(Order $order): void
    {
        foreach ($order->coupons()->get() as $coupon) {
            $order->coupons()->detach($coupon->id);
            $coupon->decrement('usage_count');
        }

        $this->syncDiscount($order, true);
    }

    /**
     * Recompute the order discount and total from its items and attached coupon.
     */
    public function syncDiscount(Order $order, bool $clearDiscount = false): void
    {
        $order->unsetRelation('coupons');
        $subtotal = round((float) $order->items()->sum('total_price'), 2);
        $coupons = $order->coupons()->get();
        $discount = $coupons->isEmpty() && ! $clearDiscount ? (float) $order->discount_amount : 0.0;

        foreach ($coupons as $coupon) {
            $amount = $this->discountFor($coupon, $subtotal);
            $order->coupons()->updateExistingPivot($coupon->id, ['discount_amount' => $amount]);
            $discount += $amount;
        }

        $order->update([
            'subtotal' => $subtotal,
            'discount_amount' => $discount,
            'total_amount' => round(
                $subtotal + (float) $order->tax_amount + (float) $order->shipping_amount - $discount,
                2,
            ),
        ]);
    }
}
