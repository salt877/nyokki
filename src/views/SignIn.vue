<template>
  <div class="back-ground">
    <div class="box">
      <h3>毎日書いてにょきにょき育てる</h3>

      <v-img src="../images/logo.jpg"></v-img>
      <v-btn class="loginButton" color="green" @click="googleLogin"><v-icon>mdi-flower</v-icon>Googleログイン</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from 'firebase'
import { mapActions } from 'vuex'
import router from '../router'

export default {
  name: "SignIn",
  methods: {
    ...mapActions([
      "setLoginUser",
      "setUserList",
      "setTodoList",
      "setDailyReport",
      "setMonthlyReport",
      "setObjective",
      "setFollowingList"
    ]),
    // Googleログイン
    googleLogin(){
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider)
        .then((res) => {
          const userData = {
            name: res.additionalUserInfo.profile.name,
            gmail: res.additionalUserInfo.profile.email
          }
          console.log(userData);

          if(res.additionalUserInfo.isNewUser){
            console.log("新しく登録");
          } else {
            console.log("elseが呼ばれました");
            axios.get("/get/Information", {
              params: {
                gmail: "same@gmail.com"
              }
            })
            .then((res) => {
              console.log("成功");
              console.log(res.data);
              Promise.resolve()
                .then(() => {
                  this.setLoginUser(res.data.loginUser);
                  this.setUserList(res.data.userList);
                  this.setTodoList(res.data.todoList);
                  this.setDailyReport(res.data.dailyReport);
                  this.setMonthlyReport(res.data.monthlyReport);
                  this.setObjective(res.data.objective);
                  this.setFollowingList(res.data.followingList);
                })
            })
            .catch((error) => {
              console.log("失敗" + error);
            })
          }
          console.log(userData);
          console.log("成功");
          router.push('/');
        })

    }
  },
  computed: {
    getloginUser(){
      return this.$store.state.loginUser
    },
    getUserList(){
      return this.$store.state.userList
    },
    getTodoList(){
      return this.$store.state.todoList
    },
    getDailyReport(){
      return this.$store.state.dailyReport
    },
    getMonthlyReport(){
      return this.$store.state.monthlyReport
    },
    getObjective(){
      return this.$store.state.objective
    },
    getFollowingList(){
      return this.$store.state.followingList
    },
  }
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
