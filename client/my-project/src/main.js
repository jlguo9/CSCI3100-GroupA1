// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// import baguetteBox from 'baguettebox';
import LightGallery from 'vue-light-gallery';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './assets/index.css'

// library.add(faUserSecret)
Vue.prototype.axios = axios

Vue.use(LightGallery);
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  LightGallery,
  components: { App },
  template: '<App/>'
})
