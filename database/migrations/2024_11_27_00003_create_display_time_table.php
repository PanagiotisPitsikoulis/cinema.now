<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDisplayTimeTable extends Migration
{
    public function up()
    {
        Schema::create('display_times', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('movie_id');
            $table->time('time_start');
            $table->time('time_end');
            $table->timestamps();

            $table->foreign('movie_id')->references('id')->on('movies')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('display_times');
    }
}
