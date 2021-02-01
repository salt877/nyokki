<template>
<v-main>
  <div>
    <v-app-bar class="light-green accent-1">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-img src="../images/logo2.png" height="60" width="150"></v-img></v-toolbar-title>
      <div class="flex-grow-1"></div>
      <span class="font">こんにちは！ {{ this.$store.state.loginUser.name }}さん</span>
      <v-btn icon @click="dialog = true">
        <v-icon v-if="alertFollowerList.length!==0">mdi-bell-alert</v-icon>
        <v-icon  v-if="alertFollowerList.length===0">mdi-bell-outline</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" width="500">

      <!-- フォロー申請通知モーダル -->
      <v-card>
        <v-card-title class="headline grey lighten-2">
          通知
        </v-card-title>
        <!-- 通知内容 -->
         <v-list two-line>
           <v-subheader v-if="!alertFollowerList.length===0">フォロー申請が届いています</v-subheader>
           <v-subheader v-if="alertFollowerList.length===0">フォロー申請はありません</v-subheader>
            <v-list-item v-for="(item, index) in alertFollowerList" :key="index" link>
              <v-list-item-content class="modal-content">  
                <router-link :to="{name: 'userpage',  params: {id: item.id}}">
                  <v-list-item-avatar size="60" class="avatar">
                    <img :src="item.photoUrl">
                  </v-list-item-avatar>
                  <v-list-item-title class="user-name">
                    {{ item.name }}
                  </v-list-item-title>
                </router-link> 
                  <v-card-actions class="modal-btn">
                    <v-btn color="light-blue lighten-3"  @click="approve(item)">承認⭕️</v-btn>
                    <v-btn color="pink lighten-4" @click="deny(item)">否認❌</v-btn>
                  </v-card-actions>
            </v-list-item-content>
          </v-list-item>
        </v-list> 
        <v-divider></v-divider>
          <v-btn color="primary" class="close-btn" text @click="dialog = false">
            閉じる
          </v-btn>
      </v-card>
    </v-dialog>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary class="back">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <v-img src="../images/logo2.png" height="90"></v-img>
          <v-list-item-subtitle class="layout justify-center" fluid>
            にょきにょき育成日記🌱
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
import axios from "axios";
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
        dialog: false,
        alertFollowerList: []
    };
  },
  created(){
       axios.post("/get/followAndFollowerList",{ loginUser: this.$store.state.loginUser }).then(res=> {
       
        const followerList = res.data.followerList;
        this.followerList = followerList;

        let alertFollowerList = [];
        followerList.forEach(follower => {
          if(follower.followFlag===false){
            alertFollowerList.push(follower);
          }
        })
         this.alertFollowerList = alertFollowerList;
         console.log("created")
         console.log(this.alertFollowerList);
       })
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
    //フォローを承認する
    approve(item){
      axios.post("/get/approveFollowRequest",{loginUser: this.$store.state.loginUser, followingsId: item.followingsId,followFlag: item.followFlag,
          followingId: item.followingId,followedId: item.followedId });
          alert(item.name+"さんのフォローを許可します。");
        
          this.alertFollowerList.forEach(follower => {
            if(item.followingsId === follower.followingsId){
              let friendIndex = this.alertFollowerList.indexOf(follower);
              this.alertFollowerList.splice(friendIndex,1);
            }
          })
      },
      //フォローを否認する
    deny(item){
      axios.post("/get/denyFollowRequest",{loginUser: this.$store.state.loginUser, followingsId: item.followingsId,followFlag: item.followFlag,
          followingId: item.followingId,followedId: item.followedId });
          let check = confirm(item.name+"さんのフォローを否認します。");

          if(check===true){
            this.alertFollowerList.forEach(follower => {
                if(item.followingsId === follower.followingsId){
                  let friendIndex = this.alertFollowerList.indexOf(follower);
                  this.alertFollowerList.splice(friendIndex,1);
                }
            })
          } else {
            return false;
          }
  }
  }
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
.font{
  font-weight: bold;
}

.modal-content {
  position: relative;
}
.avatar {
  float: left;
  width: 50%;
}
.user-name {
  position: absolute;
  top: 40%;
  left: 20%;
}
.modal-btn {
  position: absolute;
  float:right;
  width: auto;
  left: 65%;
}
.close-btn {
  left: 80%;
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
