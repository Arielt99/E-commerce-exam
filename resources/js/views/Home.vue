<template>
  <div class="Home">
    <NewsHead class="NewsHeadCard" v-if="this.News[0]" v-bind:emitedNews="News[0]"/>
    <div class="news-list" v-if="this.News[0]">
        <NewsCard v-for="OneNews in News.slice(1, 5)" :key="OneNews.id" v-bind:emitedNews="OneNews"/>
    </div>
    <h2>Notre selection</h2>
    <carousel :autoplay="true" :scrollPerPage="false" :paginationEnabled="false" :perPage="3" :navigationEnabled="true" :loop="true" :autoplayTimeout="5000" class="productSlider" v-if="this.RandomProducts[0]">
        <slide class="slide" v-for="product in RandomProducts" :key="product.id">
            <ProductCard v-bind:emitedProduct="product"/>
        </slide>
    </carousel>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';
import ProductCard from "../components/PoductCard";
import NewsCard from "../components/NewsCard";
import NewsHead from "../components/NewsHead";
export default {
    data (){
      return {
      }
    },
    components:{
      ProductCard,
      NewsCard,
      NewsHead,
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
.Home h2{
    margin-left: 3%;
}
.NewsHeadCard{
    margin-top: 20px;
}
.news-list{
  padding: 10px 0px;
  width: 100%;
  display: grid;
  grid-gap: 46px;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 300px);
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
