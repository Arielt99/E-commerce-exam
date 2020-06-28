<template>
  <div class="Command">
    <h1>Command</h1>
    <div class="CartResume">
        <div class="CartItemResume" v-for="(item,index) in getterCart.basket" :key="index">
            <p>{{ item.product.name }}</p>
            <div>
                <p>{{ item.color }}</p>
                <p>&nbsp;en {{ item.size }}</p>
            </div>
            <div class="Price">
                <p>{{item.quantity}}</p>
                <p>x {{ item.product.price}} €</p>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    computed:{
        getterCart(){
            return this.$store.getters.getterCart
        },
    },
}
</script>
