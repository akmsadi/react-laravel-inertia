<?php

namespace Database\Seeders;

use App\Models\Matches;
use App\Models\Venue;
use Illuminate\Database\Seeder;

class MatchSeeder extends Seeder
{
    public function run(): void
    {
        $homeGround = Venue::updateOrCreate([
            'name' => 'Evergreen Oval',
        ]);

        $cityGround = Venue::updateOrCreate([
            'name' => 'City Sports Ground',
        ]);

        $matches = [
            [
                'scheduled_at' => now()->addDays(4)->setTime(10, 30),
                'team_name' => 'Evergreen XI',
                'opponent_name' => 'Riverside Cricket Club',
                'venue_id' => $homeGround->id,
                'match_status' => 'scheduled',
                'result_type' => null,
                'result_summary' => null,
                'notes' => 'League fixture. Gates open at 9:30 AM.',
            ],
            [
                'scheduled_at' => now()->subDays(4)->setTime(10, 30),
                'team_name' => 'Evergreen XI',
                'opponent_name' => 'Northside Strikers',
                'venue_id' => $homeGround->id,
                'match_status' => 'completed',
                'result_type' => 'win',
                'result_summary' => 'Evergreen XI won by 48 runs',
                'notes' => 'Player of the match: Arjun Patel',
            ],
            [
                'scheduled_at' => now()->subDays(11)->setTime(14, 0),
                'team_name' => 'Evergreen XI',
                'opponent_name' => 'Harbour Warriors',
                'venue_id' => $cityGround->id,
                'match_status' => 'completed',
                'result_type' => 'win',
                'result_summary' => 'Evergreen XI won by 6 wickets',
                'notes' => 'A composed chase under evening lights.',
            ],
            [
                'scheduled_at' => now()->subDays(18)->setTime(10, 30),
                'team_name' => 'Evergreen XI',
                'opponent_name' => 'Lakeside Lions',
                'venue_id' => $homeGround->id,
                'match_status' => 'completed',
                'result_type' => 'loss',
                'result_summary' => 'Lakeside Lions won by 12 runs',
                'notes' => 'A close contest decided in the final over.',
            ],
            [
                'scheduled_at' => now()->subDays(25)->setTime(14, 0),
                'team_name' => 'Evergreen XI',
                'opponent_name' => 'West End Royals',
                'venue_id' => $cityGround->id,
                'match_status' => 'completed',
                'result_type' => 'draw',
                'result_summary' => 'Match drawn after rain interruption',
                'notes' => 'Both teams shared the points.',
            ],
        ];

        foreach ($matches as $match) {
            Matches::updateOrCreate(
                [
                    'scheduled_at' => $match['scheduled_at'],
                    'team_name' => $match['team_name'],
                    'opponent_name' => $match['opponent_name'],
                ],
                [
                    'match_type' => 'limited_overs',
                    'format_overs' => 20,
                    'venue_id' => $match['venue_id'],
                    'match_status' => $match['match_status'],
                    'result_type' => $match['result_type'],
                    'result_summary' => $match['result_summary'],
                    'notes' => $match['notes'],
                ],
            );
        }
    }
}
