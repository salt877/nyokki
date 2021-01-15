<template>
<div v-if="loading">
      <Loading></Loading>
</div>
    <v-app height="40vh" v-else>
    <v-sheet tile height="6vh" color="pink lighten-4" class="d-flex align-center">
      <v-btn outlined small class="ma-4" @click="setToday">
        今日
      </v-btn>
      <v-btn icon @click="$refs.calendar.prev();triggerEvent()"
      
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="$refs.calendar.next();triggerEvent()"
      @child-event="triggerEvent()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-btn outlined small class="ma-8"
       @click="viewMonth"
       >
        月報
      </v-btn>
    </v-sheet>
    <v-sheet height="40vh">
      <v-calendar
        ref="calendar"
        v-model="value"
        :events="events"
        locale="ja-jp"
        :day-format="(timestamp) => new Date(timestamp.date).getDate()"
        :month-format="(timestamp) => new Date(timestamp.date).getMonth() + 1 + ' /'"
        @click:date="viewDay" 
        color="light-green accent-2"
        
      ></v-calendar>
        <!-- :event-color="getEventColor" -->
    </v-sheet>
    <component :is="componentName" :dailyReport="dailyReport" :monthlyReport="monthlyReport" :month="month" ></component> 
    </v-app>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import MonthlyReport from './MonthlyReport';
import DailyReport from './DailyReport';
import Loading from '@/components/Loading.vue';

