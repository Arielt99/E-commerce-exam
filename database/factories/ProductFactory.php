<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'principal_images' => "https://picsum.photos/200",
        'description' => $faker->realText($maxNbChars = rand(100, 180), $indexSize = 2),
        'color' => $faker->safeColorName,
        'brand_id' => rand(1, 5),
        'price'=> rand(90, 800),
        'isActive' => true
    ];
});
