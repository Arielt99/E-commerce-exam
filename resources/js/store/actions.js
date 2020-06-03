import axios from "axios";

//getting all the brands
export const getBrandList = ({ commit })=>{
    axios.get('/api/brands')
    .then( response => {
        console.log(response.data)
        commit("getBrands", response.data)
    })
    .catch( error =>  {
        //console.log(error.response.data)
        alert("erreur du serveur, réessayez plus tard")
    })
}






//sending an e-email
export const sentMailContact = ({ commit }, {last_name, first_name, email, subject, message})=>{
    axios.post('h/api/contact', {last_name, first_name, email, subject, message})
    .then( response => {
        //console.log(response.data)
        alert("E-mail envoyé avec succès, nous vous repondrons dans les plus bref délais")
    })
    .catch( error =>  {
        //console.log(error.response.data)
        alert("erreur du serveur, réessayez plus tard")
    })
}