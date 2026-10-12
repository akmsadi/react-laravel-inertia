<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExpenseSeeder extends Seeder
{
    /**
     * Seed the expenses. A null match means a general club expense. Requires matches.
     */
    public function run(): void
    {
        DB::table('expenses')->upsert([
            ['id' => 2, 'match_id' => 3, 'title' => 'Match fee', 'amount' => 2000, 'notes' => 'Field rent', 'created_at' => '2026-06-08 00:54:24', 'updated_at' => '2026-06-08 00:54:24'],
            ['id' => 3, 'match_id' => 3, 'title' => 'Banana', 'amount' => 280, 'notes' => 'innings break snack', 'created_at' => '2026-06-08 00:54:45', 'updated_at' => '2026-06-08 00:54:45'],
            ['id' => 4, 'match_id' => 3, 'title' => 'Bread', 'amount' => 390, 'notes' => 'innings break snack', 'created_at' => '2026-06-08 00:54:56', 'updated_at' => '2026-06-08 00:54:56'],
            ['id' => 5, 'match_id' => 3, 'title' => 'Water', 'amount' => 240, 'notes' => null, 'created_at' => '2026-06-08 00:55:05', 'updated_at' => '2026-06-08 00:55:05'],
            ['id' => 6, 'match_id' => 9, 'title' => 'Field rent', 'amount' => 3200, 'notes' => null, 'created_at' => '2026-06-25 17:06:21', 'updated_at' => '2026-06-25 17:06:21'],
            ['id' => 7, 'match_id' => 9, 'title' => 'Water', 'amount' => 150, 'notes' => null, 'created_at' => '2026-06-25 17:06:28', 'updated_at' => '2026-06-25 17:06:28'],
            ['id' => 8, 'match_id' => 4, 'title' => 'Field rent', 'amount' => 2000, 'notes' => null, 'created_at' => '2026-06-25 17:08:13', 'updated_at' => '2026-06-25 17:08:13'],
            ['id' => 9, 'match_id' => 4, 'title' => 'Water + Banana', 'amount' => 930, 'notes' => null, 'created_at' => '2026-06-25 17:08:32', 'updated_at' => '2026-06-25 17:08:32'],
            ['id' => 10, 'match_id' => 10, 'title' => 'Field rent', 'amount' => 3800, 'notes' => null, 'created_at' => '2026-06-25 19:07:24', 'updated_at' => '2026-06-25 19:07:24'],
            ['id' => 11, 'match_id' => 11, 'title' => 'Snacks', 'amount' => 1180, 'notes' => null, 'created_at' => '2026-06-25 19:12:43', 'updated_at' => '2026-06-25 19:12:43'],
            ['id' => 12, 'match_id' => 12, 'title' => 'Field rent', 'amount' => 3380, 'notes' => null, 'created_at' => '2026-06-25 19:18:02', 'updated_at' => '2026-06-25 19:18:02'],
            ['id' => 13, 'match_id' => 13, 'title' => 'Snacks', 'amount' => 750, 'notes' => null, 'created_at' => '2026-06-25 19:22:12', 'updated_at' => '2026-06-25 19:22:12'],
            ['id' => 14, 'match_id' => 14, 'title' => 'Field rent', 'amount' => 1380, 'notes' => null, 'created_at' => '2026-06-25 19:26:16', 'updated_at' => '2026-06-25 19:26:16'],
            ['id' => 15, 'match_id' => 15, 'title' => 'Field rent', 'amount' => 2180, 'notes' => null, 'created_at' => '2026-06-25 19:28:32', 'updated_at' => '2026-06-25 19:28:32'],
            ['id' => 16, 'match_id' => 5, 'title' => 'Field rent', 'amount' => 4100, 'notes' => null, 'created_at' => '2026-06-25 19:37:31', 'updated_at' => '2026-06-25 19:37:31'],
            ['id' => 17, 'match_id' => 6, 'title' => 'Field rent', 'amount' => 3550, 'notes' => null, 'created_at' => '2026-06-25 19:40:09', 'updated_at' => '2026-06-25 19:40:09'],
            ['id' => 18, 'match_id' => 7, 'title' => 'Field rent', 'amount' => 1880, 'notes' => null, 'created_at' => '2026-06-25 19:42:00', 'updated_at' => '2026-06-25 19:42:00'],
            ['id' => 19, 'match_id' => 16, 'title' => 'Field rent', 'amount' => 1000, 'notes' => 'Opponent shared 1k', 'created_at' => '2026-06-28 22:32:06', 'updated_at' => '2026-06-28 22:32:06'],
            ['id' => 20, 'match_id' => 16, 'title' => 'Water', 'amount' => 400, 'notes' => null, 'created_at' => '2026-06-28 22:32:22', 'updated_at' => '2026-06-28 22:32:22'],
            ['id' => 21, 'match_id' => 16, 'title' => 'Banana', 'amount' => 400, 'notes' => null, 'created_at' => '2026-06-28 22:32:31', 'updated_at' => '2026-06-28 22:32:31'],
            ['id' => 22, 'match_id' => 16, 'title' => 'Bread', 'amount' => 360, 'notes' => null, 'created_at' => '2026-06-28 22:32:41', 'updated_at' => '2026-06-28 22:32:41'],
            ['id' => 23, 'match_id' => 17, 'title' => 'Field rent', 'amount' => 2000, 'notes' => null, 'created_at' => '2026-06-28 22:34:20', 'updated_at' => '2026-06-28 22:34:20'],
            ['id' => 24, 'match_id' => 17, 'title' => 'Water', 'amount' => 440, 'notes' => null, 'created_at' => '2026-06-28 22:34:29', 'updated_at' => '2026-06-28 22:34:29'],
            ['id' => 25, 'match_id' => 17, 'title' => 'Banana', 'amount' => 400, 'notes' => null, 'created_at' => '2026-06-28 22:34:40', 'updated_at' => '2026-06-28 22:34:40'],
            ['id' => 26, 'match_id' => 17, 'title' => 'Singara', 'amount' => 290, 'notes' => null, 'created_at' => '2026-06-28 22:34:55', 'updated_at' => '2026-06-28 22:34:55'],
            ['id' => 27, 'match_id' => null, 'title' => 'Accessories', 'amount' => 1350, 'notes' => '3 Dunlop balls, 3 CA balls, 12 tapes', 'created_at' => '2026-06-28 22:53:54', 'updated_at' => '2026-06-28 23:14:05'],
            ['id' => 30, 'match_id' => 19, 'title' => 'Field rent + Water', 'amount' => 2900, 'notes' => null, 'created_at' => '2026-07-16 18:45:38', 'updated_at' => '2026-07-16 18:45:38'],
            ['id' => 31, 'match_id' => 21, 'title' => 'Field rent', 'amount' => 2400, 'notes' => null, 'created_at' => '2026-07-16 18:49:08', 'updated_at' => '2026-07-16 18:49:08'],
            ['id' => 32, 'match_id' => 21, 'title' => 'Water', 'amount' => 110, 'notes' => null, 'created_at' => '2026-07-16 18:49:15', 'updated_at' => '2026-07-16 18:49:15'],
            ['id' => 34, 'match_id' => 22, 'title' => 'Field rent', 'amount' => 1600, 'notes' => null, 'created_at' => '2026-07-16 19:02:23', 'updated_at' => '2026-07-16 19:02:23'],
            ['id' => 35, 'match_id' => 22, 'title' => 'Water', 'amount' => 120, 'notes' => null, 'created_at' => '2026-07-16 19:02:30', 'updated_at' => '2026-07-16 19:02:30'],
            ['id' => 36, 'match_id' => 23, 'title' => 'Field rent + Water', 'amount' => 3310, 'notes' => null, 'created_at' => '2026-07-25 14:34:22', 'updated_at' => '2026-07-25 14:34:22'],
            ['id' => 37, 'match_id' => 24, 'title' => 'Field rent + Water', 'amount' => 2550, 'notes' => null, 'created_at' => '2026-07-28 13:38:14', 'updated_at' => '2026-07-28 13:38:14'],
            ['id' => 38, 'match_id' => 25, 'title' => 'Field rent + Water', 'amount' => 2040, 'notes' => null, 'created_at' => '2026-08-02 12:26:22', 'updated_at' => '2026-08-02 12:26:22'],
            ['id' => 39, 'match_id' => 26, 'title' => 'Field rent + Water', 'amount' => 3640, 'notes' => null, 'created_at' => '2026-08-02 12:28:35', 'updated_at' => '2026-08-02 12:28:35'],
            ['id' => 40, 'match_id' => 27, 'title' => 'Field rent + Water', 'amount' => 3300, 'notes' => null, 'created_at' => '2026-08-07 13:37:42', 'updated_at' => '2026-08-07 13:37:42'],
            ['id' => 41, 'match_id' => 29, 'title' => 'Field rent', 'amount' => 1700, 'notes' => null, 'created_at' => '2026-08-07 13:44:49', 'updated_at' => '2026-08-07 13:44:49'],
            ['id' => 42, 'match_id' => 30, 'title' => 'Field rent + Water', 'amount' => 4490, 'notes' => null, 'created_at' => '2026-08-10 13:04:50', 'updated_at' => '2026-08-10 13:04:50'],
            ['id' => 43, 'match_id' => 32, 'title' => 'Field rent + Water', 'amount' => 2080, 'notes' => null, 'created_at' => '2026-08-20 13:04:41', 'updated_at' => '2026-08-20 13:04:41'],
            ['id' => 45, 'match_id' => 31, 'title' => 'Field rent', 'amount' => 1800, 'notes' => null, 'created_at' => '2026-08-20 13:07:30', 'updated_at' => '2026-08-20 13:07:30'],
            ['id' => 46, 'match_id' => null, 'title' => 'Football', 'amount' => 4700, 'notes' => "Aprons: 20 × 125 = Tk 2,500\r\nReferee Whistle = Tk 100\r\nGoalkeeper Gloves: 2 × 600 = Tk 1,200\r\nFootball = Tk 900", 'created_at' => '2026-08-20 15:08:21', 'updated_at' => '2026-08-20 15:08:21'],
            ['id' => 47, 'match_id' => null, 'title' => 'Cricket', 'amount' => 1174, 'notes' => "2 Bat Repairs (including grips) = Tk 850\r\nCricket Ball Tape = Tk 324", 'created_at' => '2026-08-20 15:10:51', 'updated_at' => '2026-08-20 15:10:51'],
            ['id' => 48, 'match_id' => 33, 'title' => 'Field rent + Water', 'amount' => 1770, 'notes' => null, 'created_at' => '2026-08-20 15:17:23', 'updated_at' => '2026-08-20 15:17:23'],
        ], ['id']);
    }
}
