<template>
  <div class="login">
    <h1> login</h1>
    <form>
      <input type="text" v-model="form.email" placeholder="email">
      <input type="login" v-model="form.password" placeholder="password">
      <button type="button" @click="send()">connect</button>
    </form>
  </div>
</template>
<script>

import { required, email } from 'vuelidate/lib/validators'
export default {
    data (){
      return {
        form:{
        email:"admin@webstart.fr",
        password:"password",
        }
      }
    },
    validations: {
    form: {required}
  },
    methods:{
        send(){
          this.$v.$touch()
          if(this.$v.$invalid){
            alert("vous devez remplir tout les champs !")
          }
          else{
            this.$store.dispatch('login', this.form)
          }
        },
    },
    computed:{
      user(){
        return this.$store.getters.user
      },
    },
    watch:{
      user(){
        this.$router.replace({name:'admin.dashboard'})
      }
    }
}
</script>
