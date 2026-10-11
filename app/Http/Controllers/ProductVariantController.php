<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductVariantRequest;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\RedirectResponse;

class ProductVariantController extends Controller
{
    public function store(ProductVariantRequest $request, Product $product): RedirectResponse
    {
        $variant = $product->variants()->create($this->variantData($request->validated()));

        $this->syncAttributes($variant, $request->validated('attribute_values', []));

        return back();
    }

    public function update(ProductVariantRequest $request, Product $product, ProductVariant $variant): RedirectResponse
    {
        $variant->update($this->variantData($request->validated()));

        $this->syncAttributes($variant, $request->validated('attribute_values', []));

        return back();
    }

    public function destroy(Product $product, ProductVariant $variant): RedirectResponse
    {
        $variant->delete();

        return back();
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function variantData(array $validated): array
    {
        unset($validated['attribute_values']);

        $validated['stock_quantity'] ??= 0;

        return $validated;
    }

    /**
     * @param  array<int|string, int|string|null>|null  $selected  Attribute id => value id
     */
    private function syncAttributes(ProductVariant $variant, ?array $selected): void
    {
        $sync = [];

        foreach (array_filter($selected ?? []) as $attributeId => $valueId) {
            $sync[$valueId] = ['attribute_id' => $attributeId];
        }

        $variant->attributes()->sync($sync);
    }
}
