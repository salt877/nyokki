<template>
<v-container>

  
  <v-row>
    <v-col>
        <CalendarComponent></CalendarComponent>
    </v-col>
    <v-col>
      <v-card>
        <Chart></Chart>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <p>日報・月報表示</p>
    </v-col>
    <v-col>
      
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