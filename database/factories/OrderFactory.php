<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    public function definition(): array
    {
        $subtotal = $this->faker->randomFloat(2, 50, 5000);
        $tax = round($subtotal * 0.1, 2);
        $shipping = $this->faker->randomElement([0, 10, 20, 50]);
        $discount = $this->faker->randomFloat(2, 0, $subtotal * 0.2);

        return [
            'user_id' => User::factory(),
            'order_number' => 'ORD-' . $this->faker->unique()->numerify('###########'),
            'status' => $this->faker->randomElement(['pending', 'processing', 'shipped', 'delivered']),
            'payment_status' => $this->faker->randomElement(['pending', 'paid', 'failed']),
            'subtotal' => $subtotal,
            'tax_amount' => $tax,
            'shipping_amount' => $shipping,
            'discount_amount' => $discount,
            'total_amount' => $subtotal + $tax + $shipping - $discount,
            'payment_method' => $this->faker->randomElement(['credit_card', 'paypal', 'bank_transfer']),
            'transaction_id' => $this->faker->uuid(),
        ];
    }
}
