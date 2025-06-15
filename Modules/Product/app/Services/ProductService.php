<?php

namespace Modules\Product\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Product\Models\Category;
use Modules\Product\Models\Product;
use Modules\Product\Repositories\ProductRepositoryInterface;

class ProductService
{
    protected $productRepository;

    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getAllProducts(array $filters = []): array
    {
        $category = cache()->remember('categories', 60 * 60 * 24, function () {
            return Category::all();
        });
        return [
            'products' => $this->productRepository->all($filters),
            'categories' => $category
        ];
    }

    public function getProduct($id): ?Product
    {
        return $this->productRepository->find($id);
    }

}