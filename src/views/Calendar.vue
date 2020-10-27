<template>
  <div style="text-align: center">
  <h2>カレンダー</h2>
  <calendarComponent></calendarComponent>
</div>
</template>

<script>
import CalendarComponent from './CalendarComponent.vue';

  export default {
    name: "Calendar",
    components:{
      CalendarComponent
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