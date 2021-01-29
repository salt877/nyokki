<template>
<v-main>
  <div>
    <v-app-bar class="light-green accent-1">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-img src="../images/logo.jpg" height="57" width="150"></v-img></v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary class="back">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <v-img src="../images/logo.jpg" height="85"></v-img>
          <v-list-item-subtitle class="layout justify-center" fluid>
            にょきにょき育成日記
          </v-list-item-subtitle>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <div class="ray">
      <v-list nav dense >
        <v-list-item v-for="nav_list in nav_lists" :key="nav_list.name" :to="nav_list.link">
          <v-list-item-icon>
            <v-icon>{{ nav_list.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="logout()">
          <v-list-item-icon>
            <v-icon> mdi-logout </v-icon>
          </v-list-item-icon>
          <v-list-item-title> ログアウト </v-list-item-title>
        </v-list-item>
      </v-list>
      </div>
    </v-navigation-drawer>
  </div>
</v-main>
</template>

<script>
import firebase from "firebase";
import { mapActions } from "vuex";
export default {
  name: "Sidebar",
  data() {
    return {
      drawer: false,
      nav_lists: [
        { name: "サインイン", icon: "mdi-login", link: "/signIn" },
        { name: "Top", icon: "mdi-home", link: "/" },
        { name: "マイページ", icon: "mdi-account", link: "/mypage" },
        { name: "ToDo登録", icon: "mdi-pencil", link: "/registerToDo" },
        { name: "ToDo管理", icon: "mdi-format-list-bulleted", link: "/manageToDo" },
        { name: "日報登録", icon: " mdi-clipboard-text", link: "/registerDailyReport" },
        { name: "月報登録", icon: "mdi-note-text", link: "/registerMonthlyReport" },
        { name: "カレンダー", icon: "mdi-calendar-text", link: "/calendar" },
        { name: "みんなの達成度", icon: "mdi-account-multiple-outline", link: "/levelForAchivement" },
        { name: "FAQ", icon: "mdi-help", link: "/faq" },
      ],
    };
  },
  methods: {
    ...mapActions(["resetState"]),
    // ログアウト処理
    logout() {
      if (confirm("ログアウトしてもよろしいですか？")) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            // ログアウト時にローカルストレージのストアの中身を消去
            this.resetState();
            localStorage.removeItem("vuex");
            console.log("ログアウト成功！");
            alert("ログアウトしました。");
            this.$router.push("/signIn");
          });
        // .catch((error) => {
        //   console.log("ログアウト失敗" + error);
        //   alert("ログアウトに失敗しました");
        // });
      }
    },
  },
};
</script>
<style scoped>
.back{
  background-image: url("~@/assets/Background1.png");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
}
.ray {
  /* text-align: center; */
  /* position: relative; */
  /* top: 20vh; */
  width: 90%;
  height: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  margin: 0 auto;
}
</style>
