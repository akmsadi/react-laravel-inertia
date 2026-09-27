<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('match_expenses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('match_id')->nullable();
            $table->string('title');
            $table->decimal('amount', 10, 0)->default(0);
            $table->mediumText('notes')->nullable();
            $table->timestamps();

            $table->foreign('match_id')->references('id')->on('matches')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('match_expenses');
    }
};