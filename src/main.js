// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import uploader from 'vue-simple-uploader'
import axios from "axios";
import App from './App'
import router from './router'
 


Vue.config.productionTip = false
Vue.use(uploader);
Vue.prototype.$axios = axios
Vue.prototype.baseUrl = process.env.NODE_ENV==="production"?window.location.origin:"/api"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
