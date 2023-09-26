<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\Statuses;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('secret_codes', function (Blueprint $table) {
            $table->id();
            $table->integer('organisation_id')->unsigned();
            $table->string('code')->unique();
            $table->tinyInteger('status_id')->default(Statuses::Active->value);
            $table->integer('used_by_user_id')->unsigned()->nullable();
            $table->dateTime('used_on_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('secret_codes');
    }
};
