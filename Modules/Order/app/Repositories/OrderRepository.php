<?php

namespace Modules\Order\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Order\Models\Order;

class OrderRepository implements OrderRepositoryInterface
{

    public function __construct(private Order $model)
    {
    }

    public function all(array $filters = []): Collection|LengthAwarePaginator
    {
        $query = $this->model->with(['user', 'products']);

        if (isset($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }

        return $query->paginate(10);
    }

    public function find($id): ?Order
    {
        return $this->model->with(['user', 'products'])->find($id);
    }

    public function create(array $data): Order
    {
        $order = $this->model->create($data);

        if (isset($data['products'])) {
            $order->products()->attach(
                collect($data['products'])->mapWithKeys(function ($product) {
                    return [$product['id'] => ['quantity' => $product['quantity']]];
                })->all()
            );
        }

        return $order->load(['user', 'products']);
    }

    public function update($id, array $data): ?Order
    {
        $order = $this->find($id);
        if ($order) {
            $order->update($data);

            if (isset($data['products'])) {
                $order->products()->sync(
                    collect($data['products'])->mapWithKeys(function ($product) {
                        return [$product['id'] => ['quantity' => $product['quantity']]];
                    })->all()
                );
            }

            return $order->load(['user', 'products']);
        }
        return null;
    }

    public function delete($id): bool
    {
        $order = $this->find($id);
        if ($order) {
            $order->products()->detach();
            return $order->delete();
        }
        return false;
    }

    public function findByUser($userId): Collection
    {
        return $this->model->with(['products'])
            ->where('user_id', $userId)
            ->get();
    }

    public function generateOrderNumber(): string
    {
        $prefix = config('order.order_number_prefix', 'ORD');
        $timestamp = now()->format('YmdHis');
        $random = str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
        return $prefix . $timestamp . $random;
    }
}