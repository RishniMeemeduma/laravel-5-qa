
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
 import swal from 'sweetalert';

require('./bootstrap');
require('./fontawesome');


window.Vue = require('vue');
window.Swal = swal;

import VueIziToast from 'vue-izitoast';
 import 'izitoast/dist/css/iziToast.min.css';
import Vue from 'vue';
import router from './router';
 
Vue.use(VueIziToast);

import Authorization from './authorization/authorize';
import Spinner from './components/Spinner';
import axios from 'axios';

Vue.use(Authorization);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('spinner',Spinner);



const app = new Vue({
    el: '#app',
    router,
    data:{
        loading:false,
        interceptor:null
    },
    created(){
       this.enableInterceptor()
    },
    methods:{
        enableInterceptor(){
             // Add a request interceptor
        axios.interceptors.request.use((config) => {

            this.loading = true;
            return config;
            
        }, (error) => {
            this.loading = false;
            return Promise.reject(error);
        });

        // Add a response interceptor
        axios.interceptors.response.use((response) => {
            this.loading = false;
            return response;
        }, (error)  => {
            this.loading = false;
            return Promise.reject(error);
        })
        },
        disableInterceptor(){
            axios.interceptors.request.eject(this.interceptor)
        },
    },
    
    linkActiveClass:'active'
});
