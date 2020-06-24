import axios from "axios";

// client action
//getting all the brands
export const getBrandList = ({ commit })=>{
    axios.get('/api/brands')
    .then( response => {
        //console.log(response.data)
        commit("getBrandList", response.data)
    })
    .catch( error =>  {
        //console.log(error.response.data)
        alert("erreur du serveur, réessayez plus tard")
    })
}
//getting all the Products
export const getProductList = ({ commit })=>{
    axios.get('/api/products')
    .then( response => {
        //console.log(response.data)
        commit("getProductList", response.data)
    })
    .catch( error =>  {
        //console.log(error.response.data)
        alert("erreur du serveur, réessayez plus tard")
    })
}
//getting all the News
export const getNewsList = ({ commit })=>{
    axios.get('/api/news')
    .then( response => {
        //console.log(response.data)
        commit("getNewsList", response.data)
    })
    .catch( error =>  {
        //console.log(error.response.data)
        alert("erreur du serveur, réessayez plus tard")
    })
}
//getting all the Product of a brand
export const getBrandProductList = ({ commit },{id})=>{
    axios.get('/api/brands/'+id+'/products')
    .then( response => {
        //console.log(response.data)
        commit("getBrandProductList", response.data)
    })
    .catch( error =>  {
        //console.log(error.response.data)
        //alert("erreur du serveur, réessayez plus tard")
    })
}
//getting a specific product
export const getProduct = ({ commit },{id})=>{
    axios.get('/api/products/'+id)
    .then( response => {
        //console.log(response.data)
        commit("getProduct", response.data)
    })
    .catch( error =>  {
        //console.log(error.response.data)
        //alert("erreur du serveur, réessayez plus tard")
    })
}
//getting a list of random product
export const getRandomProductList = ({ commit })=>{
    axios.get('/api/products?sort=random&max=10')
    .then( response => {
        //console.log(response.data)
        commit("getRandomProductList", response.data)
    })
    .catch( error =>  {
        //console.log(error.response.data)
        alert("erreur du serveur, réessayez plus tard")
    })
}
//getting a specific product
export const search = ({ commit },{searchContent})=>{
    axios.get('/api/products?search='+searchContent)
    .then( response => {
        //console.log(response.data)
        commit("searchResponse", response.data)
    })
    .catch( error =>  {
        //console.log(error.response.data)
        //alert("erreur du serveur, réessayez plus tard")
    })
}
//sending an e-email
export const sentMailContact = ({ commit }, {last_name, first_name, email, subject, message})=>{
    axios.post('/api/contact', {last_name, first_name, email, subject, message})
    .then( response => {
        //console.log(response.data)
        alert("E-mail envoyé avec succès, nous vous repondrons dans les plus bref délais")
    })
    .catch( error =>  {
        //console.log(error.response.data)
        alert("erreur du serveur, réessayez plus tard")
    })
}


//admin action
//login admin
export const login = ({dispatch}, credentials)=>{
        axios.post('/api/auth/signin', credentials)
        .then(response =>{
            if(response){
                localStorage.setItem('token',response.data.token)
                return dispatch('attempt',response.data.token)
            }
        })
}
//check if connected
export const  attempt = ({commit,state}, token)=>{
    if (token) {
        commit('set_token', token)
    }
    if (state.token != null) {
        try {
            axios.get('/api/auth/me', {headers: {'Authorization': `Bearer ${state.token}`}})
                .then(response => {
                    commit('set_user', response.data)
                })
        }
        catch (e) {
            commit('set_token', null)
            commit('set_user', null)
        }
    }
}
//logout admin
export const signOut = ({commit,state})=>{
    if (state.token != null) {
    try {
        axios.post('/api/auth/signout',state.token, {headers: {'Authorization': `Bearer ${state.token}`}})
            .then(response =>{
                commit('set_token', null)
                commit('set_user', null)
                localStorage.removeItem('token')
            })
    }
    catch(e){
        console.log(e)
    }
    }
}
//getting all the brands, also the inactives ones
export const getBrandAdminList = ({ commit})=>{
    axios.get('/api/auth/AdminBrand',{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
    .then( response => {
        //console.log(response.data)
        commit("getBrandAdminList", response.data)
    })
    .catch( error =>  {
        //console.log(error.response.data)
        alert("erreur du serveur, réessayez plus tard")
    })
}
//getting all the products, also the inactives ones
export const getProductAdminList = ({ commit})=>{
    axios.get('/api/auth/AdminProduct ',{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
    .then( response => {
        //console.log(response.data)
        commit("getProductAdminList", response.data)
    })
    .catch( error =>  {
        //console.log(error.response.data)
        alert("erreur du serveur, réessayez plus tard")
    })
}
//getting all the news, also the inactives ones
export const getNewsAdminList = ({ commit})=>{
    axios.get('/api/auth/AdminNews ',{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
    .then( response => {
        //console.log(response.data)
        //commit("getBrandAdminList", response.data)
    })
    .catch( error =>  {
        //console.log(error.response.data)
        alert("erreur du serveur, réessayez plus tard")
    })
}
//add a brand
export const createBrand = ({commit,dispatch},object)=>{
    axios.post('/api/auth/AddBrand',object,{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
        .then( response => {
            dispatch('getBrandAdminList')
            alert('Marque ajoutée')
        })
        .catch(error =>{
            alert('erreur server')
        })
}
//delete a brand
export const deleteBrand = ({commit, dispatch},{id})=>{
        axios.delete('/api/auth/DeleteBrand/'+id, {headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
            .then(response =>{
                dispatch('getBrandAdminList')
                alert('Marque supprimée')
            })
            .catch(error =>{
                alert('erreur serveur')
            })
}