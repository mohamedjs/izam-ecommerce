<?php

namespace Modules\User\Repositories;

use App\Models\User;

class UserRepository implements UserRepositoryInterface
{

    public function __construct(protected User $model)
    {
    }

    public function findByEmail(string $email)
    {
        return $this->model->where('email', $email)->first();
    }
}