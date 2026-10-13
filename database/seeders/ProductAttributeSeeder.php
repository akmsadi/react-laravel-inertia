<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductAttributeSeeder extends Seeder
{
    /**
     * Seed the product attributes and their values. Ids are fixed because products reference them.
     */
    public function run(): void
    {
        $attributes = [
            1 => ['Size', 'size'],
            2 => ['Color', 'color'],
            3 => ['Material', 'material'],
        ];

        DB::table('product_attributes')->upsert(
            collect($attributes)->map(fn (array $attribute, int $id): array => [
                'id' => $id,
                'name' => $attribute[0],
                'slug' => $attribute[1],
                'created_at' => now(),
                'updated_at' => now(),
            ])->values()->all(),
            ['id'],
            ['name', 'slug', 'updated_at'],
        );

        $values = [
            1 => [2, 'White'],
            2 => [2, 'Black'],
            3 => [2, 'Red'],
            4 => [2, 'Green'],
            5 => [2, 'Blue'],
            6 => [1, 'S'],
            7 => [1, 'M'],
            8 => [1, 'L'],
            9 => [1, 'XL'],
            10 => [1, 'XXL'],
            11 => [3, 'Microfiber Polyester'],
            12 => [3, 'Honeycomb Polyester'],
            13 => [3, 'Cotton'],
            14 => [3, 'Wood'],
            15 => [3, 'Rubber'],
        ];

        DB::table('product_attribute_values')->upsert(
            collect($values)->map(fn (array $value, int $id): array => [
                'id' => $id,
                'attribute_id' => $value[0],
                'value' => $value[1],
                'created_at' => now(),
                'updated_at' => now(),
            ])->values()->all(),
            ['id'],
            ['attribute_id', 'value', 'updated_at'],
        );
    }
}
