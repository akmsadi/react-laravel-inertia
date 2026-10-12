<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamSeeder extends Seeder
{
    /**
     * Seed the application's teams. Requires the captain and vice-captain players to exist.
     */
    public function run(): void
    {
        DB::table('teams')->upsert([
            [
                'id' => 1,
                'name' => 'ALIZA strike force',
                'slug' => 'aliza-strike-force',
                'slogan' => 'Fearless • United • Champions',
                'about' => "Built on passion, discipline and teamwork. Every season our goal is to play competitive cricket while creating a family atmosphere for every player.\r\n\r\nOur squad combines experienced players with young talents, helping everyone improve and enjoy the game.",
                'logo' => '1782041872_c605358681890804c92b.jpeg',
                'banner' => '1782041892_c605358681890804c92b.jpeg',
                'established' => 2026,
                'matches' => 4,
                'wins' => 4,
                'titles' => 1,
                'captain_id' => 18,
                'vice_captain_id' => 22,
                'is_external' => 0,
                'created_at' => '2026-06-21 17:37:52',
                'updated_at' => '2026-07-22 16:49:23',
            ],
            [
                'id' => 2,
                'name' => 'W-WARRIORS sports team',
                'slug' => 'wolverine-warriors',
                'slogan' => 'Strength • Spirit • Success',
                'about' => "Driven by determination and teamwork, W-WARRIORS sports team competes with passion in every match. \r\nOur experienced leaders and emerging young talents work together to build a winning culture while inspiring each other to reach new heights both individually and as a team.",
                'logo' => '1782041929_4406105703cd38a3f758.jpeg',
                'banner' => '1782041949_4406105703cd38a3f758.jpeg',
                'established' => 2026,
                'matches' => 4,
                'wins' => 3,
                'titles' => 1,
                'captain_id' => 16,
                'vice_captain_id' => 15,
                'is_external' => 0,
                'created_at' => '2026-06-21 17:38:49',
                'updated_at' => '2026-07-22 17:27:56',
            ],
            [
                'id' => 3,
                'name' => 'V-BOLD sports team',
                'slug' => 'v-bold',
                'slogan' => 'United • Determined • Unstoppable',
                'about' => "Every journey begins with a dream, and V-BOLD sports team was built on the belief that dedication and unity create champions. \r\n\r\nWe embrace every challenge, celebrate every success, and continue to grow together as one team with one vision.",
                'logo' => '1782041944_c121d9ddd6cb5cae9467.jpeg',
                'banner' => '1782041964_c121d9ddd6cb5cae9467.jpeg',
                'established' => 2026,
                'matches' => 4,
                'wins' => 1,
                'titles' => 0,
                'captain_id' => 1,
                'vice_captain_id' => 2,
                'is_external' => 0,
                'created_at' => '2026-06-21 17:39:04',
                'updated_at' => '2026-07-22 17:25:47',
            ],
            [
                'id' => 4,
                'name' => 'Wicket wizards AVANTA',
                'slug' => 'avanta-wizards',
                'slogan' => 'Passion • Precision • Victory',
                'about' => "Founded on the values of commitment, discipline, and respect, Wicket wizards AVANTA is dedicated to playing fearless cricket while nurturing the next generation of talent. \r\n\r\nWe believe success is earned through teamwork, perseverance, and an unwavering passion for the game.",
                'logo' => '1782041968_5f205a5565172c013c9f.jpeg',
                'banner' => '1782041988_5f205a5565172c013c9f.jpeg',
                'established' => 2026,
                'matches' => 3,
                'wins' => 0,
                'titles' => 0,
                'captain_id' => 6,
                'vice_captain_id' => 5,
                'is_external' => 0,
                'created_at' => '2026-06-21 17:39:28',
                'updated_at' => '2026-07-22 17:40:31',
            ],
        ], ['id']);
    }
}
