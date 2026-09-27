<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->string('slogan');
            $table->text('about');
            $table->string('logo')->nullable();
            $table->string('banner');
            $table->unsignedInteger('established');
            $table->unsignedInteger('matches')->default(0);
            $table->unsignedInteger('wins')->default(0);
            $table->unsignedInteger('titles')->default(0);
            $table->unsignedBigInteger('captain_id')->nullable();
            $table->unsignedBigInteger('vice_captain_id')->nullable();
            $table->boolean('is_external')->default(0);
            $table->timestamps();

            $table->foreign('captain_id')->references('id')->on('players')->onDelete('set null');
            $table->foreign('vice_captain_id')->references('id')->on('players')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};