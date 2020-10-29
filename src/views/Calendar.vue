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

  <v-row>
    <v-col outline>
      <p>日報・月報表示</p>
      <daily-report></daily-report>
      <monthly-report></monthly-report>
    </v-col>
    <v-col>
      
    </v-col>
  </v-row>

</v-container>
</template>

<script>
import CalendarComponent from '../components/CalendarComponent.vue';
import Chart from '../components/Chart.vue';
import DailyReport from '../components/DailyReport.vue';
import MonthlyReport from '../components/MonthlyReport.vue';

  export default {
    name: "Calendar",
    components:{
      CalendarComponent,
      Chart,
      DailyReport,
      MonthlyReport
    },
    // data(){
    //   return{
    //     contents:[
    //       {name: 'calendar', link:'/calendarComponent'}
    //     ]
    //   }
    // }
  };
</script>