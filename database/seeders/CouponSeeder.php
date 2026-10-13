<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CouponSeeder extends Seeder
{
    /**
     * Seed a fixed set of six-character coupons, upserted by their unique code.
     */
    public function run(): void
    {
        $coupons = [
            ['WELC10', 'Welcome offer: 10% off your first order.', 'percentage', 10, null, null, true, -1, 365],
            ['SAVE15', 'Get 15% off your order.', 'percentage', 15, 300, 500, true, -1, 120],
            ['SAVE20', 'Get 20% off orders over 500.', 'percentage', 20, 500, 200, true, -1, 90],
            ['JRSY25', 'Get 25% off any jersey order over 1000.', 'percentage', 25, 1000, 100, true, -1, 60],
            ['MEGA30', 'Mega sale: 30% off orders over 1500.', 'percentage', 30, 1500, 50, true, -1, 30],
            ['FLAT20', 'Get 20 off your order.', 'fixed', 20, 200, null, true, -1, 180],
            ['FLAT50', 'Get 50 off orders over 500.', 'fixed', 50, 500, 300, true, -1, 120],
            ['FLT100', 'Get 100 off orders over 1000.', 'fixed', 100, 1000, 100, true, -1, 90],
            ['EXPR15', 'Expired 15% off promotion.', 'percentage', 15, null, 100, true, -60, -10],
            ['PAUS50', 'Paused 50 off promotion.', 'fixed', 50, 500, 100, false, -1, 90],
        ];

        DB::table('coupons')->upsert(
            collect($coupons)->map(fn (array $coupon): array => [
                'code' => $coupon[0],
                'description' => $coupon[1],
                'discount_type' => $coupon[2],
                'discount_value' => $coupon[3],
                'min_order_amount' => $coupon[4],
                'max_usage' => $coupon[5],
                'is_active' => $coupon[6],
                'starts_at' => now()->addDays($coupon[7]),
                'expires_at' => now()->addDays($coupon[8]),
                'created_at' => now(),
                'updated_at' => now(),
            ])->all(),
            ['code'],
            ['description', 'discount_type', 'discount_value', 'min_order_amount', 'max_usage', 'is_active', 'starts_at', 'expires_at', 'updated_at'],
        );
    }
}
