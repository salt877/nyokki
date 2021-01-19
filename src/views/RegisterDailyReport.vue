<template>
<v-main  class="back">
  <!-- ナビゲーション -->
      <navigation></navigation>
  <v-container>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
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
              <v-btn color="warning" @click="copyTasks()">コピー</v-btn>
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
            <ValidationProvider v-slot="{ errors }" name="levelAchievementlevelAchievement" rules="required">
              <v-radio-group v-model="levelAchievementlevelAchievement" id="levelAchievementlevelAchievement" :error-messages="errors" row>
                <v-radio label="😊 よくできた" :value="1"></v-radio>
                <v-radio label="😐 まあまあできた" :value="2"></v-radio>
                <v-radio label="😢 できなかった" :value="3"></v-radio>
              </v-radio-group>
            </ValidationProvider>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              所感
            </v-card-title>
            <ValidationProvider v-slot="{ errors }" name="impression" rules="selectRequired">
              <v-textarea class="mt-0" auto-grow rows="3" v-model="impression" placeholder="所感" :error-messages="errors"> </v-textarea>
            </ValidationProvider>
            <v-card-actions>
              <v-btn color="warning" @click="copyImpressions()">コピー </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-btn class="save-button" color="error" @click.prevent="handleSubmit(registerDailyReport)">保存する </v-btn>
      </v-row>
    </ValidationObserver>
  </v-container>
</v-main>
</template>

<script>
import axios from "axios";
import router from "../router";
import { mapActions } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { extend } from "vee-validate";
import Navigation from '../components/Navigation';

//バリデーションルール
//（未選択）
extend("selectRequired", {
  validate(value) {
    return {
      required: true,
      valid: ["", null, undefined].indexOf(value) === -1,
    };
  },
  message: "選択必須です",
  computesRequired: true,
});
//(未入力)
extend("required", {
  validate(value) {
    return {
      required: true,
      valid: ["", null, undefined].indexOf(value) === -1,
    };
  },
  message: "入力必須です",
  computesRequired: true,
});

export default {
  name: "RegisterDailyReport",
  components: {
    ValidationProvider,
    ValidationObserver,
    Navigation,
  },
  data() {
    return {
      errors: "",
      newCard: "",
      todos: [],
      completeTodoList: [],
      impression: "",
      levelAchievementlevelAchievement: "",
    };
  },
  methods: {
    ...mapActions(["setDailyReport"]),
    addNewCard: function() {
      const addCard = this.newCard;
      if (!addCard) {
        return;
      }
      this.completeTodoList.push({ task: addCard });
      this.newCard = "";
    },
    registerDailyReport() {
      axios
        .post("/get/registerdailyReport", {
          loginUser: this.$store.state.loginUser,
          impression: this.impression,
          completeTodoList: this.completeTodoList,
          levelAchievementlevelAchievement: this.levelAchievementlevelAchievement,
        })
        .then((res) => {
          console.log(res.data);
          this.setDailyReport(res.data);
          alert("日報を登録しました");
          router.push("/");
        })
        .catch((error) => {
          console.log("通信失敗" + error);
        });
    },
    copyImpressions: function () {
            this.$copyText(this.impression).then(function () {
                alert('所感をコピーしました');
            }, function () {
                alert('所感のコピーに失敗しました');
            })
        },
    copyTasks: function () {
            var tasks = [];
            for(let task of this.completeTodoList) {
              tasks.push(task.task);
            }
            this.$copyText(tasks).then(function () {
                alert('今日の報告をコピーしました');
            }, function () {
                alert('今日の報告のコピーに失敗しました');
            })
        }
  },
  created() {
    axios
      .post("/get/dairyReport", {
        loginUser: this.$store.state.loginUser,
      })
      .then((res) => {
        this.completeTodoList = res.data.completeTodoList;
      })
      .catch((error) => {
        console.log("通信失敗" + error);
      });
    for (var num in this.$store.state.todoList) {
      this.todos.push(this.$store.state.todoList[num]);
    }
    //日報がとうろくされていない場合の制御
    if (this.$store.state.dailyReport) {
      this.impression = this.$store.state.dailyReport.impressions;
      this.levelAchievementlevelAchievement = this.$store.state.dailyReport.levelAchievementlevelAchievement;
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
.back{
  background-image: url("~@/assets/Background8.png");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 130vh;
}
</style>
