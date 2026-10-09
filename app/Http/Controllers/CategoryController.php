<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\ProductCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('categories/index', [
            'categories' => ProductCategory::query()
                ->with('parent:id,name')
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('categories/create', [
            'parents' => $this->parentOptions(),
        ]);
    }

    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        ProductCategory::create($this->attributes($request->validated()));

        return to_route('categories.index');
    }

    public function show(ProductCategory $category): RedirectResponse
    {
        return to_route('categories.edit', $category);
    }

    public function edit(ProductCategory $category): Response
    {
        return Inertia::render('categories/edit', [
            'category' => $category,
            'parents' => $this->parentOptions($category),
        ]);
    }

    public function update(UpdateCategoryRequest $request, ProductCategory $category): RedirectResponse
    {
        $category->update($this->attributes($request->validated()));

        return to_route('categories.index');
    }

    public function destroy(ProductCategory $category): RedirectResponse
    {
        if ($category->products()->exists()) {
            return back()->withErrors([
                'category' => 'This category has products and cannot be deleted.',
            ]);
        }

        $category->delete();

        return to_route('categories.index');
    }

    /**
     * @return Collection<int, ProductCategory>
     */
    private function parentOptions(?ProductCategory $except = null)
    {
        return ProductCategory::query()
            ->when($except, fn ($query) => $query->whereKeyNot($except->getKey()))
            ->orderBy('name')
            ->get(['id', 'name']);
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function attributes(array $validated): array
    {
        $validated['sort_order'] ??= 0;

        return $validated;
    }
}
