<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MatchSummaryExtraSeeder extends Seeder
{
    /**
     * Seed the extras (byes, leg byes, wides, no balls) per innings. Requires matches.
     */
    public function run(): void
    {
        DB::table('match_summary_extras')->upsert([
            ['id' => 1, 'match_id' => 4, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 13, 'no_balls' => 4, 'created_at' => '2026-06-25 00:48:07', 'updated_at' => '2026-06-25 00:48:07'],
            ['id' => 2, 'match_id' => 4, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 28, 'no_balls' => 3, 'created_at' => '2026-06-25 00:48:43', 'updated_at' => '2026-06-25 00:48:43'],
            ['id' => 4, 'match_id' => 3, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 11, 'no_balls' => 4, 'created_at' => '2026-06-25 12:25:52', 'updated_at' => '2026-06-25 12:25:52'],
            ['id' => 6, 'match_id' => 3, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 15, 'no_balls' => 1, 'created_at' => '2026-06-25 12:33:47', 'updated_at' => '2026-06-25 12:33:47'],
            ['id' => 8, 'match_id' => 6, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 19, 'no_balls' => 1, 'created_at' => '2026-06-25 12:53:48', 'updated_at' => '2026-06-25 12:53:48'],
            ['id' => 10, 'match_id' => 6, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 28, 'no_balls' => 4, 'created_at' => '2026-06-25 13:03:23', 'updated_at' => '2026-06-25 13:03:23'],
            ['id' => 14, 'match_id' => 7, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 6, 'no_balls' => 0, 'created_at' => '2026-06-25 13:33:24', 'updated_at' => '2026-06-25 13:33:24'],
            ['id' => 15, 'match_id' => 5, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 14, 'no_balls' => 2, 'created_at' => '2026-06-25 13:47:30', 'updated_at' => '2026-06-25 13:47:30'],
            ['id' => 16, 'match_id' => 16, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 22, 'no_balls' => 12, 'created_at' => '2026-06-26 15:06:38', 'updated_at' => '2026-06-26 15:06:38'],
            ['id' => 19, 'match_id' => 16, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 15, 'no_balls' => 6, 'created_at' => '2026-06-26 15:32:40', 'updated_at' => '2026-06-26 15:32:40'],
            ['id' => 22, 'match_id' => 17, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 19, 'no_balls' => 3, 'created_at' => '2026-06-27 19:02:20', 'updated_at' => '2026-06-27 19:02:20'],
            ['id' => 23, 'match_id' => 17, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 28, 'no_balls' => 2, 'created_at' => '2026-06-27 19:14:59', 'updated_at' => '2026-06-27 19:14:59'],
            ['id' => 26, 'match_id' => 18, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 9, 'no_balls' => 1, 'created_at' => '2026-06-27 19:29:40', 'updated_at' => '2026-06-27 19:29:40'],
            ['id' => 47, 'match_id' => 20, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 1, 'no_balls' => 0, 'created_at' => '2026-07-09 19:28:05', 'updated_at' => '2026-07-09 19:28:05'],
            ['id' => 48, 'match_id' => 20, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 8, 'no_balls' => 3, 'created_at' => '2026-07-09 19:34:38', 'updated_at' => '2026-07-09 19:34:38'],
            ['id' => 54, 'match_id' => 19, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 13, 'no_balls' => 2, 'created_at' => '2026-07-09 19:55:38', 'updated_at' => '2026-07-09 19:55:38'],
            ['id' => 55, 'match_id' => 19, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 16, 'no_balls' => 2, 'created_at' => '2026-07-09 20:04:26', 'updated_at' => '2026-07-09 20:04:26'],
            ['id' => 58, 'match_id' => 18, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 12, 'no_balls' => 0, 'created_at' => '2026-07-09 20:19:08', 'updated_at' => '2026-07-09 20:19:08'],
            ['id' => 62, 'match_id' => 21, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 9, 'no_balls' => 0, 'created_at' => '2026-07-11 22:23:25', 'updated_at' => '2026-07-11 22:23:25'],
            ['id' => 64, 'match_id' => 23, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 11, 'no_balls' => 5, 'created_at' => '2026-07-18 15:40:29', 'updated_at' => '2026-07-18 15:40:29'],
            ['id' => 65, 'match_id' => 23, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 23, 'no_balls' => 2, 'created_at' => '2026-07-18 15:52:10', 'updated_at' => '2026-07-18 15:52:10'],
            ['id' => 67, 'match_id' => 24, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 8, 'no_balls' => 0, 'created_at' => '2026-07-25 13:17:51', 'updated_at' => '2026-07-25 13:17:51'],
            ['id' => 70, 'match_id' => 24, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 9, 'no_balls' => 0, 'created_at' => '2026-07-25 13:48:30', 'updated_at' => '2026-07-25 13:48:30'],
            ['id' => 71, 'match_id' => 26, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 9, 'no_balls' => 1, 'created_at' => '2026-08-01 20:17:54', 'updated_at' => '2026-08-01 20:17:54'],
            ['id' => 72, 'match_id' => 26, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 7, 'no_balls' => 1, 'created_at' => '2026-08-01 20:21:38', 'updated_at' => '2026-08-01 20:21:38'],
            ['id' => 73, 'match_id' => 27, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 11, 'no_balls' => 1, 'created_at' => '2026-08-06 14:14:15', 'updated_at' => '2026-08-06 14:14:15'],
            ['id' => 75, 'match_id' => 27, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 13, 'no_balls' => 2, 'created_at' => '2026-08-06 14:23:28', 'updated_at' => '2026-08-06 14:23:28'],
            ['id' => 76, 'match_id' => 28, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 4, 'no_balls' => 3, 'created_at' => '2026-08-06 14:35:51', 'updated_at' => '2026-08-06 14:35:51'],
            ['id' => 77, 'match_id' => 28, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 4, 'no_balls' => 0, 'created_at' => '2026-08-06 14:38:14', 'updated_at' => '2026-08-06 14:38:14'],
            ['id' => 78, 'match_id' => 30, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 10, 'no_balls' => 4, 'created_at' => '2026-08-08 16:29:11', 'updated_at' => '2026-08-08 16:29:11'],
            ['id' => 80, 'match_id' => 30, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 3, 'no_balls' => 2, 'created_at' => '2026-08-08 19:15:24', 'updated_at' => '2026-08-08 19:15:24'],
            ['id' => 82, 'match_id' => 21, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 6, 'no_balls' => 1, 'created_at' => '2026-08-10 14:33:53', 'updated_at' => '2026-08-10 14:33:53'],
            ['id' => 84, 'match_id' => 31, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 14, 'no_balls' => 3, 'created_at' => '2026-08-16 14:44:34', 'updated_at' => '2026-08-16 14:44:34'],
            ['id' => 85, 'match_id' => 31, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 23, 'no_balls' => 2, 'created_at' => '2026-08-16 14:50:38', 'updated_at' => '2026-08-16 14:50:38'],
            ['id' => 86, 'match_id' => 5, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 21, 'no_balls' => 1, 'created_at' => '2026-08-17 13:52:39', 'updated_at' => '2026-08-17 13:52:39'],
            ['id' => 87, 'match_id' => 34, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 8, 'no_balls' => 1, 'created_at' => '2026-08-23 13:29:57', 'updated_at' => '2026-08-23 13:29:57'],
            ['id' => 89, 'match_id' => 34, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 12, 'no_balls' => 3, 'created_at' => '2026-08-23 13:35:21', 'updated_at' => '2026-08-23 13:35:21'],
            ['id' => 90, 'match_id' => 35, 'innings_number' => 1, 'byes' => 2, 'leg_byes' => 9, 'wides' => 17, 'no_balls' => 7, 'created_at' => '2026-08-27 12:12:18', 'updated_at' => '2026-08-27 12:12:18'],
            ['id' => 92, 'match_id' => 35, 'innings_number' => 2, 'byes' => 1, 'leg_byes' => 0, 'wides' => 26, 'no_balls' => 2, 'created_at' => '2026-08-27 12:23:35', 'updated_at' => '2026-08-27 12:23:35'],
            ['id' => 95, 'match_id' => 36, 'innings_number' => 2, 'byes' => 7, 'leg_byes' => 0, 'wides' => 28, 'no_balls' => 5, 'created_at' => '2026-08-30 14:20:40', 'updated_at' => '2026-08-30 14:20:40'],
            ['id' => 96, 'match_id' => 36, 'innings_number' => 1, 'byes' => 5, 'leg_byes' => 2, 'wides' => 10, 'no_balls' => 4, 'created_at' => '2026-08-30 14:26:24', 'updated_at' => '2026-08-30 14:26:24'],
            ['id' => 100, 'match_id' => 37, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 10, 'no_balls' => 1, 'created_at' => '2026-09-05 15:18:11', 'updated_at' => '2026-09-05 15:18:11'],
            ['id' => 103, 'match_id' => 37, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 11, 'no_balls' => 2, 'created_at' => '2026-09-05 15:27:56', 'updated_at' => '2026-09-05 15:27:56'],
            ['id' => 104, 'match_id' => 38, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 22, 'no_balls' => 2, 'created_at' => '2026-09-13 11:34:31', 'updated_at' => '2026-09-13 11:34:31'],
            ['id' => 105, 'match_id' => 38, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 8, 'no_balls' => 0, 'created_at' => '2026-09-13 11:40:07', 'updated_at' => '2026-09-13 11:40:07'],
            ['id' => 109, 'match_id' => 39, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 15, 'no_balls' => 1, 'created_at' => '2026-09-20 19:21:39', 'updated_at' => '2026-09-20 19:21:39'],
            ['id' => 111, 'match_id' => 39, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 14, 'no_balls' => 2, 'created_at' => '2026-09-20 19:34:42', 'updated_at' => '2026-09-20 19:34:42'],
            ['id' => 112, 'match_id' => 40, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 2, 'no_balls' => 2, 'created_at' => '2026-09-20 19:47:50', 'updated_at' => '2026-09-20 19:47:50'],
            ['id' => 113, 'match_id' => 40, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 4, 'no_balls' => 1, 'created_at' => '2026-09-20 19:49:57', 'updated_at' => '2026-09-20 19:49:57'],
            ['id' => 115, 'match_id' => 41, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 14, 'no_balls' => 1, 'created_at' => '2026-09-27 16:06:41', 'updated_at' => '2026-09-27 16:06:41'],
            ['id' => 116, 'match_id' => 41, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 8, 'no_balls' => 3, 'created_at' => '2026-09-27 16:12:28', 'updated_at' => '2026-09-27 16:12:28'],
            ['id' => 120, 'match_id' => 42, 'innings_number' => 1, 'byes' => 4, 'leg_byes' => 1, 'wides' => 24, 'no_balls' => 4, 'created_at' => '2026-10-05 22:39:29', 'updated_at' => '2026-10-05 22:39:29'],
            ['id' => 121, 'match_id' => 42, 'innings_number' => 2, 'byes' => 1, 'leg_byes' => 1, 'wides' => 21, 'no_balls' => 7, 'created_at' => '2026-10-05 22:43:49', 'updated_at' => '2026-10-05 22:43:49'],
            ['id' => 122, 'match_id' => 43, 'innings_number' => 1, 'byes' => 0, 'leg_byes' => 0, 'wides' => 19, 'no_balls' => 1, 'created_at' => '2026-10-12 11:21:56', 'updated_at' => '2026-10-12 11:21:56'],
            ['id' => 123, 'match_id' => 43, 'innings_number' => 2, 'byes' => 0, 'leg_byes' => 0, 'wides' => 18, 'no_balls' => 3, 'created_at' => '2026-10-12 11:29:20', 'updated_at' => '2026-10-12 11:29:20'],
        ], ['id']);
    }
}
