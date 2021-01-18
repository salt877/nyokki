<template>
<div v-if="loading">
      <Loading></Loading>
</div>
<v-main  class="top-hero__content" v-else>
  <v-container
   >
    <v-subheader 
      class="grey lighten-4"
      fluid
      >
      {{ getObjective }}
      </v-subheader>
    <v-row justify="center" align-content="center">
      <v-spacer></v-spacer>
      <v-col
          class="card-design"
          v-for="card in cards"
          :key="card"
          cols="2"
          sm="8"
          md="6"
        ><div>{{card}}</div>
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
        <div class="flower-count">
                咲かせた花数🌷: {{ getFlowerCount }}本＋
        </div>
        <div class="flower">
            <NyokkiFlower :flowerStatus="getFlowerStatus"></NyokkiFlower> 
        </div>
        <div id="app">
          <div class="labels">😊 :よくできた  😐 :まあまあできた  😢 :できなかった</div>
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
import Loading from '@/components/Loading.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Top',
  components: {
    Chart,
    NyokkiFlower,
    Loading
  },
  data(){
    return {
      def1:{
            type:'pie',
      },
      data: [],
      cards: ['日報継続度', '今月の自己達成度'],
      loading: "",
    }
  },
  options:{
        responsive: true,
        maintainAspectRatio: false,
    },
  computed: {
    ...mapGetters(["getFlowerCount", 
      "getFlowerStatus",
      "getObjective",
      "getLevelAchivementYokudekita",
      "getLevelAchivementMaamaadekita",
      "getLevelAchivementDekinakatta"   
      ]),
  },
  created(){
    this.data.push(
      { label: '😊', value: this.getLevelAchivementYokudekita}
    );
    this.data.push(
      { label: '😐', value: this.getLevelAchivementMaamaadekita}
    );
    this.data.push(
      { label: '😢' ,value: this.getLevelAchivementDekinakatta}
    );
  }
}
</script>


<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute; 
  top: 40%;
  left: 23%;
  color: #2c3e50;
  margin: 0 auto;
  width: 100%;
  height: 30%;
}
.labels {
  position:absolute; 
  top:-34%; 
  left:33%;
}

.card-design div{
  font-weight: bold;
  font-size: 1.5em;
}
.flower {
  width :350px;
  height:350px;
  position:absolute; 
  top:200px; 
  left:100px;
}
.flower-count{
  width :200px;
  height:200px;
  position:absolute; 
  top:200px; 
  left:100px;
}
.top-hero__content {
  background-image: url("~@/assets/TopBackground.png");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
}


</style>
