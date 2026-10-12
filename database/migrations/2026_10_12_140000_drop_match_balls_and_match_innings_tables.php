<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('match_balls');
        Schema::dropIfExists('match_innings');
    }

    public function down(): void
    {
        // The dropped tables are intentionally not recreated.
    }
};
