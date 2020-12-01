<template>
  <div class="back-ground">
    <div class="box">
      <h3>毎日書いてにょきにょき育てる</h3>

      <v-img src="../images/logo.jpg"></v-img>
      <v-btn class="loginButton" color="green" @click="googleLogin"><v-icon>mdi-flower</v-icon>Googleログイン</v-btn>&emsp; 
      <v-btn class="loginButton" color="primary" @click="getSample1"><v-icon>mdi-flower</v-icon>same</v-btn>&emsp; 
      <v-btn class="loginButton" color="primary" @click="getSample2"><v-icon>mdi-flower</v-icon>same2</v-btn>&emsp;
      <v-btn class="loginButton" color="primary" @click="getSample3"><v-icon>mdi-flower</v-icon>same3</v-btn>&emsp;  
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import { mapActions } from "vuex";
import moment from "moment";
import router from '../router'

export default {
  name: "SignIn",
  methods: {
    ...mapActions(["setLoginUser", "setUserList", "setTodoList", "setDailyReport", "setMonthlyReport", "setObjective", "setFollowingList"]),
    // Googleログイン
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
          // Googleアカウント情報(名前とメールのみ)
          const loginUserData = {
            name: res.additionalUserInfo.profile.name,
            gmail: res.additionalUserInfo.profile.email,
          };
          console.log(loginUserData);

          if (res.additionalUserInfo.isNewUser) {
            // 新規ログインするユーザの処理
            console.log("新しく登録");
            axios
              .post("/users/register", {
                name: res.additionalUserInfo.profile.name,
                gmail: res.additionalUserInfo.profile.email,
              })
              .then((res) => {
                console.log("新規ログイン成功");
                console.log(res.data);
              })
              .catch((error) => {
                console.log("新規ログイン失敗" + error);
              });
          }
          // 初期データの取得
          console.log("データの取得開始");
          axios
            .get("/get/Information", {
              params: {
                gmail: res.additionalUserInfo.profile.email,
              },
            })
            .then((res) => {
              console.log("データの取得成功");
              console.log(res.data);
              // storeに保存
              Promise.resolve().then(() => {
                this.setLoginUser(res.data.loginUser);
                this.setUserList(res.data.userList);
                this.setTodoList(res.data.todoList);
                this.setDailyReport(res.data.dailyReport);
                this.setMonthlyReport(res.data.monthlyReport);
                this.setObjective(res.data.objective);
                this.setFollowingList(res.data.followingList);
              });
            })
            .catch((error) => {
              console.log("既存ログイン失敗" + error);
            });
          console.log("つつがなく成功");
          router.push('/');
        });
    },
    // 以下、サンプル取得用(のち削除)
    getSample1(){
      axios
        .get("/get/Information",{
          params: {
            gmail: 'same@gmail.com'
          }
        })
        .then((res) => {
          console.log("サンプル1のデータの取得成功");
          console.log(res.data);
          // storeに保存
          Promise.resolve().then(() => {
            this.setLoginUser(res.data.loginUser);
            this.setUserList(res.data.userList);
            this.setTodoList(res.data.todoList);
            this.setDailyReport(res.data.dailyReport);
            this.setMonthlyReport(res.data.monthlyReport);
            this.setObjective(res.data.objective);
            this.setFollowingList(res.data.followingList);
          });
        })
        .catch((error) => {
          console.log("既存ログイン失敗" + error);
        });
      console.log("すべて成功");
      router.push('/');
    },
    getSample2(){
      axios
        .get("/get/Information",{
          params: {
            gmail: 'same2@gmail.com'
          }
        })
        .then((res) => {
          console.log("サンプル2のデータの取得成功");
          console.log(res.data);
          // storeに保存
          Promise.resolve().then(() => {
            this.setLoginUser(res.data.loginUser);
            this.setUserList(res.data.userList);
            this.setTodoList(res.data.todoList);
            this.setDailyReport(res.data.dailyReport);
            this.setMonthlyReport(res.data.monthlyReport);
            this.setObjective(res.data.objective);
            this.setFollowingList(res.data.followingList);
          });
        })
        .catch((error) => {
          console.log("既存ログイン失敗" + error);
        });
      console.log("すべて成功");
      router.push('/');
    },
    getSample3(){
      axios
        .get("/get/Information",{
          params: {
            gmail: 'same3@gmail.com'
          }
        })
        .then((res) => {
          console.log("サンプル3のデータの取得成功");
          console.log(res.data);
          // storeに保存
          Promise.resolve().then(() => {
            this.setLoginUser(res.data.loginUser);
            this.setUserList(res.data.userList);
            this.setTodoList(res.data.todoList);
            this.setDailyReport(res.data.dailyReport);
            this.setMonthlyReport(res.data.monthlyReport);
            this.setObjective(res.data.objective);
            this.setFollowingList(res.data.followingList);
          });
        })
        .catch((error) => {
          console.log("既存ログイン失敗" + error);
        });
      console.log("すべて成功");
      router.push('/');
    }
  },
  computed: {
    getloginUser() {
      return this.$store.state.loginUser;
    },
    getUserList() {
      return this.$store.state.userList;
    },
    getTodoList() {
      return this.$store.state.todoList;
    },
    getDailyReport() {
      return this.$store.state.dailyReport;
    },
    getMonthlyReport() {
      return this.$store.state.monthlyReport;
    },
    getObjective() {
      return this.$store.state.objective;
    },
    getFollowingList() {
      return this.$store.state.followingList;
    },
    getLoginUserFirstDay() {
      return moment(this.$store.state.loginUser.firstdayContinuation).format("YYYY/MM/DD HH:mm:ss");
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
