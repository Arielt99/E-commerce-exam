<template>
  <div class="ProductAdmin">
    <p>Admin des Produits</p>
    <button type="button" class="AdminSupAction" @click="showAddModal"><i class="fa fa-plus  fa-2x" aria-hidden="true"></i></button>
    <table class="adminproductlist">
    <thead>
        <tr>
            <th>Id</th>
            <th>principal image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>price</th>
            <th>Color</th>
            <th>Is Active</th>
            <th>Description</th>
            <th>secondary image</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="product in AdminProducts" :key="product.id"  >
            <td>{{product.id}}</td>
            <td><img :src="product.principal_images"/></td>
            <td>{{product.name}}</td>
            <td>{{CurrentBrand.filter(brand =>brand.id === product.brand_id)[0].name}}</td>
            <td>{{product.price}} €</td>
            <td>{{product.color}}</td>
            <td>{{product.isActive == 1  ?  'Activé' : 'Désactivé'}}</td>
            <td>{{product.description}}</td>
            <td class="carroussel">
              <carousel :autoplay="true" :scrollPerPage="true" :centerMode="true" :paginationEnabled="false" :per-page="1" :navigationEnabled="true" :loop="true" :autoplayTimeout="5000">
                <slide class="slide" v-for="secondary_image in product.images" :key="secondary_image.id">
                  <img class="secondary_img" :src="secondary_image.image"/>
                </slide>
              </carousel>
            </td>
            <td>
              <button type="button" class="AdminAction" @click="showUpdateModal(product)"><i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></button>
              <button type="button" class="AdminAction" @click="del(product.id)"><i class="fa fa-trash fa-lg" aria-hidden="true"></i></button>
            </td>
        </tr>
    </tbody>
</table>
    <AddProductModal v-show="isAddProductModalVisible" @closeAddProduct="closeAddProductModal"/>
    <UpdateProductModal v-show="isUpdateProductModalVisible" @closeUpdateProduct="closeUpdateProductModal" v-bind:emitedProduct="this.product" v-bind:emitedProductSecondaryImages="this.product.images" v-bind:emitedProductIsActive="product.isActive==1  ?  1 : 0" />
  </div>
</template>

<script>
import AddProductModal from '../../components/AddProductModal'
import UpdateProductModal from '../../components/UpdateProductModal'

import { Carousel, Slide } from 'vue-carousel';
export default {
  name: 'ProductAdmin',
      data (){
      return {
        isAddProductModalVisible : false,
        isUpdateProductModalVisible: false,
        product:{},
      }
    },
    components:{
      AddProductModal,
      UpdateProductModal,
      Carousel,
      Slide,
    },
    methods:{
      getProductAdminList(){
          this.$store.dispatch('getProductAdminList');
      },
      showAddModal() {
        this.isAddProductModalVisible = true;
      },
      showUpdateModal(product) {
        this.product = product
        this.isUpdateProductModalVisible = true;
      },
      closeAddProductModal() {
        this.isAddProductModalVisible = false;
      },
      closeUpdateProductModal() {
        this.isUpdateProductModalVisible = false;
      },
      del(id){
        if ( confirm( "Vous êtes sûr ?" ) ) {
        // Code à éxécuter si le l'utilisateur clique sur "OK" deleteBrand
        this.$store.dispatch('deleteProduct',{id: id})
        }
      }
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
.ProductAdmin{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.adminproductlist{
  max-width: 100vw;
}
table {
  border-collapse: collapse;
}
.adminproductlist img{
  object-fit: cover;
  width: 100px;
  height: auto;
}
table, th, td {
  border: 1px solid black;
}
td{
  max-width: 25vw;
  text-align: center;
}
.carroussel{
  width: 25vw;
}
.carroussel > *{
  margin-left: auto;
  margin-right: auto;
  width: 20vw;
}

td .VueCarousel-slide > img {
    width: 18vw;
}
td .VueCarousel-slide {
    display: flex;
    justify-content: center;

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
