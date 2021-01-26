<template>
  <v-app name="App">
    <!-- ナビゲーション
      <navigation></navigation> -->
    <v-main>
      <router-view/>
    </v-main>
      <!-- フッター -->

    <v-footer class="font-weight-medium" color="light-green accent-1" absolute>
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
}
footer{
  position: absolute;
  bottom: 0;
}
</style>

