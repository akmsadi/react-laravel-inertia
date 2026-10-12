<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            VenueSeeder::class,
            PlayerSeeder::class,
            TeamSeeder::class,
            TeamPlayerSeeder::class,
            TeamAchievementSeeder::class,
            MatchSeeder::class,
            MatchPlayerSeeder::class,
            MatchContributorSeeder::class,
            ExpenseSeeder::class,
            ExpenseContributorSeeder::class,
            PlayerDepositSeeder::class,
            EventSeeder::class,
            EventImageSeeder::class,
            MatchSummaryBatsmanSeeder::class,
            MatchSummaryBowlerSeeder::class,
            MatchSummaryExtraSeeder::class,
            MatchSummaryWicketSeeder::class,
        ]);
    }
}
