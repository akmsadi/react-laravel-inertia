<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductCategorySeeder extends Seeder
{
    /**
     * Seed the product categories. Ids are fixed because child categories reference their parent.
     */
    public function run(): void
    {
        $baseUrl = 'https://laravel.mypersonalwork.com/assets/images/categories';

        $categories = [
            [
                'id' => 1,
                'name' => 'Clothing',
                'slug' => 'clothing',
                'description' => 'Cricket apparel and team wear for players and fans, from match jerseys to training essentials.',
                'parent_id' => null,
                'image_url' => "{$baseUrl}/clothing.jpg",
                'sort_order' => 1,
            ],
            [
                'id' => 2,
                'name' => 'Jersey',
                'slug' => 'jersey',
                'description' => 'Lightweight, breathable team jerseys designed for comfort on and off the field.',
                'parent_id' => 1,
                'image_url' => "{$baseUrl}/jersey.jpg",
                'sort_order' => 1,
            ],
            [
                'id' => 3,
                'name' => 'Trousers',
                'slug' => 'trousers',
                'description' => 'Durable, stretchable cricket trousers and track pants for matches and practice sessions.',
                'parent_id' => 1,
                'image_url' => "{$baseUrl}/trousers.jpg",
                'sort_order' => 2,
            ],
            [
                'id' => 4,
                'name' => 'Socks',
                'slug' => 'socks',
                'description' => 'Cushioned, moisture-wicking socks that keep your feet comfortable through long innings.',
                'parent_id' => 1,
                'image_url' => "{$baseUrl}/socks.jpg",
                'sort_order' => 3,
            ],
        ];

        DB::table('product_categories')->upsert(
            collect($categories)->map(fn (array $category): array => $category + [
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ])->all(),
            ['id'],
            ['name', 'slug', 'description', 'parent_id', 'image_url', 'is_active', 'sort_order', 'updated_at'],
        );
    }
}
