<?php

namespace Modules\Product\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Product\Models\Product;

interface ProductRepositoryInterface
{
    /**
     * Get all products with filters and price range.
     *
     * @param array $filters
     * @return array{products: \Illuminate\Pagination\LengthAwarePaginator, price_range: array{min: float|null, max: float|null}}
     */
    public function all(array $filters = []);

    public function find($id): ?Product;
}