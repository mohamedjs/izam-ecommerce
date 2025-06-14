<?php

namespace Modules\Order\Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\Order\Models\Order;
use Modules\User\Models\User;
use Tests\TestCase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_user_can_create_order()
    {
        $response = $this->actingAs($this->user)
            ->postJson('/api/v1/orders', [
                'products' => [
                    ['id' => 1, 'quantity' => 2],
                    ['id' => 2, 'quantity' => 1]
                ]
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'order_number',
                    'user_id',
                    'base_price',
                    'total_taxes',
                    'total_shipping',
                    'total_price',
                    'product_count',
                    'created_at',
                    'updated_at'
                ]
            ]);
    }

    public function test_user_can_view_their_orders()
    {
        $response = $this->actingAs($this->user)
            ->getJson('/api/v1/user/orders');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'order_number',
                        'user_id',
                        'base_price',
                        'total_taxes',
                        'total_shipping',
                        'total_price',
                        'product_count',
                        'created_at',
                        'updated_at'
                    ]
                ]
            ]);
    }
} 