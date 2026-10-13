<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\ProductCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
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
        ProductCategory::create($this->attributes($request));

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
        $attributes = $this->attributes($request);

        if ($request->hasFile('image')) {
            $this->deleteStoredImage($category->image_url);
        }

        $category->update($attributes);

        return to_route('categories.index');
    }

    public function destroy(ProductCategory $category): RedirectResponse
    {
        if ($category->products()->exists()) {
            return back()->withErrors([
                'category' => 'This category has products and cannot be deleted.',
            ]);
        }

        $this->deleteStoredImage($category->image_url);
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
     * @return array<string, mixed>
     */
    private function attributes(FormRequest $request): array
    {
        $validated = $request->validated();
        unset($validated['image']);

        $validated['sort_order'] ??= 0;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('category-images', 'public');

            if ($path === false) {
                throw ValidationException::withMessages(['image' => 'The image could not be saved. Check storage permissions.']);
            }

            $validated['image_url'] = Storage::disk('public')->url($path);
        }

        return $validated;
    }

    private function deleteStoredImage(?string $imageUrl): void
    {
        $prefix = Storage::disk('public')->url('');

        if ($imageUrl && str_starts_with($imageUrl, $prefix)) {
            Storage::disk('public')->delete(substr($imageUrl, strlen($prefix)));
        }
    }
}
