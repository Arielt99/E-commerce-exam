<template>
    <RouterLink id="news" :to="'News/'+emitedNews.id">
        <img :src="emitedNews.image"/>
        <div class="item-resume">
            <h2>{{emitedNews.title}}</h2>
            <label>par {{emitedNews.author}}</label>
        </div>
    </RouterLink>
</template>

<script>
export default {
    name :"NewsCard",
    props:{
    emitedNews: Object
    },
    methods:{
    },
    computed:{
    }
    }
</script>
<style>
#news{
    --background: none;
    width: 300px;
    height: 300px;
    display: flex;
    position: relative;
    padding: 0 !important;
    overflow: hidden;
}
#news img{
    display: flex;
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
    object-fit: cover;
    position: absolute;
    z-index: 1;
    top:0;
    bottom:0;
    padding: 0;
    margin: 0;
}
.item-resume{
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    bottom:0;
    justify-content: flex-end;
    display: flex;
    flex-direction: column;
    background-color: rgba(48, 48, 48, 0.705);
    color:rgba(255, 255, 255, 0.90);
    -webkit-transition: opacity 0.2s ease-out;
    -moz-transition: opacity 0.2s ease-out;
    -o-transition: opacity 0.2s ease-out;
    transition: opacity 0.2s ease-out;
    opacity: 1;
}
.item-resume h2{
    padding-left: 10px;
    margin: 0;
}
.item-resume label{
    padding-left: 10px;
    padding-bottom: 10px;
}
.item-resume:hover{
    opacity: 0;
    cursor: pointer;
    -webkit-transition: opacity 0.2s ease-out;
    -moz-transition: opacity 0.2s ease-out;
    -o-transition: opacity 0.2s ease-out;
    transition: opacity 0.2s ease-out;
}
</style>
