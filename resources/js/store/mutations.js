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
            principal_image : productList[i].principal_image,
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
        })
    }
}
//BrandProductList = response.data from getBrandProductList in action
export const getBrandProductList = (state, BrandProductList)=>{
    state.productList =[]
    for (let i=0; i<BrandProductList.length; i++){
        state.productList.push({
            id : BrandProductList[i].id,
            principal_image : BrandProductList[i].principal_image,
            name : BrandProductList[i].name,
            price : BrandProductList[i].price,
            brand_id : BrandProductList[i].brand_id,
        })
    }
}
//productList = response.data from getProductList in action
export const getProduct = (state, GetedProduct)=>{
    state.product =[]
    state.product.push({
        id : GetedProduct.id,
        principal_image : GetedProduct.principal_image,
        name : GetedProduct.name,
        price : GetedProduct.price,
        brand_id : GetedProduct.brand_id,
    })
}



