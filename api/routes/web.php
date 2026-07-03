<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FilmController;
use App\Http\Controllers\SignupController;

Route::get('/', function () {
    return ['app' => 'Aurelia API Server'];
});

Route::get('/api/films', [FilmController::class, 'index']);
Route::get('/api/films/{slug}', [FilmController::class, 'show']);
Route::post('/api/signups', [SignupController::class, 'store']);
Route::post('/api/tickets', [\App\Http\Controllers\TicketController::class, 'store']);
