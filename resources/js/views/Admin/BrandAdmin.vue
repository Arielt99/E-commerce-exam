<template>
  <div class="BrandAdmin">
    <p>Admin des Marques</p>
    <button type="button" class="AdminSupAction" @click="showAddModal"><i class="fa fa-plus fa-2x" aria-hidden="true"></i></button>
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
                <button type="button" class="AdminAction" @click="showUpdateModal(brand)"><i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></button>
                <button type="button" class="AdminAction" @click="del(brand.id)"><i class="fa fa-trash fa-lg" aria-hidden="true"></i></button>
              </td>
          </tr>
      </tbody>
    </table>
    <AddBrandModal v-show="isAddBrandModalVisible" @closeAddBrand="closeAddBrandModal"/>
    <UpdateBrandModal v-show="isUpdateBrandModalVisible" @closeUpdateBrand="closeUpdateBrandModal" v-bind:emitedBrand="this.brand"/>
  </div>
</template>
<script>
import AddBrandModal from '../../components/AddBrandModal'
import UpdateBrandModal from '../../components/UpdateBrandModal'
export default {
  name: 'BrandAdmin',
      data (){
      return {
        isAddBrandModalVisible : false,
        isUpdateBrandModalVisible : false,
        brand:{}
      }
    },
    components:{
        AddBrandModal,
        UpdateBrandModal
    },
    methods:{
      getBrandAdminList(){
          this.$store.dispatch('getBrandAdminList')
      },
      showAddModal() {
        this.isAddBrandModalVisible = true
      },
      showUpdateModal(brand) {
        this.brand = brand
        this.isUpdateBrandModalVisible = true
      },
      closeAddBrandModal() {
        this.isAddBrandModalVisible = false
      },
      closeUpdateBrandModal() {
        this.isUpdateBrandModalVisible = false
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
  border-collapse: collapse;
}
table, th, td {
  border: 1px solid black;
}
td{
  max-width: 25vw;
  text-align: center;
}
.AdminSupAction{
    margin-bottom: 10px;
    border : none;
    width: 50px;
    height: 50px;
    background-color :rgb(201, 201, 201);
    border-radius: 5px;
}
.AdminAction{
    border : none;
    width: 30px;
    height: 30px;
    background-color :rgb(201, 201, 201);
    border-radius: 5px;
}
.AdminSupAction:hover{
    cursor: pointer;
}
.AdminAction:hover{
    cursor: pointer;
}
.AdminSupAction:focus{
    outline: none;
}
.AdminAction:focus{
    outline: none;
}
</style>
