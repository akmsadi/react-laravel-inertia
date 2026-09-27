<?php

use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::registration());
});

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('new users can register', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();

    $user = User::where('email', 'test@example.com')->first();
    $response->assertRedirect(route('dashboard'));
});

test('players can submit a registration', function () {
    $response = $this->from(route('home'))
        ->post(route('player-registration.store'), [
            'name' => 'Test Player',
            'organization' => 'Test Organization',
            'email' => 'player@example.com',
            'phone' => '555-0100',
            'address' => '123 Main Street',
        ]);

    $response->assertRedirect(route('home'));
    $response->assertSessionHas('status', 'Your player registration has been submitted.');
    $this->get(route('home'))->assertInertia(
        fn(Assert $page) => $page->where('flash.status', 'Your player registration has been submitted.'),
    );
    $this->assertDatabaseHas('players', [
        'name' => 'Test Player',
        'nickname' => 'Test Player',
        'organization' => 'Test Organization',
        'email' => 'player@example.com',
        'phone' => '555-0100',
        'address' => '123 Main Street',
        'status' => 'pending',
    ]);
});

test('player registration validates required details', function () {
    $response = $this->from(route('home'))
        ->post(route('player-registration.store'), []);

    $response->assertRedirect(route('home'));
    $response->assertSessionHasErrors(['name', 'phone', 'address']);
    expect(Players::query()->count())->toBe(0);
});

test('player registration rejects duplicate email addresses', function () {
    Players::create([
        'name' => 'Existing Player',
        'nickname' => 'Existing Player',
        'email' => 'player@example.com',
        'phone' => '555-0100',
        'address' => '123 Main Street',
    ]);

    $response = $this->from(route('home'))
        ->post(route('player-registration.store'), [
            'name' => 'Another Player',
            'email' => 'player@example.com',
            'phone' => '555-0101',
            'address' => '456 Main Street',
        ]);

    $response->assertRedirect(route('home'));
    $response->assertSessionHasErrors('email');
    expect(Players::query()->count())->toBe(1);
});