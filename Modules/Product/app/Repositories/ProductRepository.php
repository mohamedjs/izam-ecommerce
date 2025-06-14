<?php

namespace Modules\Product\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Modules\Product\Filters\CategoryFilter;
use Modules\Product\Filters\FilterInterface;
use Modules\Product\Filters\PriceFilter;
use Modules\Product\Filters\SearchFilter;
use Modules\Product\Models\Product;

class ProductRepository implements ProductRepositoryInterface
{
    protected $model;
    protected $filters = [];

    public function __construct(Product $model)
    {
        $this->model = $model;
        $this->registerFilters();
    }

    protected function registerFilters(): void
    {
        $this->filters = [
            'category' => new CategoryFilter(),
            'price' => new PriceFilter(),
            'search' => new SearchFilter(),
        ];
    }

    public function all(array $filters = []): Collection|LengthAwarePaginator
    {
        $cacheKey = $this->generateCacheKey($filters);

        return Cache::remember($cacheKey, now()->addHours(1), function () use ($filters) {
            $query = $this->model->query();

            foreach ($filters as $key => $value) {
                if (isset($this->filters[$key]) && $value !== null) {
                    $this->filters[$key]->apply($query, $value);
                }
            }

            return $query->with('category')->paginate(10);
        });
    }

    protected function generateCacheKey(array $filters): string
    {
        return 'products_' . md5(json_encode($filters));
    }

    public function find($id): ?Product
    {
        return $this->model->with('category')->find($id);
    }

    protected function clearCache(): void
    {
        Cache::tags(['products'])->flush();
    }
}