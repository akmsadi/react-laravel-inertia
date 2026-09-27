<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('match_players', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('match_id');
            $table->unsignedBigInteger('player_id');
            $table->string('side')->default('evergreen');
            $table->string('role')->nullable();
            $table->unsignedInteger('shirt_number')->nullable();
            $table->unsignedInteger('batting_position')->nullable();
            $table->boolean('is_captain')->default(0);
            $table->boolean('playing_xi')->default(1);
            $table->timestamps();

            $table->foreign('match_id')->references('id')->on('matches')->onDelete('cascade');
            $table->foreign('player_id')->references('id')->on('players')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('match_players');
    }
};