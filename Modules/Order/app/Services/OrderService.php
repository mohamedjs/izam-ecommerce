<?php

namespace Modules\Order\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Order\Events\OrderCreated;
use Modules\Order\Models\Order;
use Modules\Order\Repositories\OrderRepositoryInterface;

class OrderService
{
    public function __construct(protected OrderRepositoryInterface $orderRepository)
    {
    }

    public function getAllOrders(array $filters = []): Collection|LengthAwarePaginator
    {
        return $this->orderRepository->all($filters);
    }

    public function getOrder($id): ?Order
    {
        return $this->orderRepository->find($id);
    }

    public function createOrder(array $data): Order
    {
        $data['order_number'] = $this->orderRepository->generateOrderNumber();

        $order = $this->orderRepository->create($data);

        // Dispatch event for order logging
        event(new OrderCreated($order));

        return $order;
    }

    public function updateOrder($id, array $data): ?Order
    {
        return $this->orderRepository->update($id, $data);
    }

    public function deleteOrder($id): bool
    {
        return $this->orderRepository->delete($id);
    }

    public function getUserOrders($userId): Collection
    {
        return $this->orderRepository->findByUser($userId);
    }

    public function calculateOrderTotals(array $products): array
    {
        $basePrice = 0;
        $productCount = 0;

        foreach ($products as $product) {
            $basePrice += $product['price'] * $product['quantity'];
            $productCount += $product['quantity'];
        }

        $taxRate = config('order.tax_rate', 0.15);
        $shippingRate = config('order.shipping_rate', 10);

        $totalTaxes = $basePrice * $taxRate;
        $totalShipping = $shippingRate;
        $totalPrice = $basePrice + $totalTaxes + $totalShipping;

        return [
            'base_price' => $basePrice,
            'total_taxes' => $totalTaxes,
            'total_shipping' => $totalShipping,
            'total_price' => $totalPrice,
            'product_count' => $productCount,
        ];
    }
}