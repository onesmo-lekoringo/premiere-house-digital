<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('films', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->integer('year');
            $table->string('genre');
            $table->string('runtime');
            $table->string('rating');
            $table->text('logline');
            $table->text('synopsis');
            $table->string('director');
            $table->json('cast'); // Storing cast members array
            $table->string('premiereDate');
            $table->string('premiereVenue');
            $table->string('status');
            $table->string('trailerUrl');
            $table->string('poster');
            $table->string('still');
            $table->string('accent');
            $table->boolean('featured')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('films');
    }
};
