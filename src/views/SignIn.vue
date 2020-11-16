<template>
  <div class="back-ground">
    <div class="box">
      <h3>毎日書いてにょきにょき育てる</h3>
      <h3>{{ aaa }}</h3>
      <p v-for="user in users" :key="user.id">
        id: {{ user.id }}<br>
        name: {{ user.name }}<br>
        continuationDays: {{ user.continuationDays }}<br>
        firstdayContinuation: {{ user.firstdayContinuation }}<br>
        levelAchievement: {{ user.levelAchievement }}
      </p>
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
      users: [{ 
        id: "",
        name: "",
        continuationDays: "",
        firstdayContinuation: "",
        levelAchievement: ""
      }]  
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
        console.log(res.data);
        this.name = res.data.name;
        this.id = res.data.id;
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
