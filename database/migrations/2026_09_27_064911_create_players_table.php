<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->mediumText('name');
            $table->mediumText('organization')->nullable();
            $table->string('nickname');
            $table->mediumText('email')->nullable();
            $table->mediumText('phone');
            $table->mediumText('address');
            $table->string('status')->default('pending');
            $table->unsignedBigInteger('guest_of_player_id')->nullable();
            $table->timestamps();

            $table->foreign('guest_of_player_id')->references('id')->on('players')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};