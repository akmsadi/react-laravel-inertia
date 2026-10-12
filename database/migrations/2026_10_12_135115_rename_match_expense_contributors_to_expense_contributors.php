<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::rename('match_expense_contributors', 'expense_contributors');
    }

    public function down(): void
    {
        Schema::rename('expense_contributors', 'match_expense_contributors');
    }
};
