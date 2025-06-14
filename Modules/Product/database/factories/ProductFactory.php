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
            'main_image' => fake()->imageUrl(800, 600, 'product'),
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