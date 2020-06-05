<template>
  <div class="Product" v-if="this.CurrentProduct[0]">
    <h1>{{this.CurrentProduct[0].name}}</h1>
    <img :src="this.CurrentProduct[0].principal_image"/>
    <p>{{this.CurrentProduct[0].price}} €</p>
    <p>{{CurrentBrand[0].name}}</p>
  </div>
</template>

<script>
export default {
    data (){
      return {
      }
    },
    methods:{
    },
    computed:{
        CurrentProduct(){
          return this.$store.getters.product
        },
        CurrentBrand(){
            return this.$store.getters.EveryBrands.filter(brand =>
              brand.id === this.CurrentProduct[0].brand_id
            )
        },
    },
    created: function(){
        this.$store.dispatch('getProduct',{id: this.$route.params.id})
    }
}
</script>