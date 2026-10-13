<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductVariantSeeder extends Seeder
{
    /**
     * Seed one variant per size for each jersey. Ids are fixed and upserted by id.
     */
    public function run(): void
    {
        $sizes = ['L', 'S', 'M', 'XL', 'XXL'];

        $jerseys = [
            ['productId' => 2, 'name' => 'Argentina', 'skuCode' => 'ARG'],
            ['productId' => 1, 'name' => 'Brazil', 'skuCode' => 'BRZ'],
            ['productId' => 3, 'name' => 'Spain', 'skuCode' => 'SPA'],
            ['productId' => 4, 'name' => 'France', 'skuCode' => 'FRA'],
            ['productId' => 5, 'name' => 'Germany', 'skuCode' => 'GER'],
        ];

        $variants = [];

        foreach ($jerseys as $jerseyIndex => $jersey) {
            foreach ($sizes as $sizeIndex => $size) {
                $variants[] = [
                    'id' => $jerseyIndex * count($sizes) + $sizeIndex + 1,
                    'product_id' => $jersey['productId'],
                    'name' => "{$jersey['name']} 10",
                    'sku' => "SKU-{$jersey['skuCode']}-10-{$size}",
                    'price' => null,
                    'cost_price' => null,
                    'tax_rate' => null,
                    'stock_quantity' => 100,
                    'weight' => 200.00,
                    'dimensions' => null,
                    'barcode' => null,
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        DB::table('product_variants')->upsert(
            $variants,
            ['id'],
            ['product_id', 'name', 'sku', 'price', 'cost_price', 'tax_rate', 'stock_quantity', 'weight', 'dimensions', 'barcode', 'is_active', 'updated_at'],
        );
    }
}
