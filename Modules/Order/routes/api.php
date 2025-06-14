<?php

use Illuminate\Support\Facades\Route;
use Modules\Order\Http\Controllers\Api\OrderController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('orders', OrderController::class)->names('order');
    Route::get('user/orders', [OrderController::class, 'userOrders'])->name('order.user');
}); 