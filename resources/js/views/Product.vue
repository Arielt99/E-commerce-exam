<template>
    <div>
        <div class="Product" v-if="this.CurrentProduct && this.ActualBrand">
            <div class="ProductVisu">
            <div class="CurrentImg">
                <img :src="this.CurrentImg"/>
            </div>
            <carousel :autoplay="true" :scrollPerPage="false" :mouseDrag="false" :paginationEnabled="false" :perPage="3" :navigationEnabled="true" :loop="true" :autoplayTimeout="5000" class="CurrentProductSlider">
                <slide class="slide">
                    <a href="#" @click="changeImg(CurrentProduct.principal_images)">
                        <img :src="this.CurrentProduct.principal_images"/>
                    </a>
                </slide>
                <slide class="slide" v-for="image in this.CurrentProduct.images" :key="image.id">
                    <a href="#" @click="changeImg(image.image)">
                        <img :src="image.image"/>
                    </a>
                </slide>
            </carousel>
            </div>
            <div class="ProductInfo">
                <h1 class="ProductName">{{this.CurrentProduct.name}}</h1>
                <p class="ProductColor">{{this.CurrentProduct.color}}</p>
                <p>{{this.CurrentProduct.description}}</p>
                <div class="ProductSize">
                    <label for="size">Taille : </label>
                    <select v-model.trim="$v.size.$model" id="size">
                        <option disabled value="null">Choisissez</option>
                        <option v-for="i in [38 ,39,40,41,42,43,45]" :value="i" :key="i">{{i}}</option>
                    </select>
                </div>
                <p class="ProductPrice">{{this.CurrentProduct.price}} €</p>
                <button type="button" @click="addToCart"> ajouter au panier</button>
                <div class="CartMessage">
                    <div v-if="result.status === 0" class="error">
                        {{result.message}}
                    </div>
                    <div v-if="result.status === 1" class="added">
                        {{result.message}}
                    </div>
                </div>
            </div>
        </div>
        <div class="empty" v-if=" !this.CurrentProduct">
            <p> Produit indisponible </p>
        </div>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { Carousel, Slide } from 'vue-carousel';
export default {
    data (){
      return {
        size:null,
        check:false,
        result:{
            status:null,
            message:null,
        },
        CurrentImg:'',
      }
    },
    components:{
        Carousel,
        Slide
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
                        id:this.CurrentProduct.id,
                        size: this.size,
                        quantity: 1,
                        product: this.CurrentProduct
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
                        if (element.size === this.size && element.id === this.CurrentProduct.id) {
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
                            id:this.CurrentProduct.id,
                            size: this.size,
                            quantity: 1,
                            product: this.CurrentProduct
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
                this.result.message = "Choisissez une taille"
                setTimeout(() => {
                    this.result.status = null
                    this.result.message = null
                },1500)
            }
        },
        changeImg(img){
            this.CurrentImg = img
        }
    },
    computed:{
      CurrentProduct(){
        return this.$store.getters.product
      },
      ActualBrand(){
        return this.$store.getters.EveryBrands
      },
    },
    watch:{
        CurrentProduct(){
            this.CurrentImg = this.CurrentProduct.principal_images
        }
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
.Product{
    margin-top: 20px;
    width: 60vw;
    min-width: 800px;
    margin-right: auto;
    margin-left: auto;
    height: 70vh;
    border-radius: 10px;
    background-color: white;
    display: flex;
}
.Product .ProductVisu{
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
.Product .ProductInfo{
    width: 50%;
    display: flex;
    flex-direction: column;
}
.Product .ProductInfo .ProductName{
    margin-bottom: 0;
}
.Product .ProductInfo .ProductColor{
    margin-top: 10px;
}
.Product .ProductInfo .ProductSize{
    display: flex;
    flex-direction: row;
}
.Product .ProductInfo .ProductSize select{
    margin-left: 5px;
    width: 100px;
}
.Product .ProductInfo .ProductPrice{
    margin-top: auto;
    font-size: 40px;
    font-weight: bolder;
}
.Product .ProductInfo button{
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    font-size: 25px;
    height: 50px;
    margin-top: 10px;
    border: 2px solid rgb(48, 48, 48);
    border-radius: 10px;
    color: rgb(48, 48, 48);
    font-weight: bolder;
    background-color: rgb(230, 230, 230);
    min-width: 200px;
}
.Product .ProductInfo button:hover{
    cursor: pointer;
    background: transparent;
}
.Product .ProductInfo button:focus{
    outline: none;
}
.Product .ProductInfo .CartMessage{
    height: 20px;
    margin-bottom: 13%;
    margin-right: auto;
    margin-left: auto;
}
.Product .CurrentImg{
    width: 80%;
    height: 60%;
}
.Product .CurrentImg img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
}
.CurrentProductSlider{
    width: 80%;
}
.CurrentProductSlider .slide{
    display: flex;
    width: 150px;
    height: 100px;
}
.CurrentProductSlider .slide img{
    display: flex;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
