import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import store from "./store";
import firebase from "firebase";
// import VeeValidate from 'vee-validate';

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

// firebaseの設定
var firebaseConfig = {
  apiKey: "AIzaSyDEnfHmnNFAON0qVZNrBd65BiQOi2Cc0Lc",
  authDomain: "nyokki-d9226.firebaseapp.com",
  databaseURL: "https://nyokki-d9226.firebaseio.com",
  projectId: "nyokki-d9226",
  storageBucket: "nyokki-d9226.appspot.com",
  messagingSenderId: "736172500788",
  appId: "1:736172500788:web:b3f034e86c0e5e8242a761",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router: router,
  store,
  vuetify,
  // VeeValidate,
  render: (h) => h(App),
}).$mount("#app");
