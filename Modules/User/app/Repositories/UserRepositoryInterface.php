<?php

namespace Modules\User\Repositories;

interface UserRepositoryInterface
{
    public function findByEmail(string $email);
}