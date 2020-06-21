<template>
  <div class="Home">
    <h2>random product list</h2>
    <div class="product-list" v-if="this.RandomProducts[0]">
      <ProductCard v-for="product in RandomProducts" :key="product.id" v-bind:emitedProduct="product"/>
    </div>
    <h2>last article</h2>
    <div class="news-list" v-if="this.News[0]">
      <NewsCard v-for="News in News.slice(0, 5)" :key="News.id" v-bind:emitedNews="News"/>
    </div>
  </div>
</template>
<script>
import ProductCard from "../components/PoductCard";
import NewsCard from "../components/NewsCard";
export default {
    data (){
      return {
      }
    },
    components:{
      ProductCard,
      NewsCard
    },
    computed:{
      RandomProducts(){
        return this.$store.getters.RandomProducts;
      },
      News(){
        return this.$store.getters.EveryNews;
      },
    },
    methods:{
      getRandomProductList(){
        this.$store.dispatch('getRandomProductList');
      },
    },
    created: function(){
        if(this.$store.getters.RandomProducts.length == 0){
          this.getRandomProductList()
        }
    }
}
</script>