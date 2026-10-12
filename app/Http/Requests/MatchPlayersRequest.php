<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MatchPlayersRequest extends FormRequest
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
            'players' => ['present', 'array'],
            'players.*.player_id' => ['required', 'integer', 'distinct'],
            'players.*.side' => ['required', Rule::in(['team_a', 'team_b'])],
            'players.*.is_captain' => ['required', 'boolean'],
        ];
    }
}
