<?php

use App\Http\Controllers\AttributeController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\Customer\AuthenticatedCustomerSessionController;
use App\Http\Controllers\Customer\RegisteredCustomerController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\OrderManagementController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\ProductAttributeValueController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\ProductManagementController;
use App\Http\Controllers\ProductVariantController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [HomeController::class, 'about'])->name('about');
Route::get('/match-center/{match?}', [HomeController::class, 'matchCenter'])->name('match-center');
Route::get('/teams/{team}', [TeamController::class, 'show'])->name('teams.show');
Route::get('/players/{player}', [PlayerController::class, 'show'])->name('players.show');
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
    Route::resource('categories', CategoryController::class);
    Route::resource('admin/orders', OrderManagementController::class)
        ->only(['index', 'show', 'update'])
        ->names('admin.orders');
    Route::resource('admin/orders.items', OrderItemController::class)
        ->parameters(['orders' => 'order', 'items' => 'item'])
        ->only(['store', 'update', 'destroy'])
        ->names('admin.orders.items')
        ->scoped();
    Route::resource('admin/products', ProductManagementController::class)
        ->parameters(['products' => 'product'])
        ->names('admin.products');
    Route::resource('admin/products.images', ProductImageController::class)
        ->parameters(['products' => 'product', 'images' => 'image'])
        ->only(['store', 'update', 'destroy'])
        ->names('admin.products.images')
        ->scoped();
    Route::resource('admin/products.variants', ProductVariantController::class)
        ->parameters(['products' => 'product', 'variants' => 'variant'])
        ->only(['store', 'update', 'destroy'])
        ->names('admin.products.variants')
        ->scoped();
    Route::resource('attributes', AttributeController::class);
    Route::resource('attributes.values', ProductAttributeValueController::class)
        ->only(['store', 'update', 'destroy'])
        ->scoped();
});

require __DIR__.'/settings.php';
