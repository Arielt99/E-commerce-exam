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
    <div id="navAdmin" v-if="this.$route.meta.requiresAuth">
      <router-link to="/">
        <div class="logo">
          <img src="https://res.cloudinary.com/dourdjhqe/image/upload/v1592668041/basicImg/Sneak-Heir-logo-black_2000x1225_j8ixjh.png" alt="logo">
        </div> 
      </router-link> |
      <router-link to="/Brand">brands</router-link> |
      <router-link to="/Product">products</router-link> |
      <router-link to="/News">News</router-link> |
      <button type="button" @click="deconnection">deconnect</button>
    </div>
    <router-view class="appContent"/>
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
body{
  margin: 0;
  font-family: sans-serif;
}
#app{
  background-color: rgb(241, 241, 241);
}
#clientNav{
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
#clientNav .Nav a{
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
  width: auto;
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

.appContent{
  padding-top: 10vh;
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
</style>