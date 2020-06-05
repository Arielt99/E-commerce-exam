<template>
  <div class="Catalog">
    <h1>Nos marques</h1>
    <ul>
        <BrandCard v-for="brand in brands" :key="brand.id" v-bind:emitedBrand="brand"/>
    </ul>
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