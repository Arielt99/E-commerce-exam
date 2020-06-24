<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Images;
use Faker\Generator as Faker;

$factory->define(Images::class, function (Faker $faker) {
    return [
        'product_id' => rand(1, 20),
        'image' => "https://picsum.photos/200",
    ];
});
