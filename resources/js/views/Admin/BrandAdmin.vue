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
    <BrandModal       v-show="isModalVisible"
      @close="closeModal"/>
  </div>
</template>
<script>
import BrandModal from '../../components/BrandModal'
export default {
  name: 'BrandAdmin',
      data (){
      return {
        isModalVisible : false,
      }
    },
    components:{
        BrandModal
    },
    methods:{
      getBrandAdminList(){
          this.$store.dispatch('getBrandAdminList');
      },
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
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
.adminbrandlist{
  max-width: 100vw;
}
</style>