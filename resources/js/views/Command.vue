<template>
  <div class="Command">
    <h1>Commande</h1>
    <div class="CommandCard">
        <h2 class="CommandLabel">Votre panier</h2>
        <div class="Cart">
            <div class="CartItemResume" v-for="(item,index) in getterCart.basket" :key="index">
                <h3>{{ item.product.name }}</h3>
                <div class="ProductInfo">
                    <p>{{ item.product.color }}</p>
                    <p>&nbsp;en {{ item.size }}</p>
                </div>
                <div class="ProductPrice">
                    <p>{{item.quantity}}</p>
                    <p>x {{ item.product.price}} €</p>
                </div>
            </div>
        </div>
        <p class="TotalPrice">total : {{getterTotalPrice}} €</p>
    </div>
    <div class="CommandCard">
        <h2 class="CommandLabel">Livraison & paiement</h2>
        <form class="Delivering">
            <input type="text" :class='{"error" :$v.OrderData.FirstName.$error}' v-model.trim="$v.OrderData.FirstName.$model" placeholder="Prénom">
            <input type="text" :class='{"error" :$v.OrderData.LastName.$error}' v-model.trim="$v.OrderData.LastName.$model" placeholder="Nom">
            <input type="text" :class='{"error" :$v.OrderData.email.$error}' v-model.trim="$v.OrderData.email.$model" placeholder="Email">
            <input type="text" :class='{"error" :$v.OrderData.address.$error}' v-model.trim="$v.OrderData.address.$model" placeholder="Adresse">
            <input type="text" :class='{"error" :$v.OrderData.city.$error}' v-model.trim="$v.OrderData.city.$model" placeholder="Ville">
            <input type="text" :class='{"error" :$v.OrderData.postalCode.$error}' v-model.trim="$v.OrderData.postalCode.$model" placeholder="Code Postal">
            <button type="button" @click="command">Valider la commande</button>
        </form>
    </div>
  </div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
    data (){
        return {
            OrderData:{
                FirstName:"Ariel",
                LastName:"Thibault",
                email:"arielthibault@yahoo.fr",
                address:"375 parc de cassan",
                city:"L'isle-Adam",
                postalCode:"95290",
            },
        }
    },
    validations: {
        OrderData:{
            FirstName: {required},
            LastName: {required},
            email: {
            required,
            email
            },
            address: {required},
            city: {required},
            postalCode: {required},
        }
    },
    methods:{
        command(){
            this.$v.$touch()
            if(!this.$v.OrderData.$invalid){
                this.$store.dispatch('Order',{FirstName: this.OrderData.FirstName, LastName: this.OrderData.LastName, email: this.OrderData.email, address: this.OrderData.address, city: this.OrderData.city, postalCode: this.OrderData.postalCode});
                this.$router.push({ name: 'Home' });
            }
        }
    },
    computed:{
        getterCart(){
            return this.$store.getters.getterCart
        },
        getterTotalPrice(){
            return this.$store.getters.getterTotalPrice
        },
    },
}
</script>
<style>
    .Command .CommandCard{
        background-color: white;
        border-radius: 10px;
        width: 94vw;
        margin-right: auto;
        margin-left: auto;
    }
    .Command .CommandCard .CommandLabel{
        padding-left: 10px;
        padding-top: 10px;
    }
    .Command .CommandCard .Cart .CartItemResume{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: auto;
        margin: 0px 10px;
        padding: 10px;
        border-bottom: 1px solid rgb(48, 48, 48);
    }
    .Command .CommandCard .Cart div:last-child{
        border-bottom: none !important;
    }
    .Command .CommandCard .Cart .CartItemResume .ProductInfo{
        display: flex;
        flex-direction: row;
        padding-left: 5px;
    }
    .Command .CommandCard .Cart .CartItemResume .ProductInfo >*{
        display: flex;
        flex-direction: row;
        padding-left: 5px;
    }
    .Command .CommandCard .Cart .CartItemResume .ProductPrice{
        display: flex;
        flex-direction: row;
        margin-left: auto;
    }
    .Command .CommandCard .TotalPrice{
        display: flex;
        justify-content: flex-end;
        border-top: 1px solid rgb(48, 48, 48);
        padding:20px 0px;
        font-size: 20px;
        font-weight: bold;
        padding-right: 20px;
        margin: 0;
    }
    .Command .CommandCard .Delivering input{
        border: 1px solid #b90000 !important;
    }
</style>
