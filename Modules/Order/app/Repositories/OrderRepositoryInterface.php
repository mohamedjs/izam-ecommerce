<?php

namespace Modules\Order\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Order\Models\Order;

interface OrderRepositoryInterface
{
    public function all(array $filters = []): Collection|LengthAwarePaginator;
    public function find($id): ?Order;
    public function create(array $data): Order;
    public function update($id, array $data): ?Order;
    public function delete($id): bool;
    public function findByUser($userId): Collection;
    public function generateOrderNumber(): string;
} 