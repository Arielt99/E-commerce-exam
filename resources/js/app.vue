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
      <router-link to="/Cart">Panier</router-link>
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
export default {
    data (){
      return {
        searchContent:null,
      }
    },
    methods:{
      search(){
        if(this.searchContent != this.$route.params.search && this.searchContent.length != 0){
        this.$router.push('/Result/'+this.searchContent)
        }
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
    },
    computed:{
      loading(){
        return this.$store.getters.loading
      },
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
    }
}
</script>
<style>
#app{
  position: relative;
  min-height:100vh;
}
body{
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
#clientNav .search{
  border-radius: 5px;
  background-color :rgb(230, 230, 230);
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
  padding-bottom: 50px;;
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