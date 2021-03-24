<template>
    <div class="mt-5" v-if="!loading">
        <h3>Products</h3>
        <div class="row">
            <div class="col-md-3 my-3" v-for="(product , index) in products" :key="index">
                <div class="card">
                    <img
                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                        class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ product.name}}</h5>
                        <p class="card-text"> {{ product.price }} </p>
                        <a href="#" class="btn btn-primary">Add to cart</a>
                    </div>
                </div>
            </div>

            <pagination-component :number-of-pages="10" :base-url="page"/>

        </div>
    </div>

    <div class="row" v-else>
        <h3>loading...</h3>
    </div>
</template>

<script>
export default {
    name: "Product",
    data() {
        return {
            products: {},
            loading: true,
        }
    },
    mounted() {
        this.getProducts();
    },
    methods: {
        getProducts() {
            // .get('/category')
            //         .then(res => {
            //             this.loading = false;
            //             this.category = res.data;
            //         })
            axios
                .get('/products')
                .then(response => {
                    this.loading = false;
                    this.products = response.data.data;
                    console.log(response.data)
                    console.log(response.data.links.length)

                }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>

</style>
