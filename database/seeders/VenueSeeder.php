<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VenueSeeder extends Seeder
{
    /**
     * Seed the application's venues. Ids are fixed because matches reference them.
     */
    public function run(): void
    {
        $venues = [
            5 => 'BKSP',
            8 => 'Chottoground',
            9 => 'PHP',
            10 => 'KEPZ',
            11 => 'Moijjartek',
            12 => 'Fortune Sports Arena',
            13 => 'Bali Arcade',
            14 => 'ATW Khulshi',
            15 => 'Bakolia, Stadium',
            16 => 'Railway Pologround',
        ];

        DB::table('venues')->upsert(
            collect($venues)->map(fn (string $name, int $id): array => [
                'id' => $id,
                'name' => $name,
                'created_at' => now(),
                'updated_at' => now(),
            ])->values()->all(),
            ['id'],
            ['name', 'updated_at'],
        );
    }
}
