<?php

namespace Database\Factories;

use App\Models\Coupon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Coupon>
 */
class CouponFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => strtoupper(fake()->unique()->bothify('SAVE-####')),
            'description' => fake()->sentence(),
            'discount_type' => fake()->randomElement(Coupon::DISCOUNT_TYPES),
            'discount_value' => fake()->randomFloat(2, 1, 50),
            'min_order_amount' => null,
            'max_usage' => null,
            'usage_count' => 0,
            'is_active' => true,
            'starts_at' => null,
            'expires_at' => null,
        ];
    }
}
