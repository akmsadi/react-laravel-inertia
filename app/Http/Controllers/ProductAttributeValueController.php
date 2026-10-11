<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductAttributeValueRequest;
use App\Http\Requests\UpdateProductAttributeValueRequest;
use App\Models\ProductAttribute;
use App\Models\ProductAttributeValue;
use Illuminate\Http\RedirectResponse;

class ProductAttributeValueController extends Controller
{
    public function store(
        StoreProductAttributeValueRequest $request,
        ProductAttribute $attribute,
    ): RedirectResponse {
        $attribute->values()->create($request->validated());

        return to_route('attributes.index');
    }

    public function update(
        UpdateProductAttributeValueRequest $request,
        ProductAttribute $attribute,
        ProductAttributeValue $value,
    ): RedirectResponse {
        $value->update($request->validated());

        return to_route('attributes.index');
    }

    public function destroy(
        ProductAttribute $attribute,
        ProductAttributeValue $value,
    ): RedirectResponse {
        $value->delete();

        return to_route('attributes.index');
    }
}
