<template>
  <div class="NewsPage">
    <div class="article" v-if="this.CurrentNews[0]">
        <div class="header">
            <img :src="this.CurrentNews[0].image" :alt="this.CurrentNews[0].title"/>
        </div>
        <div class="NewsContent">
            <h1>{{this.CurrentNews[0].title}}</h1>
            <label>{{this.CurrentNews[0].author}}</label><br>
            <label>{{configDateTime(this.CurrentNews[0].posted_at)}}</label>
            <p>{{this.CurrentNews[0].resume}}</p>
            <p>{{this.CurrentNews[0].content}}</p>
        </div>
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
          console.log( this.$moment(date).startOf('second').locale('fr-FR').fromNow())
        return this.$moment(date).startOf('second').locale('fr-FR').fromNow()
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
    margin-left: auto;
    margin-right: auto;
    width: 94%;
    border-radius: 10px;
}
.article .header{
    overflow: hidden;
    display: flex;
    width: 94%;
    margin-left: auto;
    margin-right: auto;
    height: 400px;
    padding: 0;
}
.article .header img{
    border-radius: 10px !important;
    margin-top: 20px;
    display: flex;
    width: 100%;
    height: auto;
    object-fit: cover;
}
.article .NewsContent{
    width: 94%;
    margin-left: auto;
    margin-right: auto;
    height: fit-content;
    padding-bottom: 10px;
}
.empty{
    width: 100vw;
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
