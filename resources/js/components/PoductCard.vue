<template>
    <div class="productCard">
        <RouterLink :to="'/brand/'+emitedProduct.brand_id+'/product/'+emitedProduct.id">
            <div class="card">
                <div class="card-header">
                    <img :src="emitedProduct.principal_image"/>
                </div>
                    <div class="card-body">
                        <p>{{emitedProduct.name}}</p>
                        <p>{{emitedProduct.price}} €</p>
                        <p>{{CurrentBrand[0].name}}</p>
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
                return this.$store.getters.EveryBrands.filter(brand =>
                 brand.id === this.emitedProduct.brand_id
                )
            },
        }
}
</script>

<style>
.productCard{
    border: 1px solid black;
    border-radius: 10px;
    width: 250px;
    height: 350px;
}
.card-header{
    width: 100%;
    height: 250px;
    display: flex;
}
.card-header img{
    display: flex;
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px 10px 0px 0px;
}
</style>