<?php

namespace App\Http\Requests;

use App\Models\Coupon;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CouponRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if (is_string($this->input('code'))) {
            $this->merge(['code' => strtoupper(trim($this->input('code')))]);
        }
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $maxDiscount = $this->input('discount_type') === 'percentage' ? 100 : 99999999.99;

        return [
            'code' => ['required', 'string', 'max:50', Rule::unique('coupons', 'code')->ignore($this->route('coupon'))],
            'description' => ['nullable', 'string', 'max:1000'],
            'discount_type' => ['required', Rule::in(Coupon::DISCOUNT_TYPES)],
            'discount_value' => ['required', 'numeric', 'gt:0', 'max:'.$maxDiscount],
            'min_order_amount' => ['nullable', 'numeric', 'min:0', 'max:99999999.99'],
            'max_usage' => ['nullable', 'integer', 'min:1'],
            'is_active' => ['required', 'boolean'],
            'starts_at' => ['nullable', 'date'],
            'expires_at' => ['nullable', 'date', 'after:starts_at'],
        ];
    }
}
