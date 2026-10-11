<?php

namespace App\Http\Requests;

use App\Models\ProductVariant;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class StoreOrderItemRequest extends FormRequest
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
        return [
            'product_id' => ['required', 'integer', 'exists:products,id'],
            'variant_id' => ['nullable', 'integer', 'exists:product_variants,id'],
            'quantity' => ['required', 'integer', 'min:1', 'max:100000'],
            'unit_price' => ['nullable', 'numeric', 'min:0', 'max:99999999.99'],
        ];
    }

    /**
     * @return array<int, callable(Validator): void>
     */
    public function after(): array
    {
        return [
            function (Validator $validator): void {
                $variantId = $this->input('variant_id');

                if (! $variantId || $validator->errors()->isNotEmpty()) {
                    return;
                }

                $belongs = ProductVariant::query()
                    ->whereKey($variantId)
                    ->where('product_id', $this->input('product_id'))
                    ->exists();

                if (! $belongs) {
                    $validator->errors()->add('variant_id', 'The selected variant does not belong to the product.');
                }
            },
        ];
    }
}
