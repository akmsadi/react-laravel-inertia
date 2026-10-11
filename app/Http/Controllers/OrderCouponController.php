<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\CouponService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderCouponController extends Controller
{
    public function __construct(private CouponService $coupons) {}

    public function store(Request $request, Order $order): RedirectResponse
    {
        $request->validate(['coupon_code' => ['required', 'string', 'max:50']]);

        DB::transaction(function () use ($request, $order): void {
            $this->coupons->remove($order);
            $order->refresh();

            $coupon = $this->coupons->resolve($request->string('coupon_code')->toString(), (float) $order->subtotal);
            $this->coupons->apply($order, $coupon);
        });

        return back();
    }

    public function destroy(Order $order): RedirectResponse
    {
        DB::transaction(fn () => $this->coupons->remove($order));

        return back();
    }
}
