export const EveryBrands = state =>{
    return state.EveryBrands;
};
export const EveryProducts = state =>{
    return state.EveryProducts;
};
export const EveryNews = state =>{
    return state.EveryNews;
};
export const productList = state =>{
    return state.productList;
};
export const product = state =>{
    return state.product;
};
export const RandomProducts = state =>{
    return state.RandomProducts;
};
export const searchResponse = state =>{
    return state.searchResponse;
};

//admin
export const authentificated = state => {
    return state.token && state.user;
};
export const user = state => {
    return state.user;
};
export const EveryAdminBrands = state =>{
    return state.EveryAdminBrands;
};
export const EveryAdminProducts = state =>{
    return state.EveryAdminProducts;
};
export const EveryAdminNews = state =>{
    return state.EveryAdminNews;
};
export const loading = state =>{
    return state.loading;
};