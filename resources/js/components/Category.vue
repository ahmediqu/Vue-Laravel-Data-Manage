<template>
    <div v-if="loading">
        <h2>Loading....</h2>
    </div>
    <div v-else>
        <h2>Category</h2>
        <a href="#" v-for="(data, index) in category" :key="index"> {{ data.name }}</a>
    </div>
</template>

<script>
export default {
    name: "Category",
    data() {
        return {
            category: '',
            loading: true
        }

    },
    mounted() {
        this.getCategory();

    },
    methods: {
        getCategory() {
            axios
                .get('/category')
                .then(res => {
                    this.loading = false;
                    this.category = res.data;
                })
        }
    }
}
</script>

<style scoped>

</style>
