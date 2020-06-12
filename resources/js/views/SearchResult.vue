<template>
<div id="SearchResult">
    <h1>{{reload}}</h1>
    <div class="product-list">
        <ProductCard v-for="product in ProductsResult" :key="product.id" v-bind:emitedProduct="product"/>
    </div>
    <nav class="paginateNav">
        <div class="prev">
            <div v-if="page != 1">
            <button type="button" @click="page = 1" > first </button>
            <button type="button" @click="page--" > Previous </button>
            </div>
        </div>
        <div class="miniNav">
            <div v-for="(pageNumber, index) in pages" @click="page = pageNumber" :key="index">
                <div v-bind:class="{ active: pageNumber==page }" v-if="page-2<=pageNumber && pageNumber<=page+2 || pageNumber<=5 && pageNumber>=page+2 || pageNumber>=pages.length-4 && pageNumber<= page+2">
                    <button type="button">
                    {{pageNumber}} 
                    </button>
                </div>
            </div>
        </div>
        <div class="next">
            <div v-if="page < pages.length">
            <button type="button" @click="page++" > Next </button>
            <button type="button" @click="page = pages.length" > last </button>
            </div>
        </div>
	</nav>	
</div>
</template>
<script>
import ProductCard from "../components/PoductCard";
export default {
    data () {
		return {
			page: 1,
			perPage: 6,
            pages: [],
            active: true	
		}
    },
    components:{
        ProductCard
    },
	methods:{
		setPages () {
            this.$store.dispatch('search', {searchContent: this.$route.params.search});
			let numberOfPages = Math.ceil(this. SearchResult.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
		paginate ( SearchResult) {
			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
			return   SearchResult.slice(from, to);
		}
	},
	computed: {
        SearchResult(){
            return this.$store.getters.searchResponse;
        },
		ProductsResult () {
			return this.paginate(this. SearchResult);
        },
        reload(){
            return this.$route.params.search;
        }
        
	},
	watch: {
        reload(){
            this.pages =[]
            this.setPages()
            this.paginate(SearchResult)
        },
        SearchResult(){
            if(!this.$store.getters.searchResponse[0]){
                console.log( this.$store.getters.EveryProducts)
            }
        }
    },
    created: function(){
        this.setPages();
    },
}
</script>
<style>
.paginateNav{
    display: flex;
    flex-direction: row;
    width: auto;
    justify-content: center;
    height: 30px;
}
.currentPage{
    justify-content: center;
}
.miniNav{
    width: 200px;
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
}
.miniNav button{
    height: 100%;
    width: 35px;
    display: flex;
    justify-content: center;
}
.prev{
    width: 150px;
    display: flex;
    flex-direction:row ;
    justify-content: flex-end;
    align-items: center;
}
.prev div{
    display: flex;
    flex-direction:row ;
    justify-content: flex-end;
    align-items: center;
}
.next{
    width: 150px;
    display: flex;
    flex-direction:row ;
    justify-content: flex-start;
    align-items: center;
} 
.next div{
    display: flex;
    flex-direction:row ;
    justify-content: flex-start;
    align-items: center;
} 

.active button{
    background-color: blue;
    color: cornsilk;
    display: flex;
}
</style>