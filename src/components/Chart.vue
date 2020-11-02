<script>
import { Line } from 'vue-chartjs';
const setDegreeCelsius = (value) => {
 return `${value}😊`
}

export default {
 extends: Line,
 name: 'LineChart',
 data:() => ({
   chartdata: {
     labels: ["1日", "5日", "10日", "15日", "20日", "25日", "30日"],
     datasets: [
       {
         label: '自己達成度 (😊 😐 😢)',
         data: [3, 1, 2, 1, 2, 3, 1, 2],
         borderColor: 'rgba(255, 146, 51, 1)',
         backgroundColor: 'rgba(255, 146, 51, 0.2)',
       }
     ]
   },
   options: {
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero: true,
                 max: 3,
                min: 0,
                stepSize: 1,
                 callback: function(value, index, values) {
                     return setDegreeCelsius(value, index, values);
                 }
             }
         }]
     },
     responsive: true,
     maintainAspectRatio: false
   }
 }),
 mounted () {
   this.renderChart(this.chartdata, this.options);
 },
}
</script>