<template>
<v-container>
  <h2 style="text-align: center">{{ this.$store.state.loginUser.name }}さんのフォロワー</h2>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-card>
        <v-list two-line>
          <template v-for="(item, index) in followerUserList.slice(0, 6)">
            <v-subheader v-if="item.header" :key="item.header">
              {{ item.header }}
            </v-subheader>

            <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

            <v-list-item v-else :key="item.title">
              <v-list-item-avatar size="90">
                <router-link 
                  :to="{name: 'userpage',  params: {id: item.userId}}"> 
                  <img :src="item.photoUrl">
                </router-link>
              </v-list-item-avatar>

              <v-list-item-content>
                 <router-link 
                  :to="{name: 'userpage',  params: {id: item.userId}}"> 
                  <v-list-item-title v-html="item.userName"></v-list-item-title>
                </router-link>
              </v-list-item-content>

              <v-list-item-action> 
                <v-list-item-action-text></v-list-item-action-text>
                  <v-card-actions>
                    <v-btn color="amber darken-1" v-if="item.followFlag===true" v-model="followFlag" disabled>フォロー許可済</v-btn>
                  </v-card-actions>
                  <v-card-actions v-if="item.followFlag===false" v-model="followFlag">
                    <v-btn color="light-blue lighten-3"  @click="approve(item)">承認⭕️</v-btn>
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
import axios from 'axios';
  export default {
    data: () => ({
      // items: [
      //   { header: '成長を分かちあおう🌱' },
      //   { 
      //     title: 'ユーザーG',
      //      subtitle: '咲かせた花数🌷：10🌸'},
      //   { divider: true, inset: true },
      //   { 
      //   title: 'ユーザーH', subtitle: '咲かせた花数🌷：50🌸'},
      //   { divider: true, inset: true },
      //   { title: 'ユーザーI', 
      //   subtitle: '咲かせた花数🌷：100🌸',
      //    },
      // ],
      item: [{
        value: 'userId',
      }],
      followFlag: true,
      followerUserList:[],
    }),
    props: ["followerList"],
    created() {
    
      let followerUserList = [];

        this.followerList.forEach(user => {
          const createUserList = {
            userId: user.id,
            userName: user.name,
            photoUrl: user.photoUrl,
            followingsId: user.followingsId,
            followFlag: user.followFlag,
            followingId: user.followingId,
            followedId: user.followedId
          };
            followerUserList.push(createUserList); 

        })
        this.followerUserList = followerUserList;
    },
    methods: {
      //フォローを承認する
      approve(item){
        axios.post("/get/approveFollowRequest",{loginUser: this.$store.state.loginUser, followingsId: item.followingsId,followFlag: item.followFlag,
          followingId: item.followingId,followedId: item.followedId });
          alert("フォローを許可を承認しました。");
          item.followFlag = true;
          console.log(this.followerUserList);

          let followedLength = [];

          this.followerUserList.forEach(follower => {
            if(follower.followFlag === false){
              return;
              } else if(follower.followFlag === true){
              followedLength.push(follower);
            }
          })
              this.$emit("followedLength", followedLength.length);
      },
      deny(item){
        axios.post("/get/denyFollowRequest",{loginUser: this.$store.state.loginUser, followingsId: item.followingsId,followFlag: item.followFlag,
          followingId: item.followingId,followedId: item.followedId });
          let check = confirm(item.userName+"さんのフォローを否認します。");

          if(check===true){
            this.followerUserList.forEach(follower => {
                
                if(item.followingsId === follower.followingsId){
                  let friendIndex = this.followerUserList.indexOf(follower);
                  this.followerUserList.splice(friendIndex,1);
                }
              })
                  this.$emit("followedLength", this.followerUserList.length);
          } else {
            return false;
          }

      }
    }
  }
</script>