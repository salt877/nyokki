import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import axios from 'axios'
import store from './store';

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

new Vue({
  router: router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
