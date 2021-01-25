<template>
  <v-main class="back">
    <!-- ナビゲーション -->
    <navigation></navigation>
    <v-container>
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <h2>{{ year }}年{{ month }}月 月報登録</h2>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>今月の目標</v-card-title>
              <v-textarea class="mt-0" auto-grow rows="3" value="" placeholder="今月の目標を設定しよう！" v-model="thisMonthsGoal"> </v-textarea>
              <!-- <v-card-text v-for="tmGoal in thisMonthsGoals" :key="tmGoal">
            {{ tmGoal }}
          </v-card-text> -->
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>所感</v-card-title>
              <ValidationProvider v-slot="{ errors }" name="impression" rules="required">
                <v-textarea class="mt-0" auto-grow rows="3" value="" placeholder="今月の振り返りをしよう！" v-model="impression" :error-messages="errors"> </v-textarea>
              </ValidationProvider>
              <v-card-actions>
                <v-btn color="warning" @click="copyImpressions()">コピー </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>来月の目標</v-card-title>
              <ValidationProvider v-slot="{ errors }" name="nextMonthGoals" rules="required">
                <v-textarea class="mt-0" auto-grow rows="3" value="" placeholder="来月の目標を考えよう！" v-model="nextMonthsGoal" :error-messages="errors"> </v-textarea>
                <!-- <v-card-text v-for="nmGoal in nextMonthsGoals" :key="nmGoal">
            {{ nmGoal }}
          </v-card-text>
          <v-text-field placeholder="来月の目標は？" v-model="inputNextMonthsGoals"> </v-text-field>
          <v-card-actions>
            <v-btn color="primary" @click="addNextMonthsTarget()">
              追加
            </v-btn>
          </v-card-actions> -->
              </ValidationProvider>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-btn class="save-button" color="error" @click.prevent="handleSubmit(saveMonthlyReport)">保存する </v-btn>
        </v-row>
      </ValidationObserver>
      <v-row><v-col></v-col></v-row>
      <v-row><v-col></v-col></v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import router from "../router";
import Navigation from "../components/Navigation";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { extend } from "vee-validate";
import { mapActions } from "vuex";

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
  name: "RegisterMonthlyReport",
  components: {
    Navigation,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      thisMonthsGoal: "",
      nextMonthsGoal: "",
      impression: "",
      year: "",
      month: "",
      errors: "",
    };
  },
  created() {
    var today = new Date();
    console.log(today);
    this.year = today.getFullYear();
    this.month = today.getMonth() + 1;
    (this.thisMonthsGoal = this.$store.state.thisMonthObjective.objective), (this.nextMonthsGoal = this.$store.state.nextMonthObjective.objective), (this.impression = this.$store.state.monthlyReport.impressions);
    console.log("今月目標", this.$store.state.thisMonthObjective.objective);
    console.log("来月目標", this.$store.state.nextMonthObjective.objective);
    console.log("所感", this.$store.state.monthlyReport.impressions);
  },
  methods: {
    ...mapActions(["setMonthlyReport", "setThisMonthObjective", "setNextMonthObjective"]),
    // addNextMonthsTarget: function() {
    //   const newMonthsGoals = this.inputNextMonthsGoals;
    //   if (!newMonthsGoals) {
    //     return;
    //   }
    //   this.nextMonthsGoals.push(newMonthsGoals);
    //   this.inputNextMonthsGoals = "";
    // },
    saveMonthlyReport() {
      axios
        .post("/get/saveMonthlyReport", {
          loginUser: this.$store.state.loginUser,
          thisMonthsGoal: this.thisMonthsGoal,
          nextMonthsGoal: this.nextMonthsGoal,
          impression: this.impression,
        })
        .then((res) => {
          console.log(res.data);
          this.setMonthlyReport(res.data.monthlyReport);
          this.setThisMonthObjective(res.data.thisMonthObjective);
          this.setNextMonthObjective(res.data.nextMonthObjective);
          router.push("/");
        })
        .catch((error) => {
          console.log("通信失敗" + error);
        });
      console.log("月報保存");
    },
    copyImpressions: function() {
      this.$copyText(this.impression).then(
        function() {
          alert("所感をコピーしました");
        },
        function() {
          alert("所感のコピーに失敗しました");
        }
      );
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}
.v-input {
  width: 90%;
  margin: auto;
}
.v-btn {
  margin: 0 0 0 auto;
}
.save-button {
  margin: 3em auto;
}
.back {
  background-image: url("~@/assets/Background8.png");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
}
</style>
