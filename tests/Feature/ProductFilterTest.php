<?php

use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductAttributeValue;
use App\Models\ProductCategory;
use App\Models\ProductVariant;
use Inertia\Testing\AssertableInertia as Assert;

test('products can be filtered by category and attribute', function () {
    $jerseys = ProductCategory::factory()->create();
    $caps = ProductCategory::factory()->create();
    $red = ProductAttributeValue::create([
        'attribute_id' => ProductAttribute::create(['name' => 'Color', 'slug' => 'color'])->id,
        'value' => 'Red',
    ]);

    $redJersey = Product::factory()->create(['category_id' => $jerseys->id, 'is_active' => true]);
    Product::factory()->create(['category_id' => $jerseys->id, 'is_active' => true]);
    Product::factory()->create(['category_id' => $caps->id, 'is_active' => true]);
    ProductVariant::factory()->create(['product_id' => $redJersey->id])->attributes()->attach($red->id, ['attribute_id' => $red->attribute_id]);

    $this->get(route('products.index', ['category' => $jerseys->id]))
        ->assertInertia(fn (Assert $page) => $page->has('products.data', 2));

    $this->get(route('products.index', ['category' => $jerseys->id, 'attributes' => [$red->attribute_id => $red->id]]))
        ->assertInertia(fn (Assert $page) => $page
            ->has('products.data', 1)
            ->where('products.data.0.id', $redJersey->id)
            ->has('categories', 2)
            ->has('attributes', 1));
});
