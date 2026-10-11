<?php

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('non-admin users cannot access shop routes', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('admin.orders.index'))
        ->assertForbidden();
});

test('admin dashboard includes shop stats', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page->has('shop'));
});

test('inventory adjustment changes stock and records a transaction', function () {
    $product = Product::factory()->create(['stock_quantity' => 5]);
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)->get(route('admin.inventory.index'))->assertOk();

    $this->actingAs($admin)
        ->post(route('admin.inventory.adjust'), [
            'product_id' => $product->id,
            'quantity' => 3,
            'type' => 'in',
        ]);

    expect($product->fresh()->stock_quantity)->toBe(8);
    $this->assertDatabaseHas('inventory_transactions', ['product_id' => $product->id, 'quantity' => 3]);
});

test('cancelling an order restocks and un-cancelling reserves again', function () {
    $product = Product::factory()->create(['stock_quantity' => 10, 'price' => 10]);
    $order = Order::factory()->create(['status' => 'pending']);
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->post(route('admin.orders.items.store', $order), ['product_id' => $product->id, 'quantity' => 4]);
    expect($product->fresh()->stock_quantity)->toBe(6);

    $payload = ['payment_status' => $order->payment_status, 'payment_method' => $order->payment_method];

    $this->actingAs($admin)->put(route('admin.orders.update', $order), ['status' => 'cancelled'] + $payload);
    expect($product->fresh()->stock_quantity)->toBe(10);

    $this->actingAs($admin)->put(route('admin.orders.update', $order), ['status' => 'pending'] + $payload);
    expect($product->fresh()->stock_quantity)->toBe(6);
});
