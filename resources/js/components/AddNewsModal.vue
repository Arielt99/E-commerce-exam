<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Ajouter une News
            <button type="button" class="btn-close" @click="close" aria-label="Close modal">x</button>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <label for="logo"> logo :
                <input  type="file" name="logo">
            </label>
            <label for="name"> nom :
                <input v-model="Name" type="text" name="name">
            </label>
            <label for="banner"> bannière :
                <input  type="file" name="banner">
            </label>
            <label for="description"> description :
                <textarea v-model="Description" name="description"></textarea>
            </label>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn-green" aria-label="Add Brand">Ajouter</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'modal',
    data (){
      return {
        Image:"",
        Name:"",
        Banner:"",
        Description:"",
        message:""
      }
    },
    methods: {
      close() {
        this.$emit('closeAddNews');
      },
    //  AddLogo(file){
    //       this.Image = file.target.files[0]
    //   },
    //   AddBanner(file){
    //       this.Banner = file.target.files[0]
    //   },
    //   AddBrand(){
    //       let formData = new FormData();
    //             formData.append('image', this.Image);
    //             formData.append('name', this.Name);
    //             formData.append('banner', this.Banner);
    //             if (this.Description != null){
    //                 formData.append('description', this.Description);
    //             }
    //     var data = {logo: this.Logo, name: this.Name, banner: this.Banner, description: this.Description}
    //     this.$store.dispatch('createBrand', formData);
    //     this.$emit('closeAddBrand');
    //   },
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
</style>