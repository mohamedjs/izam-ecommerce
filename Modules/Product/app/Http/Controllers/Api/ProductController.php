<?php

namespace Modules\Product\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseAPIController;
use Illuminate\Http\Request;
use Modules\Product\Http\Requests\ProductRequest;
use Modules\Product\Services\ProductService;
use Modules\Product\Models\Category;

class ProductController extends BaseAPIController
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['category', 'price', 'search', 'page', 'limit']);
        return $this->OK($this->productService->getAllProducts($filters));
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        $product = $this->productService->getProduct($id);
        if (!$product) {
            return $this->error([], 'Product not found', 404);
        }
        return $this->OK($product);
    }

}
