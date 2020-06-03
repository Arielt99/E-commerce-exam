<template>
  <div class="Catalog">
    <h1>Nos marques</h1>
    <ul>
        <BrandCard v-for="brand in brands" :key="brand.index" v-bind:emitedBrand="brand"/>
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
        getBrandList(){
            this.$store.dispatch('getBrandList');
        },
    },
    computed:{
        brands(){
            return this.$store.getters.brands;
        },
    },
    created: function(){
        this.getBrandList()
    }
}
</script>