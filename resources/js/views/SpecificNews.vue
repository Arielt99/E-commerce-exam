<template>
  <div>
    <div class="News" v-if="this.CurrentNews[0]">
        <h1>{{this.CurrentNews[0].title}}</h1>
        <label>{{this.CurrentNews[0].author}}</label>
        <label>{{this.CurrentNews[0].posted_at}}</label>
        <img :src="this.CurrentNews[0].image"/>
      <p>{{this.CurrentNews[0].content}} €</p>
    </div>
    <div class="empty" v-if=" !this.CurrentNews[0]">
      <p> News indisponible </p>
    </div>
  </div>
</template>

<script>
export default {
    data (){
      return {
      }
    },
    methods:{
    },
    computed:{
        CurrentNews(){
          return this.$store.getters.EveryNews.filter(News =>
              News.id == this.$route.params.id
            )
        },
    },
}
</script>