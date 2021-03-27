<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <button class="btn btn-info" type="button" @click="create">Add new customer</button>
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">Sl.</th>
                            <th scope="col">name</th>
                            <th scope="col">email</th>
                            <th scope="col">phone</th>
                            <th scope="col" class="text-center">Active</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(customer, index) in customers" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ customer.name }}</td>
                            <td>{{ customer.email }}</td>
                            <td>{{ customer.phone }}</td>
                            <td>
                                <button class="btn btn-primary" @click="edit(customer)">edit</button>
                                <button class="btn btn-danger" @click="destroy(customer)">delete</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <pagination-component
                        v-if="pagination.last_page > 1"
                        :pagination="pagination"
                        :offset="4"
                        @paginate="getCustomers"></pagination-component>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
             aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">
                            {{ editMood ? 'edit' : 'add' }}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="editMood ? update() : store()" @keydown="form.onKeydown($event)">
                        <div class="modal-body">
                            <alert-error :form="form"></alert-error>
                            <div class="form-group">
                                <label>name</label>
                                <input v-model="form.name" type="text" name="name"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                <has-error :form="form" field="name"></has-error>
                            </div>

                            <div class="form-group">
                                <label>Email</label>
                                <input v-model="form.email" type="text" name="email"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                <has-error :form="form" field="email"></has-error>
                            </div>

                            <div class="form-group">
                                <label>Phone</label>
                                <input v-model="form.phone" type="text" name="phone"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('phone') }">
                                <has-error :form="form" field="phone"></has-error>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button :disabled="form.busy" type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <vue-progress-bar></vue-progress-bar>
        <vue-snotify></vue-snotify>

    </div>
</template>

<script>
export default {
    name: "Customers",
    data() {
        return {
            customers: '',
            pagination: {
                current_page: 1
            },
            form: new Form({
                id: '',
                name: '',
                email: '',
                phone: ''
            }),
            editMood: false,
        }
    },
    mounted() {
        this.getCustomers();
        console.log(window.location.origin);
    },
    methods: {
        getCustomers() {
            this.$Progress.start()
            axios
                .get('/customers?page=' + this.pagination.current_page)
                .then(res => {
                    this.loading = false;
                    this.customers = res.data.data;
                    this.pagination = res.data.meta;
                    console.log(res)
                    this.$Progress.finish();
                })
        },
        create() {
            this.editMood = false;
            this.form.reset();
            this.form.clear();
            $('#staticBackdrop').modal('show');
        },
        store() {

            this.$Progress.start();
            this.form.busy = true;
            this.form.post('/customers')
                .then(response => {
                    this.getCustomers();
                    $('#staticBackdrop').modal('hide');
                    if (this.form.successful) {
                        this.$Progress.finish();
                        this.$snotify.success('successfully saved');
                    } else {
                        this.$Progress.fail();
                        this.$snotify.error('something wrong');
                    }
                }).catch(e => {
                this.$Progress.fail();
                console.log(e);
            })
            console.log('hello');
        },
        edit(customer) {
            this.editMood = true;
            this.form.reset();
            this.form.clear()
            this.form.fill(customer);
            $('#staticBackdrop').modal('show');
        },
        update() {
            this.$Progress.start();
            this.form.busy = true;
            this.form.put('/customers/' + this.form.id)
                .then(response => {
                    this.getCustomers();
                    $('#staticBackdrop').modal('hide');
                    if (this.form.successful) {
                        this.$Progress.finish();
                        this.$snotify.success('successfully updated');
                    } else {
                        this.$Progress.fail();
                        this.$snotify.error('something wrong');
                    }
                }).catch(e => {
                this.$Progress.fail();
                console.log(e);
            })
        },
        destroy(customer) {
            this.$snotify.clear();
            this.$snotify.confirm(
                "You will not be able to recover this data!",
                "Are you sure?",
                {
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    buttons: [
                        {
                            text: "Yes",
                            action: toast => {
                                this.$snotify.remove(toast.id);
                                this.$Progress.start();
                                axios
                                    .delete("/customers/" + customer.id)
                                    .then(response => {
                                        this.getCustomers();
                                        this.$Progress.finish();
                                        this.$snotify.success(
                                            "Customer Successfully Deleted",
                                            "Success"
                                        );
                                    })
                                    .catch(e => {
                                        this.$Progress.fail();
                                        console.log(e);
                                    });
                            },
                            bold: true
                        },
                        {
                            text: "No",
                            action: toast => {
                                this.$snotify.remove(toast.id);
                            },
                            bold: true
                        }
                    ]
                }
            );
        }
    }
}
</script>

<style scoped>

</style>
