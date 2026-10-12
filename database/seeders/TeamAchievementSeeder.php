<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamAchievementSeeder extends Seeder
{
    /**
     * Seed the team achievements. Requires teams.
     */
    public function run(): void
    {
        DB::table('team_achievements')->upsert([
            ['id' => 1, 'team_id' => 1, 'title' => 'Champion', 'description' => 'Championship Tournament 2026', 'created_at' => '2026-07-22 11:19:59', 'updated_at' => '2026-07-22 11:19:59'],
            ['id' => 2, 'team_id' => 2, 'title' => 'Runner-up', 'description' => 'Championship Tournament 2026', 'created_at' => '2026-07-22 11:32:01', 'updated_at' => '2026-07-22 11:32:01'],
        ], ['id']);
    }
}
