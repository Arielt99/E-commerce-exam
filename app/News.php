<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class News extends Model
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'resume', 'image','content', 'releaseDate', 'isActive','author'
    ]; 
    
    /**
     * The table associated with the model.
     *
     * @var array
     */
    protected $table = 'news';
}
