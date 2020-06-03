<?php

namespace App\Http\Controllers;

use App\Brand;
use App\Product;
use Illuminate\Http\Request;

class BrandsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $brand = Brand::all();
        return response()->json($brand);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function show(Brand $brand, $id)
    {
        $result = $brand -> find($id);
        if (!$result){
            return response()->json(['error' => true, 'message' => 'Unable to find Brand with ID '. $id], 404);
        }
        return response()->json($result, 200);
    }

        /**
     * Display the specified resource's items.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function showItem(Brand $brand, $id)
    {
        $result = $brand -> find($id);
        if (!$result){
            return response()->json(['error' => true, 'message' => 'Unable to find Brand with ID '. $id], 404);
        }

        $BrandProduct = Product::where('brand_id', $id)->get();
        if ($BrandProduct) {
            return response()->json($BrandProduct);
        } else {
            return response()->json([], 204);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Brand $brand)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function destroy(Brand $brand)
    {
        //
    }
}
