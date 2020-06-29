<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modalModifProduct" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Modifier un produit
            <button type="button" class="btn-close" @click="close" aria-label="Close modal">x</button>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <label for="name"> Name :
                <input v-model="emitedProduct.name" type="text" name="name">
            </label>
            <label for="PrincipalImage"> Principal Image :
                <input v-on:change="AddPrincipalImage" type="file" name="PrincipalImage">
            </label>
            <label for="Brand"> Brand :
                <select name="Brand" v-model="emitedProduct.brand_id">
                    <option :value="null">Choisir la marque</option>
                    <option v-for="brand in AdminBrands" :key="brand.id" :value="brand.id">{{brand.name}}</option>
                </select>
            </label>
            <label for="price"> Price :
                <input v-model="emitedProduct.price" type="number" name="price">€
            </label>
            <label for="color"> Color :
                <input v-model="emitedProduct.color" type="text" name="color">
            </label>
            <label for="description"> Description :
                <textarea v-model="emitedProduct.description" name="description"></textarea>
            </label>
            <label> isActive :
              <label class="switch">
                <div class="onoffswitch" @click='onToggle()'>
                    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" tabindex="0" :checked="activeProduct == 1">
                    <label class="onoffswitch-label" for="myonoffswitch">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                    </label>
                </div>
            </label>
            </label>
            <div class="carrousselProductEdit">
              <carousel :autoplay="true" :scrollPerPage="true" :centerMode="true" :paginationEnabled="false" :per-page="3" :navigationEnabled="true" :loop="true" :autoplayTimeout="5000">
                <slide class="slide" v-for="(secondary_image, index) in ActualSecondaryImage[0]" :key="secondary_image.id">
                  <div>
                    <div class="deleteImg" @click='deleteImg(secondary_image.id, index)'>x</div>
                  <img class="secondary_img" :src="secondary_image.image"/>
                  </div>
                </slide>
              </carousel>
            </div>
            <label for="SecondaryImage"> News Secondary Image :
                <input v-on:change="AddSecondaryImage" multiple type="file" name="SecondaryImage">
            </label>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn-green" @click="UpdateProduct(emitedProduct.id)" aria-label="Update Product" >Modifier</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'UpdateProductModal',
    data (){
      return {
        PrincipalImage:"",
        SecondaryImage:[],
        activeProduct: "",
        ActualSecondaryImage:[],
        toDelete:[],
      }
    },
    props:{
        emitedProduct: Object,
        emitedProductIsActive: Number,
        emitedProductSecondaryImages : Array,
    },
    methods:{
        onToggle(){
            if (this.activeProduct == 1){
                this.activeProduct = 0
            }
            else if(this.activeProduct == 0){
                this.activeProduct = 1
            }
            return this.activeProduct
        },
        close() {
          this.activeProduct = this.emitedProductIsActive
          this.$emit('closeUpdateProduct');
        },
        AddPrincipalImage(file){
            this.PrincipalImage = file.target.files[0]
        },
        AddSecondaryImage(files){
            let selectedFiles = files.target.files
            for (let i = 0; i < selectedFiles.length; i++)
            {
                this.SecondaryImage.push(selectedFiles[i])
            }
        },
        deleteImg(ProductId, place){
            this.toDelete.push(ProductId)
            this.ActualSecondaryImage[0].splice(place,1)
        },
        UpdateProduct(id){
        if (this.toDelete.length != 0){
            let deleteData = new FormData();
            for (let i = 0; i <= (this.toDelete.length)-1; i++) {
                deleteData.append('toDelete[]', this.toDelete[i]);
            }
        this.$store.dispatch('deleteImages',deleteData);
        }
        let formData = new FormData();
        if (this.PrincipalImage != null){
          formData.append('principal_images', this.PrincipalImage);
        }
        formData.append('name', this.emitedProduct.name);
        formData.append('brand_id', this.emitedProduct.brand_id);
        formData.append('description', this.emitedProduct.description);
        formData.append('price', this.emitedProduct.price);
        formData.append('color', this.emitedProduct.color);
        formData.append('isActive', this.activeProduct);
        if (this.SecondaryImage.length != 0){
            for (let i = 0; i <= this.SecondaryImage.length; i++) {
                formData.append('secondary_images[]', this.SecondaryImage[i]);
            }
        }
        this.$store.dispatch('updateProduct', {id: id, object: formData});
        this.$emit('closeUpdateProduct');
        },
        getBrandAdminList(){
            this.$store.dispatch('getBrandAdminList')
        },
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
      watch: {
        emitedProductIsActive() {
            this.activeProduct = this.emitedProductIsActive
        },
        emitedProductSecondaryImages(){
            this.ActualSecondaryImage.push(this.emitedProductSecondaryImages)
        }
    }


  };
</script>
<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modalModifProduct {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    margin-top: 10vh;
    flex-direction: column;
    width: 60vw;
    height: 85vh;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }
    .modalModifProduct textarea{
        width: 94%!important;
        margin-right: 3%!important;
        margin-left: 3%!important;
        min-height: 100px !important;
    }
  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
  .onoffswitch {
    position: relative; width: 100px;
    -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;
}
.onoffswitch-checkbox {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}
.onoffswitch-label {
    display: block; overflow: hidden; cursor: pointer;
    border: 2px solid #999999; border-radius: 20px;
}
.onoffswitch-inner {
    display: block; width: 200%; margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
}
.onoffswitch-inner:before, .onoffswitch-inner:after {
    display: block; float: left; width: 50%; height: 20px; padding: 0; line-height: 20px;
    font-size: 14px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
    box-sizing: border-box;
}
.onoffswitch-inner:before {
    content: "Active";
    padding-left: 10px;
    background-color: #34A7C1; color: #FFFFFF;
}
.onoffswitch-inner:after {
    content: "Inactive";
    padding-right: 10px;
    background-color: #EEEEEE; color: #999999;
    text-align: right;
}
.onoffswitch-switch {
    display: block; width: 20px; margin: 0px;
    background: #FFFFFF;
    position: absolute; top: 0; bottom: 0;
    right: 76px;
    border: 2px solid #999999; border-radius: 20px;
    transition: all 0.3s ease-in 0s;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
    margin-left: 0;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
    right: 0px;
}
.carrousselProductEdit{
    width: 90% !important;
    margin: 20px 0px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
}
.carrousselProductEdit > *{
  margin-left: auto;
  margin-right: auto;
  width: 80% !important;
}
.carrousselProductEdit .VueCarousel-slide > div {
    width: 90% !important;
    position: relative;
    height: auto;
}
.carrousselProductEdit .VueCarousel-slide div > img {
    width: 100% !important;
    height: auto;
}
.carrousselProductEdit .VueCarousel-slide .deleteImg {
    width: 18px;
    position: absolute;
    text-align: center;
    top: 5px;
    right: 5px;
    height: 18px !important;
    border: 1px solid white;
    border-radius: 10px;
    color: white;
    background-color: red;
    height: auto;
}
.carrousselProductEdit .VueCarousel-slide .deleteImg:hover{
    cursor: pointer;
}
.VueCarousel-slide {
    display: flex;
    justify-content: center;
}
</style>
