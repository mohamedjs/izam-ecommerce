<?php

namespace Modules\User\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Modules\User\Http\Requests\LoginRequest;
use Modules\User\Services\UserService;

class AuthController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function login(LoginRequest $request)
    {
        $user = $this->userService->authenticate(
            $request->email,
            $request->password
        );

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $this->userService->createToken($user);
        $expiration = now()->addHours(config('users.token_expiration'));

        $cookie = cookie(
            'auth_token',
            $token->plainTextToken,
            $expiration->diffInMinutes(now()),
            '/',
            null,
            true,
            true,
            false,
            'Lax'
        );

        return response()->json([
            'user' => $user,
            'token' => $token->plainTextToken,
            'expires_at' => $expiration
        ])->withCookie($cookie);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        $cookie = cookie()->forget('auth_token');

        return response()->json(['message' => 'Logged out successfully'])
            ->withCookie($cookie);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}