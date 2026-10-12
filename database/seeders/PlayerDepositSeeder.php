<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlayerDepositSeeder extends Seeder
{
    /**
     * Seed the player deposits. Negative amounts are balance adjustments. Requires players.
     */
    public function run(): void
    {
        DB::table('player_deposits')->upsert([
            ['id' => 1, 'player_id' => 1, 'amount' => 1573.80, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:13:54', 'updated_at' => '2026-06-25 21:17:24'],
            ['id' => 2, 'player_id' => 2, 'amount' => 1290.03, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:19:48', 'updated_at' => '2026-06-25 21:19:48'],
            ['id' => 3, 'player_id' => 4, 'amount' => 2289.58, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:20:46', 'updated_at' => '2026-06-25 21:20:46'],
            ['id' => 4, 'player_id' => 5, 'amount' => 996.40, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:21:57', 'updated_at' => '2026-06-25 21:21:57'],
            ['id' => 5, 'player_id' => 6, 'amount' => 1044.40, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:22:45', 'updated_at' => '2026-06-25 21:22:45'],
            ['id' => 6, 'player_id' => 7, 'amount' => 1835.34, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:23:36', 'updated_at' => '2026-06-25 21:23:36'],
            ['id' => 7, 'player_id' => 8, 'amount' => 1427.22, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:24:33', 'updated_at' => '2026-06-25 21:24:33'],
            ['id' => 8, 'player_id' => 9, 'amount' => 986.53, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:25:57', 'updated_at' => '2026-06-25 21:25:57'],
            ['id' => 9, 'player_id' => 11, 'amount' => 420.90, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:26:39', 'updated_at' => '2026-06-25 21:26:39'],
            ['id' => 10, 'player_id' => 12, 'amount' => 1623.67, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:27:39', 'updated_at' => '2026-06-25 21:27:39'],
            ['id' => 11, 'player_id' => 13, 'amount' => -569.00, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:29:52', 'updated_at' => '2026-06-25 21:29:52'],
            ['id' => 12, 'player_id' => 15, 'amount' => 3022.71, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:31:45', 'updated_at' => '2026-06-25 21:31:45'],
            ['id' => 13, 'player_id' => 16, 'amount' => 2469.71, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:32:38', 'updated_at' => '2026-06-25 21:32:38'],
            ['id' => 14, 'player_id' => 18, 'amount' => 2318.71, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:33:21', 'updated_at' => '2026-06-25 21:33:21'],
            ['id' => 15, 'player_id' => 19, 'amount' => 401.62, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:34:01', 'updated_at' => '2026-06-25 21:34:01'],
            ['id' => 16, 'player_id' => 20, 'amount' => 821.84, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:36:03', 'updated_at' => '2026-06-25 21:36:03'],
            ['id' => 17, 'player_id' => 21, 'amount' => 2544.71, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:36:50', 'updated_at' => '2026-06-25 21:36:50'],
            ['id' => 18, 'player_id' => 22, 'amount' => 2833.80, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:37:38', 'updated_at' => '2026-06-25 21:37:38'],
            ['id' => 19, 'player_id' => 23, 'amount' => 38.00, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:38:02', 'updated_at' => '2026-06-25 21:38:02'],
            ['id' => 20, 'player_id' => 25, 'amount' => 572.62, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:38:37', 'updated_at' => '2026-06-25 21:38:37'],
            ['id' => 21, 'player_id' => 26, 'amount' => 521.27, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:39:06', 'updated_at' => '2026-06-25 21:39:06'],
            ['id' => 22, 'player_id' => 27, 'amount' => 2236.71, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:39:40', 'updated_at' => '2026-06-25 21:39:40'],
            ['id' => 23, 'player_id' => 28, 'amount' => 1000.67, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:40:53', 'updated_at' => '2026-06-25 21:40:53'],
            ['id' => 24, 'player_id' => 29, 'amount' => 499.67, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:41:38', 'updated_at' => '2026-06-25 21:41:38'],
            ['id' => 25, 'player_id' => 30, 'amount' => 999.98, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:42:18', 'updated_at' => '2026-06-25 21:42:18'],
            ['id' => 26, 'player_id' => 37, 'amount' => 999.87, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:43:22', 'updated_at' => '2026-06-25 21:43:22'],
            ['id' => 27, 'player_id' => 35, 'amount' => 0.18, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-25 21:47:12', 'updated_at' => '2026-06-25 21:47:12'],
            ['id' => 28, 'player_id' => 2, 'amount' => 999.00, 'notes' => null, 'created_at' => '2026-06-28 23:21:49', 'updated_at' => '2026-06-28 23:21:49'],
            ['id' => 29, 'player_id' => 12, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-06-28 23:26:31', 'updated_at' => '2026-06-28 23:26:31'],
            ['id' => 30, 'player_id' => 14, 'amount' => 27.00, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-28 23:27:14', 'updated_at' => '2026-06-28 23:27:14'],
            ['id' => 31, 'player_id' => 18, 'amount' => 1750.00, 'notes' => null, 'created_at' => '2026-06-28 23:28:09', 'updated_at' => '2026-06-28 23:29:02'],
            ['id' => 32, 'player_id' => 28, 'amount' => 1017.00, 'notes' => null, 'created_at' => '2026-06-28 23:30:52', 'updated_at' => '2026-06-28 23:30:52'],
            ['id' => 33, 'player_id' => 7, 'amount' => 289.00, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-28 23:32:42', 'updated_at' => '2026-06-28 23:33:06'],
            ['id' => 34, 'player_id' => 22, 'amount' => 239.00, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-28 23:35:12', 'updated_at' => '2026-06-28 23:39:40'],
            ['id' => 35, 'player_id' => 15, 'amount' => 199.00, 'notes' => 'Adjustment deposit', 'created_at' => '2026-06-28 23:36:25', 'updated_at' => '2026-06-28 23:36:25'],
            ['id' => 36, 'player_id' => 11, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-06-29 13:19:37', 'updated_at' => '2026-06-29 13:19:37'],
            ['id' => 37, 'player_id' => 16, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-06-30 19:14:58', 'updated_at' => '2026-06-30 19:14:58'],
            ['id' => 38, 'player_id' => 21, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-06-30 19:15:17', 'updated_at' => '2026-06-30 19:15:17'],
            ['id' => 40, 'player_id' => 27, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-07-11 21:45:55', 'updated_at' => '2026-07-11 21:45:55'],
            ['id' => 41, 'player_id' => 30, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-07-11 21:46:07', 'updated_at' => '2026-07-11 21:46:07'],
            ['id' => 42, 'player_id' => 37, 'amount' => 1018.00, 'notes' => null, 'created_at' => '2026-07-11 21:46:30', 'updated_at' => '2026-07-13 23:38:18'],
            ['id' => 43, 'player_id' => 29, 'amount' => 1500.00, 'notes' => null, 'created_at' => '2026-07-11 21:46:47', 'updated_at' => '2026-07-11 21:46:47'],
            ['id' => 44, 'player_id' => 2, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-07-13 23:38:32', 'updated_at' => '2026-07-13 23:38:32'],
            ['id' => 45, 'player_id' => 26, 'amount' => 1020.00, 'notes' => null, 'created_at' => '2026-07-14 12:30:48', 'updated_at' => '2026-07-14 12:30:48'],
            ['id' => 46, 'player_id' => 22, 'amount' => 1020.00, 'notes' => null, 'created_at' => '2026-07-14 16:20:06', 'updated_at' => '2026-07-14 16:20:19'],
            ['id' => 47, 'player_id' => 24, 'amount' => 32.00, 'notes' => 'Adjustment deposit', 'created_at' => '2026-07-16 19:06:13', 'updated_at' => '2026-07-16 19:06:13'],
            ['id' => 48, 'player_id' => 15, 'amount' => 500.00, 'notes' => null, 'created_at' => '2026-07-16 19:06:50', 'updated_at' => '2026-07-16 19:06:50'],
            ['id' => 49, 'player_id' => 21, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-07-28 13:41:22', 'updated_at' => '2026-07-28 13:41:22'],
            ['id' => 50, 'player_id' => 4, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-07-28 13:42:21', 'updated_at' => '2026-07-28 13:42:21'],
            ['id' => 51, 'player_id' => 1, 'amount' => 2000.00, 'notes' => null, 'created_at' => '2026-07-28 13:44:33', 'updated_at' => '2026-07-28 13:44:33'],
            ['id' => 52, 'player_id' => 19, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-07-28 13:45:06', 'updated_at' => '2026-07-28 13:45:06'],
            ['id' => 53, 'player_id' => 28, 'amount' => 600.00, 'notes' => null, 'created_at' => '2026-08-02 12:29:09', 'updated_at' => '2026-08-02 12:29:09'],
            ['id' => 54, 'player_id' => 7, 'amount' => 1230.00, 'notes' => null, 'created_at' => '2026-08-02 12:29:30', 'updated_at' => '2026-08-02 12:29:30'],
            ['id' => 55, 'player_id' => 27, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-08-02 12:29:40', 'updated_at' => '2026-08-02 12:29:40'],
            ['id' => 56, 'player_id' => 30, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-08-02 12:29:49', 'updated_at' => '2026-08-02 12:29:49'],
            ['id' => 57, 'player_id' => 15, 'amount' => 590.00, 'notes' => null, 'created_at' => '2026-08-02 12:30:05', 'updated_at' => '2026-08-02 12:30:05'],
            ['id' => 58, 'player_id' => 66, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-08-02 12:32:58', 'updated_at' => '2026-08-02 12:32:58'],
            ['id' => 59, 'player_id' => 29, 'amount' => 500.00, 'notes' => null, 'created_at' => '2026-08-02 12:39:42', 'updated_at' => '2026-08-02 12:39:42'],
            ['id' => 60, 'player_id' => 2, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-08-07 13:46:34', 'updated_at' => '2026-08-07 13:46:34'],
            ['id' => 61, 'player_id' => 22, 'amount' => 1018.00, 'notes' => null, 'created_at' => '2026-08-09 13:28:34', 'updated_at' => '2026-08-09 13:28:34'],
            ['id' => 62, 'player_id' => 21, 'amount' => 500.00, 'notes' => null, 'created_at' => '2026-08-09 13:28:46', 'updated_at' => '2026-08-09 13:28:46'],
            ['id' => 63, 'player_id' => 37, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-08-09 13:29:00', 'updated_at' => '2026-08-09 13:29:00'],
            ['id' => 64, 'player_id' => 12, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-08-09 13:29:15', 'updated_at' => '2026-08-09 13:29:15'],
            ['id' => 65, 'player_id' => 30, 'amount' => 200.00, 'notes' => null, 'created_at' => '2026-08-09 13:29:43', 'updated_at' => '2026-08-09 13:29:43'],
            ['id' => 66, 'player_id' => 29, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-08-17 19:52:37', 'updated_at' => '2026-08-17 19:52:37'],
            ['id' => 67, 'player_id' => 16, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-08-17 19:52:47', 'updated_at' => '2026-08-17 19:52:47'],
            ['id' => 68, 'player_id' => 27, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-08-20 12:56:05', 'updated_at' => '2026-08-20 12:56:05'],
            ['id' => 69, 'player_id' => 30, 'amount' => 500.00, 'notes' => null, 'created_at' => '2026-08-20 12:56:15', 'updated_at' => '2026-08-20 12:56:15'],
            ['id' => 70, 'player_id' => 15, 'amount' => 2000.00, 'notes' => null, 'created_at' => '2026-08-20 13:10:13', 'updated_at' => '2026-08-20 13:18:38'],
            ['id' => 71, 'player_id' => 28, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-08-20 13:11:26', 'updated_at' => '2026-08-20 13:11:26'],
            ['id' => 72, 'player_id' => 12, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-08-20 13:12:57', 'updated_at' => '2026-08-20 13:12:57'],
            ['id' => 73, 'player_id' => 20, 'amount' => 1000.00, 'notes' => null, 'created_at' => '2026-08-20 13:13:48', 'updated_at' => '2026-08-20 13:13:48'],
            ['id' => 74, 'player_id' => 18, 'amount' => 4898.00, 'notes' => null, 'created_at' => '2026-08-20 15:12:19', 'updated_at' => '2026-08-20 15:12:19'],
        ], ['id']);
    }
}
