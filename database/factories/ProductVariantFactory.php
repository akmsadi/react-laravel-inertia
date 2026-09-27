<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductVariantFactory extends Factory
{
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'name' => $this->faker->word(),
            'sku' => $this->faker->unique()->bothify('VAR-######'),
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'cost_price' => $this->faker->randomFloat(2, 5, 500),
            'tax_rate' => $this->faker->randomFloat(2, 0, 20),
            'stock_quantity' => $this->faker->numberBetween(0, 500),
            'weight' => $this->faker->randomFloat(2, 0.1, 50),
            'dimensions' => $this->faker->numerify('## x ## x ##'),
            'is_active' => true,
        ];
    }
}
