<template>
    <li>
        <RouterLink :to="'brand/'+emitedBrand.id">
            <img :src="emitedBrand.image"/>
            <h2>{{emitedBrand.name}}</h2>
           <p>{{nbProducts.length}} produit{{ nbProducts.length > 1  ?  's' : ' '}}</p>
        </RouterLink>
    </li>
</template>

<script>
export default {
        name :"BrandCard",
        props:{
        emitedBrand: Object
        },
        methods:{
        },
        computed:{
            nbProducts(){
                return this.$store.getters.EveryProducts.filter(product =>
                 product.brand_id === this.emitedBrand.id
                )
            }
        }
}
</script>