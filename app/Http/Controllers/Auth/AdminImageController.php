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

class AdminImageController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }

    /**
     * Destroy the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'toDelete' => 'required',
        ]);
        if (!$validator->fails()) {
            foreach($request->toDelete as $toDelete){
                $id = $toDelete;
                $image = Images::findOrFail($id);
                $extension = pathinfo($image->image);
        
                $public_id = basename($image->image,".".$extension['extension']);
                Cloudder::delete("ProductsOtherImage/".$public_id);
        
                Images::findOrFail($id)->delete();
            }
        return response()->json(['error' => false,'message' => 'Supprimé avec succès.', 201]);
    }
        else{
            return response()->json(['msg' => 'Erreur lors de la mise à jour de la paire.','type' => 0]);
        }
    }
}