<?php

namespace Modules\User\Repositories;

interface UserRepositoryInterface
{
    public function findByEmail(string $email);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
    public function find($id);
    public function all();
} 