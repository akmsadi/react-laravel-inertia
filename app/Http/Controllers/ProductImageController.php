<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductImageRequest;
use App\Http\Requests\UpdateProductImageRequest;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class ProductImageController extends Controller
{
    public function store(StoreProductImageRequest $request, Product $product): RedirectResponse
    {
        $validated = $request->validated();

        $url = $request->hasFile('image')
            ? Storage::disk('public')->url($request->file('image')->store('product-images', 'public'))
            : $validated['image_url'];

        $image = $product->images()->create([
            'image_url' => $url,
            'alt_text' => $validated['alt_text'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_primary' => false,
        ]);

        if (($validated['is_primary'] ?? false) || $product->images()->count() === 1) {
            $this->makePrimary($image);
        }

        return back();
    }

    public function update(UpdateProductImageRequest $request, Product $product, ProductImage $image): RedirectResponse
    {
        $validated = $request->validated();

        $image->update([
            'alt_text' => $validated['alt_text'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        if ($validated['is_primary'] ?? false) {
            $this->makePrimary($image);
        }

        return back();
    }

    public function destroy(Product $product, ProductImage $image): RedirectResponse
    {
        $prefix = Storage::disk('public')->url('');

        if (str_starts_with($image->image_url, $prefix)) {
            Storage::disk('public')->delete(substr($image->image_url, strlen($prefix)));
        }

        $wasPrimary = $image->is_primary;
        $image->delete();

        if ($wasPrimary && ($next = $product->images()->orderBy('sort_order')->first())) {
            $this->makePrimary($next);
        }

        return back();
    }

    private function makePrimary(ProductImage $image): void
    {
        $image->product->images()->whereKeyNot($image->getKey())->update(['is_primary' => false]);
        $image->update(['is_primary' => true]);
    }
}
