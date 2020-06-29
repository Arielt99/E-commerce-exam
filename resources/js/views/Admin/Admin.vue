<template>
  <div class="Admin">
    <div class="AdminResume" v-if="EveryAdminBrands">
      <p> {{EveryAdminBrands.length}} Marque{{ EveryAdminBrands.length > 1  ?  's' : ' '}} </p>
    </div>
    <div class="AdminResume" v-if="EveryAdminProducts">
      <p> {{EveryAdminProducts.length}} Produit{{ EveryAdminProducts.length > 1  ?  's' : ' '}} </p>
    </div>
    <div class="AdminResume" v-if="EveryAdminNews">
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
<style>
.Admin{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
.Admin .AdminResume{
    margin-top: 20px;
    min-width: 300px;
    height: 200px;
    border-radius: 10px;
    font-size: 40px;
    font-weight: bolder;
    display: flex;
    align-items: center;
    color: rgb(48, 48, 48);
    background-color: rgb(230, 230, 230);
}
.Admin .AdminResume p{
    padding : 20px
}
</style>
