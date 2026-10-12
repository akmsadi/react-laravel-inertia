<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's users.
     */
    public function run(): void
    {
        DB::table('users')->upsert([
            [
                'id' => 1,
                'name' => 'Admin',
                'email' => 'admin@mypersonalwork.com',
                'email_verified_at' => '2026-10-11 08:25:37',
                'password' => '$2y$12$.ksxTGOPy7SwgZAz7jQDP.TS1f5fBylPoHOeYfO9BnruriaOeGDV.',
                'two_factor_secret' => null,
                'two_factor_recovery_codes' => null,
                'two_factor_confirmed_at' => null,
                'remember_token' => '24kLuYUrj98zM0BC77UVjArvHyHYCJtsiDQryDBEPesg34Z8HReundNp5drw',
                'created_at' => '2026-09-19 04:46:50',
                'updated_at' => '2026-10-11 02:26:21',
            ],
        ], ['id']);
    }
}
