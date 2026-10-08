<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->validate([
            'category' => ['nullable', 'integer'],
            'attributes' => ['nullable', 'array'],
            'attributes.*' => ['nullable', 'integer'],
        ]);

        $products = Product::with('category', 'images', 'variants')
            ->where('is_active', true)
            ->when($filters['category'] ?? null, fn ($query, $category) => $query->where('category_id', $category))
            ->when(array_filter($filters['attributes'] ?? []), function ($query, array $selected) {
                foreach ($selected as $valueId) {
                    $query->whereHas('variants.attributes', fn ($q) => $q->where('product_attribute_values.id', $valueId));
                }
            })
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('products/index', [
            'products' => $products,
            'categories' => ProductCategory::where('is_active', true)->orderBy('sort_order')->orderBy('name')->get(['id', 'name']),
            'attributes' => ProductAttribute::with(['values' => fn ($query) => $query->orderBy('value')])
                ->whereHas('values')
                ->orderBy('name')
                ->get(['id', 'name']),
            'filters' => [
                'category' => $filters['category'] ?? '',
                'attributes' => (object) array_filter($filters['attributes'] ?? []),
            ],
        ]);
    }

    public function show(Product $product)
    {
        $product->load('category', 'images', 'variants.attributes');

        return Inertia::render('products/show', [
            'product' => $product,
        ]);
    }
}
