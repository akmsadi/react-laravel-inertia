<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('admin_history');
        Schema::dropIfExists('admins');
    }

    public function down(): void
    {
        // The dropped tables are intentionally not recreated.
    }
};
