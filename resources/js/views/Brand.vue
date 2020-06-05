<template>
    <div>
        <div class="Brand" v-if=" this.CurrentBrand[0]">
            <h1>{{this.CurrentBrand[0].name}}</h1>
            <img :src="this.CurrentBrand[0].banner"/>
            <p>{{this.CurrentBrand[0].description}}</p>
            <h2>Les produits</h2>
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