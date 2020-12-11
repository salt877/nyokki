<script>
import { Line } from 'vue-chartjs';
import axios from "axios";

const setDegreeCelsius = (value) => {
 return  `${value}😊`
}

export default {
  extends: Line,
  name: 'Chart',
  data:() => ({
    dailyReport:[],
    chartdata: {
      labels: ["1日", "5日", "10日", "15日", "20日", "25日", "30日"],
      data:[],
      datasets: [
        {
          label: '自己達成度 (😊 😐 😢)',
          // data: [3, 1, 2, 1, 2, 3, 1, 2],
          data: this.data,
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
  // props: {
  //   chartdata: {
  //     type: Object,
  //     default: null
  //   },
  //   options: {
  //     type: Object,
  //     default: null
  //   }
  // },
  created(){
     axios.post("/get/showCalender", {loginUser : this.$store.state.loginUser})
      .then((res) => {
      let list = res.data ;
      console.log(res.data);

        list.forEach(achievementList => {
          console.log('確認Alist' + achievementList.levelAchievementlevelAchievement);
          
        this.data = res.data.map((levelAchievementlevelAchievement, i) => ({
          levelAchievementlevelAchievement: res.data[i]

        }));
        })
        
          console.log('グラフの中身'+ res.data);

        })
        .catch((error) => {
          alert("編集失敗");
          console.log("編集失敗" + error);

  });
  },
  // created(){
  //     this.loaded = false;
  //    axios.post("/get/showCalender", {loginUser : this.$store.state.loginUser})
  //     .then((res) => {
  //         console.log(res.data);

  //     let list = res.data ;
  //     list.forEach(achievementList => {
  //       console.log('確認list' + achievementList.levelAchievementlevelAchievement);
  //     })

  //       })
  //       .catch((error) => {
  //         alert("チャート失敗");
  //         console.log("チャート失敗" + error);
  // });
  // },
  watch: {
  chartData () {
    this.$data._chart.update()
  }
},

  mounted () {
    this.renderChart(this.chartdata, this.options);
  },
}
</script>