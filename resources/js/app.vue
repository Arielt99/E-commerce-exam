<template>
  <div id="app">
    <div id="clientNav" v-if="!this.$route.meta.requiresAuth">
        <router-link to="/" class="logo">
            <img src="https://res.cloudinary.com/dourdjhqe/image/upload/v1592668041/basicImg/Sneak-Heir-logo-black_2000x1225_j8ixjh.png" alt="logo">
        </router-link>
        <div class="search">
            <input type="text" v-model="searchContent" v-on:keyup.enter="search()" placeholder="barre de recherche">
            <button type="button" @click="search()"><i class="fa fa-search"></i></button>
        </div>
        <div class="Nav">
        <router-link to="/home">Home</router-link>
        <router-link to="/Brand">Catalogue</router-link>
        <router-link to="/News">News</router-link>
        <router-link to="/Contact">Contact</router-link>
        <div v-click-outside="hide" v-if="!this.$route.meta.requiresCart">
        <div class="cartIcon" @click="toggle"><i class="fa fa-shopping-cart"></i></div>
            <div class="cartDropDown" v-show="CartIsOpen">
                <div class="CartContent">
                    <div class="CartProduct" v-for="(item,index) in getterCart.basket" :key="index">
                        <input type="number" class="quantity" @change="changeQuantity(item.id,item.size, item.quantity)" v-model="item.quantity" min="1">
                        <div class="littleImgPreview">
                            <img :src="item.product.principal_images" :alt="item.product.name"/>
                        </div>
                        <p>{{ item.product.name }}</p>
                        <div>
                            <p>{{ item.color }}</p>
                            <p>&nbsp;en {{ item.size }}</p>
                        </div>
                        <div class="UnitPrice">
                            <p>{{ item.product.price}} €/u</p>
                            <p class="del" @click="deleteProduct(item.id, item.size)">X</p>
                        </div>
                    </div>
                </div>
                <div class="BottomCartMarkdown">
                    <p class="TotalPrice">total : {{getterTotalPrice}} €</p>
                    <router-link class="Command" :to="{ name: 'Command' }" v-if="this.getterTotalPrice != 0" exact>Valider et payer</router-link>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div id="adminNav" v-if="this.$route.meta.requiresAuth">
      <router-link to="/" class="logo">
          <img src="https://res.cloudinary.com/dourdjhqe/image/upload/v1592668041/basicImg/Sneak-Heir-logo-black_2000x1225_j8ixjh.png" alt="logo">
      </router-link>
      <div class="Nav">
      <router-link to="/admin">dashboard</router-link>
      <router-link to="/BrandAdmin">brands</router-link>
      <router-link to="/ProductAdmin">products</router-link>
      <router-link to="/NewsAdmin">News</router-link>
      <button type="button" @click="deconnection">deconnect</button>
      </div>
    </div>
    <router-view class="appContent"/>
    <div v-if="loading" class="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
    <div class="footer"> © 2020 École webstart </div>
  </div>
