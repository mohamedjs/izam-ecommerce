<?php

namespace Modules\Product\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Product\Models\Product;

interface ProductRepositoryInterface
{
    public function all(array $filters = []): Collection|LengthAwarePaginator;
    public function find($id): ?Product;
    public function create(array $data): Product;
    public function update($id, array $data): ?Product;
    public function delete($id): bool;
} 