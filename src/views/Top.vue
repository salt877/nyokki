<template>
<v-main fluid fill-height class="top-hero__content">
<v-app>
  <div id="app" class="">
    <Chart
      :def="def1"
      :data="data"
    >
    </Chart>
  </div>
    <div class="flower">
    <v-img lazy-src="../images/flower.png"
            src="../images/flower.png">
    </v-img>
    </div>
</v-app>
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
  }
}
</script>


<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative; top:100px; left:100px;
  color: #2c3e50;
  margin: 0 auto;
  width: 500px;
  height: 500px;
}

.flower {
  width :400px;
  height:400px;
  position:absolute; top:30px; left:-300px;
}
.top-hero__content {
  background-image: url("~@/assets/TopBackground.png");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
}


</style>
