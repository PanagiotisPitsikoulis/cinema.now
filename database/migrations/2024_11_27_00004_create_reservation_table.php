<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationTable extends Migration
{
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('display_time_id');
            $table->string('status');
            $table->string('room_order');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('movie_id');
            $table->timestamps();
            $table->foreign('display_time_id')->references('id')->on('display_times')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->foreign('movie_id')->references('id')->on('movies')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reservations');
    }
}
