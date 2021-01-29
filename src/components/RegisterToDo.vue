<template>
 <v-main  class="back">
   <!-- ナビゲーション -->
      <navigation></navigation>
  <v-container>
     <v-row>
      <v-col></v-col>
      <v-subheader class=" card-design2 yellow lighten-5 card-font layout justify-center" field>
       ToDo登録
      </v-subheader>
      <v-col></v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field placeholder="今日のToDoを追加しよう！" v-model="toDoCard"> </v-text-field>
        <v-btn color="primary" @click="addToDoCard()">追加 </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            今日のToDo
          </v-card-title>
          <v-card-text v-for="todo in todos" :key="todo.id" v-model="todos">
            {{ todo.task }} 
            <v-btn elevation="2" fab x-small color="gray" @click="daleteTodo(todo.task)">
              <v-icon>
                mdi-minus
              </v-icon>
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="copyTodo()">コピー
            </v-btn>
            <v-btn color="error" @click="saveToDo">保存 </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
 </v-main>
</template>

<script>
import Navigation from '../components/Navigation';
import axios from "axios";
import { mapActions } from "vuex";
import router from "../router";

export default {
  name: "RegisterToDo",
  data() {
    return {
      toDoCard: "",
      todos: []
    };
  },
  components:{
    Navigation,
  },
  methods: {
    ...mapActions(["setTodoList"]),
    addToDoCard: function() {
      const newToDoCard = this.toDoCard;
      if (!newToDoCard) {
        return;
      }
      this.todos.push({ task: newToDoCard });
      this.toDoCard = "";
    },
    saveToDo() {
      console.log(this.$store.state.loginUser);
      axios
        .post("/get/registerToDo", { todos: this.todos, loginUser: this.$store.state.loginUser })
        .then((res) => {
          this.setTodoList(res.data);
          alert("登録完了");
          router.push("/");
          this.todos = [];
        })
        .catch((error) => {
          alert("登録失敗");
          console.log("登録失敗" + error);
        });
    },
    copyTodo: function () {
      var tasks = [];
        for(let todo of this.todos){
          console.log(todo.task);
          tasks.push(todo.task);
        }
            this.$copyText(tasks).then(function () {
                alert('今日のToDoをコピーしました');
            }, function () {
                alert('今日のToDoのコピーに失敗しました');
            })
        },
    daleteTodo(task) {
      for (var num in this.todos) {
        if (this.todos[num].task === task) {
          this.todos.splice(num, 1);
        }
      }
      console.log(this.todos);
    },
  },
  created() {
    // for (var num in this.$store.state.todoList) {
    //   this.todos.push(this.$store.state.todoList[num]);
    // }
  },
};
</script>
<style scoped>
.container {
  text-align: center;
}
.card-design2{
    text-align: center;
    border-radius:50px 50px 50px 50px;
    font-size: 1.8em;
    color:rgb(250, 144, 74);
    font-weight: bold;
    width: 10%;
}
.row {
  align-content: center;
  margin: 5em 0em;
}
.v-input,
.v-card {
  max-width: 80%;
  margin: 0 auto;
}
.v-btn--fab.v-size--x-small {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 1rem;
}
.back{
  background-image: url("~@/assets/Background9.png");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
}
</style>
