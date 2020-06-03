<template>
  <div class="Contact">
    <h1> Nous contacter</h1>
    <form>
      <input type="text" v-model="last_name" placeholder="last_name">
      <input type="text" v-model="first_name" placeholder="first_name">
      <input type="text" v-model="email" placeholder="email">
      <input type="text" v-model="subject" placeholder="subject">
      <input type="text" v-model="message" placeholder="message">
      <button type="button" @click="send()">test</button>
    </form>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1312.1762293794682!2d2.3636126082747095!3d48.87055714482218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e0989542143%3A0x9384848c375ced98!2s%C3%89cole%20Webstart!5e0!3m2!1sfr!2sfr!4v1591205795725!5m2!1sfr!2sfr" width="800" height="400" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
    <p>addresse : 19 Rue Yves Toudic, 75010 Paris</p>
    <p>email : contact@ecole-webstart.com</p>
    <p>telephone : 0142419776</p>
  </div>
</template>
<script>

import { required, email } from 'vuelidate/lib/validators'
export default {
    data (){
      return {
        last_name:"",
        first_name:"",
        email:"",
        subject:"",
        message:""
      }
    },
    validations: {
    last_name: {required},
    first_name: {required},
    email: {
      required,
      email
    },
    subject: {required},
    message: {required}
  },
    methods:{
        send(){
          this.$v.$touch()
          if(this.$v.$invalid){
            alert("vous devez remplir tout les champs !")
          }
          else{
            this.$store.dispatch('sentMailContact', {last_name: this.last_name, first_name: this.first_name, email: this.email, subject: this.subject, message: this.message});
          }
        },
    }
}
</script>
