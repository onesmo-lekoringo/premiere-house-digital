<?php

namespace App\Http\Controllers;

use App\Models\Signup;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SignupController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'interest' => 'required|string|max:255',
            'message' => 'nullable|string',
        ]);

        $signup = Signup::create($validated);

        return response()->json([
            'message' => 'Signup stored successfully',
            'data' => $signup
        ], 201);
    }
}
