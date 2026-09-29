<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\Customer\AuthenticatedCustomerSessionController;
use App\Http\Controllers\Customer\RegisteredCustomerController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [HomeController::class, 'about'])->name('about');
Route::get('/teams/{team}', [TeamController::class, 'show'])->name('teams.show');
Route::post('player-registration', [PlayerController::class, 'store'])->name('player-registration.store');
Route::post('newsletter', [NewsletterController::class, 'store'])->name('newsletter.store');

Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');
Route::post('/products/{product}/cart', [CartController::class, 'store'])->name('cart.store');
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::patch('/cart/{item}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/{item}', [CartController::class, 'destroy'])->name('cart.destroy');

Route::middleware('guest:customer')->prefix('customer')->name('customer.')->group(function () {
    Route::get('register', [RegisteredCustomerController::class, 'create'])->name('register');
    Route::post('register', [RegisteredCustomerController::class, 'store']);
    Route::get('login', [AuthenticatedCustomerSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedCustomerSessionController::class, 'store']);
});

Route::post('customer/logout', [AuthenticatedCustomerSessionController::class, 'destroy'])
    ->middleware('auth:customer')
    ->name('customer.logout');

Route::middleware('auth:customer')->group(function () {
    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::get('/checkout/{order}/confirmation', [CheckoutController::class, 'confirmation'])->name('checkout.confirmation');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
