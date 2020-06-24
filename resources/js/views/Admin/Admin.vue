<template>
  <div class="Admin">
    <p>Admin</p>
    
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data (){
    return{

    }
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