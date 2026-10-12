<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::getConnection()->getDriverName() !== 'sqlite' && Schema::hasColumn('match_player_deposits', 'match_id')) {
            Schema::table('match_player_deposits', function (Blueprint $table): void {
                $matchForeignKey = collect(Schema::getForeignKeys('match_player_deposits'))
                    ->first(fn (array $key): bool => $key['columns'] === ['match_id']);

                if ($matchForeignKey !== null) {
                    $table->dropForeign($matchForeignKey['name']);
                }

                $table->dropColumn('match_id');
            });
        }

        Schema::rename('match_player_deposits', 'player_deposits');
    }

    public function down(): void
    {
        Schema::rename('player_deposits', 'match_player_deposits');

        Schema::table('match_player_deposits', function (Blueprint $table): void {
            $table->unsignedBigInteger('match_id')->nullable()->after('id');
        });
    }
};
