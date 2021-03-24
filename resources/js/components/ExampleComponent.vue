<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">

                <Category/>
                <product-component />


            </div>
        </div>
    </div>
</template>

<script>
import Category from './Category';
import Product from './Product';

export default {
    components: {Category, Product},
    mounted() {
        console.log('Component mounted.')
    },
    methods: {
        sayHi() {
            console.log('hi')
        }
    }
}
</script>