export default {
  name:'Calender',
  data: () => ({
    loading: "",
    events: [],
    value: moment().format('yyyy-MM-DD'),
    componentName: ['MonthlyReport', 'DailyReport'],
    dailyReport: [],
    monthlyReport:[],
    // level: moment().format('yyyy-MM'),
    
    year: moment().format('yyyy'),
    month: moment().format('MM')
    
    
  }),
  components: {
    MonthlyReport,
    DailyReport,
    Loading
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
    // this.triggerEvent();
  },
  methods: {
    setToday() {
      this.value = moment().format('yyyy-MM-DD');
    },

//カレンダーの前後の月を表示する
  triggerEvent() {
    alert('月の表示を切り替えます');
    this.year = moment(this.value).format('yyyy');
    this.month = moment(this.value).format('M');
    console.log("mmmmmmmm", this.year, this.month);
    this.$emit('child-event', {
      year : this.year,
      month : this.month
    });
   },
  //月報を取得する
   viewMonth(){
     this.month = moment(this.value).format('M');
    alert(`${this.month}` + '月の月報情報を取得します')
    console.log(this.year);
    console.log(this.month);
    //カレンダー画面で使用
    if(this.$store.state.loginUser.id === this.userId){
          axios.post("/get/myPastMonthlyReport",
              {
                date: this.value,
                year: this.year,
                month: this.month,
                loginUser: this.$store.state.loginUser,
              })
              .then((res) => {
                console.log(this.value);
                // alert(res.data.monthlyReport)
                this.loading = true;
                //月報を書いていない時
                if(res.data.monthlyReport === null){
                  this.monthlyReport = null;
                  const monthlyReport = {
                    thisMonthObjective:null,
                    impressions:null
                  }
                  this.monthlyReport = monthlyReport;
                  this.componentName = 'MonthlyReport'
                  this.loading = false;

                //月報を書いている時
                } else {  
                //日付を加工する
                const monthlyReportDate = moment(res.data.monthlyReport.registrationDate);

                res.data.monthlyReport.registrationDate = monthlyReportDate.format("YYYY-MM-DD");
                

                const monthlyReport = {
                  thisMonthObjective: res.data.monthlyReport.thisMonthObjective,
                  impressions : res.data.monthlyReport.impressions,
            
                }
              
                this.monthlyReport = monthlyReport;
                this.loading = false;
                console.log("月報情報",this.monthlyReport);
                this.componentName = 'MonthlyReport'
                }


              })  
        }

       //ユーザーページで使用
    else if(this.$store.state.loginUser.id != this.userId){
          axios.post("/get/otherUserPastMonthlyReport",
              {
                date: this.value,
                year: this.year,
                month: this.month,
                userId: this.userId,
              })
              .then((res) => {
                // console.log(this.value);
                // alert(res.data.monthlyReport)
                this.loading = true;
                //月報を書いていない時
                if(res.data.monthlyReport === null){
                  this.monthlyReport = null;
                  const monthlyReport = {
                    thisMonthObjective:null,
                    impressions:null
                  }
                  this.monthlyReport = monthlyReport;
                  this.componentName = 'MonthlyReport'
                  this.loading = false;

                //月報を書いている時
                } else {  
                //日付を加工する
                const monthlyReportDate = moment(res.data.monthlyReport.registrationDate);

                res.data.monthlyReport.registrationDate = monthlyReportDate.format("YYYY-MM-DD");
                

                const monthlyReport = {
                  thisMonthObjective: res.data.monthlyReport.thisMonthObjective,
                  impressions : res.data.monthlyReport.impressions,
            
                }
              
                this.monthlyReport = monthlyReport;
                console.log("月報情報",this.monthlyReport);
                this.componentName = 'MonthlyReport'
                this.loading = false;
                }


              })  
        }


  },


    // showEvent({ event }) {
    //   alert(`clicked ${event.name}`);
    // },
    //日報を取得する
    viewDay({ date }) {
      // alert(`date: ${date}` + '日報情報を取得します');
      alert(`${date}` + 'の日報情報を取得します');
      
        //カレンダー画面で使用
        if(this.$store.state.loginUser.id === this.userId){
          axios.post("/get/myPastDailyReport",
              {
                date: date,
                loginUser: this.$store.state.loginUser,
              })
              .then((res) => {
                
                this.loading = true;
               
                //日報を書いていない時
                if(res.data.dailyReport === null){
                  this.dailyReport = null;
                  const dailyReport = {
                    completeTodoList : null,
                    uncompleteTodoList : null,
                    levelAchievement : null
                  }
                  this.dailyReport = dailyReport;
                  this.componentName = 'DailyReport';
                  this.loading = false;

                //日報を書いている時
                } else {  
                //日付を加工する
                const dailyReportDate = moment(res.data.dailyReport.registrationDate);

                res.data.dailyReport.registrationDate = dailyReportDate.format("YYYY-MM-DD");
                const completeTodoListDate = moment(res.data.completeTodoList.registrationDate);
                res.data.completeTodoList.registrationDate = completeTodoListDate.format("YYYY-MM-DD");
                const uncompleteTodoListDate = moment(res.data.uncompleteTodoList.registrationDate);
                res.data.uncompleteTodoList.registrationDate = uncompleteTodoListDate.format("YYYY-MM-DD");

                const dailyReport = {
                  completeTodoList : res.data.completeTodoList,
                  uncompleteTodoList :res.data.uncompleteTodoList,
                  impressions : res.data.dailyReport.impressions,
                  levelAchievement : res.data.dailyReport.levelAchievementlevelAchievement
                }
              
                this.dailyReport = dailyReport;
                 console.log("にっぽう",dailyReport);
                this.loading = false;
                this.componentName = 'DailyReport';
                }


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
                this.loading = true;

                //日報を書いていない時
                if(res.data.dailyReport === null){
                  this.dailyReport = null;
                  const dailyReport = {
                    completeTodoList : null,
                    uncompleteTodoList : null,
                    levelAchievement : null
                  }
                  this.dailyReport = dailyReport;
                  this.componentName = 'DailyReport';
                  this.loading = false;

                //日報を書いている時
                } else {  
                //日付を加工する
                const dailyReportDate = moment(res.data.dailyReport.registrationDate);

                res.data.dailyReport.registrationDate = dailyReportDate.format("YYYY-MM-DD");
                const completeTodoListDate = moment(res.data.completeTodoList.registrationDate);
                res.data.completeTodoList.registrationDate = completeTodoListDate.format("YYYY-MM-DD");
                const uncompleteTodoListDate = moment(res.data.uncompleteTodoList.registrationDate);
                res.data.uncompleteTodoList.registrationDate = uncompleteTodoListDate.format("YYYY-MM-DD");

                const dailyReport = {
                  completeTodoList : res.data.completeTodoList,
                  uncompleteTodoList :res.data.uncompleteTodoList,
                  levelAchievement : res.data.dailyReport.levelAchievementlevelAchievement
                }
              
                this.dailyReport = dailyReport;
                 console.log("にっぽう",dailyReport);
                this.loading = false;
                this.componentName = 'DailyReport';
                }
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