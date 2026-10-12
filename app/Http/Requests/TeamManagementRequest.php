<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class TeamManagementRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255'],
            'slogan' => ['required', 'string', 'max:255'],
            'about' => ['required', 'string'],
            'logo' => ['nullable', 'string', 'max:255'],
            'banner' => ['required', 'string', 'max:255'],
            'established' => ['required', 'integer', 'min:0'],
            'matches' => ['required', 'integer', 'min:0'],
            'wins' => ['required', 'integer', 'min:0', 'lte:matches'],
            'titles' => ['required', 'integer', 'min:0'],
            'captain_id' => ['nullable', 'integer', 'exists:players,id'],
            'vice_captain_id' => [
                'nullable',
                'integer',
                'exists:players,id',
                'different:captain_id',
            ],
            'is_external' => ['required', 'boolean'],
            'players' => ['nullable', 'array'],
            'players.*' => ['integer', 'distinct', 'exists:players,id'],
        ];
    }
}
