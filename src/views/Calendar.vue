<template>
<div v-if="loading">
      <Loading></Loading>
</div>
<v-container v-else>
  <v-row>
    <v-col>
        <h2>カレンダー</h2>
        <CalendarComponent :userId="$store.state.loginUser.id"
        :year="year" :month="month" @child-event="parentMethod"
        ></CalendarComponent>
    </v-col>
    <v-col>
      <v-card>
        <ChartJs :values="values" :key="resetKey"></ChartJs>
      </v-card>
      <v-col>
      <NyokkiFlower :flowerStatus="flowerStatus" ></NyokkiFlower>
    </v-col>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import CalendarComponent from '../components/CalendarComponent.vue';
import NyokkiFlower from '../components/NyokkiFlower.vue';
import ChartJs from '../components/ChartJs.vue';
import Loading from '@/components/Loading.vue';
import axios from "axios";
import moment from 'moment';


  export default {
    name: "Calendar",
    components:{
      CalendarComponent,
      ChartJs,
      NyokkiFlower,
      Loading
    },
    data: () => ({
    loading: true,
    values:"",
    flowerStatus: "",
     item: [],
     year:"",
     month:"",
     resetKey:0
  }),
  methods: {
   parentMethod : function(value2) {
    //  this.loading = true;
    this.values = []
    alert(value2.year);
    alert(value2.month);
    this.year = value2.year;
    this.month = value2.month;
    console.log('子コンポーネントのイベントを検知しました',this.year,this.month);
    

    axios.post("/get/showCalender", {
      loginUser : this.$store.state.loginUser,
          date: this.value,
          year: this.year,
          month: this.month
          })
        .then((res) => {
        let list = res.data ;
        var achievementList=[];
        console.log(res.data,"2");
        
        //お花の表示
        let flowerCount = this.$store.state.loginUser.continuationDays / 32;
        let flowerStatus = this.$store.state.loginUser.continuationDays % 32;

          if(flowerCount < 1){
            flowerCount = 0;
            this.flowerStatus = flowerStatus;

          } else if(flowerCount >= 1){
            flowerCount = Math.floor(flowerCount);
            this.flowerStatus = flowerStatus;
          }

          //達成度グラフの表示
          for(let num in list){
            achievementList.push({
              value:list[num].levelAchievementlevelAchievement,
            }
            )
          }
          // console.log(achievementList);
          var values = achievementList.map((x) => x.value)
          this.values = values;
          console.log("データ"+ values);
          })
          .catch((error) => {
            alert("編集失敗");
            console.log("編集失敗" + error);
     });
      // this.resetKey++;
      this.loading = false;
   
   
   }

  },
  async created () {
    this.values = []
    var year = moment().format('yyyy')
    var month =  moment().format('MM')
    // this.parentMethod()
    
    await axios.post("/get/showCalender", {
      loginUser : this.$store.state.loginUser,
          date: this.value,
          year: year,
          month: month
          })
        .then((res) => {
        let list = res.data ;
        var achievementList=[];
        console.log(res.data,"1");

        //日付を加工する
        // const achievementListDate = moment(list.registrationDate)
        
        //お花の表示
        let flowerCount = this.$store.state.loginUser.continuationDays / 32;
        let flowerStatus = this.$store.state.loginUser.continuationDays % 32;

          if(flowerCount < 1){
            flowerCount = 0;
            this.flowerStatus = flowerStatus;

          } else if(flowerCount >= 1){
            flowerCount = Math.floor(flowerCount);
            this.flowerStatus = flowerStatus;
          }

          //達成度グラフの表示
          for(let num in list){
            achievementList.push({
              value:list[num].levelAchievementlevelAchievement,
            }
            )
          }
          // console.log(achievementList);
          var values = achievementList.map((x) => x.value)
          this.values = values;
          console.log("データ"+ values);
          })
          .catch((error) => {
            alert("編集失敗");
            console.log("編集失敗" + error);
    });
      this.loading = false;
    },

  };
</script>