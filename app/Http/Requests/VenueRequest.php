<?php

namespace App\Http\Requests;

use App\Models\Venue;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VenueRequest extends FormRequest
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
        /** @var Venue|null $venue */
        $venue = $this->route('venue');

        return [
            'name' => ['required', 'string', 'max:255', Rule::unique('venues', 'name')->ignore($venue)],
        ];
    }
}
