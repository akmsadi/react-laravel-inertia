<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MatchRequest extends FormRequest
{
    public const MATCH_TYPES = ['t10', 't20', 'odi', 'test', 'football'];

    public const STATUSES = ['scheduled', 'live', 'completed', 'abandoned', 'archived'];

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
            'match_type' => ['required', Rule::in(self::MATCH_TYPES)],
            'format_overs' => ['required', 'integer', 'min:0', 'max:500'],
            'venue_id' => ['nullable', 'integer', Rule::exists('venues', 'id')],
            'scheduled_at' => ['nullable', 'date'],
            'team_name' => ['required', 'string', 'max:255'],
            'opponent_name' => ['required', 'string', 'max:255'],
            'toss_winner' => ['nullable', 'string', 'max:255'],
            'toss_decision' => ['nullable', Rule::in(['bat', 'bowl'])],
            'match_status' => ['required', Rule::in(self::STATUSES)],
            'result_type' => ['nullable', 'string', 'max:255'],
            'result_summary' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
