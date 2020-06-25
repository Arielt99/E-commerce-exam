<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use JD\Cloudder\Facades\Cloudder;
use Illuminate\Support\Facades\Validator;
class AdminBrandController extends Controller
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
        $brand = Brand::all();
        return response()->json($brand,200);
    }
    /**
     * Add a ressource
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:brands',
            'image'=>'required|mimes:jpeg,jpg,png',
            'banner'=>'required|mimes:jpeg,jpg,png',
        ]);

        if (!$validator->fails()) {
            $image_name = $request->image->getRealPath();
            Cloudder::upload($image_name, null, ['folder' => 'Brands']);
            $cloudinary_brand = Cloudder::getResult();

            $bannerName = $request->banner->getRealPath();
            Cloudder::upload($bannerName, null, ['folder' => 'Brands']);
            $cloudinary_banner = Cloudder::getResult();

            $brand = new Brand();
            $brand->name = $request->name;

            if ($request->description !== null) {
                $brand->description = $request->description;
            }

            $brand->image = $cloudinary_brand['secure_url'];
            $brand->banner = $cloudinary_banner['secure_url'];
            $brand->save();
            return response()->json(['error' => false,'message' => 'Ajout de la marque avec succès.', 201]);
        }
        else {
            return response()->json([
                'error' => true, 'message' => 'Erreur lors du remplissage.',400]);
        }
    }
    /**
     * Modify the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);
        $updateBrand = "";
        if (!$validator->fails()) {
            $updateBrand = Brand::findOrFail($id)->update([
                'name' => $request->name,
                'description' => $request->description,
            ]);
            if ($request->image) {
                $FormerImage = Brand::findOrFail($id);
                $extension = pathinfo($FormerImage->image);
                $public_id = basename($FormerImage->image, "." . $extension['extension']);
                Cloudder::delete("Brands/".$public_id);

                $image_name = $request->image->getRealPath();
                Cloudder::upload($image_name, null, ['folder' => 'Brands']);
                $cloudinary_Banner = Cloudder::getResult();

                $updateBrand = Brand::findOrFail($id)->update([
                    'image' => $cloudinary_Banner['secure_url'],
                ]);
            }
            if ($request->banner){
                $FormerImage = Brand::findOrFail($id);
                $extension = pathinfo($FormerImage->banner);
                $public_id = basename($FormerImage->banner, "." . $extension['extension']);
                Cloudder::delete("Brands/" . $public_id);

                $image_name = $request->banner->getRealPath();
                Cloudder::upload($image_name, null, ['folder' => 'Brands']);
                $cloudinary_Banner = Cloudder::getResult();

                $updateBrand = Brand::findOrFail($id)->update([
                    'banner' => $cloudinary_Banner['secure_url'],
                ]);
            }
            $newBrandUpdated = Brand::findOrFail($id);
            if ($updateBrand){
                return response()->json(['error' => false,'message' => 'Modification de la marque avec succès.','brand' => $newBrandUpdated, 200]);
            }
            else{
                return response()->json(['error' => true,'message' => 'Erreur lors de la mise à jour de la marque.', 400]);
            }
        }
    }
    /**
     * Destroy the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $path_image = Brand::findOrFail($request->id);
        $extension = pathinfo($path_image->image);
        $extension_banner = pathinfo($path_image->banner);

        $public_id = basename($path_image->image,".".$extension['extension']);
        Cloudder::delete("Brands/".$public_id);

        $public_id_banner = basename($path_image->banner,".".$extension_banner['extension']);
        Cloudder::delete("Brands/".$public_id_banner);

        Brand::findOrFail($request->id)->delete();
        return response()->json('Suppression réussis !',200);
    }
}