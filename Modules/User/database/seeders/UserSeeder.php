<?php

namespace Modules\User\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Modules\User\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Mohamed',
            'email' => 'admin@izam.com',
            'password' => Hash::make('123456'),
        ]);
    }
} 