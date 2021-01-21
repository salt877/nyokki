<template>
  <v-app name="App">
    <!-- ナビゲーション
      <navigation></navigation> -->
    <v-main>
      <router-view/>
    </v-main>
      <!-- フッター -->
    <v-footer
      absolute
      class="font-weight-medium"
      color="light-green accent-1"
    >
      <Footer></Footer>
    </v-footer>
  </v-app>
</template>

<script>
// import Navigation from './components/Navigation';
import Footer from './components/Footer';
// import SignIn from './views/SignIn';

export default {
  name: 'App',
  components: {
    // Navigation,
    Footer,
    // SignIn
  },
  // data(){
  //   return {
  //     show:true
  //   }
  // }

};
</script>
<style scoped>
body #app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
footer {
  margin-top: auto;
}
</style>

