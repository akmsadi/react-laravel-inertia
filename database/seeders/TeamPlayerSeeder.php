<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamPlayerSeeder extends Seeder
{
    /**
     * Seed the team rosters. Requires teams and players.
     */
    public function run(): void
    {
        DB::table('team_players')->upsert([
            ['id' => 1, 'team_id' => 1, 'player_id' => 18, 'name' => '', 'created_at' => '2026-06-21 17:44:27', 'updated_at' => '2026-07-22 12:26:33'],
            ['id' => 2, 'team_id' => 3, 'player_id' => 19, 'name' => '', 'created_at' => '2026-06-21 17:45:00', 'updated_at' => '2026-07-22 12:32:11'],
            ['id' => 3, 'team_id' => 2, 'player_id' => 10, 'name' => '', 'created_at' => '2026-06-21 17:45:12', 'updated_at' => '2026-07-22 12:28:45'],
            ['id' => 4, 'team_id' => 4, 'player_id' => 6, 'name' => '', 'created_at' => '2026-06-21 17:45:20', 'updated_at' => '2026-07-22 12:30:56'],
            ['id' => 5, 'team_id' => 1, 'player_id' => 29, 'name' => '', 'created_at' => '2026-06-27 22:23:45', 'updated_at' => '2026-07-22 12:26:51'],
            ['id' => 6, 'team_id' => 1, 'player_id' => 9, 'name' => '', 'created_at' => '2026-06-27 22:23:56', 'updated_at' => '2026-07-22 12:27:19'],
            ['id' => 7, 'team_id' => 1, 'player_id' => 21, 'name' => '', 'created_at' => '2026-06-27 22:24:16', 'updated_at' => '2026-07-22 12:27:43'],
            ['id' => 8, 'team_id' => 1, 'player_id' => null, 'name' => 'Rocky', 'created_at' => '2026-06-27 22:24:28', 'updated_at' => '2026-06-27 22:24:28'],
            ['id' => 9, 'team_id' => 1, 'player_id' => null, 'name' => 'Evan', 'created_at' => '2026-06-27 22:24:33', 'updated_at' => '2026-06-27 22:24:33'],
            ['id' => 10, 'team_id' => 1, 'player_id' => null, 'name' => 'Motin', 'created_at' => '2026-06-27 22:24:38', 'updated_at' => '2026-06-27 22:24:38'],
            ['id' => 11, 'team_id' => 1, 'player_id' => 22, 'name' => '', 'created_at' => '2026-06-27 22:26:45', 'updated_at' => '2026-07-22 12:27:58'],
            ['id' => 12, 'team_id' => 3, 'player_id' => 25, 'name' => '', 'created_at' => '2026-06-27 22:27:16', 'updated_at' => '2026-07-22 12:32:19'],
            ['id' => 13, 'team_id' => 3, 'player_id' => 26, 'name' => '', 'created_at' => '2026-06-27 22:27:19', 'updated_at' => '2026-07-22 12:32:27'],
            ['id' => 14, 'team_id' => 3, 'player_id' => 4, 'name' => '', 'created_at' => '2026-06-27 22:27:29', 'updated_at' => '2026-07-22 12:32:38'],
            ['id' => 15, 'team_id' => 3, 'player_id' => 3, 'name' => '', 'created_at' => '2026-06-27 22:27:35', 'updated_at' => '2026-07-22 12:32:51'],
            ['id' => 16, 'team_id' => 3, 'player_id' => 28, 'name' => '', 'created_at' => '2026-06-27 22:27:44', 'updated_at' => '2026-07-22 12:33:03'],
            ['id' => 17, 'team_id' => 3, 'player_id' => 1, 'name' => '', 'created_at' => '2026-06-27 22:27:50', 'updated_at' => '2026-07-22 12:33:14'],
            ['id' => 18, 'team_id' => 3, 'player_id' => 27, 'name' => '', 'created_at' => '2026-06-27 22:27:59', 'updated_at' => '2026-07-22 12:33:23'],
            ['id' => 19, 'team_id' => 3, 'player_id' => 2, 'name' => '', 'created_at' => '2026-06-27 22:28:10', 'updated_at' => '2026-07-22 12:33:33'],
            ['id' => 20, 'team_id' => 2, 'player_id' => 16, 'name' => '', 'created_at' => '2026-06-27 22:28:30', 'updated_at' => '2026-07-22 12:28:54'],
            ['id' => 21, 'team_id' => 2, 'player_id' => 23, 'name' => '', 'created_at' => '2026-06-27 22:28:42', 'updated_at' => '2026-07-22 12:29:09'],
            ['id' => 22, 'team_id' => 2, 'player_id' => 13, 'name' => '', 'created_at' => '2026-06-27 22:28:49', 'updated_at' => '2026-07-22 12:29:19'],
            ['id' => 23, 'team_id' => 2, 'player_id' => 12, 'name' => '', 'created_at' => '2026-06-27 22:28:58', 'updated_at' => '2026-07-22 12:29:29'],
            ['id' => 24, 'team_id' => 2, 'player_id' => 15, 'name' => '', 'created_at' => '2026-06-27 22:29:09', 'updated_at' => '2026-07-22 12:29:35'],
            ['id' => 25, 'team_id' => 4, 'player_id' => 5, 'name' => '', 'created_at' => '2026-06-27 22:30:48', 'updated_at' => '2026-07-22 12:31:07'],
            ['id' => 26, 'team_id' => 4, 'player_id' => 20, 'name' => '', 'created_at' => '2026-06-27 22:31:18', 'updated_at' => '2026-07-22 12:31:42'],
            ['id' => 27, 'team_id' => 1, 'player_id' => null, 'name' => 'Roni', 'created_at' => '2026-07-22 12:26:09', 'updated_at' => '2026-07-22 12:26:09'],
            ['id' => 28, 'team_id' => 2, 'player_id' => 14, 'name' => '', 'created_at' => '2026-07-22 12:29:55', 'updated_at' => '2026-07-22 12:29:55'],
            ['id' => 29, 'team_id' => 2, 'player_id' => 11, 'name' => '', 'created_at' => '2026-07-22 12:30:16', 'updated_at' => '2026-07-22 12:30:16'],
            ['id' => 30, 'team_id' => 2, 'player_id' => 7, 'name' => '', 'created_at' => '2026-07-22 12:30:41', 'updated_at' => '2026-07-22 12:30:41'],
            ['id' => 31, 'team_id' => 4, 'player_id' => null, 'name' => 'Rabbi', 'created_at' => '2026-07-22 17:46:40', 'updated_at' => '2026-07-22 17:46:40'],
            ['id' => 32, 'team_id' => 4, 'player_id' => null, 'name' => 'Amdad', 'created_at' => '2026-07-22 17:46:47', 'updated_at' => '2026-07-22 17:46:47'],
            ['id' => 33, 'team_id' => 4, 'player_id' => null, 'name' => 'Parvez', 'created_at' => '2026-07-22 17:46:54', 'updated_at' => '2026-07-22 17:46:54'],
            ['id' => 34, 'team_id' => 4, 'player_id' => null, 'name' => 'Mohsin', 'created_at' => '2026-07-22 17:47:00', 'updated_at' => '2026-07-22 17:47:00'],
            ['id' => 35, 'team_id' => 4, 'player_id' => null, 'name' => 'Ashraf', 'created_at' => '2026-07-22 17:47:07', 'updated_at' => '2026-07-22 17:47:07'],
            ['id' => 36, 'team_id' => 4, 'player_id' => null, 'name' => 'Shamim', 'created_at' => '2026-07-22 17:47:13', 'updated_at' => '2026-07-22 17:47:13'],
        ], ['id']);
    }
}
