<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->string('match_type')->default('limited_overs');
            $table->unsignedInteger('format_overs')->default(20);
            $table->mediumText('venue')->nullable();
            $table->dateTime('scheduled_at')->nullable();
            $table->string('team_name')->default('Evergreen Team');
            $table->string('opponent_name');
            $table->string('toss_winner')->nullable();
            $table->string('toss_decision')->nullable();
            $table->string('match_status')->default('scheduled');
            $table->string('result_type')->nullable();
            $table->mediumText('result_summary')->nullable();
            $table->mediumText('notes')->nullable();
            $table->unsignedBigInteger('venue_id')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('venue_id')->references('id')->on('venues')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};