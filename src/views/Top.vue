<template>
  <div v-if="loading">
    <Loading></Loading>
  </div>
  <v-main class="top-hero__content" v-else>
    <!-- ナビゲーション -->
    <navigation></navigation>
    <v-container>
      <br>
      <v-subheader class=" card-design2 yellow lighten-5 card-font layout justify-center" fluid>
        <span >今月の目標：
        {{ getThisMonthObjective }}
        </span>
      </v-subheader>
      <br>
      <v-row justify="center" align-content="center">
        <v-spacer></v-spacer>
        <!-- <v-col class="card-design" v-for="card in cards" :key="card" cols="2" sm="8" md="6"
          ><div>{{ card }}</div>
        </v-col> -->
        <!-- <v-col v-for="rounded in ['xl', 'xl']" :key="rounded" cols="12" md="6">
          <v-hover v-slot:default="{ hover }" open-delay="200">
            <v-sheet :elevation="hover ? 16 : 2" color="white" :rounded="rounded" height="500" width="500" class="headline black--text pl-4 pt-4 d-inline-block" v-text="card"> </v-sheet>
          </v-hover>
          <v-spacer></v-spacer>
        </v-col> -->
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="6"
        >
         <v-hover v-slot:default="{ hover }" open-delay="200">
          <v-card shaped :elevation="hover ? 16 : 2"
            class="pa-2 ma-5"
            outlined
            height="550"
          >
              <v-card-title justify-center v-text="card.title" class="card-font layout justify-center"></v-card-title>
              <v-spacer></v-spacer>
            <v-img
              class="card-design brack--text"
              gradient="to bottom, rgba(148,255,234,0.4), rgba(224,255,255,0.5)"
              height="450px"
              width="450px"
            >
            </v-img>
          </v-card>
         </v-hover>
        </v-col>
        <v-spacer></v-spacer>
        <div class="flower-count">咲かせた花数🌷: {{ getFlowerCount }}本＋</div>
        <div class="flower">
          <br>
          <NyokkiFlower :flowerStatus="getFlowerStatus"></NyokkiFlower>
        </div>
        <div id="app">
          <div class="labels">😊 :よくできた 😐 :まあまあできた 😢 :できなかった</div>
          <Chart :def="def1" :data="data"> </Chart>
        </div>
      </v-row>
      <v-row><v-col></v-col></v-row>
    <v-row><v-col></v-col></v-row>
    </v-container>
  </v-main>
</template>

<script>
import Navigation from "../components/Navigation";
import NyokkiFlower from "../components/NyokkiFlower.vue";
import Chart from "vue-chartless";
import Loading from "@/components/Loading.vue";
import { mapGetters } from "vuex";

export default {
  name: "Top",
  components: {
    Chart,
    NyokkiFlower,
    Loading,
    Navigation,
  },
  data() {
    return {
      def1: {
        type: "pie",
      },
      data: [],
      cards: [
        { title: '日報継続度', flex: 6 },
        { title: '今月の自己達成度',flex: 6 },
      ],
      loading: "",
    };
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
  computed: {
    ...mapGetters(["getFlowerCount", "getFlowerStatus", "getThisMonthObjective", "getLevelAchivementYokudekita", "getLevelAchivementMaamaadekita", "getLevelAchivementDekinakatta"]),
  },
  created() {
    this.data.push({ label: "😢", value: this.getLevelAchivementDekinakatta });
    this.data.push({ label: "😐", value: this.getLevelAchivementMaamaadekita });
    this.data.push({ label: "😊", value: this.getLevelAchivementYokudekita });
  },
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  top: 40%;
  left: 25%;
  color: #2c3e50;
  margin: 0 auto;
  width: 100%;
  height: 30%;
}
.labels {
  position: absolute;
  top: -20%;
  left: 34%;
  font-weight: bold;
  font-size: 1.0em;
  color:rgb(23, 80, 1);
}

.card-font {
  font-weight: bold;
  font-size: 1.5em;
  color:rgb(255, 153, 0);
}
.card-font2 {
  font-weight: bold;
  font-size: 1.0em;
}

.flower {
  width: 350px;
  height: 350px;
  position: absolute;
  top: 30%;
  left: 10%;
}
.flower-count {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 250px;
  left: 100px;
  font-weight: bold;
  font-size: 1.0em;
  color:rgb(23, 80, 1);
}
.top-hero__content {
  background-image: url("~@/assets/TopBackground.png");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
}
.card-design{
    border-radius:50px 50px 50px 50px;
    top: -6%;
    left: 0%;
}
.card-design2{
    border-radius:50px 50px 50px 50px;
    
}
span{
  color:rgb(255, 56, 172);
}

</style>
