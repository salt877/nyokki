<template>
  <v-container>
    <h2>日報登録</h2>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>今日のタスク一覧</v-card-title>
          <v-card-text v-for="todo in todos" :key="todo.id">
            {{ todo.task }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>今日の報告</v-card-title>
          <v-card-text v-for="completeTodo in completeTodoList" :key="completeTodo">
            {{ completeTodo.task }}
          </v-card-text>
          <v-card-actions>
            <v-textarea rows="1" placeholder="その他実施したタスク" v-model="newCard"> </v-textarea>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="addNewCard()">追加</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn color="warning">コピー</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            今日の達成度
          </v-card-title>
          <v-radio-group name="" row>
            <v-radio label="😊 よくできた" value="1"></v-radio>
            <v-radio label="😐 まあまあできた" value="2"></v-radio>
            <v-radio label="😢 できなかった" value="3"></v-radio>
          </v-radio-group>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            所感
          </v-card-title>
          <v-textarea class="mt-0" auto-grow rows="3" value="" v-model="impression" placeholder="今月の振り返りをしよう！"> </v-textarea>
          <v-card-actions>
            <v-btn color="warning" @click="copyImpressions()">コピー </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-btn class="save-button" color="error" @click="saveDailyReport()">保存する </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterDailyReport",
  data() {
    return {
      newCard: "",
      todos: [],
      completeTodoList: [],
      impression: "",
    };
  },
  methods: {
    addNewCard: function() {
      const addCard = this.newCard;
      if (!addCard) {
        return;
      }
      this.completeTodoList.push(addCard);
      this.newCard = "";
    },
    saveDailyReport() {
      console.log("aaaaaaaa");
      axios.post("/get/saveDairyReport", {
        loginUser: this.$store.state.loginUser,
      });
    },
  },
  created() {
    axios
      .get("/get/dairyReport", {
        loginUser: this.$store.state.loginUser,
      })
      .then((res) => {
        console.log("未完了" + res.data.uncompleteTodoList);
        console.log("完了" + res.data.completeTodoList);
        this.completeTodoList = res.data.completeTodoList;
      })
      .catch((error) => {
        console.log("通信失敗" + error);
      });
    for (var num in this.$store.state.todoList) {
      this.todos.push(this.$store.state.todoList[num]);
    }
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}
.v-input {
  width: 80%;
  margin: auto;
}
.v-input--radio-group.v-input--radio-group--row .v-radio {
  margin: 0 auto;
}
.v-btn {
  margin: 0 0 0 auto;
}
.save-button {
  margin: 3em auto;
}
</style>
