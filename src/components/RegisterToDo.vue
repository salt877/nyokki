<template>
  <v-container>
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
          <v-card-text v-for="todo in todos" :key="todo.id">
            {{ todo.task }}
            <v-btn elevation="2" fab x-small color="gray">
              <v-icon>
                mdi-minus
              </v-icon>
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="copyToDo">コピー </v-btn>
            <v-btn color="error" @click="saveToDo">保存 </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import router from "../router";
export default {
  name: "RegisterToDo",
  data() {
    return {
      toDoCard: "",
      todos: [],
    };
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
    copyToDo() {
      console.log("保存");
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
</style>
