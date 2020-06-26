<?php

namespace App\Http\Controllers;

use App\Brand;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $sort = $request->query('sort');
        $max = $request->query('max');
        if($search){
            $product = Product::where('isActive', true)->where('name','like', '%'.$search.'%')->with('images')
            ->orderBy('name')
            ->get();

            if ($product) {
                return response()->json($product);
            } else {
                return response()->json([], 204);
            }
        }
        else if ($sort)
        {
            $product = Product::where('isActive', true)->with('images')->get()->random($max);
            if ($product) {
                return response()->json($product);
            } else {
                return response()->json([], 204);
            }
        }

        $product = Product::where('isActive', true)->with('images')->get();
        if ($product) {
            return response()->json($product);
        } else {
            return response()->json([], 204);
        }
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
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product, $id)
    {
        $result = $product::where('isActive', true)->with('images')-> find($id);
        if (!$result){
            return response()->json(['error' => true, 'message' => 'Unable to find Product with ID '. $id], 404);
        }
        return response()->json($result, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }
}
