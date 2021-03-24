require('./bootstrap');

window.Vue = require('vue').default;
import VueProgressBar from 'vue-progressbar';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import { Form, HasError, AlertError } from 'vform';
window.Form = Form;
const snotifyOptions = {
    toast: {
        position: SnotifyPosition.rightTop
    }
}

Vue.use(Snotify, snotifyOptions)

const options = {
    color: 'red',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
}

Vue.use(VueProgressBar, options)

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('test-component', require('./components/ExampleComponent.vue').default);
Vue.component('category-component', require('./components/Category.vue').default);
Vue.component('product-component', require('./components/Product.vue').default);
Vue.component('pagination-component', require('./components/core/Pagenation').default);
Vue.component('customers-component', require('./components/Customers').default);
Vue.component('pagination-component', require('./components/core/Pagination').default);
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

const app = new Vue({
    el: '#app',
});
