<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('brands', 'BrandsController@index');
Route::get('brands/{brand_id}', 'BrandsController@show');
Route::get('brands/{brand_id}/products', 'BrandsController@showItem');

Route::get('products', 'ProductsController@index');
Route::get('products/{product_id}', 'ProductsController@show');

Route::get('news', 'NewsController@index');
Route::get('news/{news_id}', 'NewsController@show');

Route::post('contact', 'ContactController@send');
