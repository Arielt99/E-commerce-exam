<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Ajouter un produit
            <button type="button" class="btn-close" @click="close" aria-label="Close modal">x</button>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <label for="name"> Name :
                <input v-model="Name" type="text" name="name">
            </label>
            <label for="PrincipalImage"> Principal Image :
                <input v-on:change="AddPrincipalImage" type="file" name="PrincipalImage">
            </label>
            <label for="Brand"> Brand :
                <select name="Brand" v-model="ProductBrand">
                    <option disabled :value="null">Choisir la marque</option>
                    <option v-for="brand in AdminBrands" :key="brand.id" :value="brand.id">{{brand.name}}</option>
                </select>
            </label>
            <label for="price"> Price :
                <input v-model="Price" type="number" name="price">€
            </label>
            <label for="color"> Color :
                <input v-model="Color" type="text" name="color">
            </label>
            <label for="description"> Description :
                <textarea v-model="Description" name="description"></textarea>
            </label>
            <label> isActive :
              <label class="switch">
                <div class="onoffswitch">
                    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" tabindex="0" v-model="IsActive">
                    <label class="onoffswitch-label" for="myonoffswitch">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                    </label>
                </div>
            </label>
            </label>
            <label for="SecondaryImage"> Secondary Image :
                <input v-on:change="AddSecondaryImage" multiple type="file" name="SecondaryImage">
            </label>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn-green" aria-label="Add Product" @click="AddProduct">Ajouter</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'AddProductModal',
    data (){
      return {
        PrincipalImage:"",
        SecondaryImage:[],
        Name:"",
        ProductBrand:"",
        Description:"",
        Price:"",
        Color:"",
        IsActive:true,
      }
    },
    methods: {
        close() {
            this.$emit('closeAddProduct');
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
      AddProduct(){
        if(this.IsActive == true){
          this.IsActive = 1
          }
          else if(this.IsActive == false){
            this.IsActive = 0
          }
        let formData = new FormData();
        formData.append('principal_images', this.PrincipalImage);
        formData.append('name', this.Name);
        formData.append('brand_id', this.ProductBrand);
        formData.append('description', this.Description);
        formData.append('price', this.Price);
        formData.append('color', this.Color);
        formData.append('isActive',this.IsActive);
        for (let i = 0; i <= this.SecondaryImage.length; i++) {
            formData.append('secondary_images[]', this.SecondaryImage[i]);
        }
        this.$store.dispatch('createProduct', formData);
        this.$emit('closeAddProduct');
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

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 60vw;
    height: 75vh;
    flex-direction: column;
  }
    .modal textarea{
        width: 94%;
        margin-right: 3%;
        margin-left: 3%;
        min-height: 100px;
    }
  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
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
</style>
