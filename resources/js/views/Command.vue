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
            <div class="Identity">
                <input type="text" :class='{"error" :$v.OrderData.FirstName.$error}' v-model.trim="$v.OrderData.FirstName.$model" placeholder="Prénom">
                <input type="text" :class='{"error" :$v.OrderData.LastName.$error}' v-model.trim="$v.OrderData.LastName.$model" placeholder="Nom">
            </div>
            <input type="text" :class='{"error" :$v.OrderData.email.$error}' v-model.trim="$v.OrderData.email.$model" placeholder="Email">
            <input type="text" :class='{"error" :$v.OrderData.address.$error}' v-model.trim="$v.OrderData.address.$model" placeholder="Adresse de livraison">
            <div class="City">
                <input type="text" :class='{"error" :$v.OrderData.city.$error}' v-model.trim="$v.OrderData.city.$model" placeholder="Ville">
                <input type="text" :class='{"error" :$v.OrderData.postalCode.$error}' v-model.trim="$v.OrderData.postalCode.$model" placeholder="Code Postal">
            </div>
            <div class="CreditCard">
                <input class="CreditCardNumber" type="text" :class='{"error" :$v.cardNumber.$error}' v-model.trim="$v.cardNumber.$model" placeholder="Card Number">
                <div class="CardSecurity">
                    <input type="text" :class='{"error" :$v.cardValidity.$error}' v-model.trim="$v.cardValidity.$model" placeholder="Card Validity Period">
                    <input type="text" maxlength="3" pattern="[0-9]" :class='{"error" :$v.cardSecurCode.$error}' v-model.trim="$v.cardSecurCode.$model" placeholder="Card Secure Code">
                </div>
            </div>
            <button type="button" @click="command">Valider la commande</button>
        </form>
    </div>
  </div>
</template>
<script>
import { required, email, numeric } from 'vuelidate/lib/validators'
export default {
    data (){
        return {
            OrderData:{
                FirstName:"",
                LastName:"",
                email:"",
                address:"",
                city:"",
                postalCode:"",
            },
            cardNumber:"",
            cardValidity:"",
            cardSecurCode:"",
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
        },
        cardNumber:{required},
        cardValidity:{required},
        cardSecurCode:{required, numeric},

    },
    methods:{
        command(){
            this.$v.$touch()
            if(!this.$v.$invalid){
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
    .Command .CommandCard .Delivering{
        height: fit-content;
        padding-bottom: 10px;
        display: flex;
        flex-direction: column;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
    }
    .Command .CommandCard .Delivering .error{
        border: 1px solid #b90000 !important;
    }
    .Command .CommandCard .Delivering input{
        background-color :rgb(230, 230, 230);
        font-weight: bold;
        padding-left: 5px;
        border: 1px solid rgb(230, 230, 230);
        height: 30px;
        border-radius: 5px;
        margin: 10px 0;
        max-width: 400px;
    }
    .Command .CommandCard .Delivering input:focus{
       outline: none;
    }

    .Command .CommandCard .Delivering .CreditCard{
        display: flex;
        flex-direction: column;
    }
    .Command .CommandCard .Delivering button{
        border-radius: 5px;
        margin : 10px 0;
        width: 150px;
        height: 40px;
        font-weight: bold;
        font-size: 15px;
        border: 1px solid rgb(230, 230, 230);
        background-color :rgb(230, 230, 230);
        color: rgb(48, 48, 48);
    }
    .Command .CommandCard .Delivering button:hover{
        cursor: pointer;
    }
    .Command .CommandCard .Delivering button:focus{
       outline: none;
    }

</style>
