<?php

use App\Models\Newsletter;

test('a valid email is stored as a newsletter subscription', function () {
    $this->post(route('newsletter.store'), ['email' => 'member@example.com'])
        ->assertRedirect()
        ->assertSessionHas('status', 'You have been subscribed to the newsletter.');

    expect(Newsletter::query()->where('email', 'member@example.com')->exists())->toBeTrue();
});

test('an invalid email cannot be subscribed', function () {
    $this->post(route('newsletter.store'), ['email' => 'not-an-email'])
        ->assertSessionHasErrors('email');

    expect(Newsletter::count())->toBe(0);
});

test('an email cannot subscribe more than once', function () {
    Newsletter::create(['email' => 'member@example.com']);

    $this->post(route('newsletter.store'), ['email' => 'member@example.com'])
        ->assertSessionHasErrors('email');

    expect(Newsletter::count())->toBe(1);
});
