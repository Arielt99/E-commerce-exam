<template>
    <RouterLink :to="'News/'+emitedNews.id">
        <img :src="emitedNews.image"/>
        <h2>{{emitedNews.title}}</h2>
        <label>{{emitedNews.author}}</label>
        <p>{{emitedNews.resume}}</p>
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