<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Product extends Model
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'brand', 'color','description','price','principal_images','brand_id','isActive'
    ];

    public function brand()
    {
        return $this->hasOne('App\Brand');
    }

    public function images()
    {
        return $this->hasMany('App\Images');
    }
}
