<?php

namespace Database\Factories;

use App\Models\Player;
use App\Models\PlayerDeposit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PlayerDeposit>
 */
class PlayerDepositFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'player_id' => Player::create([
                'name' => fake()->name(),
                'nickname' => fake()->firstName(),
                'phone' => fake()->phoneNumber(),
                'address' => fake()->address(),
                'status' => 'approved',
            ])->id,
            'amount' => fake()->randomFloat(2, 10, 1000),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
