<?php

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

function validProductData(ProductCategory $category, array $overrides = []): array
{
    return array_merge([
        'category_id' => $category->id,
        'name' => 'Cricket Bat',
        'slug' => '',
        'sku' => 'BAT-001',
        'base_price' => '99.50',
        'is_active' => '1',
        'is_featured' => '0',
    ], $overrides);
}

test('guests cannot access product management', function () {
    $this->get(route('admin.products.index'))->assertRedirect(route('login'));
});

test('index lists products', function () {
    Product::factory()->count(2)->create();

    $this->actingAs(User::factory()->admin()->create())
        ->get(route('admin.products.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/products/index')
            ->has('products.data', 2));
});

test('create and edit pages render', function () {
    $product = Product::factory()->create();
    $user = User::factory()->admin()->create();

    $this->actingAs($user)->get(route('admin.products.create'))
        ->assertInertia(fn (Assert $page) => $page->component('admin/products/create')->has('categories'));

    $this->actingAs($user)->get(route('admin.products.edit', $product))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/products/edit')
            ->where('product.id', $product->id));
});

test('store creates a product and generates the slug', function () {
    $category = ProductCategory::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->post(route('admin.products.store'), validProductData($category))
        ->assertRedirect(route('admin.products.index'));

    $this->assertDatabaseHas('products', [
        'name' => 'Cricket Bat',
        'slug' => 'cricket-bat',
        'tax_rate' => 0,
        'stock_quantity' => 0,
    ]);
});

test('store validates required fields, unique slug and sku', function () {
    $category = ProductCategory::factory()->create();
    Product::factory()->create(['slug' => 'cricket-bat', 'sku' => 'BAT-001']);

    $this->actingAs(User::factory()->admin()->create())
        ->post(route('admin.products.store'), validProductData($category))
        ->assertSessionHasErrors(['slug', 'sku']);

    $this->post(route('admin.products.store'), [])
        ->assertSessionHasErrors(['category_id', 'name', 'base_price']);
});

test('update changes a product and may keep its own slug and sku', function () {
    $product = Product::factory()->create(['slug' => 'old', 'sku' => 'OLD-1']);

    $this->actingAs(User::factory()->admin()->create())
        ->put(route('admin.products.update', $product), validProductData($product->category, [
            'name' => 'Renamed',
            'slug' => 'old',
            'sku' => 'OLD-1',
            'is_active' => '0',
        ]))
        ->assertRedirect(route('admin.products.index'));

    expect($product->refresh())
        ->name->toBe('Renamed')
        ->is_active->toBeFalse();
});

test('destroy soft deletes a product', function () {
    $product = Product::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.products.destroy', $product))
        ->assertRedirect(route('admin.products.index'));

    $this->assertSoftDeleted($product);
});
