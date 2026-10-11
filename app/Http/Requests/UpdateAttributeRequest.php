<?php

namespace App\Http\Requests;

use App\Models\ProductAttribute;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAttributeRequest extends FormRequest
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

        return [
            'name' => ['required', 'string', 'max:255', Rule::unique('product_attributes', 'name')->ignore($attribute)],
            'slug' => ['required', 'string', 'max:255', Rule::unique('product_attributes', 'slug')->ignore($attribute)],
        ];
    }
}
