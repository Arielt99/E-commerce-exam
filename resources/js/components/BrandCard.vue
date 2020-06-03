<template>
    <li>
        <img :src="emitedBrand.image"/>
        <h2>{{emitedBrand.name}}</h2>
    
    
    </li>
</template>

<script>
export default {
        name :"BrandCard.vue",
        props:{
        emitedBrand: Object
        },
        methods:{
        }
}
</script>