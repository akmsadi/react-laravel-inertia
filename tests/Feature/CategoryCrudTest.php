<?php

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->actingAs(User::factory()->create());
});

test('guests cannot access categories', function () {
    auth()->logout();

    $this->get(route('categories.index'))->assertRedirect(route('login'));
});

test('index lists categories', function () {
    ProductCategory::factory()->create(['name' => 'Bats']);

    $this->get(route('categories.index'))
        ->assertInertia(fn ($page) => $page
            ->component('categories/index')
            ->has('categories', 1));
});

test('a category can be created and slug is generated from name', function () {
    $this->post(route('categories.store'), [
        'name' => 'Cricket Bats',
        'is_active' => '1',
    ])->assertRedirect(route('categories.index'));

    $this->assertDatabaseHas('product_categories', [
        'name' => 'Cricket Bats',
        'slug' => 'cricket-bats',
        'is_active' => true,
        'sort_order' => 0,
    ]);
});

test('creating a category validates input', function () {
    ProductCategory::factory()->create(['slug' => 'bats']);

    $this->post(route('categories.store'), ['name' => '', 'slug' => 'bats', 'parent_id' => 999])
        ->assertSessionHasErrors(['name', 'slug', 'parent_id']);
});

test('a category can be updated', function () {
    $category = ProductCategory::factory()->create();

    $this->put(route('categories.update', $category), [
        'name' => 'Updated',
        'slug' => 'updated',
        'is_active' => '0',
    ])->assertRedirect(route('categories.index'));

    expect($category->fresh())
        ->name->toBe('Updated')
        ->is_active->toBeFalse();
});

test('a category cannot be its own parent', function () {
    $category = ProductCategory::factory()->create();

    $this->put(route('categories.update', $category), [
        'name' => $category->name,
        'slug' => $category->slug,
        'parent_id' => $category->id,
    ])->assertSessionHasErrors('parent_id');
});

test('a category can be deleted', function () {
    $category = ProductCategory::factory()->create();

    $this->delete(route('categories.destroy', $category))
        ->assertRedirect(route('categories.index'));

    $this->assertDatabaseMissing('product_categories', ['id' => $category->id]);
});

test('a category with products cannot be deleted', function () {
    $product = Product::factory()->create();

    $this->delete(route('categories.destroy', $product->category_id))
        ->assertSessionHasErrors('category');

    $this->assertDatabaseHas('product_categories', ['id' => $product->category_id]);
});

test('a category image can be uploaded and is replaced on update', function () {
    Storage::fake('public');
    $prefix = Storage::disk('public')->url('');

    $this->post(route('categories.store'), [
        'name' => 'Cricket Bats',
        'is_active' => '1',
        'image' => UploadedFile::fake()->image('bats.jpg'),
    ])->assertRedirect(route('categories.index'));

    $category = ProductCategory::firstWhere('slug', 'cricket-bats');
    $oldPath = substr($category->image_url, strlen($prefix));
    expect($oldPath)->toStartWith('category-images/');
    Storage::disk('public')->assertExists($oldPath);

    $this->put(route('categories.update', $category), [
        'name' => 'Cricket Bats',
        'slug' => 'cricket-bats',
        'is_active' => '1',
        'image' => UploadedFile::fake()->image('new.jpg'),
    ])->assertRedirect(route('categories.index'));

    Storage::disk('public')->assertMissing($oldPath);
    Storage::disk('public')->assertExists(substr($category->refresh()->image_url, strlen($prefix)));
});

test('category image must be an image', function () {
    $this->post(route('categories.store'), [
        'name' => 'Bats',
        'image' => UploadedFile::fake()->create('doc.pdf', 10, 'application/pdf'),
    ])->assertSessionHasErrors('image');
});
