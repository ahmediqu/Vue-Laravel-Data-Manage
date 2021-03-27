require('./bootstrap');

window.Vue = require('vue').default;
import VueProgressBar from 'vue-progressbar';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import { Form, HasError, AlertError } from 'vform';
import MultilevelAccordion from "vue-multilevel-accordion";

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
// Vue.component('accordion-component', require('./components/core/Accordion').default);
Vue.component('accordion-item', require('./components/core/Accordion-item').default);
Vue.component('faq-component', require('./components/core/Faq').default);
Vue.component('multi-accordion', require('./components/core/Multi-accordion').default);
Vue.component('sub-accordion', require('./components/core/Sub-accordian').default);
Vue.component('sub-accordion-item', require('./components/core/Sub-ccordion-item').default);
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

const app = new Vue({
    el: '#app',
});
