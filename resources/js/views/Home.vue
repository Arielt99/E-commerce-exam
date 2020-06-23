<template>
  <div class="Home">
    <h2>random product list</h2>
    <carousel :autoplay="true" :scrollPerPage="false" :paginationEnabled="false" :perPage="3" :navigationEnabled="true" :loop="true" :autoplayTimeout="5000" class="productSlider" v-if="this.RandomProducts[0]">
      <slide class="slide" v-for="product in RandomProducts" :key="product.id">
      <ProductCard v-bind:emitedProduct="product"/>
      </slide>
    </carousel>
    <h2>last article</h2>
    <div class="news-list" v-if="this.News[0]">
      <NewsCard v-for="News in News.slice(0, 5)" :key="News.id" v-bind:emitedNews="News"/>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';
import ProductCard from "../components/PoductCard";
import NewsCard from "../components/NewsCard";
export default {
    data (){
      return {
      }
    },
    components:{
      ProductCard,
      NewsCard,
      Carousel,
      Slide
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
<style>
.home{
  display: flex;
  justify-content: center;
}
.productSlider{
  width: 80vw;
  display: flex;
  margin: 0px auto ;
  cursor: grab;
}
.productSlider .slide{
  display: flex;
  justify-content: center;
}
.productSlider:active{
  cursor: grabbing;
}
</style>