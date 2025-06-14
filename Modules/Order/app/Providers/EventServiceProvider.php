<?php

namespace Modules\Order\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Modules\Order\Events\OrderCreated;
use Modules\Order\Listeners\LogOrderCreated;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        OrderCreated::class => [
            LogOrderCreated::class,
        ],
    ];

    public function boot(): void
    {
        parent::boot();
    }
} 