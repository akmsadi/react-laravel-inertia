<?php

use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests cannot access orders', function () {
    $this->get(route('admin.orders.index'))->assertRedirect(route('login'));
});

test('index lists orders with stats', function () {
    Order::factory()->create(['status' => 'pending', 'payment_status' => 'paid', 'total_amount' => 100]);
    Order::factory()->create(['status' => 'shipped', 'payment_status' => 'pending']);

    $this->actingAs(User::factory()->create())
        ->get(route('admin.orders.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/orders/index')
            ->has('orders.data', 2)
            ->where('stats.total_orders', 2)
            ->where('stats.pending_orders', 1)
            ->where('stats.unpaid_orders', 1));
});

test('index filters by status and search', function () {
    $customer = Customer::factory()->create(['name' => 'Zed Unique']);
    Order::factory()->create(['status' => 'pending', 'customer_id' => $customer->id]);
    Order::factory()->create(['status' => 'shipped']);

    $user = User::factory()->create();

    $this->actingAs($user)->get(route('admin.orders.index', ['status' => 'shipped']))
        ->assertInertia(fn (Assert $page) => $page->has('orders.data', 1));

    $this->actingAs($user)->get(route('admin.orders.index', ['search' => 'Zed']))
        ->assertInertia(fn (Assert $page) => $page->has('orders.data', 1));
});

test('show renders the order edit page', function () {
    $order = Order::factory()->create();

    $this->actingAs(User::factory()->create())
        ->get(route('admin.orders.show', $order))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/orders/edit')
            ->where('order.id', $order->id));
});

test('order can be updated', function () {
    $order = Order::factory()->create(['status' => 'pending', 'payment_status' => 'pending']);

    $this->actingAs(User::factory()->create())
        ->put(route('admin.orders.update', $order), [
            'status' => 'shipped',
            'payment_status' => 'paid',
            'payment_method' => 'paypal',
            'transaction_id' => 'tx-1',
            'notes' => 'Handle with care',
        ])
        ->assertRedirect();

    expect($order->refresh())
        ->status->toBe('shipped')
        ->payment_status->toBe('paid')
        ->notes->toBe('Handle with care');
});

test('order update validates statuses', function () {
    $order = Order::factory()->create();

    $this->actingAs(User::factory()->create())
        ->put(route('admin.orders.update', $order), ['status' => 'bogus', 'payment_status' => ''])
        ->assertSessionHasErrors(['status', 'payment_status']);
});

test('items can be added, updated and removed with totals recalculated', function () {
    $order = Order::factory()->create([
        'tax_amount' => 0, 'shipping_amount' => 10, 'discount_amount' => 5,
    ]);
    $product = Product::factory()->create(['base_price' => 20]);
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('admin.orders.items.store', $order), ['product_id' => $product->id, 'quantity' => 2])
        ->assertRedirect();

    $item = $order->items()->firstOrFail();
    expect($item->product_name)->toBe($product->name)
        ->and((float) $item->unit_price)->toBe(20.0)
        ->and((float) $order->refresh()->subtotal)->toBe(40.0)
        ->and((float) $order->total_amount)->toBe(45.0);

    $this->actingAs($user)
        ->put(route('admin.orders.items.update', [$order, $item]), ['quantity' => 3, 'unit_price' => '15.50'])
        ->assertRedirect();

    expect((float) $order->refresh()->subtotal)->toBe(46.5)
        ->and((float) $order->total_amount)->toBe(51.5);

    $this->actingAs($user)
        ->delete(route('admin.orders.items.destroy', [$order, $item]))
        ->assertRedirect();

    expect($order->items()->count())->toBe(0)
        ->and((float) $order->refresh()->total_amount)->toBe(5.0);
});

test('item variant must belong to the product and items are order scoped', function () {
    $order = Order::factory()->create();
    $product = Product::factory()->create();
    $other = ProductVariant::factory()->create();
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('admin.orders.items.store', $order), [
            'product_id' => $product->id, 'variant_id' => $other->id, 'quantity' => 1,
        ])
        ->assertSessionHasErrors('variant_id');

    $foreign = Order::factory()->create()->items()->create([
        'product_id' => $product->id, 'product_name' => 'X', 'quantity' => 1, 'unit_price' => 1, 'total_price' => 1,
    ]);

    $this->actingAs($user)
        ->put(route('admin.orders.items.update', [$order, $foreign]), ['quantity' => 1, 'unit_price' => 1])
        ->assertNotFound();
});
