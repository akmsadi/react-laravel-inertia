<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{
    /**
     * Seed the club events.
     */
    public function run(): void
    {
        DB::table('events')->upsert([
            ['id' => 4, 'title' => 'Sample Event', 'description' => 'Same image event for demonstration', 'created_at' => '2026-09-23 11:43:53', 'updated_at' => '2026-09-23 11:43:53'],
        ], ['id']);
    }
}
