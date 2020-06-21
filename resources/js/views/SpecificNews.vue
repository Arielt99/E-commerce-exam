<template>
  <div class="NewsPage">
    <div class="article" v-if="this.CurrentNews[0]">
      <div class="header">
        <img :src="this.CurrentNews[0].image" :alt="this.CurrentNews[0].title"/>
      </div>
        <h1>{{this.CurrentNews[0].title}}</h1>
        <label>{{this.CurrentNews[0].author}}</label><br>
        <label>{{configDateTime(this.CurrentNews[0].posted_at)}}</label>
        <p>{{this.CurrentNews[0].content}}</p>
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
      configDateTime(date) {
        return this.$moment(date).startOf('second').subtract(2, 'hours').locale('fr-FR').fromNow()
      },
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
<style>
.article{
  background-color: rgb(255, 255, 255);
  margin: 0;
  margin-top: 20px;
}
.article .header{
  display: flex;
  width: 100%;
  height: 400px;
  padding: 0;
}
.article .header img{
  display: flex;
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>