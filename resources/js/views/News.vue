<template>
  <div class="news">
    <h1>Les actualités trépidantes</h1>
    <div class="news-list" v-if="this.News[0]">
      <NewsCard v-for="News in News" :key="News.id" v-bind:emitedNews="News"/>
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
      NewsCard
    },
    computed:{
      News(){
        return this.$store.getters.EveryNews;
      },
    },
    methods:{
    },
}
</script>