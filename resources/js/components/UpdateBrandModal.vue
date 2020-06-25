<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Modifier une marque
            <button type="button" class="btn-close" @click="close" aria-label="Close modal">x</button>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <label for="logo"> logo :
                <input v-on:change="AddLogo" type="file" name="logo">
            </label>
            <label for="name"> nom :
                <input v-model="emitedBrand.name" type="text" name="name">
            </label>
            <label for="banner"> bannière :
                <input v-on:change="AddBanner" type="file" name="banner">
            </label>
            <label for="description"> description :
                <textarea v-model="emitedBrand.description" name="description"></textarea>
            </label>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn-green" @click="UpdateBrand(emitedBrand.id)" aria-label="Add Brand">Modifier</button>
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
        Image :"",
        Banner :""
      }
    },
    props:{
        emitedBrand: Object
    },
    methods: {
      close() {
        this.$emit('closeUpdateBrand');
      },
     AddLogo(file){
          this.Image = file.target.files[0]
      },
      AddBanner(file){
          this.Banner = file.target.files[0]
      },
      UpdateBrand(id){
        if (this.emitedBrand.name != null){
          let formData = new FormData();
          formData.append('name', this.emitedBrand.name);
          if (this.Banner != null){
            formData.append('banner', this.Banner);
          }
          if (this.Image != null){
            formData.append('image', this.Image);
          }
          formData.append('description', this.emitedBrand.description);
          var data = {logo: this.Image, name: this.emitedBrand.name, banner: this.Banner, description: this.emitedBrand.description}
          this.$store.dispatch('updateBrand',{id: id, object: formData});
          this.$emit('closeUpdateBrand');
        }
      },
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