<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User Module Seeders
        $this->call(\Modules\User\Database\Seeders\UserSeeder::class);

        // Product Module Seeders
        $this->call(\Modules\Product\Database\Seeders\ProductDatabaseSeeder::class);
    }
}
