<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class order_product extends Model
{
    use Notifiable;

        /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'product_id', 'quantity','order_id'
    ];

     /**
     * The table associated with the model.
     *
     * @var array
     */
    protected $table = 'orders_products';
}
