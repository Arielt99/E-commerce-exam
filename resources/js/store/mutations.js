//brandList = response.data from getBrandList in action
export const getBrandList = (state, brandList)=>{
    state.EveryBrands =[]
    state.EveryBrands = brandList
}
//productList = response.data from getProductList in action
export const getProductList = (state, productList)=>{
    state.EveryProducts =[]
    state.EveryProducts = productList
}
//newsList = response.data from getNewsList in action
export const getNewsList = (state, newsList)=>{
    state.EveryNews =[]
    state.EveryNews = newsList
}
//BrandProductList = response.data from getBrandProductList in action
export const getBrandProductList = (state, BrandProductList)=>{
    state.productList =[]
    state.productList =BrandProductList

}
//GetedProduct = response.data from getProduct in action
export const getProduct = (state, GetedProduct)=>{
    state.product =[]
    state.product = GetedProduct
}
//RandomProductList = response.data from getRandomProductList in action
export const getRandomProductList = (state, RandomProductList)=>{
    state.RandomProducts =[]
    state.RandomProducts = RandomProductList
}
//search = response.data from searchResponse in action
export const searchResponse = (state, search)=>{
    state.searchResponse =[]
    state.searchResponse = search
}

//cart
export const displayCart=(state,data)=>{
    return state.displayArray = data
}
export const lengthArray=(state,data)=>{
    if (data !==null)
    return state.arrayLength = data.basket.length
}
export const changeQuantity=(state,data)=>{
    let cart = JSON.parse(localStorage.getItem("tempBasket"))
    cart.basket.forEach(element =>{
        if (element.id === data.id, element.size === data.size){
            element.quantity = 0
            element.quantity = data.newQuantity
        }
    })
    localStorage.setItem("tempBasket",JSON.stringify(cart))
}
export const calculPrice=(state,data)=>{
    state.totalPrice = 0
    data.basket.forEach(element =>{
        return state.totalPrice += (element.product.price * element.quantity)
    })
}



//loading
export const loading = (state, loading )=>{
    state.loading = loading
}
//set admin data
export const set_token = (state, token )=>{
    state.token = token
}
export const set_user = (state, user )=>{
    state.user = user
}



//BrandAdminList = response.data from getBrandAdminList in action
export const getBrandAdminList = (state, BrandAdminList)=>{
    state.EveryAdminBrands =[]
    for (let i=0; i<BrandAdminList.length; i++){
        state.EveryAdminBrands.push({
        banner : BrandAdminList[i].banner,
        description : BrandAdminList[i].description,
        id : BrandAdminList[i].id,
        image : BrandAdminList[i].image,
        name : BrandAdminList[i].name
        })
    }
}
//ProductAdminList = response.data from getProductAdminList in action
export const getProductAdminList = (state, ProductAdminList)=>{
    state.EveryAdminProducts =[]
    state.EveryAdminProducts =ProductAdminList
}
//newsList = response.data from getNewsAdminList in action
export const getNewsAdminList = (state, NewsAdminList)=>{
    state.EveryAdminNews =[]
    for (let i=0; i<NewsAdminList.length; i++){
        state.EveryAdminNews.push({
            title : NewsAdminList[i].title,
            resume : NewsAdminList[i].resume,
            id : NewsAdminList[i].id,
            image : NewsAdminList[i].image,
            content : NewsAdminList[i].content,
            author : NewsAdminList[i].author,
            releaseDate : NewsAdminList[i].releaseDate,
            isActive : NewsAdminList[i].isActive,
        })
    }
}


