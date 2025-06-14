<?php

namespace Modules\Order\Listeners;

use Illuminate\Support\Facades\Log;
use Modules\Order\Events\OrderCreated;

class LogOrderCreated
{
    public function handle(OrderCreated $event): void
    {
        $order = $event->order;
        $user = $order->user;
        $products = $order->products;

        $logData = [
            'order_id' => $order->id,
            'order_number' => $order->order_number,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'products' => $products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'quantity' => $product->pivot->quantity,
                    'price' => $product->price,
                ];
            }),
            'totals' => [
                'base_price' => $order->base_price,
                'total_taxes' => $order->total_taxes,
                'total_shipping' => $order->total_shipping,
                'total_price' => $order->total_price,
            ],
            'created_at' => $order->created_at,
        ];

        Log::channel('orders')->info('New order created', $logData);
    }
} 