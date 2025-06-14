<?php

namespace Modules\Product\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Product\Models\Category;
use Modules\Product\Models\Product;
use Modules\Product\Database\Factories\CategoryFactory;
use Modules\Product\Database\Factories\ProductFactory;

class ProductDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create main categories
        $categories = [
            'T-shirt',
            'Polo',
            'Jeans',
            'Shirt'
        ];

        foreach ($categories as $categoryName) {
            $category = Category::create(['name' => $categoryName]);
            
            // Create 200 products for each category
            Product::factory()
                ->count(200)
                ->create([
                    'category_id' => $category->id
                ]);
        }
    }
}
