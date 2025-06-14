<?php

namespace Modules\Product\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Product\Models\Product;
use Modules\Product\Repositories\ProductRepositoryInterface;

class ProductService
{
    protected $productRepository;

    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getAllProducts(array $filters = []): Collection|LengthAwarePaginator
    {
        return $this->productRepository->all($filters);
    }

    public function getProduct($id): ?Product
    {
        return $this->productRepository->find($id);
    }

    public function createProduct(array $data): Product
    {
        return $this->productRepository->create($data);
    }

    public function updateProduct($id, array $data): ?Product
    {
        return $this->productRepository->update($id, $data);
    }

    public function deleteProduct($id): bool
    {
        return $this->productRepository->delete($id);
    }
} 