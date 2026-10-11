<?php

use App\Models\Customer;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;

test('guests cannot access customer management', function () {
    $this->get(route('admin.customers.index'))->assertRedirect(route('login'));
});

test('index lists and searches customers', function () {
    Customer::factory()->create(['name' => 'Zed Unique']);
    Customer::factory()->count(2)->create();
    $user = User::factory()->admin()->create();

    $this->actingAs($user)->get(route('admin.customers.index'))
        ->assertInertia(fn (Assert $page) => $page->component('admin/customers/index')->has('customers.data', 3));

    $this->actingAs($user)->get(route('admin.customers.index', ['search' => 'Zed']))
        ->assertInertia(fn (Assert $page) => $page->has('customers.data', 1));
});

test('create and edit pages render', function () {
    $customer = Customer::factory()->create();
    $user = User::factory()->admin()->create();

    $this->actingAs($user)->get(route('admin.customers.create'))
        ->assertInertia(fn (Assert $page) => $page->component('admin/customers/create'));
    $this->actingAs($user)->get(route('admin.customers.edit', $customer))
        ->assertInertia(fn (Assert $page) => $page->component('admin/customers/edit')->where('customer.id', $customer->id));
});

test('customer can be created', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post(route('admin.customers.store'), [
            'name' => 'Jane', 'email' => 'jane@example.com', 'phone' => '123', 'password' => 'secret-pass-123',
        ])
        ->assertRedirect(route('admin.customers.index'));

    expect(Hash::check('secret-pass-123', Customer::firstWhere('email', 'jane@example.com')->password))->toBeTrue();
});

test('store validates required fields and unique email', function () {
    $existing = Customer::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->post(route('admin.customers.store'), ['email' => $existing->email])
        ->assertSessionHasErrors(['name', 'email', 'password']);
});

test('customer can be updated and blank password keeps the current one', function () {
    $customer = Customer::factory()->create();
    $oldHash = $customer->password;

    $this->actingAs(User::factory()->admin()->create())
        ->put(route('admin.customers.update', $customer), [
            'name' => 'Renamed', 'email' => $customer->email, 'phone' => '', 'password' => '',
        ])
        ->assertRedirect(route('admin.customers.index'));

    expect($customer->refresh())->name->toBe('Renamed')->password->toBe($oldHash);
});

test('customer without orders can be deleted but one with orders cannot', function () {
    $user = User::factory()->admin()->create();
    $free = Customer::factory()->create();
    $busy = Customer::factory()->create();
    Order::factory()->create(['customer_id' => $busy->id]);

    $this->actingAs($user)->delete(route('admin.customers.destroy', $free))
        ->assertRedirect(route('admin.customers.index'));
    expect(Customer::find($free->id))->toBeNull();

    $this->actingAs($user)->delete(route('admin.customers.destroy', $busy))
        ->assertSessionHasErrors('customer');
    expect(Customer::find($busy->id))->not->toBeNull();
});
