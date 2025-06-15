<?php

namespace Modules\User\Services;

use Illuminate\Support\Facades\Hash;
use Modules\User\Repositories\UserRepositoryInterface;

class UserService
{

    public function __construct(protected UserRepositoryInterface $userRepository)
    {
    }

    public function authenticate(string $email, string $password)
    {
        $user = $this->userRepository->findByEmail($email);

        if (!$user || !Hash::check($password, $user->password)) {
            return null;
        }

        return $user;
    }

    public function createToken($user)
    {
        $expiration = now()->addHours(config('user.token_expiration'));
        return $user->createToken('auth-token', ['*'], $expiration);
    }
}