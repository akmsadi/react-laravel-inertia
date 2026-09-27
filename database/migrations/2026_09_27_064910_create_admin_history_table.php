<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('admin_history', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('admin_id')->nullable();
            $table->string('admin_username')->nullable();
            $table->string('action');
            $table->string('table_name');
            $table->string('row_id');
            $table->longText('old_values')->nullable();
            $table->longText('new_values')->nullable();
            $table->string('request_method')->nullable();
            $table->string('request_path')->nullable();
            $table->timestamp('created_at')->nullable();

            $table->foreign('admin_id')->references('id')->on('admins')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admin_history');
    }
};