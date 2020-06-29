<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Modifier une News
            <button type="button" class="btn-close" @click="close" aria-label="Close modal">x</button>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <label for="image"> image :
                <input v-on:change="AddImage" type="file" name="image">
            </label>
            <label for="title"> title :
                <input v-model="emitedNews.title" type="text" name="title">
            </label>
            <label for="resume"> resume :
                <textarea v-model="emitedNews.resume" name="resume"></textarea>
            </label>
            <label for="content"> description :
                <textarea v-model="emitedNews.content" name="content"></textarea>
            </label>
            <label for="releaseDate"> releaseDate :
                <input type="datetime-local" v-model="newsDate" :min="emitedNewsDate" name="releaseDate">
            </label>
            <label> isActive :
              <label class="switch">
                <div class="onoffswitch" @click='onToggle()'>
                    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" tabindex="0" :checked="active == 1">
                    <label class="onoffswitch-label" for="myonoffswitch">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                    </label>
                </div>
            </label>
            </label>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn-green" @click="UpdateNews(emitedNews.id)" aria-label="Update News">Modifier</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'UpdateNewsModal',
    data (){
      return {
        ImageNews:"",
        newsDate:"",
        active: ""
      }
    },
    props:{
        emitedNews: Object,
        emitedNewsDate: String,
        emitedNewsIsActive : Number
    },
    methods:{
        onToggle(){
            if (this.active == 1){
                this.active = 0
            }
            else if(this.active == 0){
                this.active = 1
            }
            return this.active
        },
        close() {
          this.active = this.emitedNewsIsActive
          this.$emit('closeUpdateNews');
        },
        AddImage(file){
          this.ImageNews = file.target.files[0]
        },
        UpdateNews(id){
          let formData = new FormData();
          formData.append('title', this.emitedNews.title);
          formData.append('resume', this.emitedNews.resume);
          formData.append('content', this.emitedNews.content);
          formData.append('releaseDate', this.newsDate);
          formData.append('isActive',this.active);
          if (this.ImageNews != null){
          formData.append('image', this.ImageNews);
          }
          this.$store.dispatch('updateNews', {id: id, object: formData});
          this.$emit('closeUpdateNews');
        },
    },
      watch: {
        emitedNewsIsActive() {
            this.active = this.emitedNewsIsActive
        },
        emitedNewsDate() {
            this.newsDate = this.emitedNewsDate
        },
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
