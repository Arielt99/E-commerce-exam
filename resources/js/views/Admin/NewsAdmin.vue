<template>
  <div class="newsAdmin">
    <p>newsAdmin</p>
    <button type="button" @click="showAddModal"> ajouter </button>
    <table class="adminnewslist">
      <thead>
          <tr>
              <th>Id</th>
              <th>image</th>
              <th>title</th>
              <th>resume</th>
              <th>content</th>
              <th>author</th>
              <th>releaseDate</th>
              <th>IsActive</th>
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
              <td>{{news.releaseDate}}</td>
              <td>{{news.isActive}}</td>

              <td>
                <button type="button" @click="showUpdateModal(news)">modifier</button>
                <button type="button" @click="del(news.id)">X</button>
              </td>
          </tr>
      </tbody>
    </table>
      <AddNewsModal v-show="isAddNewsModalVisible" @closeAddNews="closeAddNewsModal"/>
      <UpdateNewsModal v-show="isUpdateNewsModalVisible" @closeUpdateNews="closeUpdateNewsModal" v-bind:emitedNews="this.news" v-bind:emitedNewsIsActive="news.isActive==1  ?  1 : 0" v-bind:emitedNewsDate="this.$moment(this.news.releaseDate).format('YYYY-MM-DD[T]HH:mm:ss')"/>
  </div>
</template>
<script>
import AddNewsModal from '../../components/AddNewsModal'
import UpdateNewsModal from '../../components/UpdateNewsModal'
export default {
  name: 'NewsAdmin',
      data (){
      return {
        isAddNewsModalVisible : false,
        isUpdateNewsModalVisible : false,
        news:{}
      }
    },
    components:{
      AddNewsModal,
      UpdateNewsModal
    },
    methods:{
      getNewsAdminList(){
          this.$store.dispatch('getNewsAdminList');
      },
      showAddModal() {
        this.isAddNewsModalVisible = true;
      },
      showUpdateModal(news) {
        this.news = news
        this.isUpdateNewsModalVisible = true;
      },
      closeAddNewsModal() {
        this.isAddNewsModalVisible = false;
      },
      closeUpdateNewsModal() {
        this.isUpdateNewsModalVisible = false;
      },
      del(id){
        if ( confirm( "Vous êtes sûr ?" ) ) {
        // Code à éxécuter si le l'utilisateur clique sur "OK" deleteBrand
        this.$store.dispatch('deleteNews',{id: id})
        }
      }
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