<?php

namespace Modules\Order\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Order\Http\Requests\OrderRequest;
use Modules\Order\Services\OrderService;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['user_id']);
        return response()->json($this->orderService->getAllOrders($filters));
    }

    public function store(OrderRequest $request)
    {
        $products = $request->input('products', []);
        $totals = $this->orderService->calculateOrderTotals($products);
        
        $orderData = array_merge([
            'user_id' => $request->user()->id,
            'products' => $products
        ], $totals);

        $order = $this->orderService->createOrder($orderData);
        return response()->json($order, 201);
    }

    public function show($id)
    {
        $order = $this->orderService->getOrder($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        return response()->json($order);
    }

    public function update(OrderRequest $request, $id)
    {
        $order = $this->orderService->updateOrder($id, $request->validated());
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        return response()->json($order);
    }

    public function destroy($id)
    {
        $deleted = $this->orderService->deleteOrder($id);
        if (!$deleted) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        return response()->json(null, 204);
    }

    public function userOrders(Request $request)
    {
        $orders = $this->orderService->getUserOrders($request->user()->id);
        return response()->json($orders);
    }
} 