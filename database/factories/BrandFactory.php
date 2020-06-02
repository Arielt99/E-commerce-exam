<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Brand;
use Faker\Generator as Faker;

$factory->define(Brand::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'banner' => "https://picsum.photos/200",
        'image' => "https://picsum.photos/200",
        'description' => $faker->realText($maxNbChars = rand(100, 180), $indexSize = 2)
    ];
});
