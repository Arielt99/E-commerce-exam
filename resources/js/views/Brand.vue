<template>
    <div>
        <div class="Brand" v-if=" this.CurrentBrand[0]">
            <div class="header">
                <div class="brand-banner">
                    <h1>{{this.CurrentBrand[0].name}}</h1>
                    <img class="img-brand-banner" :src="this.CurrentBrand[0].banner"/>
                </div>
                <p class="brand-description">{{this.CurrentBrand[0].description}}</p>
            </div>
            <div class="product-list">
                <ProductCard v-for="product in productList" :key="product.id" v-bind:emitedProduct="product"/>
            </div>
        </div>
        <div class="empty" v-if=" !this.CurrentBrand[0]">
            <p> Marque indisponible </p>
        </div>
    </div>
</template>
<script>
import ProductCard from "../components/PoductCard";
export default {
    data (){
      return {
      }
    },
    components:{
        ProductCard
    },
    methods:{
    },
    computed:{
        productList(){
            return this.$store.getters.productList;
        },
        CurrentBrand(){
            return this.$store.getters.EveryBrands.filter(brand =>
                 brand.id == this.$route.params.id
            );
        }
    },
    created: function(){
        this.$store.dispatch('getBrandProductList',{id: this.$route.params.id})
    }
}
</script>
<style>
.Brand{
    margin-top: 20px;
}
.product-list{
    margin-top: 20px;
    width: 100%;
    display: grid;
    grid-gap: 46px;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, 250px);
}
.empty{
    width: 100vw;
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.Brand .header{
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: 94%;
    height: fit-content;
    padding: 0;
    flex-direction: column;
    background-color: white;
    border-radius: 10px;
}
.Brand .header .brand-banner{
    margin-top: 20px;
    display: flex;
    width: 94%;
    margin-left: auto;
    margin-right: auto ;
    border-radius: 10px;
    height: 400px !important;
    padding: 0;
    flex-direction: column;
    position: relative;
}
.Brand .header .brand-banner h1{
    position: absolute;
    bottom: 10%;
    width: 30%;
    margin:0;
    border-radius: 10px;
    text-align: center;
    color: white;
    padding: 10px 20px;
    background-color: rgb(48, 48, 48);
}
.Brand .header .brand-banner .img-brand-banner{
    border-radius: 10px;
    width: 100%;
    height: 400px;
    object-fit: cover !important;
}
.Brand .header .brand-description{
    width: 94%;
    margin-left: auto;
    margin-right: auto ;
    height: fit-content;
}
</style>
