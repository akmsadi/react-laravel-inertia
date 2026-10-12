<?php

namespace Database\Factories;

use App\Models\Expense;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'match_id' => null,
            'title' => fake()->words(3, true),
            'amount' => fake()->numberBetween(10, 1000),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
