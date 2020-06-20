<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <input type="text" v-model="searchContent" v-on:keyup.enter="search()" placeholder="barre de recherche"><button type="button" @click="search()">search</button>|
      <router-link to="/Brand">Catalogue</router-link> |
      <router-link to="/News">News</router-link> |
      <router-link to="/Contact">Contact</router-link> |
      <router-link to="/Cart">Panier</router-link>
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
.product-list{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>