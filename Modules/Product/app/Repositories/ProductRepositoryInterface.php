<?php

namespace Modules\Product\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Product\Models\Product;

interface ProductRepositoryInterface
{
    public function all(array $filters = []);
    public function find($id): ?Product;
}