</template>
<script>
import ClickOutside from 'vue-click-outside'
export default {
    data (){
      return {
        searchContent:null,
        CartIsOpen: false,
      }
    },
    methods:{
        search(){
            if(this.searchContent != this.$route.params.search && this.searchContent.length != 0){
            this.$router.push('/Result/'+this.searchContent)
            }
        },
        toggle(){
            this.CartIsOpen = !this.CartIsOpen;
        },
        hide(){
            this.CartIsOpen = false;
        },
        deconnection(){
            this.$store.dispatch('signOut').then(()=>{
                this.$router.replace({name:'Home'})
            })
        },
        getBrandList(){
            this.$store.dispatch('getBrandList');
        },
        getProductList(){
            this.$store.dispatch('getProductList');
        },
        getNewsList(){
            this.$store.dispatch('getNewsList');
        },
        getBasket(){
            this.$store.dispatch('getCart');
        },
        changeQuantity(id, size, quantity) {
            let obj = {
                id: id,
                size: size,
                newQuantity: quantity
            }
            this.$store.dispatch('modifyQuantity', obj);
            this.$store.dispatch('getCart');
            this.newQuantity = null
        },
        deleteProduct(id, size){
            this.getterCart.basket.forEach(element => {
                if (element.id === id && element.size === size) {
                    this.getterCart.basket.splice(this.getterCart.basket.indexOf(element), 1)
                    localStorage.setItem('tempBasket',JSON.stringify(this.getterCart))
                    this.$store.dispatch('getCart');
                }
                if (this.getterCart.basket.length === 0){
                    localStorage.removeItem('tempBasket')
                    this.$store.dispatch('getCart');
                }
            })
        },
    },
    computed:{
        loading(){
            return this.$store.getters.loading
        },
        getterCart(){
            return this.$store.getters.getterCart
        },
        getterTotalPrice(){
            return this.$store.getters.getterTotalPrice
        },
    },
    watch:{
    },
    directives: {
        ClickOutside
    },
    created: function(){
        if(this.$store.getters.EveryBrands.length == 0){
            this.getBrandList()
        }
        if(this.$store.getters.EveryProducts.length == 0){
          this.getProductList()
        }
        if(this.$store.getters.EveryNews.length == 0){
          this.getNewsList()
        }
        if(this.$store.getters.getterCart.length == 0){
          this.getBasket()
        }
    }
}
</script>
<style>
#app{
  position: relative;
  min-height:100vh;
}
body{
  color:  rgb(48, 48, 48);
  margin: 0;
  font-family: sans-serif;
  background-color: rgb(241, 241, 241);
}
#clientNav, #adminNav{
  z-index: 100000;
  position: fixed;
  height: 10vh;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  background-color: white;
  width: 100%;
  border-bottom: 0.5px solid lightgray;
  align-items: center ;
  justify-content: space-between;
}
.router-link-exact-active{
  background-color: rgb(241, 241, 241);
  border-radius: 10px;
}
#clientNav .Nav a, #adminNav .Nav a{
  color: rgb(48, 48, 48);
  text-decoration: none;
  padding: 10px 20px;
}
.logo{
    height: 100%;
    width: 100px;
    display: flex;
    align-content: flex-start;
    padding-left: 20px;
}
#clientNav .cartIcon{
    display: flex;
    align-content: center;
    align-items: center;
    padding: 10px 20px;
    margin: 0px 10px;
}
#clientNav .cartIcon:hover{
  background-color: rgb(241, 241, 241);
  border-radius: 10px;
  cursor: pointer;
}
#clientNav .cartIcon i{
    transform: scale(1.5,1.5);
    color: rgb(48, 48, 48);
    padding-bottom: 1px;
}
#clientNav .search{
    border-radius: 5px;
    background-color :rgb(230, 230, 230);
    min-width: 212px;
    width: 30vw;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-left: 10vw;
}
#clientNav .search input{
  width: 30vw;
  font-weight: bold;
  background-color :transparent;
  border: none;
  padding: 10px 0px 10px 15px;
}
#clientNav .search input[type=text]:focus{
  font-weight: bold;
  outline: none;
}
#clientNav .search input::placeholder{
  color: rgb(105, 105, 105);
  font-weight: bold;
}
#clientNav .search button{
  background-color :transparent;
  border: none;
}
.Nav{
  display: flex;
  margin-right: 10px ;
}
.logo img{
  width: auto;
  height: 100%;
  object-fit: cover;
}
.cartDropDown{
    overflow: hidden;
    z-index: 1000;
    position: fixed;
    right: 10px;
    top:12vh;
    height: auto;
    width: 30vw;
    min-width: 450px;
    height: 50vh;
    background-color: white;
    border-radius: 10px;
    border: 1px solid rgb(48, 48, 48);
}
.cartDropDown .CartContent{
    height: 41vh;
    overflow: auto;
    padding-top: 1vh;
}
.cartDropDown .CartContent .CartProduct{
    position: relative;
    padding: 15px 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 15px ;
    font-weight: bold;
    height: 50px;
    margin: 0px 10px;
    border-top: 1px solid rgb(48, 48, 48) ;
}
.cartDropDown .CartContent .CartProduct .UnitPrice{
    position: absolute;
    right: 0;
    margin-top: auto;
    margin-bottom: auto;
    display: flex;
    flex-direction: row;
    align-items: center ;
}
.cartDropDown .CartContent .CartProduct .UnitPrice .del{
    padding:5px;
    margin-left: 10px;
}
.cartDropDown .CartContent .CartProduct .UnitPrice .del:hover{
    background-color: rgb(241, 241, 241);
    border-radius: 10px;
    cursor: pointer;
}
.cartDropDown .CartContent .CartProduct:first-child{
    border-top: none;
}
.cartDropDown .CartContent .CartProduct .littleImgPreview{
    height: 100%;
    padding-right: 15px ;
}
.cartDropDown .CartContent .CartProduct .littleImgPreview img{
    width: auto;
    height: 100%;
    object-fit: cover;
}
.cartDropDown .CartContent .CartProduct input[type=number]{
    height: 50%;
    font-size: 100%;
    width: 35px;
    border:none;
    outline: none;
}
.cartDropDown .CartContent .CartProduct input[type=number]:active{
    border:none;
    outline: none;

}
.cartDropDown .BottomCartMarkdown{
    position: fixed;
    top: 54vh;
    height: 8vh;
    width: 30vw;
    min-width: 450px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bolder;
    border-top: 1px solid rgb(48, 48, 48);
}
.cartDropDown .TotalPrice{
    padding: 0px 20px;
}
.cartDropDown .Command{
    padding: 0px 20px;
    font-size: 15px;
    background-color: none;
}
.cartDropDown .command:hover{
    background-color: transparent;
}
.cartDropDown .router-link-exact-active{
    background-color: transparent !important;
}
.footer{
  background: rgb(48, 48, 48);
  color: white;
  position:absolute;
  bottom:0;
  width:100%;
  height:50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.appContent{
  padding-top: 10vh;
  padding-bottom: 60px;
}
/* width */
::-webkit-scrollbar {
  background: rgb(241, 241, 241);
  width: 5px;
}
/* Track */
::-webkit-scrollbar-track {
  border-radius: 2px;
  background: rgb(241, 241, 241);
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(48, 48, 48);
  border-radius: 2px;
}
  .loading {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
