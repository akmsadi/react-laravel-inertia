<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('match_innings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('match_id');
            $table->unsignedInteger('innings_number');
            $table->string('batting_side');
            $table->string('bowling_side');
            $table->unsignedInteger('runs')->default(0);
            $table->unsignedInteger('wickets')->default(0);
            $table->decimal('overs', 10, 0)->default(0);
            $table->unsignedInteger('balls')->default(0);
            $table->unsignedInteger('extras')->default(0);
            $table->unsignedInteger('byes')->default(0);
            $table->unsignedInteger('leg_byes')->default(0);
            $table->unsignedInteger('wides')->default(0);
            $table->unsignedInteger('no_balls')->default(0);
            $table->unsignedInteger('target_runs')->nullable();
            $table->decimal('required_run_rate', 10, 0)->nullable();
            $table->boolean('completed')->default(0);
            $table->unsignedBigInteger('opening_striker_player_id')->nullable();
            $table->unsignedBigInteger('opening_non_striker_player_id')->nullable();
            $table->unsignedBigInteger('opening_bowler_player_id')->nullable();
            $table->timestamps();

            $table->foreign('match_id')->references('id')->on('matches')->onDelete('cascade');
            $table->foreign('opening_striker_player_id')->references('id')->on('players')->onDelete('set null');
            $table->foreign('opening_non_striker_player_id')->references('id')->on('players')->onDelete('set null');
            $table->foreign('opening_bowler_player_id')->references('id')->on('players')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('match_innings');
    }
};