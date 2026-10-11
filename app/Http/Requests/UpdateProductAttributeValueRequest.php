<?php

namespace App\Http\Requests;

use App\Models\ProductAttribute;
use App\Models\ProductAttributeValue;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductAttributeValueRequest extends FormRequest
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
        /** @var ProductAttribute $attribute */
        $attribute = $this->route('attribute');
        /** @var ProductAttributeValue $value */
        $value = $this->route('value');

        return [
            'value' => [
                'required',
                'string',
                'max:255',
                Rule::unique('product_attribute_values', 'value')
                    ->where('attribute_id', $attribute->id)
                    ->ignore($value),
            ],
        ];
    }
}
