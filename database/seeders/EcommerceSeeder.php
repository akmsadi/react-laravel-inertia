<?php

namespace Database\Seeders;

use App\Models\ProductAttribute;
use App\Models\ProductAttributeValue;
use App\Models\ProductCategory;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductImage;
use Illuminate\Database\Seeder;

class EcommerceSeeder extends Seeder
{
    public function run(): void
    {
        // Create categories
        $electronics = ProductCategory::create([
            'name' => 'Electronics',
            'slug' => 'electronics',
            'description' => 'Electronic devices and gadgets',
            'is_active' => true,
        ]);

        $clothing = ProductCategory::create([
            'name' => 'Clothing',
            'slug' => 'clothing',
            'description' => 'Mens and womens clothing',
            'is_active' => true,
        ]);

        // Create attributes
        $sizeAttribute = ProductAttribute::create([
            'name' => 'Size',
            'slug' => 'size',
        ]);

        $colorAttribute = ProductAttribute::create([
            'name' => 'Color',
            'slug' => 'color',
        ]);

        // Create attribute values
        $sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        foreach ($sizes as $size) {
            ProductAttributeValue::create([
                'attribute_id' => $sizeAttribute->id,
                'value' => $size,
            ]);
        }

        $colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow'];
        foreach ($colors as $color) {
            ProductAttributeValue::create([
                'attribute_id' => $colorAttribute->id,
                'value' => $color,
            ]);
        }

        // Create sample products
        Product::factory(10)
            ->for($electronics)
            ->create()
            ->each(function (Product $product) {
                ProductImage::factory(3)->create([
                    'product_id' => $product->id,
                ]);
            });

        Product::factory(15)
            ->for($clothing)
            ->create()
            ->each(function (Product $product) {
                // Create variants for clothing
                ProductVariant::factory(4)
                    ->for($product)
                    ->create();
            });
    }
}
