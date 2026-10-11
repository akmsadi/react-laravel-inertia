<?php

use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->actingAs(User::factory()->create());
});

test('edit page includes images, variants with attributes and attribute options', function () {
    $product = Product::factory()->create();
    $attribute = ProductAttribute::create(['name' => 'Color', 'slug' => 'color']);
    $red = $attribute->values()->create(['value' => 'Red']);
    $variant = ProductVariant::factory()->for($product)->create();
    $variant->attributes()->attach($red->id, ['attribute_id' => $attribute->id]);
    ProductImage::factory()->for($product)->create();

    $this->get(route('admin.products.edit', $product))
        ->assertInertia(fn (Assert $page) => $page
            ->has('product.images', 1)
            ->has('product.variants', 1)
            ->where('product.variants.0.attributes.0.id', $red->id)
            ->where('attributes.0.values.0.value', 'Red'));
});

test('uploading an image stores the file and makes the first image primary', function () {
    Storage::fake('public');
    $product = Product::factory()->create();

    $this->post(route('admin.products.images.store', $product), [
        'image' => UploadedFile::fake()->image('bat.jpg'),
        'alt_text' => 'A bat',
    ])->assertRedirect();

    $image = $product->images()->first();
    expect($image->is_primary)->toBeTrue()
        ->and($image->alt_text)->toBe('A bat');
    Storage::disk('public')->assertExists(substr($image->image_url, strlen(Storage::disk('public')->url(''))));
});

test('an image can be added by url and requires a file or url', function () {
    $product = Product::factory()->create();

    $this->post(route('admin.products.images.store', $product), [])
        ->assertSessionHasErrors(['image', 'image_url']);

    $this->post(route('admin.products.images.store', $product), ['image_url' => 'https://example.com/a.jpg'])
        ->assertRedirect();

    expect($product->images()->count())->toBe(1);
});

test('setting a primary image unsets the previous one', function () {
    $product = Product::factory()->create();
    $first = ProductImage::factory()->for($product)->create(['is_primary' => true]);
    $second = ProductImage::factory()->for($product)->create();

    $this->put(route('admin.products.images.update', [$product, $second]), ['is_primary' => '1', 'alt_text' => 'x'])
        ->assertRedirect();

    expect($first->refresh()->is_primary)->toBeFalse()
        ->and($second->refresh()->is_primary)->toBeTrue();
});

test('deleting the primary image promotes another and removes the stored file', function () {
    Storage::fake('public');
    $product = Product::factory()->create();

    $this->post(route('admin.products.images.store', $product), ['image' => UploadedFile::fake()->image('a.jpg')]);
    $this->post(route('admin.products.images.store', $product), ['image_url' => 'https://example.com/b.jpg']);

    $primary = $product->images()->where('is_primary', true)->first();
    $path = substr($primary->image_url, strlen(Storage::disk('public')->url('')));

    $this->delete(route('admin.products.images.destroy', [$product, $primary]))->assertRedirect();

    Storage::disk('public')->assertMissing($path);
    expect($product->images()->where('is_primary', true)->count())->toBe(1);
});

test('images of another product cannot be touched', function () {
    $product = Product::factory()->create();
    $foreign = ProductImage::factory()->for(Product::factory()->create())->create();

    $this->delete(route('admin.products.images.destroy', [$product, $foreign]))->assertNotFound();
});

test('a variant is created with its attribute values', function () {
    $product = Product::factory()->create();
    $color = ProductAttribute::create(['name' => 'Color', 'slug' => 'color']);
    $red = $color->values()->create(['value' => 'Red']);

    $this->post(route('admin.products.variants.store', $product), [
        'sku' => 'VAR-1',
        'price' => '10',
        'attribute_values' => [$color->id => $red->id],
    ])->assertRedirect();

    $variant = $product->variants()->first();
    expect($variant->stock_quantity)->toBe(0)
        ->and($variant->attributes->pluck('id')->all())->toBe([$red->id]);
    $this->assertDatabaseHas('product_variant_attributes', [
        'variant_id' => $variant->id,
        'attribute_id' => $color->id,
        'attribute_value_id' => $red->id,
    ]);
});

test('variant validation rejects duplicate sku and mismatched attribute values', function () {
    $product = Product::factory()->create();
    ProductVariant::factory()->for($product)->create(['sku' => 'TAKEN']);
    $color = ProductAttribute::create(['name' => 'Color', 'slug' => 'color']);
    $size = ProductAttribute::create(['name' => 'Size', 'slug' => 'size']);
    $large = $size->values()->create(['value' => 'L']);

    $this->post(route('admin.products.variants.store', $product), [
        'sku' => 'TAKEN',
        'attribute_values' => [$color->id => $large->id],
    ])->assertSessionHasErrors(['sku', "attribute_values.{$color->id}"]);
});

test('updating a variant replaces its attribute values', function () {
    $product = Product::factory()->create();
    $color = ProductAttribute::create(['name' => 'Color', 'slug' => 'color']);
    $red = $color->values()->create(['value' => 'Red']);
    $blue = $color->values()->create(['value' => 'Blue']);
    $variant = ProductVariant::factory()->for($product)->create(['sku' => 'V1']);
    $variant->attributes()->attach($red->id, ['attribute_id' => $color->id]);

    $this->put(route('admin.products.variants.update', [$product, $variant]), [
        'sku' => 'V1',
        'is_active' => '0',
        'attribute_values' => [$color->id => $blue->id],
    ])->assertRedirect();

    $variant->refresh();
    expect($variant->is_active)->toBeFalse()
        ->and($variant->attributes->pluck('id')->all())->toBe([$blue->id]);

    $this->put(route('admin.products.variants.update', [$product, $variant]), [
        'sku' => 'V1',
        'attribute_values' => [$color->id => ''],
    ])->assertRedirect();

    expect($variant->attributes()->count())->toBe(0);
});

test('deleting a variant soft deletes it and variants of other products are 404', function () {
    $product = Product::factory()->create();
    $variant = ProductVariant::factory()->for($product)->create();
    $foreign = ProductVariant::factory()->for(Product::factory()->create())->create();

    $this->delete(route('admin.products.variants.destroy', [$product, $foreign]))->assertNotFound();
    $this->delete(route('admin.products.variants.destroy', [$product, $variant]))->assertRedirect();

    $this->assertSoftDeleted($variant);
});
