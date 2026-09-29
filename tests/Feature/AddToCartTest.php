<?php

use App\Models\Product;
use App\Models\ProductVariant;
use Inertia\Testing\AssertableInertia as Assert;

test('adding a variant stores it in the cart and increments its quantity', function () {
    $product = Product::factory()->create(['stock_quantity' => 0]);
    $variant = ProductVariant::factory()->for($product)->create([
        'stock_quantity' => 2,
    ]);
    $url = route('cart.store', $product);

    $this->post($url, ['variant_id' => $variant->id])->assertRedirect();
    $this->post($url, ['variant_id' => $variant->id])
        ->assertRedirect()
        ->assertSessionHas('cart', [
            "variant_{$variant->id}" => [
                'product_id' => $product->id,
                'variant_id' => $variant->id,
                'quantity' => 2,
            ],
        ]);
});

test('adding a product without variants stores a product cart line', function () {
    $product = Product::factory()->create(['stock_quantity' => 3]);

    $this->post(route('cart.store', $product))
        ->assertRedirect()
        ->assertSessionHas('cart', [
            "product_{$product->id}" => [
                'product_id' => $product->id,
                'variant_id' => null,
                'quantity' => 1,
            ],
        ]);
});

test('a product with variants requires one of its own active variants', function () {
    $product = Product::factory()->create();
    ProductVariant::factory()->for($product)->create();
    $inactiveVariant = ProductVariant::factory()->for($product)->create([
        'is_active' => false,
    ]);
    $otherProduct = Product::factory()->create();
    $otherVariant = ProductVariant::factory()->for($otherProduct)->create();
    $url = route('cart.store', $product);

    $this->post($url)->assertSessionHasErrors('variant_id');
    $this->post($url, ['variant_id' => $inactiveVariant->id])
        ->assertSessionHasErrors('variant_id');
    $this->post($url, ['variant_id' => $otherVariant->id])
        ->assertSessionHasErrors('variant_id');
});

test('items cannot be added beyond available stock', function () {
    $product = Product::factory()->create(['stock_quantity' => 0]);
    $variant = ProductVariant::factory()->for($product)->create([
        'stock_quantity' => 0,
    ]);

    $this->post(route('cart.store', $product), [
        'variant_id' => $variant->id,
    ])->assertSessionHasErrors('cart');

    $simpleProduct = Product::factory()->create(['stock_quantity' => 0]);

    $this->post(route('cart.store', $simpleProduct))
        ->assertSessionHasErrors('cart');
});

test('cart overview resolves product and variant details from the session', function () {
    $product = Product::factory()->create(['base_price' => 25]);
    $variant = ProductVariant::factory()->for($product)->create([
        'name' => 'Large',
        'price' => 30,
        'stock_quantity' => 5,
    ]);

    $this->withSession([
        'cart' => [
            "variant_{$variant->id}" => [
                'product_id' => $product->id,
                'variant_id' => $variant->id,
                'quantity' => 2,
            ],
        ],
    ])->get(route('cart.index'))
        ->assertOk()
        ->assertInertia(fn(Assert $page) => $page
            ->component('cart/index')
            ->has('items', 1)
            ->where('items.0.product_name', $product->name)
            ->where('items.0.variant_name', fn($value) => $value === 'Large')
            ->where('items.0.quantity', 2)
            ->where('items.0.line_total', 60)
            ->where('itemCount', 2)
            ->where('subtotal', 60)
            ->where('cartItemCount', 2));
});

test('cart quantities can be updated within stock and items can be removed', function () {
    $product = Product::factory()->create(['stock_quantity' => 5]);
    $cartKey = "product_{$product->id}";
    $session = [
        'cart' => [
            $cartKey => [
                'product_id' => $product->id,
                'variant_id' => null,
                'quantity' => 1,
            ],
        ],
    ];

    $this->withSession($session)
        ->patch(route('cart.update', $cartKey), ['quantity' => 3])
        ->assertRedirect(route('cart.index'))
        ->assertSessionHas("cart.{$cartKey}.quantity", 3);

    $this->withSession($session)
        ->delete(route('cart.destroy', $cartKey))
        ->assertRedirect(route('cart.index'))
        ->assertSessionHas('cart', []);
});

test('cart quantity cannot be increased beyond stock', function () {
    $product = Product::factory()->create(['stock_quantity' => 2]);
    $cartKey = "product_{$product->id}";

    $this->withSession([
        'cart' => [
            $cartKey => [
                'product_id' => $product->id,
                'variant_id' => null,
                'quantity' => 1,
            ],
        ],
    ])->patch(route('cart.update', $cartKey), ['quantity' => 3])
        ->assertSessionHasErrors('quantity');
});
