<template>
    <RouterLink id="brand" :to="'Brand/'+emitedBrand.id">
        <img class="brandLogo" :src="emitedBrand.image"/>
        <h2>{{emitedBrand.name}}</h2>
        <p>{{nbProducts.length}} produit{{ nbProducts.length > 1  ?  's' : ' '}}</p>
    </RouterLink>
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
<style>
#brand{
    color: rgb(48, 48, 48);
    text-decoration: none;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    width: 100%;
    height: auto;
    display: flex;
    margin: 0;
    align-items: center;
}
#brand:hover{
    -webkit-box-shadow: 0px 0px 7px 0px rgba(105,105,105,0.2);
    -moz-box-shadow: 0px 0px 7px 0px rgba(105,105,105,0.2);
    box-shadow: 0px 0px 7px 0px rgba(105,105,105,0.2);
}
#brand .brandLogo{
    display: flex;
    width: 75px !important;
    height: 75px;
    object-fit: cover;
    margin-left: 20px ;
}
#brand h2{
    display: flex;
    padding: 0px 10px;
    text-align: start;
    flex-wrap: wrap;
    width: 180px;
}
#brand p{
    padding-right: 10px;
    width: 90px !important;
    margin-left: auto;
    text-align: start;
    flex-wrap: wrap;
    display: flex;
}
</style>
