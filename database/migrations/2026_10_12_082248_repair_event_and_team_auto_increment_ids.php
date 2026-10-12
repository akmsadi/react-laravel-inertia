<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (DB::connection()->getDriverName() !== 'mysql') {
            return;
        }

        Schema::table('events', function (Blueprint $table): void {
            $table->increments('id')->change();
        });

        Schema::table('teams', function (Blueprint $table): void {
            $table->id()->change();
        });
    }

    public function down(): void
    {
        if (DB::connection()->getDriverName() !== 'mysql') {
            return;
        }

        Schema::table('events', function (Blueprint $table): void {
            $table->unsignedInteger('id')->change();
        });

        Schema::table('teams', function (Blueprint $table): void {
            $table->id()->change();
        });
    }
};
