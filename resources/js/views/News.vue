<template>
  <div class="news">
    <div class="news-list" v-if="this.News[0]">
      <NewsCard class="News" v-for="News in News" :key="News.id" v-bind:emitedNews="News"/>
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
<style>
.news-list{
  padding: 10px 0px;
  width: 100%;
  display: grid;
  grid-gap: 46px;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 300px);
}

</style>
