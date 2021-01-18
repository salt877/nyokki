<template>
<v-main  class="back">
  <v-container>
    <h2>ToDo管理</h2>
    <h3>達成率：{{ achievementRate }}％</h3>
    <div id="box1" class="task-box">
      <draggable tag="ul" :options="{ group: 'ITEMS' }" v-model="incompletes">
        <li v-for="incomplete in incompletes" :key="incomplete.no">{{ incomplete.task }}</li>
      </draggable>
    </div>
    <div id="box2" class="task-box">
      <draggable tag="ul" :options="{ group: 'ITEMS' }" v-model="completes">
        <li v-for="complete in completes" :key="complete.no">{{ complete.task }}</li>
      </draggable>
    </div>
    <v-card-actions>
      <v-btn color="error button" @click="finishTodo">保存 </v-btn>
    </v-card-actions>
  </v-container>
</v-main>
</template>

<script>
import draggable from "vuedraggable";
import axios from "axios";
import { mapActions } from "vuex";
import router from "../router";

export default {
  name: "ManageToDo",
  components: {
    draggable,
  },
  data() {
    return {
      incompletes: [],
      completes: [],
      todos: [],
    };
  },
  created() {
    for (var num in this.$store.state.todoList) {
      if (this.$store.state.todoList[num].status === 1) {
        this.incompletes.push(this.$store.state.todoList[num]);
      } else {
        this.completes.push(this.$store.state.todoList[num]);
      }
    }
    console.log("未完了" + this.incompletes);
    console.log("完了" + this.completes);
  },
  computed: {
    achievementRate() {
      var rate = (this.completes.length / (this.incompletes.length + this.completes.length)) * 100;
      return Math.round(rate);
    },
  },
  methods: {
    ...mapActions(["setTodoList"]),
    finishTodo() {
      for (var num in this.incompletes) {
        this.incompletes[num].status = 1;
        this.todos.push(this.incompletes[num]);
      }
      for (var num2 in this.completes) {
        this.completes[num2].status = 2;
        this.todos.push(this.completes[num2]);
      }
      console.log(this.todos);
      axios
        .post("/get/updateToDo", { todos: this.todos, loginUser: this.$store.state.loginUser })
        .then((res) => {
          this.setTodoList(res.data);
          alert("編集完了");
          router.push("/");
        })
        .catch((error) => {
          alert("編集失敗");
          console.log("編集失敗" + error);
        });
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}
h2 {
  text-align: center;
}
h3 {
  text-align: right;
  margin-right: 5%;
}
.task-box {
  width: 49%;
  float: left;
  border-radius: 1em;
  padding: 2em;
  position: relative;
  height: auto;
  margin-top: 10%;
  margin-bottom: 23%;
}
#box1 {
  border: 0.3em solid rgb(255, 123, 123);
  margin-right: 1%;
}
#box2 {
  border: 0.3em solid rgb(142, 159, 255);
  margin-left: 1%;
}

#box1::before {
  background-color: #fff;
  color: #333;
  content: "未完了";
  font-weight: bold;
  font-size: 1.6em;
  padding: 0px 10px;
  position: absolute;
  top: -0.8em;
  left: 44%;
}
#box2::before {
  background-color: #fff;
  color: #333;
  content: "完了";
  font-weight: bold;
  font-size: 1.6em;
  padding: 0px 10px;
  position: absolute;
  top: -0.8em;
  right: 42%;
}
ul {
  padding: 0px 0px;
  list-style-type: none;
}
li {
  cursor: pointer;
  padding: 10px;
  border: solid #ddd 1px;
}
.v-main__wrap {
  flex: 1 1 auto;
  max-width: 100%;
  position: relative;
}
.button {
  position: absolute;
  bottom: 200px;
  margin-left: 540px;
  position: relative;
  padding-bottom: 50px;
}
.back{
  background-image: url("~@/assets/Background9.png");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
}
</style>
