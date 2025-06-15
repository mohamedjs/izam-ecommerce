<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Resources\Json\JsonResource;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if(env('APP_DEBUG')) {
            \DB::listen(function($query){
                \File::append(
                    storage_path('logs/query.log'),
                    $query->sql . '[' . implode(', ', $query->bindings) . ']' . PHP_EOL
                );
            });
        }

        JsonResource::withoutWrapping();

    }
}
