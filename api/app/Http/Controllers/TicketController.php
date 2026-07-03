<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\Film;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'film_slug' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'tier' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1|max:10',
            'seats' => 'required|string|max:500',
        ]);

        // Verify film exists
        $filmExists = Film::where('slug', $validated['film_slug'])->exists();
        if (!$filmExists) {
            return response()->json([
                'message' => 'Requested film does not exist on our slate.'
            ], 422);
        }

        $ticket = Ticket::create($validated);

        return response()->json([
            'message' => 'Ticket reserved successfully',
            'data' => $ticket
        ], 201);
    }
}
