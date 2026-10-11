<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductManagementController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/products/index', [
            'products' => Product::query()
                ->with('category:id,name')
                ->latest('id')
                ->paginate(15),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/products/create', [
            'categories' => $this->categoryOptions(),
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        Product::create($this->attributes($request->validated()));

        return to_route('admin.products.index');
    }

    public function show(Product $product): RedirectResponse
    {
        return to_route('admin.products.edit', $product);
    }

    public function edit(Product $product): Response
    {
        $product->load([
            'images' => fn (HasMany $query) => $query->orderBy('sort_order')->orderBy('id'),
            'variants' => fn (HasMany $query) => $query->orderBy('id'),
            'variants.attributes',
        ]);

        return Inertia::render('admin/products/edit', [
            'product' => $product,
            'categories' => $this->categoryOptions(),
            'attributes' => ProductAttribute::query()
                ->with(['values' => fn (HasMany $query) => $query->orderBy('value')])
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $product->update($this->attributes($request->validated()));

        return to_route('admin.products.index');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return to_route('admin.products.index');
    }

    /**
     * @return Collection<int, ProductCategory>
     */
    private function categoryOptions(): Collection
    {
        return ProductCategory::query()->orderBy('name')->get(['id', 'name']);
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function attributes(array $validated): array
    {
        $validated['tax_rate'] ??= 0;
        $validated['stock_quantity'] ??= 0;

        return $validated;
    }
}
