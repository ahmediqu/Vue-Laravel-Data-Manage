<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <div>
                        <button class="btn btn-info" @click="isOpen =! isOpen">
                            <div v-if="isOpen">
                                close
<!--                                <i class="fas fa-chevron-down"></i>-->
                            </div>
                            <div v-else>
                                <span>open</span>
                            </div>
                        </button>
                    </div>
                    <div>
                        <h3 v-text="title" @click="isOpen =! isOpen"></h3>
                        <div v-html="body" v-show="isOpen">

                        </div>
                    </div>

                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Accordion",
    props:{
        title: '',
        body:'',
    },
    data() {
        return {
            isOpen: false,
        }
    }
}
</script>

<style scoped>

</style>
