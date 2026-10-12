<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExpenseContributorSeeder extends Seeder
{
    /**
     * Seed the players who share each expense. Requires expenses and players.
     */
    public function run(): void
    {
        DB::table('expense_contributors')->upsert([
            ['id' => 93, 'expense_id' => 27, 'player_id' => 18, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 94, 'expense_id' => 27, 'player_id' => 37, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 95, 'expense_id' => 27, 'player_id' => 19, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 96, 'expense_id' => 27, 'player_id' => 25, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 97, 'expense_id' => 27, 'player_id' => 16, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 98, 'expense_id' => 27, 'player_id' => 6, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 99, 'expense_id' => 27, 'player_id' => 4, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 100, 'expense_id' => 27, 'player_id' => 29, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 101, 'expense_id' => 27, 'player_id' => 15, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 102, 'expense_id' => 27, 'player_id' => 35, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 103, 'expense_id' => 27, 'player_id' => 5, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 104, 'expense_id' => 27, 'player_id' => 22, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 105, 'expense_id' => 27, 'player_id' => 28, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 106, 'expense_id' => 27, 'player_id' => 7, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 107, 'expense_id' => 27, 'player_id' => 21, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 108, 'expense_id' => 27, 'player_id' => 11, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 109, 'expense_id' => 27, 'player_id' => 1, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 110, 'expense_id' => 27, 'player_id' => 27, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 111, 'expense_id' => 27, 'player_id' => 2, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 112, 'expense_id' => 27, 'player_id' => 12, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 113, 'expense_id' => 27, 'player_id' => 30, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 114, 'expense_id' => 27, 'player_id' => 9, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 115, 'expense_id' => 27, 'player_id' => 20, 'created_at' => '2026-06-28 23:14:05', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 128, 'expense_id' => 46, 'player_id' => 18, 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 129, 'expense_id' => 46, 'player_id' => 37, 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 130, 'expense_id' => 46, 'player_id' => 66, 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 131, 'expense_id' => 46, 'player_id' => 25, 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 132, 'expense_id' => 46, 'player_id' => 21, 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 133, 'expense_id' => 46, 'player_id' => 26, 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 134, 'expense_id' => 46, 'player_id' => 4, 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 135, 'expense_id' => 46, 'player_id' => 15, 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 136, 'expense_id' => 46, 'player_id' => 22, 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 137, 'expense_id' => 46, 'player_id' => 28, 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 138, 'expense_id' => 46, 'player_id' => 7, 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 139, 'expense_id' => 46, 'player_id' => 1, 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 140, 'expense_id' => 46, 'player_id' => 27, 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 141, 'expense_id' => 46, 'player_id' => 69, 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 142, 'expense_id' => 46, 'player_id' => 2, 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 143, 'expense_id' => 46, 'player_id' => 12, 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 144, 'expense_id' => 46, 'player_id' => 30, 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 145, 'expense_id' => 46, 'player_id' => 20, 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 146, 'expense_id' => 47, 'player_id' => 18, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 147, 'expense_id' => 47, 'player_id' => 37, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 148, 'expense_id' => 47, 'player_id' => 66, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 149, 'expense_id' => 47, 'player_id' => 25, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 150, 'expense_id' => 47, 'player_id' => 16, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 151, 'expense_id' => 47, 'player_id' => 21, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 152, 'expense_id' => 47, 'player_id' => 6, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 153, 'expense_id' => 47, 'player_id' => 4, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 154, 'expense_id' => 47, 'player_id' => 29, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 155, 'expense_id' => 47, 'player_id' => 15, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 156, 'expense_id' => 47, 'player_id' => 5, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 157, 'expense_id' => 47, 'player_id' => 22, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 158, 'expense_id' => 47, 'player_id' => 28, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 159, 'expense_id' => 47, 'player_id' => 7, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 160, 'expense_id' => 47, 'player_id' => 1, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 161, 'expense_id' => 47, 'player_id' => 27, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 162, 'expense_id' => 47, 'player_id' => 2, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 163, 'expense_id' => 47, 'player_id' => 12, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 164, 'expense_id' => 47, 'player_id' => 30, 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
        ], ['id']);
    }
}
