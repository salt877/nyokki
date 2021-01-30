<template>
  <section class="container">
    <p>今月の自己達成度</p>
    <div class="columns">
      <div class="column">
        <line-chart
              :chartData="datacollection"
              :options="options"
        ></line-chart>
      </div>
    </div>
  </section>
</template>

<script>
  import LineChart from '@/components/LineChart.vue';

  const setExpression = (value) => {
  return  `${value}`
}
  const setDay = (value2) => {
  return  `${value2}日分`
}

  export default {
    name: 'ChartJs',
    components: {
      LineChart,

    },
    data () {
      return {
        chartdata: null,
        achievementList:[],
        datacollection: {
          labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
          datasets: [
            {
              label: '自己達成度 (3:😊 2:😐 1:😢)',
              borderColor: 'rgba(255, 146, 51, 1)',
              backgroundColor: 'rgba(255, 146, 51, 0.2)',
              pointBackgroundColor: 'white',
              borderWidth: 2,
              // pointBorderColor: '#249EBF',
              data: this.values  //ここに実際のデータが入る
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
                callback: function(value) {
                      return setExpression(value);
                  }
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              ticks: {
                beginAtZero: true,
                stepSize: 1,
                callback: function(value2) {
                      return setDay(value2);
                  }
              },
              gridLines: {
                display: true
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }

      }
    },
    props:["values"],
    watch:{
      values(){
        console.log("きた",this.values);
        this.datacollection = {
          labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
          datasets: [
            {
              label: '自己達成度 (3:😊 2:😐 1:😢)',
              borderColor: 'rgba(255, 146, 51, 1)',
              backgroundColor: 'rgba(255, 146, 51, 0.2)',
              pointBackgroundColor: 'white',
              borderWidth: 2,
              // pointBorderColor: '#249EBF',
              data: this.values  //ここに実際のデータが入る
            }
          ]
        }
        this.datacollection = {
          labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
          datasets: [
            {
              label: '自己達成度 (3:😊 2:😐 1:😢)',
              borderColor: 'rgba(255, 146, 51, 1)',
              backgroundColor: 'rgba(255, 146, 51, 0.2)',
              pointBackgroundColor: 'white',
              borderWidth: 2,
              // pointBorderColor: '#249EBF',
              data: this.values  //ここに実際のデータが入る
            }
          ]
        }
      }
    }
  


    // created () {
    //   // this.fillData()
    //   // this.loaded = false
    //   Promise.resolve().then(()=>{

    //     axios.post("/get/showCalender", {loginUser : this.$store.state.loginUser})
    //     .then((res) => {
    //     let list = res.data ;
    //     // console.log(list);
    //       var achievementList=[];
  
    //       for(let num in list){
    //         achievementList.push({
    //           value:list[num].levelAchievementlevelAchievement,
    //         }
    //         )
    //       }
    //       console.log(achievementList);
    //       var values = achievementList.map((x) => x.value)
    //       this.achievementList = values;
    //       console.log("データ"+ values);
  
    //       // this.datacollection.datasets[0].data.push(this.achievementList);
  
    //       // this.achievementList.forEach(aList => {
    //       //   console.log('149行目'+ aList);
    //       //   this.datacollection.datasets[0].data.push(aList)
    //       // })
    //       // console.log("152行目"+ this.datacollection.datasets[0].data);
  
    
    //       // list.forEach(achievementList => {
    //         // console.log('確認Alist' + achievementList.levelAchievementlevelAchievement);
            
    //       // this.data = res.data.map((levelAchievementlevelAchievement, i) => ({
    //       //   levelAchievementlevelAchievement: res.data[i]
    //       // }));
    //       // console.log(this.data);
    //       // this.displayGraph();
    //       // })
          
    //         // console.log('グラフの中身'+ res.data);
  
    //       })
    //       .catch((error) => {
    //         alert("編集失敗");
    //         console.log("編集失敗" + error);
  
    // });
    //   }).then(()=>{
    //     // this.loading = false;
    //   })
    // },
  

    // methods: {
    //   reRenderChart() {
    //   this.renderChart(this.data, this.options)
    //  }
    // }
  }
</script>
<style scoped>
p {
  text-align: center;
  font-weight: bold;
  font-size: 1.25em;
}
</style>
