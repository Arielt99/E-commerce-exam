<template>
    <div class="Contact">
        <div class="ContactCard">
            <div class="MapAndForm">
                <iframe class="Maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1312.1762293794682!2d2.3636126082747095!3d48.87055714482218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e0989542143%3A0x9384848c375ced98!2s%C3%89cole%20Webstart!5e0!3m2!1sfr!2sfr!4v1591205795725!5m2!1sfr!2sfr" width="800" height="400" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                <div class="ContactForm">
                    <h1> Nous contacter</h1>
                    <form>
                        <div class="Sender">
                            <input type="text" :class='{"error" :$v.last_name.$error}' v-model.trim="$v.last_name.$model" placeholder="Nom">
                            <input type="text" :class='{"error" :$v.first_name.$error}' v-model.trim="$v.first_name.$model" placeholder="Prénom">
                        </div>
                        <div class="MailData">
                            <input type="text" :class='{"error" :$v.email.$error}' v-model.trim="$v.email.$model" placeholder="email">
                            <input type="text" :class='{"error" :$v.subject.$error}' v-model.trim="$v.subject.$model" placeholder="sujet">
                        </div>
                        <textarea :class='{"error" :$v.message.$error}' v-model.trim="$v.message.$model" placeholder="votre message"></textarea>
                        <div class="BottomForm">
                            <button type="button" @click="send()">Envoyer</button>
                            <div v-if="this.AlertMessage != null" class="added">
                                <label>{{AlertMessage}}</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="ContactInfo">
                <p>addresse : 19 Rue Yves Toudic, 75010 Paris</p>
                <p>email : contact@ecole-webstart.com</p>
                <p>telephone : 0142419776</p>
            </div>
        </div>
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
        message:"",
        AlertMessage:null
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
          if(!this.$v.$invalid){
            this.$store.dispatch('sentMailContact', {last_name: this.last_name, first_name: this.first_name, email: this.email, subject: this.subject, message: this.message});
            this.AlertMessage = "Message envoyé"
            setTimeout(() => {
                this.AlertMessage = null
            },1500)
          }
          else{
            this.AlertMessage = "Remplissez bien le formulaire"
            setTimeout(() => {
                this.AlertMessage = null
            },1500)
          }
        },
    }
}
</script>
<style>
    .Contact .error{
        border: 1px solid #b90000 !important;
        background-color: #ad5151 !important ;
    }
    .Contact .error::placeholder{
        color: white;
    }
    .Contact .ContactCard .MapAndForm .Maps{
        display: flex;
        height: 100%;
        width: 50%;
    }
    .Contact .ContactCard{
        width: 94%;
        margin-left: 3%;
        margin-right: 3% ;
        margin-top: 20px;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column !important;
    }
    .Contact .ContactCard .MapAndForm{
        height: 65vh;
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    .Contact .ContactCard .MapAndForm .ContactForm{
        display: flex;
        height: 100%;
        width: 50%;
        background-color: rgb(48, 48, 48);
        color: white;
        flex-direction: column;
    }
    .Contact .ContactCard .MapAndForm .ContactForm h1{
        padding: 0 5%;
        height: 10%;
    }
    .Contact .ContactCard .MapAndForm .ContactForm form{
        padding: 0 5%;
        height: 90%;
    }
    .Contact .ContactCard .MapAndForm .ContactForm form .Sender{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;
    }
    .Contact .ContactCard .MapAndForm .ContactForm form .MailData{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .Contact .ContactCard .MapAndForm .ContactForm form input:focus{
        font-weight: bold;
        outline: none;
    }
    .Contact .ContactCard .MapAndForm .ContactForm form .Sender input{
        display: flex;
        width: 40%;
        min-width: 150px;
    }
    .Contact .ContactCard .MapAndForm .ContactForm form input{
        background-color :rgb(230, 230, 230);
        font-weight: bold;
        padding-left: 5px;
        border: 1px solid rgb(230, 230, 230);
        height: 30px;
        border-radius: 5px;
        margin: 10px 0;
    }
    .Contact .ContactCard .MapAndForm .ContactForm form textarea{
        background-color :rgb(230, 230, 230);
        font-weight: bold;
        padding-left: 5px;
        width: 100%;
        border: 1px solid rgb(230, 230, 230);
        border-radius: 5px;
        margin: 10px 0;
        height: auto;
        height: 40%;
    }
    .Contact .ContactCard .MapAndForm .ContactForm form .BottomForm{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .Contact .ContactCard .MapAndForm .ContactForm form .BottomForm label{
        padding-left: 10px;
        display: flex;
    }
    .Contact .ContactCard .MapAndForm .ContactForm form button{
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        width: 100px;
        height: 30px;
        margin-top: auto;
        margin-bottom: auto;
        font-weight: bold;
        font-size: 15px;
        border: 1px solid rgb(230, 230, 230);
        background-color :rgb(230, 230, 230);
        color: rgb(48, 48, 48);
    }
    button:hover{
        cursor: pointer;
        background-color: rgb(148, 148, 148);
    }
    button:focus{
        outline: none;
    }
    textarea:focus{
        font-weight: bold;
        outline: none;
    }
    .Contact .ContactInfo{
        background-color: rgb(148, 148, 148);
        color:white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 10px 0px;
        font-size: 15px;
        font-weight: bold;
        width: 100%;
        height: 10vh;
        margin-top: auto;
        margin-bottom: auto;
    }
    .Contact .ContactInfo p{
        margin: 0;
        padding: 5px;
    }
</style>
