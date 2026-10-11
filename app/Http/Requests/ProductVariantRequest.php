<?php

namespace App\Http\Requests;

use App\Models\ProductAttributeValue;
use App\Models\ProductVariant;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class ProductVariantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        /** @var ProductVariant|null $variant */
        $variant = $this->route('variant');

        return [
            'name' => ['nullable', 'string', 'max:255'],
            'sku' => ['required', 'string', 'max:255', Rule::unique('product_variants', 'sku')->ignore($variant?->id)],
            'price' => ['nullable', 'numeric', 'min:0', 'max:99999999.99'],
            'cost_price' => ['nullable', 'numeric', 'min:0', 'max:99999999.99'],
            'tax_rate' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'stock_quantity' => ['nullable', 'integer', 'min:0'],
            'weight' => ['nullable', 'numeric', 'min:0', 'max:999999.99'],
            'dimensions' => ['nullable', 'string', 'max:255'],
            'barcode' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
            'attribute_values' => ['nullable', 'array'],
            'attribute_values.*' => ['nullable', 'integer'],
        ];
    }

    /**
     * Each selected value must belong to the attribute it is keyed by.
     *
     * @return array<int, callable(Validator): void>
     */
    public function after(): array
    {
        return [
            function (Validator $validator): void {
                foreach (array_filter((array) $this->input('attribute_values')) as $attributeId => $valueId) {
                    $belongs = ProductAttributeValue::query()
                        ->whereKey($valueId)
                        ->where('attribute_id', $attributeId)
                        ->exists();

                    if (! $belongs) {
                        $validator->errors()->add("attribute_values.$attributeId", 'The selected value is invalid.');
                    }
                }
            },
        ];
    }
}
