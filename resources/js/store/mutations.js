//brandList = response.data from getBrandList in action
export const getBrandList = (state, brandList)=>{
    state.EveryBrands =[]
    for (let i=0; i<brandList.length; i++){
        state.EveryBrands.push({
        banner : brandList[i].banner,
        description : brandList[i].description,
        id : brandList[i].id,
        image : brandList[i].image,
        name : brandList[i].name
        })
    }
}
//productList = response.data from getProductList in action
export const getProductList = (state, productList)=>{
    state.EveryProducts =[]
    for (let i=0; i<productList.length; i++){
        state.EveryProducts.push({
            id : productList[i].id,
            principal_images : productList[i].principal_images,
            name : productList[i].name,
            price : productList[i].price,
            brand_id : productList[i].brand_id,
        })
    }
}
//newsList = response.data from getNewsList in action
export const getNewsList = (state, newsList)=>{
    state.EveryNews =[]
    for (let i=0; i<newsList.length; i++){
        state.EveryNews.push({
            title : newsList[i].title,
            resume : newsList[i].resume,
            id : newsList[i].id,
            image : newsList[i].image,
            content : newsList[i].content,
            author : newsList[i].author,
            releaseDate : newsList[i].created_at,
        })
    }
}
//BrandProductList = response.data from getBrandProductList in action
export const getBrandProductList = (state, BrandProductList)=>{
    state.productList =[]
    state.productList =BrandProductList

}
//GetedProduct = response.data from getProduct in action
export const getProduct = (state, GetedProduct)=>{
    state.product =[]
    state.product.push({
        id : GetedProduct.id,
        principal_images : GetedProduct.principal_images,
        name : GetedProduct.name,
        price : GetedProduct.price,
        brand_id : GetedProduct.brand_id,
    })
}
//RandomProductList = response.data from getRandomProductList in action
export const getRandomProductList = (state, RandomProductList)=>{
    state.RandomProducts =[]
    state.RandomProducts =RandomProductList
}
//search = response.data from searchResponse in action
export const searchResponse = (state, search)=>{
    state.searchResponse =[]
    for (let i=0; i<search.length; i++){
        state.searchResponse.push({
            id : search[i].id,
            images : search[i].images,
            name : search[i].name,
            price : search[i].price,
            brand_id : search[i].brand_id,
        })
    }
}



export const loading=(state, loading )=>{
    state.loading = loading
}
export const set_token=(state, token )=>{
    state.token = token
}
export const set_user=(state, user )=>{
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


