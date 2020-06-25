<template>
  <div class="BrandAdmin">
    <p>BrandAdmin</p>
    <button type="button" @click="showModal"> ajouter </button>
    <table class="adminbrandlist">
      <thead>
          <tr>
              <th>Id</th>
              <th>Logo</th>
              <th>Name</th>
              <th>Banner</th>
              <th>Description</th>
              <th>Action</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="brand in AdminBrands" :key="brand.id"  >
              <td>{{brand.id}}</td>
              <td><img :src="brand.image"/></td>
              <td>{{brand.name}}</td>
              <td><img :src="brand.banner"/></td>
              <td>{{brand.description}}</td>
              <td>
                <button type="button">modifier</button>
                <button type="button" @click="del(brand.id)">X</button>
              </td>
          </tr>
      </tbody>
    </table>
    <AddBrandModal       v-show="isAddBrandModalVisible"
      @closeAddBrand="closeAddBrandModal"/>
  </div>
</template>
<script>
import AddBrandModal from '../../components/AddBrandModal'
export default {
  name: 'BrandAdmin',
      data (){
      return {
        isAddBrandModalVisible : false,
      }
    },
    components:{
        AddBrandModal
    },
    methods:{
      getBrandAdminList(){
          this.$store.dispatch('getBrandAdminList');
      },
      showModal() {
        this.isAddBrandModalVisible = true;
      },
      closeAddBrandModal() {
        this.isAddBrandModalVisible = false;
      },
      del(id){
        if ( confirm( "Vous êtes sûr ?" ) ) {
        // Code à éxécuter si le l'utilisateur clique sur "OK" deleteBrand
        this.$store.dispatch('deleteBrand',{id: id})
        }
      }
    },
    computed:{
        AdminBrands(){
            return this.$store.getters.EveryAdminBrands;
        },
    },
    created: function(){
      if(this.$store.getters.EveryAdminBrands.length == 0){
          this.getBrandAdminList()
      }
    },
}
</script>
<style>
.BrandAdmin{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.adminbrandlist{
  max-width: 100vw;
}
.adminbrandlist img{
  object-fit: cover;
  width: 100px;
  height: auto;
}
table{
  width: 90vw;
}
</style>