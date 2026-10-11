<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAttributeRequest;
use App\Http\Requests\UpdateAttributeRequest;
use App\Models\ProductAttribute;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AttributeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('attributes/index', [
            'attributes' => ProductAttribute::query()
                ->with([
                    'values' => fn (HasMany $query) => $query
                        ->select('id', 'attribute_id', 'value')
                        ->orderBy('value'),
                ])
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('attributes/create');
    }

    public function store(StoreAttributeRequest $request): RedirectResponse
    {
        ProductAttribute::create($request->validated());

        return to_route('attributes.index');
    }

    public function show(ProductAttribute $attribute): RedirectResponse
    {
        return to_route('attributes.edit', $attribute);
    }

    public function edit(ProductAttribute $attribute): Response
    {
        return Inertia::render('attributes/edit', [
            'attribute' => $attribute,
        ]);
    }

    public function update(UpdateAttributeRequest $request, ProductAttribute $attribute): RedirectResponse
    {
        $attribute->update($request->validated());

        return to_route('attributes.index');
    }

    public function destroy(ProductAttribute $attribute): RedirectResponse
    {
        $attribute->delete();

        return to_route('attributes.index');
    }
}
