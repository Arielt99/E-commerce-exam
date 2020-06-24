<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(
            BrandsSeeder::class
        );
        $this->call(
            ProductsSeeder::class
            );
        $this->call(
            NewsSeeder::class
            );
        $this->call(
            ImagesSeeder::class
            );
        $this->call(
            UserSeeder::class
            );    
    }
}
