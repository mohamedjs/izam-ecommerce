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
use \Modules\Product\Resources\ProductResource;

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

    public function all(array $filters = [])
    {
        $cacheKey = $this->generateCacheKey($filters);

        return Cache::remember($cacheKey, now()->addHours(1), function () use ($filters) {
            // Build base query with all filters except price
            $baseQuery = $this->model->query();

            foreach ($filters as $key => $value) {
                if (isset($this->filters[$key]) && $value !== null && $key !== 'price') {
                    $this->filters[$key]->apply($baseQuery, $value);
                }
            }

            // Get price range in a separate optimized query
            $priceRangeQuery = clone $baseQuery;
            $priceRange = $priceRangeQuery->selectRaw('MIN(price) as min_price, MAX(price) as max_price')
                ->first();

            // Apply price filter to base query for products
            if (isset($filters['price']) && $filters['price'] !== null) {
                $this->filters['price']->apply($baseQuery, $filters['price']);
            }

            // Get paginated products with eager loading
            $products = $baseQuery->with(['category'])->paginate(request()->get('limit', 15));

            return [
                'products' => $products,
                'price_range' => [
                    'min' => $priceRange->min_price ?? 0,
                    'max' => $priceRange->max_price ?? 0,
                ]
            ];
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