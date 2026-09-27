<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('match_summary_extras', function (Blueprint $table) {
            $table->unsignedInteger('id')->primary();
            $table->unsignedBigInteger('match_id');
            $table->tinyInteger('innings_number');
            $table->unsignedInteger('byes')->default(0);
            $table->unsignedInteger('leg_byes')->default(0);
            $table->unsignedInteger('wides')->default(0);
            $table->unsignedInteger('no_balls')->default(0);
            $table->timestamps();

            $table->unique(['match_id', 'innings_number']);
            $table->foreign('match_id')->references('id')->on('matches')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('match_summary_extras');
    }
};