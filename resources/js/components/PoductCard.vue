<template>
    <div class="productCard">
        <RouterLink :to="'/Brand/'+emitedProduct.brand_id+'/Product/'+emitedProduct.id">
            <div class="card">
                <div class="card-header">
                    <img :src="emitedProduct.principal_images"/>
                </div>
                <div class="card-body" v-if=" this.CurrentBrand[0]">
                    <p class="ProductName">{{emitedProduct.name}}</p>
                    <div class="PriceAndColor">
                        <p class="ProductColor">{{emitedProduct.color}}</p>
                        <p class="ProductPrice">{{emitedProduct.price}} €</p>
                    </div>
                    <div class="ProductBrand">
                        <img class="ProductBrandLogo" :src="CurrentBrand.filter(brand =>brand.id === emitedProduct.brand_id)[0].image"/>
                        <p class="ProductBrandName">{{CurrentBrand.filter(brand =>brand.id === emitedProduct.brand_id)[0].name}}</p>
                    </div>
                </div>
            </div>
        </RouterLink>
    </div>
</template>

<script>
export default {
        name :"ProductCard",
        props:{
        emitedProduct: Object
        },
        computed:{
            CurrentBrand(){
                return this.$store.getters.EveryBrands
            },
        }
}
</script>

<style>
.productCard{
    border-radius: 10px;
    width: 250px;
    height: 350px;
    background-color: white;
}
.productCard a{
    text-decoration: none !important;
    color: rgb(48, 48, 48) !important;
}
.productCard .card{
    display: flex;
    align-items: center;
    flex-direction: column;
}
.productCard p{
    margin: 0;
}
.productCard .card-body{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 90%;
    padding:5% 0px;
    height: 125px;
}
.productCard .card-body .ProductName{
    font-weight: bolder;
    font-size: 25px;
    padding-top: 10px;
}
.productCard .card-body .PriceAndColor{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.productCard .card-body .PriceAndColor .ProductPrice{
    font-weight: bolder;
    margin-top: 20px;
    font-size: 20px;
}
.productCard .card-body .ProductBrand{
    display: flex;
    flex-direction: row;
    align-items: flex-end;
}
.productCard .card-body .ProductBrand .ProductBrandLogo{
    height: 30px !important;
    width: auto;
}
.productCard .card-body .ProductBrand .ProductBrandName{
    padding-left: 10px;
}
.productCard:hover{
    -webkit-box-shadow: 0px 0px 7px 0px rgba(105,105,105,0.2);
    -moz-box-shadow: 0px 0px 7px 0px rgba(105,105,105,0.2);
    box-shadow: 0px 0px 7px 0px rgba(105,105,105,0.2);
}
.card-header{
    width: 90%;
    height: 200px;
    display: flex;
    justify-content: center;
}
.card-header img{
    display: flex;
    margin-top: 5%;
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
}
</style>
