<template>
  <div id="app">
    <div id="nav" v-if="!this.$route.meta.requiresAuth">
      <router-link to="/">
        <div class="logo">
          <img src="https://res.cloudinary.com/dourdjhqe/image/upload/v1592668041/basicImg/Sneak-Heir-logo-black_2000x1225_j8ixjh.png" alt="logo">
        </div> 
      </router-link> |
      <input type="text" v-model="searchContent" v-on:keyup.enter="search()" placeholder="barre de recherche"><button type="button" @click="search()">search</button>|
      <router-link to="/Brand">Catalogue</router-link> |
      <router-link to="/News">News</router-link> |
      <router-link to="/Contact">Contact</router-link> |
      <router-link to="/Cart">Panier</router-link>
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
    <router-view/>
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
#nav a{
  color: rgb(48, 48, 48);
  text-decoration: none;
}
.logo{
  height: 100px;
  width: 100px;
}
.logo img{
    width: 100%;
    height: auto;
    object-fit: cover;
}
</style>