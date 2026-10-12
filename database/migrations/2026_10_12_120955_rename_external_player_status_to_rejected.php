<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('players')->where('status', 'external')->update(['status' => 'rejected']);
    }

    public function down(): void
    {
        DB::table('players')->where('status', 'rejected')->update(['status' => 'external']);
    }
};
