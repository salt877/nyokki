<template>
    <v-app height="40vh">
    <v-sheet tile height="6vh" color="pink lighten-4" class="d-flex align-center">
      <v-btn outlined small class="ma-4" @click="setToday">
        今日
      </v-btn>
      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-btn outlined small class="ma-8" @click="componentName='MonthlyReport'">
        月報
      </v-btn>
    </v-sheet>
    <v-sheet height="40vh">
      <v-calendar
        ref="calendar"
        v-model="value"
        :events="events"
        :event-color="getEventColor"
        locale="ja-jp"
        :day-format="(timestamp) => new Date(timestamp.date).getDate()"
        :month-format="(timestamp) => new Date(timestamp.date).getMonth() + 1 + ' /'"
        
        @click:date="viewDay"
        
        @click="showDailyReport"
        color="light-green accent-2"
        
      ></v-calendar>
    </v-sheet>
    <component :is="componentName" :impressions="impressions" :levelAchievement="levelAchievement"></component>
    </v-app>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import MonthlyReport from './MonthlyReport';
import DailyReport from './DailyReport';

export default {
  name:'Calender',
  data: () => ({
    events: [],
    value: moment().format('yyyy-MM-DD'),
    componentName: ['MonthlyReport', 'DailyReport'],
    userId: "",
    dailyReport: []
  }),
  components: {
    MonthlyReport,
    DailyReport
  },
  props:{
    userId: Number
  },
  computed: {
    title() {
      return moment(this.value).format('yyyy年 M月');
    },
  },
  created(){
    console.log("test:"+this.userId);
  },
  methods: {
    setToday() {
      this.value = moment().format('yyyy-MM-DD');
    },
    // showEvent({ event }) {
    //   alert(`clicked ${event.name}`);
    // },
    viewDay({ date }) {
      // alert(`date: ${date}` + '日報情報を取得します');
      alert(`${date}` + 'の日報情報を取得します');
      console.log(this.userId);
      console.log(date);
      this.componentName = 'DailyReport';

      // axios.get("/get/showDailyReports",{params:date, dailyReport:this.$store.state.dailyReport }).then(res => {
      //   console.log("カレンダー通信成功"+res.data);
      // })

      // let config = "";
      //     let formData = new FormData();
      //     const OBJ = {
      //       loginUser: this.$store.state.loginUser,
      //       date: date
      //     }
      //   formData.append(
      //     "OBJ",
      //     new Blob([JSON.stringify(OBJ)],{ type: "application/json" })
      //   );
      //   console.log(OBJ);
      // config = {
      //     headers: {
      //         "content-type": "multipart/form-data"
      //     },
      // };

      // axios
      //     .post("/get/pastDairyReport",{loginUser: this.$store.state.loginUser,
      //       date: date})
      //     .then((res) => {
      //       console.log("新規通信成功");
      //       console.log(res.data);
      //    });
        if(this.$store.state.loginUser.id === this.userId){
          axios.post("/get/myPastDailyReport",
              {
                date: date,
                loginUser: this.$store.state.loginUser,
              })
              .then((res) => {
                console.log("自分のカレンダーから日報をみる");
                console.log(res.data);
                const dailyReport = {
                  impressions : res.data.dailyReport.impressions,
                  levelAchievement : res.data.dailyReport.levelAchievementlevelAchievement
                }
                console.log("カレンダーコンポーネント"+dailyReport);
              })  
        }
        //ユーザーページで使用
        else if(this.$store.state.loginUser.id != this.userId){
          axios.post("/get/otherUserPastDailyReport",
              {
                date: date,
               userId: this.userId
              })
              .then((res) => {
                console.log("ユーザーページから日報をみる");

                  console.log("書き換え前:"+JSON.stringify(res.data));
    
                // Date.prototype.toJSON = function() {
                //   return this.getFullYear() + '-' + ('0'+(this.getMonth()+1)).slice(-2) + '-' + ('0'+this.getDate()).slice(-2) + 'T' +
                //  ('0'+this.getHours()).slice(-2) + ':' + ('0'+this.getMinutes()).slice(-2) + ':' + ('0'+this.getSeconds()).slice(-2) + '.000Z';
                // }

                var date = moment(res.data.dailyReport.registrationDate);
                console.log(date.format("YYYY-MM-DD"));
                res.data.dailyReport.registrationDate = date.format("YYYY-MM-DD");

                const impressions= res.data.dailyReport.impressions;
                this.impressions =  impressions;
                const levelAchievement = res.data.dailyReport.levelAchievementlevelAchievement;
                this.levelAchievement = levelAchievement;

                console.log("書き換え後:"+JSON.stringify(res.data));
                // const dailyReport = {
                //   impressions : res.data.dailyReport.impressions,
                //   levelAchievement : res.data.dailyReport.levelAchievementlevelAchievement
                // }
                // console.log("カレンダーコンポーネント"+dailyReport);
              }
           );
        }
        


    //    axios
    //   .post("/get/pastDairyReport", {
    //     loginUser: this.$store.state.loginUser,
    //     date: date
    //   })
    //   .then((res) => {
    //     this.completeTodoList = res.data.completeTodoList;
    //     this.levelAchievementlevelAchievement = res.data.dailyReport.levelAchievementlevelAchievement;
    //     this.impressions = res.data.dailyReport.impressions;
    //     console.log(res.data.dailyReport.impressions)
    //   })
    //   .catch((error) => {
    //     console.log("通信失敗" + error);
    //   });
    // for (var num in this.$store.state.todoList) {
    //   this.todos.push(this.$store.state.todoList[num]);
    // }
    //  console.log(this.viewDay)

    },
    showDailyReport(){
      //     let config = "";
      //     let formData = new FormData();
      //     const OBJ = {
      //       loginUser: this.$store.state.loginUser,
      //     }
      //   formData.append(
      //     "OBJ",
      //     new Blob([JSON.stringify(OBJ)],{ type: "application/json" })
      //   );
      // config = {
      //     headers: {
      //         "content-type": "multipart/form-data"
      //     },
      // };
      // this.axios
      //     .post("/get/pastDairyReport", formData, config)
      //     .then((res) => {
      //       console.log("新規通信成功");
      //       console.log(res.data);
          
      //    });

      //   axios
      // .post("/get/dairyReport", {
      //   loginUser: this.$store.state.loginUser,
      // })
      // .then((res) => {
      //   this.completeTodoList = res.data.completeTodoList;
      //   console.log(res.data)
      // })
      // .catch((error) => {
      //   console.log("通信失敗" + error);
      // });
      // },
      // selectDate(event) { //日付を選択する
      //   this.selectedDate = event.currentTarget.id
},

    // getEvents() {
    //   const events = [
    //     // new Dateからmomentに変更
    //     {
    //       name: '会議',
    //       start: moment('2020-08-03 10:00:00').toDate(),
    //       end: moment('2020-08-03 11:00:00').toDate(),
    //       color: 'blue',
    //       timed: true,
    //     },
        
    //   ];
    //   this.events = events;
    // },
    // getEventColor(event) {
    //   return event.color;
    // },
  }
};
</script>

<style>
.v-application--wrap {
  min-height: 40vh;
}
</style>