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

export const authentificated = state => {
    return state.token && state.user;
};
export const user = state => {
    return state.user;
};
