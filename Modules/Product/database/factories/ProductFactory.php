<?php

namespace Modules\Product\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Modules\Product\Models\Product;
use Modules\Product\Models\Category;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        $name = fake()->words(3, true);
        $basePrice = fake()->randomFloat(2, 10, 1000);
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->paragraph(),
            'price' => $basePrice,
            'stock' => fake()->numberBetween(0, 100),
            'category_id' => Category::factory(),
            'main_image' => fake()->randomElement([
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
                'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
                'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
                'https://images.unsplash.com/photo-1585386959984-a4155224a1ad',
                'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
                'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
                'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
                'https://images.unsplash.com/photo-1585386959984-a4155224a1ad',
                'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
                'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
                'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
                'https://images.unsplash.com/photo-1585386959984-a4155224a1ad',
                'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
                'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
                'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
                'https://images.unsplash.com/photo-1585386959984-a4155224a1ad',
                'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
                'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
                'https://images.unsplash.com/photo-1544947950-fa07a98d237f'
            ]),
        ];
    }

    public function outOfStock(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'stock' => 0,
            ];
        });
    }
}