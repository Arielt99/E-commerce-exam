<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\News;
use Faker\Generator as Faker;

$factory->define(News::class, function (Faker $faker) {
    return [
        'title' => $faker->title,
        'resume' => $faker->realText($maxNbChars = rand(100, 150), $indexSize = 2),
        'image' => "https://picsum.photos/200",
        'content' => $faker->realText($maxNbChars = rand(200, 250), $indexSize = 2),
        'isActive'=> true,
        'author' => $faker->name,
        'releaseDate' => now(),
    ];
});
