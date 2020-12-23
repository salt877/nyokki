<template>
  <v-container>
    <h2>日報詳細</h2>
      {{ dailyReport }}  
    <v-row>
      <v-col cols="8">
        <v-card>
          <v-card-title>タスク一覧</v-card-title>
          <v-card-text v-for="todo in todos" :key="todo.id" >
            {{ todo.task }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>達成度</v-card-title>
          <v-card-text>😐{{levelAchievement}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>報告</v-card-title>
          <v-card-text v-for="completeTodo in completeTodoList" :key="completeTodo">{{ completeTodo.task }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>所感</v-card-title>
          <v-card-text>
            {{impressions}}<br />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
 import axios from 'axios';

export default {
  name: "dailyReport",
  // data() {
  //   return {
  //     toDoCard: "",
  //     todos: [],
  //     completeTodoList: [],
  //     levelAchievementlevelAchievement: "",
  //   };
  // },
  data: () => ({
    toDoCard: "",
    todos: [],
    completeTodoList: [],
    levelAchievementlevelAchievement: "",
    impressions: "test",
    levelAchievement: 1
  }),
 // props:["date"],
 props: {
   impressions: String,
   levelAchievement: Number
 },
  created(){
    console.log("所感"+ this.impressions)
   // console.log("日報コンポーネント:"+this.dailyReport);
    console.log(this.date)
    axios
      .post("/get/pastDairyReport", {
        loginUser: this.$store.state.loginUser,
        date: this.date
      })
      .then((res) => {
        this.completeTodoList = res.data.completeTodoList;
        this.levelAchievementlevelAchievement = res.data.dailyReport.levelAchievementlevelAchievement;
        this.impressions = res.data.dailyReport.impressions;
        console.log(res.data.dailyReport.impressions)
      })
      .catch((error) => {
        console.log("通信失敗" + error);
      });
    for (var num in this.$store.state.todoList) {
      this.todos.push(this.$store.state.todoList[num]);
    }
  }
  

};
</script>
<style scoped>
.container {
  border: solid 0.2em pink;
  margin: 5em 0;
}
</style>
