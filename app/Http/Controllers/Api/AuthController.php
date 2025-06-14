<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Token expiration time (24 hours)
        $expiration = now()->addHours(24);
        
        // Create token with expiration
        $token = $user->createToken('auth-token', ['*'], $expiration)->plainTextToken;

        // Create cookie with same expiration
        $cookie = cookie(
            'auth_token',
            $token,
            $expiration->diffInMinutes(now()),
            '/',
            null,
            true, // Secure
            true, // HttpOnly
            false,
            'Lax'
        );

        return response()->json([
            'user' => $user,
            'token' => $token,
            'expires_at' => $expiration
        ])->withCookie($cookie);
    }

    public function logout(Request $request)
    {
        // Revoke the token that was used to authenticate the current request
        $request->user()->currentAccessToken()->delete();

        // Remove the cookie
        $cookie = cookie()->forget('auth_token');

        return response()->json(['message' => 'Logged out successfully'])->withCookie($cookie);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
} 