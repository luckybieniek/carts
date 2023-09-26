<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasColumn('organisations', 'active')) {
            return;
        }

        Schema::table('organisations', function (Blueprint $table) {
            $table->boolean('active');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (!Schema::hasColumn('organisations', 'active')) {
            return;
        }

        Schema::table('organisations', function (Blueprint $table) {
            $table->dropColumn('active');
        });
    }
};
