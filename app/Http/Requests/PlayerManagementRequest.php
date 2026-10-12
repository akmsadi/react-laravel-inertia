<?php

namespace App\Http\Requests;

use App\Models\Player;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PlayerManagementRequest extends FormRequest
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
        /** @var Player|null $player */
        $player = $this->route('player');

        return [
            'name' => ['required', 'string', 'max:255'],
            'nickname' => ['required', 'string', 'max:255'],
            'organization' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:1000'],
            'status' => ['required', Rule::in(['approved', 'pending', 'guest', 'rejected'])],
            'guest_of_player_id' => [
                'nullable',
                'integer',
                'exists:players,id',
                ...($player ? [Rule::notIn([$player->id])] : []),
            ],
        ];
    }
}
