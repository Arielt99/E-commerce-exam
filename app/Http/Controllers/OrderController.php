<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Mail;
use Illuminate\Mail\Mailable;
use App\Order;
use App\Customer;
use App\order_product;
use App\Mail\OrderMessageCustomer;
use App\Mail\OrderMessageAdmin;
use Illuminate\Http\Request;
use App\Message;
class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Customer $customer ,Order $order, order_product $order_product, Message $message)
    {
        //set_time_limit(0);
        $request->validate([
            'FirstName' => 'required',
            'LastName' => 'required',
            'address' => 'required',
            'postalCode' => 'required',
            'city' => 'required',
            'email' => 'required',
            'OrderProduct'=> 'required',
        ]);

        $customer->FirstName = $request->FirstName;
        $customer->LastName = $request->LastName;
        $customer->address = $request->address;
        $customer->postalCode = $request->postalCode;
        $customer->city= $request->city;
        $customer->email = $request->email;

        $message->firstName = $request->FirstName;
        $message->nickname = $request->LastName;
        $message->address = $request->address;
        $message->postalCode = $request->postalCode;
        $message->city= $request->city;
        $message->dataSession = $request->OrderProduct;
        Mail::to($request->email)->send(new OrderMessageAdmin($message));
        Mail::to('admin@webstart.fr')->send(new OrderMessageCustomer($message));
        $customer->save();

        $order->order_number = $request->OrderProduct['token'];
        $order->customer_id = $customer->id;
        $order->save();

        foreach ($request->OrderProduct['basket'] as $details => $value)
        {
            $orderProduct = new order_product;
            $orderProduct->order_id = $order->id;
            $orderProduct->product_id = $value['product']['id'];
            $orderProduct->size = $value['size'];
            $orderProduct->quantity = $value['quantity'];
            $orderProduct->save();
        }
        return response()->json([
            'msg' => 'Confirmation du traitement de la commande avec succès',
            'type' => 1
        ]);
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
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
