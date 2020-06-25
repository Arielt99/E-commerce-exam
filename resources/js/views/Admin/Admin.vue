<template>
  <div class="Admin">
    <div v-if="EveryAdminBrands">
      <p> {{EveryAdminBrands.length}} Marque{{ EveryAdminBrands.length > 1  ?  's' : ' '}} </p>
    </div>
    <div v-if="EveryAdminProducts">
      <p> {{EveryAdminProducts.length}} Produit{{ EveryAdminProducts.length > 1  ?  's' : ' '}} </p>
    </div>
    <div v-if="EveryAdminNews">
      <p> {{EveryAdminNews.length}} actualité{{ EveryAdminNews.length > 1  ?  's' : ' '}} </p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Admin',
  data (){
    return{

    }
  },
  computed:{
    EveryAdminBrands(){
      return this.$store.getters.EveryAdminBrands;
    },
    EveryAdminProducts(){
      return this.$store.getters.EveryAdminProducts;
    },
    EveryAdminNews(){
      return this.$store.getters.EveryAdminNews;
    },
  },
  methods:{
    getBrandAdminList(){
        this.$store.dispatch('getBrandAdminList');
    },
    getProductAdminList(){
      this.$store.dispatch('getProductAdminList');
    },
    getNewsAdminList(){
      this.$store.dispatch('getNewsAdminList');
    },
},
created: function(){
    if(this.$store.getters.EveryAdminBrands.length == 0){
        this.getBrandAdminList()
    }
    if(this.$store.getters.EveryAdminProducts.length == 0){
      this.getProductAdminList()
    }
    if(this.$store.getters.EveryAdminNews.length == 0){
      this.getNewsAdminList()
    }
  }
}

</script>