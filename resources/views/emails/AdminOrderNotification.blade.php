<!doctype html>
<html>
< lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<style>
    h3{
        text-decoration: underline;
    }
    body{
        color: rgb(48, 48, 48);
    }
    .total{
        border-top:1px solid rgb(48, 48, 48);
    }
    .info{
        grid-gap: 50px;
        grid-template-columns: repeat(auto-fit, 125px);
        display: grid;
        justify-content: flex-start;
        margin-bottom: 10px;
    }
    img{
        width: 13%;
    }
    h5{
        margin: 0;
    }
    img{
        width: 13%;
    }
    body{
        padding: 5px;
    }
</style>
<body>
<p>Vous venez de recevoir une commande.</p>
Nom du client <b>{{$firstName ?? ''}}</b><br>
<h3>Adresse de facturation</h3>
<span>{{ $address}}</span>
<span>{{$postal}}</span>
<span>{{$city}}</span>
<br><br>

<h3>Récapitulatifs des produits commandés</h3>
<?php $total = 0; ?>
@foreach($dataSession['basket'] as $values)
    <h5>{{$values['product']['name']}}</h5>
    <img src="{{$values['product']['principal_images']}}" alt="">
    <div class="info">
        <span>Taille: <b>{{  $values['size'] }}</b></span>
        <span>Quantité: <b>{{  $values['quantity'] }}</b></span>
        <span>Prix: <b>{{  $values['product']['price'] }}</b></span>
    </div>
    <?php $total += $values['product']['price']  * $values['quantity']?>
@endforeach

<div class="total">
    <b>Total: {{$total}} €</b>
</div>
</body>
</html>
