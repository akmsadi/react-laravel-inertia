<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category', 'images', 'variants')
            ->where('is_active', true)
            ->paginate(12);

        return Inertia::render('products/index', [
            'products' => $products,
        ]);
    }

    public function show(Product $product)
    {
        $product->load('category', 'images', 'variants.attributes');

        return Inertia::render('products/Show', [
            'product' => $product,
        ]);
    }
}