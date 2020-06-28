<template>
  <div>
    <div class="Product" v-if="this.CurrentProduct[0]">
      <h1>{{this.CurrentProduct[0].name}}</h1>
      <img :src="this.CurrentProduct[0].principal_images"/>
      <p>{{this.CurrentProduct[0].price}} €</p>
      <p>{{this.CurrentProduct[0].color}}</p>
      <p>{{CurrentBrand.filter(brand =>brand.id === this.CurrentProduct[0].brand_id)[0].name}}</p>
    <label for="size">Selectionner la taille</label>
        <select v-model.trim="$v.size.$model" id="size">
            <option disabled value="null">Choisissez</option>
            <option v-for="i in [38 ,39,40,41,42,43,45]" :value="i" :key="i">{{i}}</option>
    </select>
      <button type="button" @click="addToCart"> ajouter au panier</button>
    </div>

    <transition name="fade">
      <div v-if="result.status === 0" class="error">
          {{result.message}}
      </div>
    </transition>

    <transition name="fade">
      <div v-if="result.status === 1" class="added">
        {{result.message}}
      </div>
    </transition>
    <div class="empty" v-if=" !this.CurrentProduct[0]">
      <p> Produit indisponible </p>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
    data (){
      return {
        size:null,
        check:false,
        result:{
            status:null,
            message:null
        },
      }
    },
    validations: {
        size: {
            required,
        },

    },
    methods:{
      addToCart(){
                if (this.$v.size.required) {
                    if (!localStorage.getItem('tempBasket')) {
                        let tab = []
                        let cart = {
                            "token": Math.random().toString(36).substr(2, 9),
                            "basket": tab
                        }
                        let infoCart = {
                            id:this.CurrentProduct[0].id,
                            size: this.size,
                            quantity: 1,
                            product: this.CurrentProduct[0]
                        };
                        tab.push(infoCart);
                        this.result.status = 1
                        this.result.message = "Produit ajouté au panier"
                        setTimeout(() => {
                            this.result.status = null
                            this.result.message = null
                            this.$store.dispatch('getCart');
                        },1500)
                        return localStorage.setItem('tempBasket', JSON.stringify(cart))
                    }
                    let tempBasket = JSON.parse(localStorage.getItem("tempBasket"));
                    if (JSON.parse(localStorage.getItem('tempBasket'))) {
                        tempBasket.basket.forEach(element => {
                            if (element.size === this.size && element.id === this.CurrentProduct[0].id) {
                                element.quantity += 1
                                this.check = true
                            }
                            else {
                                if(this.check === false){
                                    this.check = false
                                }
                            }
                        })
                        localStorage.setItem('tempBasket', JSON.stringify(tempBasket))
                        if (this.check !== true) {
                            let infoCart = {
                                id:this.CurrentProduct[0].id,
                                size: this.size,
                                quantity: 1,
                                product: this.CurrentProduct[0]
                            };
                            tempBasket.basket.push(infoCart)
                            this.result.status = 1
                            this.result.message = "Produit ajouté au panier"
                            setTimeout(() => {
                                this.result.status = null
                                this.result.message = null
                                this.$store.dispatch('getCart');
                            },1500)
                            return localStorage.setItem('tempBasket', JSON.stringify(tempBasket))
                        }
                        this.result.status = 1
                        this.result.message = "Produit ajouté au panier"
                        setTimeout(() => {
                            this.result.status = null
                            this.result.message = null
                            this.$store.dispatch('getCart');
                        },1500)
                    }
                }
                else{
                    this.result.status = 0
                    this.result.message = "Tous les champs sont obligatoire"
                    setTimeout(() => {
                        this.result.status = null
                        this.result.message = null
                    },1500)
                }
            }
    },
    computed:{
      CurrentProduct(){
        return this.$store.getters.product
      },
      CurrentBrand(){
        return this.$store.getters.EveryBrands;
      },
    },
    created: function(){
        this.$store.dispatch('getProduct',{id: this.$route.params.id})
    }
}
</script>
<style>
.empty{
    width: 100vw;
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
