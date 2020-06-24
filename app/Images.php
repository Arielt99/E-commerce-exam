<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Images extends Model
{
    protected $fillable = [
        'image','product_id'
    ];

    public function image()
    {
        return $this->belongsTo('App\Product');
    }
}