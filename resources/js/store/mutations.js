//brandList = response.data from getBrandList in action
export const getBrands = (state, brandList)=>{
    state.brands =[]
    for (let i=0; i<brandList.length; i++){
        state.brands.push({
        banner : brandList[i].banner,
        description : brandList[i].description,
        id : brandList[i].id,
        image : brandList[i].image,
        name : brandList[i].name
        })
    }
}

