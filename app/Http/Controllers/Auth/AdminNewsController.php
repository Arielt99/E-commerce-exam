<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use App\News;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use JD\Cloudder\Facades\Cloudder;
use Illuminate\Support\Facades\Validator;
class AdminNewsController extends Controller
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
        $news = News::orderBy('created_at','DESC')->get();
        return response()->json($news,200);
    }
    /**
     * Add a ressource
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:news',
            'image'=>'required|mimes:jpeg,jpg,png',
            'resume'=>'required',
            'content'=>'required',
            'releaseDate'=>'required',
            'isActive'=>'required',
            'author'=>'required',
        ]);
        if (!$validator->fails()) {
            try{
                $image_name = $request->image->getRealPath();
                Cloudder::upload($image_name, null, ['folder' => 'News']);
                $cloudinary_new = Cloudder::getResult();
                $news = new News();
                $news->title = $request->title;
                $news->resume = $request->resume;
                $news->content = $request->content;
                $news->isActive = $request->isActive;
                $news->releaseDate = $request->releaseDate;
                $news->author = $request->author;
                $news->image = $cloudinary_new['secure_url'];
                $news->save();
                return response()->json(['error' => false,'message' => 'Ajout de lactualité avec succès.', 201]);
            }
            catch(\Exception $e){
                return response()->json([
                    'error' => true, 'message' => 'Erreur lors du remplissage.',400]);
            }
           
        }
        else {
            return response()->json([
                'error' => true, 'message' => 'Erreur lors du remplissage.',400]);
        }
    }
    
    public function update(Request $request,$id)
    {
        $validator = Validator::make($request->all(), [
            'title'=>'required',
            'resume'=>'required',
            'content'=>'required',
            'releaseDate'=>'required',
            'isActive'=>'required',
        ]);

        if (!$validator->fails()) {
            if ($request->image){
                $oldImage = News::findOrFail($request->id);
                $extension = pathinfo($oldImage->image);
                $public_id = basename($oldImage->image, "." . $extension['extension']);
                Cloudder::delete("News/" . $public_id);

                $image_name = $request->image->getRealPath();
                Cloudder::upload($image_name, null, ['folder' => 'News']);
                $cloudinary_new = Cloudder::getResult();

                $updateNew = News::findOrFail($request->id)->update([
                    'title' => $request->title,
                    'resume' => $request->resume,
                    'content' => $request->content,
                    'releaseDate' => $request->releaseDate,
                    "isActive" => $request->isActive,
                    "image" => $cloudinary_new['secure_url']
                ]);
                $newNew = News::findOrFail($request->id);

                if ($updateNew){
                    return response()->json([
                        'msg' => 'Modification de l\'actualité avec succès.',
                        'type' => 1,
                        'new' => $newNew
                    ]);
                }
                else{
                    return response()->json(['msg' => 'Erreur lors de la mise à jour de l\'actualité.','type' => 0]);
                }
            }
            else{
                $updateNew = News::findOrFail($request->id)->update([
                    'title' => $request->title,
                    'resume' => $request->resume,
                    'content' => $request->content,
                    'releaseDate' => $request->releaseDate,
                    "isActive" => $request->isActive,
                ]);
                $newNew = News::findOrFail($request->id);

                if ($updateNew){
                    return response()->json([
                        'msg' => 'Modification de l\'actualité avec succès.',
                        'type' => 1,
                        'new' => $newNew
                    ]);
                }
                else{
                    return response()->json(['msg' => 'Erreur lors de la mise à jour de l\'actualité.','type' => 0]);
                }
            }
        }
        else{
            return response()->json(['msg' => 'Tous les champs sont obliagtoire et le champ Titre doit $etre unique.','type' => 0]);
        }
    }
    
    public function destroy(Request $request)
    {
        $path_image = News::findOrFail($request->id);
        $extension = pathinfo($path_image->image);

        $public_id = basename($path_image->image,".".$extension['extension']);
        Cloudder::delete("News/".$public_id);
        News::findOrFail($request->id)->delete();
        return response()->json('Suppression réussis !',200);
    }
}
