<template>
  <div class="ProductAdmin">
    <p>ProductAdmin</p>
    <table>
    <thead>
        <tr>
            <th>Id</th>
            <th>principal image</th>
            <th>Name</th>
            <th>price</th>
            <th>Brand</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="product in AdminProducts" :key="product.id"  >
            <td>{{product.id}}</td>
            <td><img :src="product.images"/></td>
            <td>{{product.name}}</td>
            <td>{{product.price}} €</td>
            <td>{{CurrentBrand.filter(brand =>brand.id === product.brand_id)[0].name}}</td>
            <td>
              <button type="button">modifier</button>
              <button type="button">X</button>
            </td>
        </tr>
    </tbody>
</table>
  </div>
</template>

<script>
export default {
  name: 'ProductAdmin',
      data (){
      return {
      }
    },
    components:{
        
    },
    methods:{
      getProductAdminList(){
          this.$store.dispatch('getProductAdminList');
      },
    },
    computed:{
        AdminProducts(){
            return this.$store.getters.EveryAdminProducts;
        },
        CurrentBrand(){
          return this.$store.getters.EveryBrands;
        },
    },
    created: function(){
      if(this.$store.getters.EveryAdminProducts.length == 0){
          this.getProductAdminList()
      }
    },
}
</script>
<style>
table {
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid black;
}
</style>