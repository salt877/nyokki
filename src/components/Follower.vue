<template>
  <v-container class="back2">
    <h2 style="text-align: center" class="card-font2"
    >{{ this.$store.state.loginUser.name }}さんのフォロワー</h2>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card>
          <v-list two-line>
            <br>
            <p style="text-align: center" class="card-font">
              みんなのお手本になろう！</p>
            <template v-for="(item, index) in followerUserList.slice(0, 6)">
              <v-subheader v-if="item.header" :key="item.header">
                {{ item.header }}
              </v-subheader>

              <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

              <v-list-item v-else :key="item.title">
                <v-list-item-avatar size="90">
                  <router-link :to="{ name: 'userpage', params: { id: item.userId } }">
                    <img :src="item.photoUrl" />
                  </router-link>
                </v-list-item-avatar>

                <v-list-item-content>
                  <router-link :to="{ name: 'userpage', params: { id: item.userId } }">
                    <v-list-item-title class="font" v-html="item.userName"></v-list-item-title>
                  </router-link>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text></v-list-item-action-text>
                  <v-card-actions>
                    <v-btn color="amber darken-1" v-if="item.followFlag === true" v-model="followFlag" disabled>フォロー許可済</v-btn>
                  </v-card-actions>
                  <v-card-actions v-if="item.followFlag === false" v-model="followFlag" >
                    <v-btn color="light-blue lighten-3" @click="approve(item)">承認⭕️</v-btn>
                    <v-btn color="pink lighten-4" @click="deny(item)">否認❌</v-btn>
                  </v-card-actions>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
//import router from "../router";
export default {
  data: () => ({
    item: [
      {
        value: "userId",
      },
    ],
    followFlag: true,
    followerUserList: [],
  }),
  props: ["followerList"],
  created() {
    let followerUserList = [];

    this.followerList.forEach((user) => {
      const createUserList = {
        userId: user.id,
        userName: user.name,
        photoUrl: user.photoUrl,
        followingsId: user.followingsId,
        followFlag: user.followFlag,
        followingId: user.followingId,
        followedId: user.followedId,
      };
      followerUserList.push(createUserList);
    });
    this.followerUserList = followerUserList;
  },
  methods: {
    //フォローを承認する
    approve(item) {
      axios.post("/get/approveFollowRequest", { loginUser: this.$store.state.loginUser, followingsId: item.followingsId, followFlag: item.followFlag, followingId: item.followingId, followedId: item.followedId }).then((res) => {
        console.log(res.data.followerList);
        this.$emit("aaa", res.data.followerList);
      });
      alert("フォローを許可を承認しました。");
      item.followFlag = true;
     
      let followedLength = [];

      this.followerUserList.forEach((follower) => {
        if (follower.followFlag === false) {
          return;
        } else if (follower.followFlag === true) {
          followedLength.push(follower);
          this.$emit("followedLength", followedLength.length);
        }
      });
      this.$emit("addFollower",item);

      //router.go("/");
    },
    deny(item) {
      axios.post("/get/denyFollowRequest", { loginUser: this.$store.state.loginUser, followingsId: item.followingsId, followFlag: item.followFlag, followingId: item.followingId, followedId: item.followedId });
      let check = confirm(item.userName + "さんのフォローを否認します。");

      if (check === true) {
        this.followerUserList.forEach((follower) => {
          if (item.followingsId === follower.followingsId) {
            let friendIndex = this.followerUserList.indexOf(follower);
            this.followerUserList.splice(friendIndex, 1);
            this.$emit("deleteFollower",item);
          }
        });
        this.$emit("followedLength", this.followerUserList.length);
      } else {
        return false;
      }
    },
  },
};
</script>
<style scoped>
.card-font {
  font-weight: bold;
  font-size: 1.3em;
  color:rgb(255, 56, 106);
}
.card-font2 {
  font-weight: bold;
  font-size: 1.0em;
}
.font{
  text-align: center;
  font-weight: bold;
  font-size: 1.1em;
}
.back2{
  background-color: rgba(239, 184, 250, 0.3);
}
</style>
