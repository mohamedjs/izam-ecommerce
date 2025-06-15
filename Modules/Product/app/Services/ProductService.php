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
        $category = cache()->remember('categories', 60 * 60 * 24, function () {
            return Category::all();
        });

        $priceRange = cache()->remember('price_range', 60 * 60 * 24, function () {
            return [
                'min' => Product::min('price'),
                'max' => Product::max('price')
            ];
        });

        return [
            'products' => new ProductCollection($this->productRepository->all($filters)),
            'categories' => CategoryResource::collection($category),
            'price_range' => $priceRange
        ];
    }

    public function getProduct($id): ?Product
    {
        return $this->productRepository->find($id);
    }

}