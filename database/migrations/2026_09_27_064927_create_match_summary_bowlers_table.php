<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('match_summary_bowlers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('match_id');
            $table->unsignedInteger('innings_number');
            $table->integer('sort_order')->default(0);
            $table->unsignedBigInteger('player_id');
            $table->decimal('overs', 5, 1)->default(0.0);
            $table->unsignedInteger('maidens')->default(0);
            $table->unsignedInteger('runs')->default(0);
            $table->unsignedInteger('wickets')->default(0);
            $table->timestamps();

            $table->foreign('match_id')->references('id')->on('matches')->onDelete('cascade');
            $table->foreign('player_id')->references('id')->on('players')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('match_summary_bowlers');
    }
};