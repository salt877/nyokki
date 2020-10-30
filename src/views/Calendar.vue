<template>
<v-container>
  <v-row>
    <v-col>
        <h2>カレンダー</h2>
        <CalendarComponent></CalendarComponent>
    </v-col>
    <v-col>
      <v-card>
        <h2>今月の自己達成度</h2>
        <Chart></Chart>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import CalendarComponent from '../components/CalendarComponent.vue';
import Chart from '../components/Chart.vue';

  export default {
    name: "Calendar",
    components:{
      CalendarComponent,
      Chart
    }
  };
</script>