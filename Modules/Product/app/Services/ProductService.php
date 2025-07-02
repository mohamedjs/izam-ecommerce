<?php

namespace Modules\Product\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Product\Models\Category;
use Modules\Product\Models\Product;
use Modules\Product\Repositories\ProductRepositoryInterface;
use Modules\Product\Resources\ProductCollection;
use Modules\Product\Resources\CategoryResource;


class ProductService
{
    protected $productRepository;

    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getAllProducts(array $filters = []): array
    {
        $result = $this->productRepository->all($filters);

        $category = cache()->remember('categories', 60 * 60 * 24, function () {
            return Category::all();
        });

        return [
            'products' => new ProductCollection($result['products']),
            'categories' => CategoryResource::collection($category),
            'price_range' => $result['price_range']
        ];
    }

    public function getProduct($id): ?Product
    {
        return $this->productRepository->find($id);
    }

}