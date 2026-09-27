<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('match_summary_batsmen', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('match_id');
            $table->unsignedInteger('innings_number');
            $table->integer('sort_order')->default(0);
            $table->unsignedBigInteger('player_id');
            $table->unsignedInteger('runs')->default(0);
            $table->unsignedInteger('balls')->default(0);
            $table->unsignedInteger('fours')->default(0);
            $table->unsignedInteger('sixes')->default(0);
            $table->string('dismissal_mode')->nullable();
            $table->unsignedBigInteger('dismissal_by')->nullable();
            $table->unsignedBigInteger('fielder_id')->nullable();
            $table->timestamps();

            $table->foreign('match_id')->references('id')->on('matches')->onDelete('cascade');
            $table->foreign('player_id')->references('id')->on('players')->onDelete('cascade');
            $table->foreign('dismissal_by')->references('id')->on('players')->onDelete('set null');
            $table->foreign('fielder_id')->references('id')->on('players')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('match_summary_batsmen');
    }
};