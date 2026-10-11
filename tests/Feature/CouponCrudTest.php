<?php

use App\Models\Coupon;
use App\Models\Order;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

function validCouponData(array $overrides = []): array
{
    return array_merge([
        'code' => 'save10',
        'discount_type' => 'percentage',
        'discount_value' => '10',
        'is_active' => '1',
    ], $overrides);
}

test('guests cannot access coupons', function () {
    $this->get(route('coupons.index'))->assertRedirect(route('login'));
});

test('index lists and searches coupons', function () {
    Coupon::factory()->create(['code' => 'FINDME']);
    Coupon::factory()->count(2)->create();
    $user = User::factory()->admin()->create();

    $this->actingAs($user)->get(route('coupons.index'))
        ->assertInertia(fn (Assert $page) => $page->component('admin/coupons/index')->has('coupons.data', 3));
    $this->actingAs($user)->get(route('coupons.index', ['search' => 'FINDME']))
        ->assertInertia(fn (Assert $page) => $page->has('coupons.data', 1));
});

test('create and edit pages render', function () {
    $coupon = Coupon::factory()->create();
    $user = User::factory()->admin()->create();

    $this->actingAs($user)->get(route('coupons.create'))
        ->assertInertia(fn (Assert $page) => $page->component('admin/coupons/create'));
    $this->actingAs($user)->get(route('coupons.edit', $coupon))
        ->assertInertia(fn (Assert $page) => $page->component('admin/coupons/edit')->where('coupon.id', $coupon->id));
});

test('coupon can be created with an uppercased code', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post(route('coupons.store'), validCouponData(['expires_at' => now()->addWeek()->toDateTimeString()]))
        ->assertRedirect(route('coupons.index'));

    expect(Coupon::firstWhere('code', 'SAVE10'))->not->toBeNull();
});

test('store validates required fields, unique code, percentage cap and date order', function () {
    Coupon::factory()->create(['code' => 'TAKEN']);
    $user = User::factory()->admin()->create();

    $this->actingAs($user)->post(route('coupons.store'), [])
        ->assertSessionHasErrors(['code', 'discount_type', 'discount_value', 'is_active']);

    $this->actingAs($user)->post(route('coupons.store'), validCouponData(['code' => 'taken']))
        ->assertSessionHasErrors('code');

    $this->actingAs($user)->post(route('coupons.store'), validCouponData(['discount_value' => '150']))
        ->assertSessionHasErrors('discount_value');

    $this->actingAs($user)->post(route('coupons.store'), validCouponData([
        'starts_at' => '2030-01-02', 'expires_at' => '2030-01-01',
    ]))->assertSessionHasErrors('expires_at');
});

test('coupon can be updated keeping its own code', function () {
    $coupon = Coupon::factory()->create(['code' => 'KEEP']);

    $this->actingAs(User::factory()->admin()->create())
        ->put(route('coupons.update', $coupon), validCouponData(['code' => 'KEEP', 'is_active' => '0']))
        ->assertRedirect(route('coupons.index'));

    expect($coupon->refresh()->is_active)->toBeFalse();
});

test('unused coupon can be deleted but a used one cannot', function () {
    $user = User::factory()->admin()->create();
    $free = Coupon::factory()->create();
    $used = Coupon::factory()->create();
    $used->orders()->attach(Order::factory()->create(), ['discount_amount' => 5]);

    $this->actingAs($user)->delete(route('coupons.destroy', $free))->assertRedirect(route('coupons.index'));
    expect(Coupon::find($free->id))->toBeNull();

    $this->actingAs($user)->delete(route('coupons.destroy', $used))->assertSessionHasErrors('coupon');
    expect(Coupon::find($used->id))->not->toBeNull();
});
