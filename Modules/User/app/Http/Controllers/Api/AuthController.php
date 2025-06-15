<?php

namespace Modules\User\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseAPIController;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Modules\User\Http\Requests\LoginRequest;
use Modules\User\Services\UserService;

class AuthController extends BaseAPIController
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
        $expiration = now()->addHours(config('user.token_expiration'))->format('Y-m-d H:s');

        return $this->OK([
            'user' => $user,
            'token' => $token->plainTextToken,
            'expire_at' => $expiration
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->OK(['message' => 'Logged out successfully'], 201);
    }
}