<template>
<v-main  class="top-hero__content">
  <v-container>
    <v-row justify="space-around">
      <v-col
        v-for="rounded in ['xl', 'xl']"
        :key="rounded"
        cols="10"
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
            class="mx-auto"
            height="500"
            width="500"
          >
          <div></div>
          <div id="app">
             <Chart
              :def="def1"
              :data="data"
          >
            </Chart>
            <div></div>
            </div>
             <div class="flower">
            <v-img lazy-src="../images/flower.png"
                src="../images/flower.png">
            </v-img>
        </div>
          </v-sheet>
        </v-hover>
      </v-col>
          <div></div>
    </v-row>
  </v-container>
</v-main>
</template>

<script>
import Chart from 'vue-chartless';
export default {
  name: 'Top',
  components: {
    Chart
  },
  data(){
    return {
      def1:{
            type:'pie',
      },
      data:[
          { label: 'test1', value:'3' },
          { label: 'test2', value:'4' },
          { label: 'test3', value:'1' },
          { label: 'test4', value:'2' }
      ],
      
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
  position: relative; top:100px; left:30px;
  color: #2c3e50;
  margin: 0 auto;
  width: 500px;
  height: 500px;
}

.flower {
  width :400px;
  height:400px;
  position:absolute; top:100px; left:100px;
}
.top-hero__content {
  background-image: url("~@/assets/TopBackground.png");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
}


</style>
