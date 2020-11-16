<template>
  <div class="back-ground">
    <div class="box">
      <h3>毎日書いてにょきにょき育てる</h3>

     
        <!-- <p>ユーザーリスト</p>
        <div v-for="(user, index) in userList" :key="index">
        id: {{ user.id }}<br>
        name: {{ user.name }}<br>
        continuationDays: {{ user.continuationDays }}<br>
        firstdayContinuation: {{ user.firstdayContinuation }}<br>
        levelAchievement: {{ user.levelAchievement }}
        </div> -->
        
        <!-- <p>Todoリスト</p>
        <div v-for="(todo, index2) in todoList" :key="index2">
        id:{{todo.id}}<br>
        user_id:{{todo.user_id}}<br>
        task:{{todo.task}}<br>
        status:{{todo.status}}<br>
        registration_date:{{todo.registrationDate}}<br>
        </div>  -->

        <!-- <p>フォローリスト</p>
        <div v-for="(follow, index3) in followingList" :key="index3">
        id:{{follow.id}}<br>
        follow_flag:{{follow.followFlag}}<br>
        following_id:{{follow.followingId}}<br>
        followed_id :{{follow.followedId }}<br>
        </div> -->

        <p>日報一つ分のデータ</p>
        <div>
        id:{{dailyReport.id}}<br>
        user_id:{{dailyReport.userId}}<br>
        todo_id:{{dailyReport.todoId}}<br>
        today_report:{{dailyReport.todayReport}}<br>
        level_achievementlevel_achievement:
        {{dailyReport.levelAchievementlevelAchievement}}<br>
        impressions:{{dailyReport.impressions}}<br>
        registration_date:{{dailyReport.registrationDate}}<br>
        </div><br>

        <!-- <p>月報一つ分のデータ</p>
        <div>
        id:{{monthlyReport.id}}<br>
        user_id:{{monthlyReport.userId}}<br>
        objective_id:{{monthlyReport.objectiveId}}<br>
        this_month_objective:{{monthlyReport.thisMonthObjective}}<br>
        impressions:{{monthlyReport.impressions}}<br>
        next_month_objective:{{monthlyReport.nextMonthObjective}}<br>
        registration_date:{{monthlyReport.registrationDate}}<br>
        </div><br> -->

        <!-- <p>目標一つ分のデータ</p>
        <div>
        id:{{objective.id}}<br>
        user_id:{{objective.userId}}<br>
        objective:{{objective.objective}}<br>
        objective_month:{{objective.objectiveMonth}}<br>
        </div> -->

      <v-img src="../images/logo.jpg"></v-img>
      <v-btn class="loginButton" color="green" @click="signIn"><v-icon>mdi-flower</v-icon>サインイン</v-btn>
      <v-btn class="loginButton" color="green" @click="signIn2"><v-icon>mdi-flower</v-icon>サインイン2</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      aaa: "",
      id: "",
      name: "",
      response: {},
      userList:[],
      todoList:[],
      followingList:[],
      dailyReport:[],
      monthlyReport:[],
      objective:[],
    };
  },
  name: "SignIn",
  methods: {
    signIn() {
      axios.post("/user/signIn").then((res) => {
        console.log(res.data);
        for(var i=0; i < res.data.length; i++){
          this.users.push({
            id: res.data[i].id,
            name: res.data[i].name,
            continuationDays: res.data[i].continuationDays,
            firstdayContinuation: res.data[i].firstdayContinuation,
            levelAchievement: res.data[i].levelAchievement
        })
        }
        alert("サインインを押しました！");
      });
    },
    signIn2() {
      axios.post("/users").then((res) => {
        console.log("res.data:", res.data)
        console.log("userList:", res.data.userList);
        console.log("todoList:", res.data.todoList);
        console.log("followList:", res.data.followList);
        console.log("dailyReport:", res.data.dailyReport);
        console.log("monthlyReport:", res.data.monthlyReport);
        console.log("objective:", res.data.objective);
        
        this.response = res.data
        this.userList = res.data.userList;
        this.todoList = res.data.todoList;
        this.followingList = res.data.followingList;
        this.dailyReport = res.data.dailyReport;
        this.monthlyReport = res.data.monthlyReport;
        this.objective = res.data.objective;
        
        alert("サインイン2！");
      });
    },
  },
};
</script>

<style>
.back-ground {
  background-image: url("~@/assets/SignInBackGround.jpg");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
  position: relative;
}
.box {
  text-align: center;
  position: relative;
  top: 20vh;
  width: 70%;
  height: 50%;
  background-color: rgba(255, 255, 255, 0.671);
  margin: 0 auto;
}
.box h1 {
  margin: 5vh 0;
}
.v-image {
  width: 300px;
  height: auto;
  margin: 3vh auto;
}
</style>
