<?php

use Illuminate\Support\Facades\Route;
use Modules\User\Http\Controllers\Api\AuthController;

Route::prefix('api/v1')->group(function () {
    // Public routes
    Route::post('/login', [AuthController::class, 'login']);

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
}); 