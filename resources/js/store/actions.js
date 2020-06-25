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
    commit("loading", true)
    axios.get('/api/products?sort=random&max=10')
    .then( response => {
        //console.log(response.data)
        commit("getRandomProductList", response.data)
        commit("loading", false)
    })
    .catch( error =>  {
        //console.log(error.response.data)
        alert("erreur du serveur, réessayez plus tard")
        commit("loading", false)
    })
}
//getting a specific product
export const search = ({ commit },{searchContent})=>{
    commit("loading", true)
    axios.get('/api/products?search='+searchContent)
    .then( response => {
        //console.log(response.data)
        commit("searchResponse", response.data)
        commit("loading", false)
    })
    .catch( error =>  {
        //console.log(error.response.data)
        alert("erreur du serveur, réessayez plus tard")
        commit("loading", false)
    })
}
//sending an e-email
export const sentMailContact = ({ commit }, {last_name, first_name, email, subject, message})=>{
    commit("loading", true)
    axios.post('/api/contact', {last_name, first_name, email, subject, message})
    .then( response => {
        //console.log(response.data)
        alert("E-mail envoyé avec succès, nous vous repondrons dans les plus bref délais")
        commit("loading", false)
    })
    .catch( error =>  {
        //console.log(error.response.data)
        alert("erreur du serveur, réessayez plus tard")
        commit("loading", false)
    })
}


//admin action
//login admin
export const login = ({commit,dispatch}, credentials)=>{
    commit("loading", true)
        axios.post('/api/auth/signin', credentials)
        .then(response =>{
            if(response){
                localStorage.setItem('token',response.data.token)
                commit("loading", false)
                return dispatch('attempt',response.data.token)
            }
        })
}
//check if connected
export const  attempt = ({commit,state}, token)=>{
    commit("loading", true)
    if (token) {
        commit('set_token', token)
    }
    if (state.token != null) {
        try {
            axios.get('/api/auth/me', {headers: {'Authorization': `Bearer ${state.token}`}})
                .then(response => {
                    localStorage.setItem('user',response.data.name)
                    commit('set_user', response.data)
                    commit("loading", false)
                })
        }
        catch (e) {
            commit('set_token', null)
            commit('set_user', null)
            commit("loading", false)
        }
    }
}
//logout admin
export const signOut = ({commit,state})=>{
    commit("loading", true)
    if (state.token != null) {
    try {
        axios.post('/api/auth/signout',state.token, {headers: {'Authorization': `Bearer ${state.token}`}})
            .then(response =>{
                commit('set_token', null)
                commit('set_user', null)
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                commit("loading", false)
            })
            .catch(error=>{
                console.log(error)
            })
    }
    catch(e){
        //console.log(e)
        commit("loading", false)
    }
    }
}

//admin brand section
//getting all the brands, also the inactives ones
export const getBrandAdminList = ({commit})=>{
    commit("loading", true)
    axios.get('/api/auth/AdminBrand',{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
    .then( response => {
        //console.log(response.data)
        commit("getBrandAdminList", response.data)
        commit("loading", false)
    })
    .catch( error =>  {
        //console.log(error.response.data)
        alert("erreur du serveur, réessayez plus tard")
        commit("loading", false)
    })
}
//add a brand
export const createBrand = ({commit,dispatch},object)=>{
    commit("loading", true)
    axios.post('/api/auth/AddBrand',object,{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
        .then( response => {
            dispatch('getBrandAdminList')
            dispatch('getProductAdminList')
            commit("loading", false)
        })
        .catch(error =>{
            alert('erreur server')
            commit("loading", false)
        })
}
//update a brand
export const updateBrand = ({commit,dispatch},{id, object})=>{
    commit("loading", true)
    axios.post('/api/auth/UpdateBrand/'+id, object,{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
        .then(response => {
            dispatch('getBrandAdminList')
            dispatch('getProductAdminList')
            commit("loading", false)
        })
        .catch(error =>{
            alert('erreur serveur')
            commit("loading", false)
        })

}
//delete a brand
export const deleteBrand = ({commit, dispatch},{id})=>{
    commit("loading", true)
        axios.delete('/api/auth/DeleteBrand/'+id, {headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
            .then(response =>{
                dispatch('getBrandAdminList')
                dispatch('getProductAdminList')
                commit("loading", false)
            })
            .catch(error =>{
                alert('erreur serveur')
                commit("loading", false)
            })
}


//getting all the products, also the inactives ones
export const getProductAdminList = ({commit})=>{
    commit("loading", true)
    axios.get('/api/auth/AdminProduct ',{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
    .then( response => {
        //console.log(response.data)
        commit("getProductAdminList", response.data)
        commit("loading", false)
    })
    .catch( error =>  {
        //console.log(error.response.data)
        alert("erreur du serveur, réessayez plus tard")
        commit("loading", false)
    })
}
//getting all the news, also the inactives ones
export const getNewsAdminList = ({commit})=>{
    commit("loading", true)
    axios.get('/api/auth/AdminNews ',{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
    .then( response => {
        commit("getNewsAdminList", response.data)
        commit("loading", false)
    })
    .catch( error =>  {
        //console.log(error.response.data)
        alert("erreur du serveur, réessayez plus tard")
        commit("loading", false)
    })
}
//add a news
export const createNews = ({commit,dispatch},object)=>{
    commit("loading", true)
    axios.post('/api/auth/AddNews',object,{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
        .then( response => {
            dispatch('getNewsAdminList')
            commit("loading", false)
        })
        .catch(error =>{
            alert('erreur server')
            console.log(error)
            commit("loading", false)
        })
}
//add a news
export const updateNews = ({commit,dispatch},{id, object})=>{
    commit("loading", true)
    axios.post('/api/auth/UpdateNews/'+id,object,{headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
        .then( response => {
            dispatch('getNewsAdminList')
            commit("loading", false)
        })
        .catch(error =>{
            alert('erreur server')
            console.log(error)
            commit("loading", false)
        })
}
//delete a news
export const deleteNews = ({commit, dispatch},{id})=>{
    commit("loading", true)
        axios.delete('/api/auth/DeleteNews/'+id, {headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}})
            .then(response =>{
                dispatch('getNewsAdminList')
                commit("loading", false)
            })
            .catch(error =>{
                alert('erreur serveur')
                commit("loading", false)
            })
}
