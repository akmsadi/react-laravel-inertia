<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Seed the products. Ids are fixed because other records reference them.
     */
    public function run(): void
    {
        $jerseyCategoryId = 2;

        $products = [
            1 => ['Brazil', 'brazil', 'SKU-BRZ', 'Brazil', 'the five-time world champions'],
            2 => ['Argentina', 'argentina', 'SKU-ARG', 'Argentina', 'the reigning world champions'],
            3 => ['Spain', 'spain', 'SKU-SPA', 'Spain', 'La Roja'],
            4 => ['France', 'france', 'SKU-FRA', 'France', 'Les Bleus'],
            5 => ['Germany', 'germany', 'SKU-GER', 'Germany', 'Die Mannschaft'],
        ];

        DB::table('products')->upsert(
            collect($products)->map(fn (array $product, int $id): array => [
                'id' => $id,
                'category_id' => $jerseyCategoryId,
                'name' => $product[0],
                'slug' => $product[1],
                'short_description' => "Football Jersey of {$product[3]}",
                'description' => "Show your support for {$product[3]}, {$product[4]}, with this football jersey. Made from lightweight, breathable fabric with a comfortable fit for match days and everyday wear.",
                'sku' => $product[2],
                'base_price' => 250.00,
                'cost_price' => 200.00,
                'tax_rate' => 0.00,
                'is_active' => true,
                'is_featured' => true,
                'stock_quantity' => 100,
                'created_at' => now(),
                'updated_at' => now(),
            ])->values()->all(),
            ['id'],
            ['category_id', 'name', 'slug', 'short_description', 'description', 'sku', 'base_price', 'cost_price', 'tax_rate', 'is_active', 'is_featured', 'stock_quantity', 'updated_at'],
        );
    }
}
