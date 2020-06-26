<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use App\Images;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use JD\Cloudder\Facades\Cloudder;
use Illuminate\Support\Facades\Validator;

class AdminProductController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $product =(object)[];
        $product->produit = Product::with('images')->get();
        return response()->json($product,200);
    }
    /**
     * Add a ressource
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:products',
            'color' => 'required',
            'principal_images'=>'required|mimes:jpeg,jpg,png',
            'price'=>'required|numeric',
            'description'=>'required',
            'isActive'=>'required',
            'brand_id'=>'required|integer',
            'secondary_images'=>'required',
        ]);
        if (!$validator->fails()) {
            $image_name = $request->principal_images->getRealPath();
            Cloudder::upload($image_name, null, ['folder' => 'Products']);
            $cloudinary_brand = Cloudder::getResult();

            $newProduct = new Product();
            $newProduct->name = $request->name;
            $newProduct->description = $request->description;
            $newProduct->price = $request->price;
            $newProduct->color = $request->color;
            $newProduct->isActive = $request->isActive;
            $newProduct->brand_id = $request->brand_id;
            $newProduct->principal_images = $cloudinary_brand['secure_url'];
            $newProduct->save();

            foreach ($request->secondary_images as $secondPicture){
                $image_second = $secondPicture->getRealPath();
                Cloudder::upload($image_second, null, ['folder' => 'ProductsOtherImage']);
                $cloudinary_secondPicture = Cloudder::getResult();

                $secondary_pictures = new Images();
                $secondary_pictures->image = $cloudinary_secondPicture['secure_url'];
                $secondary_pictures->product_id = $newProduct->id;
                $secondary_pictures->save();
            }

            return response()->json(['error' => false,'message' => 'Ajout du produit avec succès.', 201]);
        }
        else {
            return response()->json(['error' => true, 'message' => 'Erreur lors du remplissage.',400]);
        }
    }
        /**
     * Destroy the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $path_image = Product::findOrFail($request->id);
        $extension = pathinfo($path_image->principal_images);

        $public_id = basename($path_image->principal_images,".".$extension['extension']);
        Cloudder::delete("Products/".$public_id);

        $path_imageSecondary = Images::where("product_id","=",$request->id)->get();

        foreach ($path_imageSecondary as $pathPicture)
        {
            $extensionSecondary = pathinfo($pathPicture->image);
            $public_id_Secondary = basename($pathPicture->image,".".$extensionSecondary['extension']);
            Cloudder::delete("ProductsOtherImage/".$public_id_Secondary);
            Images::where("product_id","=",$pathPicture->product_id)->delete();
        }

        Product::findOrFail($request->id)->delete();
        return response()->json('Suppression réussis !',200);
    }

}