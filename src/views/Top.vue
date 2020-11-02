<template>
<v-main  class="top-hero__content">
  <v-container
   >
    <v-subheader 
    v-for="type in types"
      :key="type"
      class="grey lighten-4"
      fluid
      >
      {{ type }}
      </v-subheader>
    <v-row justify="center" align-content="center">
      <v-spacer></v-spacer>
      <v-col
          v-for="card in cards"
          :key="card"
          cols="2"
          sm="8"
          md="6"
        >{{card}}
      </v-col>
      <v-col
        v-for="rounded in ['xl', 'xl']"
        :key="rounded"
        cols="12"
        md="6"
      >
        <v-hover
        v-slot:default="{ hover }"
        open-delay="200"
      >
          <v-sheet
            :elevation="hover ? 16 : 2"
            color="white"
            :rounded="rounded"
            height="500"
            width="500"
            class="headline black--text pl-4 pt-4 d-inline-block"
                v-text="card"
          >
          </v-sheet>
        </v-hover>
        <v-spacer></v-spacer>
      </v-col>
        <div class="flower">
          <v-spacer></v-spacer>
                <NyokkiFlower></NyokkiFlower>
        </div>
        <div id="app">
          <v-spacer></v-spacer>
          <Chart
            :def="def1"
            :data="data"
          >
          </Chart>
        </div>
    </v-row>
  </v-container>
</v-main>
</template>

<script>
import NyokkiFlower from '../components/NyokkiFlower.vue';
import Chart from 'vue-chartless';

export default {
  name: 'Top',
  components: {
    Chart,
    NyokkiFlower
  },
  data(){
    return {
      def1:{
            type:'pie',
      },
      data:[
          { label: '😢', value:'1' },
          { label: '😐', value:'2' },
          { label: '😊', value:'3' },
          
      ],
      types: ['今月の目標'],
      cards: ['日報継続度', '今月の自己達成度'],
    }
  },
  options:{
        responsive: true,
        maintainAspectRatio: false,
    }
}
</script>


<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute; top:200px; left:750px;
  color: #2c3e50;
  margin: 0 auto;
  width: 500px;
  height: 500px;
}

.flower {
  width :400px;
  height:400px;
  position:absolute; top:150px; left:200px;
}
.top-hero__content {
  background-image: url("~@/assets/TopBackground.png");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
}


</style>
