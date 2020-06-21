<template>
  <div class="Catalog">
    <h1>Nos marques</h1>
    <div class="brand-list">
        <BrandCard class="Brand" v-for="brand in brands" :key="brand.id" v-bind:emitedBrand="brand"/>
    </div>
  </div>
</template>

<script>
import BrandCard from "../components/BrandCard";
export default {
    data (){
      return {
      }
    },
    components:{
        BrandCard
    },
    methods:{
    },
    computed:{
        brands(){
            return this.$store.getters.EveryBrands;
        },
    },
}
</script>
<style>
.brand-list{
  padding-top: 10px ;
  width: 100%;
  display: grid;
  grid-gap: 46px;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 400px);
}
</style>