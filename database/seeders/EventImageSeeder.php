<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventImageSeeder extends Seeder
{
    /**
     * Seed the event gallery images. Requires events.
     */
    public function run(): void
    {
        DB::table('event_images')->upsert([
            ['id' => 47, 'event_id' => 4, 'image_path' => 'assets/images/gallery/sample-event/1790142249_84e0213860b5253e085b.jpg', 'caption' => '', 'created_at' => '2026-09-23 11:44:09', 'updated_at' => '2026-09-23 11:44:09'],
            ['id' => 48, 'event_id' => 4, 'image_path' => 'assets/images/gallery/sample-event/1790142255_3698cde21ff0a01820c8.jpg', 'caption' => '', 'created_at' => '2026-09-23 11:44:15', 'updated_at' => '2026-09-23 11:44:15'],
            ['id' => 49, 'event_id' => 4, 'image_path' => 'assets/images/gallery/sample-event/1790142259_3cc728214466de17b051.jpg', 'caption' => '', 'created_at' => '2026-09-23 11:44:20', 'updated_at' => '2026-09-23 11:44:20'],
            ['id' => 50, 'event_id' => 4, 'image_path' => 'assets/images/gallery/sample-event/1790142264_603f953ed112da3168aa.jpg', 'caption' => '', 'created_at' => '2026-09-23 11:44:24', 'updated_at' => '2026-09-23 11:44:24'],
            ['id' => 51, 'event_id' => 4, 'image_path' => 'assets/images/gallery/sample-event/1790142270_54feb6ceba513aa0db49.jpg', 'caption' => '', 'created_at' => '2026-09-23 11:44:30', 'updated_at' => '2026-09-23 11:44:30'],
            ['id' => 52, 'event_id' => 4, 'image_path' => 'assets/images/gallery/sample-event/1790142274_6b33679718bcf74ac061.jpg', 'caption' => '', 'created_at' => '2026-09-23 11:44:34', 'updated_at' => '2026-09-23 11:44:34'],
        ], ['id']);
    }
}
