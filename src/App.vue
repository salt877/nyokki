<template>
  <v-app name="App">
      <navigation></navigation>
    <v-main>
      <router-view/>
    </v-main>
    <v-footer>
      <!-- フッダー-->
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation'

export default {
  name: 'App',
  components: {
    Navigation
  }
};
</script>

