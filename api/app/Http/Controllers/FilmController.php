<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\JsonResponse;

class FilmController extends Controller
{
    public function index(): JsonResponse
    {
        $films = Film::orderBy('premiereDate', 'asc')->get();
        return response()->json($films);
    }

    public function show(string $slug): JsonResponse
    {
        $film = Film::where('slug', $slug)->first();

        if (!$film) {
            return response()->json(['message' => 'Film not found'], 404);
        }

        return response()->json($film);
    }
}
