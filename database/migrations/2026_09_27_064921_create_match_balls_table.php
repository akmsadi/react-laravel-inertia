<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('match_balls', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('match_id');
            $table->unsignedBigInteger('innings_id');
            $table->unsignedBigInteger('striker_player_id')->nullable();
            $table->unsignedBigInteger('non_striker_player_id')->nullable();
            $table->unsignedBigInteger('bowler_player_id')->nullable();
            $table->unsignedBigInteger('fielder_player_id')->nullable();
            $table->unsignedInteger('over_number');
            $table->unsignedInteger('ball_in_over');
            $table->string('ball_code')->nullable();
            $table->unsignedInteger('runs_bat')->default(0);
            $table->unsignedInteger('extras')->default(0);
            $table->string('extra_type')->nullable();
            $table->unsignedInteger('total_runs')->default(0);
            $table->boolean('is_legal_delivery')->default(1);
            $table->boolean('is_boundary')->default(0);
            $table->string('wicket_type')->nullable();
            $table->boolean('is_wicket')->default(0);
            $table->unsignedBigInteger('dismissed_player_id')->nullable();
            $table->unsignedInteger('partnership_runs')->default(0);
            $table->string('score_after_ball')->nullable();
            $table->mediumText('commentary')->nullable();
            $table->timestamps();

            $table->foreign('match_id')->references('id')->on('matches')->onDelete('cascade');
            $table->foreign('innings_id')->references('id')->on('match_innings')->onDelete('cascade');
            $table->foreign('striker_player_id')->references('id')->on('players')->onDelete('set null');
            $table->foreign('non_striker_player_id')->references('id')->on('players')->onDelete('set null');
            $table->foreign('bowler_player_id')->references('id')->on('players')->onDelete('set null');
            $table->foreign('fielder_player_id')->references('id')->on('players')->onDelete('set null');
            $table->foreign('dismissed_player_id')->references('id')->on('players')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('match_balls');
    }
};