<?php

namespace Database\Factories;

use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'category_id' => ProductCategory::factory(),
            'name' => $this->faker->words(3, true),
            'slug' => $this->faker->unique()->slug(),
            'short_description' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(5),
            'sku' => $this->faker->unique()->bothify('SKU-######'),
            'base_price' => $this->faker->randomFloat(2, 10, 1000),
            'cost_price' => $this->faker->randomFloat(2, 5, 500),
            'tax_rate' => $this->faker->randomFloat(2, 0, 20),
            'is_active' => true,
            'is_featured' => $this->faker->boolean(20),
            'stock_quantity' => $this->faker->numberBetween(0, 1000),
        ];
    }
}
