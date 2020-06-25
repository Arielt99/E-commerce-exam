<template>
  <div class="newsAdmin">
    <p>newsAdmin</p>
    <button type="button" @click="showModal"> ajouter </button>
    <table class="adminnewslist">
      <thead>
          <tr>
              <th>Id</th>
              <th>image</th>
              <th>title</th>
              <th>resume</th>
              <th>content</th>
              <th>author</th>
              <th>posted_at</th>
              <th>Action</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="news in AdminNews" :key="news.id"  >
              <td>{{news.id}}</td>
              <td><img :src="news.image"/></td>
              <td>{{news.title}}</td>
              <td>{{news.resume}}</td>
              <td>{{news.content}}</td>
              <td>{{news.author}}</td>
              <td>{{news.posted_at}}</td>
              <td>
                <button type="button">modifier</button>
                <button type="button">X</button>
              </td>
          </tr>
      </tbody>
    </table>
      <AddNewsModal v-show="isAddNewsModalVisible" @closeAddNews="closeAddNewsModal"/>
  </div>
</template>
<script>
import AddNewsModal from '../../components/AddNewsModal'
export default {
  name: 'NewsAdmin',
      data (){
      return {
        isAddNewsModalVisible : false,
      }
    },
    components:{
      AddNewsModal
    },
    methods:{
      getNewsAdminList(){
          this.$store.dispatch('getNewsAdminList');
      },
      showModal() {
        this.isAddNewsModalVisible = true;
      },
      closeAddNewsModal() {
        this.isAddNewsModalVisible = false;
      },
    },
    computed:{
        AdminNews(){
            return this.$store.getters.EveryAdminNews;
        },
    },
    created: function(){
      if(this.$store.getters.EveryAdminNews.length == 0){
        this.getNewsAdminList()
      }
    },
}
</script>
<style>
.newsAdmin{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.adminnewslist{
  max-width: 100vw;
}
.adminnewslist img{
  object-fit: cover;
  width: 100px;
  height: auto;
}
table{
  width: 90vw;
}
</style>