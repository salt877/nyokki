<template>
  <v-main  class="back">
    <!-- ナビゲーション -->
      <navigation></navigation>
  <v-container align-content="center">
    <v-row>
      <v-col class="user-name">
          <v-avatar size="150" >
            <v-img :src="photoUrl" />
             <!-- <v-img :src="`${photoUrl}`" /> -->
          </v-avatar><br><br>
          <v-text :value2="newName" @input="newName = $event" justify="center" class="card-font">
              {{ this.$store.state.loginUser.name }}
          </v-text>
      </v-col>
      <v-col class="user-flower">
        <v-text class="card-font">現在の花の状態</v-text><br>
        <v-avatar size="150">
          <NyokkiFlower :flowerStatus="flowerStatus"></NyokkiFlower>
        </v-avatar>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
          <v-card-actions >
            <v-btn color="warning" @click="componentName='Follow'">フォロー一覧</v-btn>
        <v-card-actions> 
        <v-text class="card-font2">フォロー数：{{ followingLength }}人</v-text>
        </v-card-actions>
        </v-card-actions>      
      </v-col>
      <v-col>
        <v-card-actions>
            <v-btn color="warning" @click="componentName='Follower'" >フォロワー一覧</v-btn>
        <v-card-actions>
          <v-text class="card-font2">フォロワー数：{{ followedLength }}人</v-text>
        </v-card-actions>
        </v-card-actions>
      </v-col>
      <v-col>
        <v-card-actions>
            <v-btn color="warning" @click="componentName='ProfileChange'">プロフィール変更</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
           <component class="card" :is="componentName" :followList="followList" :followerList="followerList" 
            @followedLength="followedLength=$event" @followingLength="followingLength=$event"></component>
        </v-card>
      </v-col>
    </v-row>
    <v-row><v-col></v-col></v-row>
    <v-row><v-col></v-col></v-row>
  </v-container>
  </v-main>
</template>

<script>
import Navigation from '../components/Navigation';
import axios from 'axios';
import ProfileChange from '../components/ProfileChange.vue';
import Follow from '../components/Follow.vue';
import Follower from '../components/Follower.vue';
import NyokkiFlower from '../components/NyokkiFlower.vue';
//import {mapGetters} from 'vuex';
//import {mapMutations} from 'vuex';
//import {mapActions} from 'vuex';

  export default {
    name: "Mypage",
    data: () => ({
      newName: "",
      componentName: ['Follow', 'Follower', 'ProfileChange'],
      followingLength: [],
      followedLength: [],
      flowerStatus: "",
  }),
    components:{
      ProfileChange,
      Follow,
      Follower,
      NyokkiFlower,
      Navigation,
    },
    created(){
    
       axios.post("/get/followAndFollowerList",{ loginUser: this.$store.state.loginUser }).then(res=> {
       
        let flowerCount = this.$store.state.loginUser.continuationDays / 32;
        let flowerStatus = this.$store.state.loginUser.continuationDays % 32;

          if(flowerCount < 1){
            flowerCount = 0;
            this.flowerStatus = flowerStatus;

          } else if(flowerCount >= 1){
            flowerCount = Math.floor(flowerCount);
            this.flowerStatus = flowerStatus;
          }

        const followList = res.data.followList;
        const followerList = res.data.followerList;
        this.followList = followList;
        this.followerList = followerList;
        
        //フォローしている人数
        const followingLength = [];
        this.followList.forEach(follow => {
          followingLength.push(follow);
        })
        this.followingLength = followingLength.length;
        //フォロワー人数
        const followerLength = [];
        this.followerList.forEach(follower => {
          if(follower.followFlag === true){
            followerLength.push(follower);
          } 
        })
        
        this.followedLength = followerLength.length;

       })
    },
    computed:{
      //    ...mapGetters(["followingLength", "followedLength"]),
      photoUrl(){
        return this.$store.state.loginUser.photoUrl;
      }
  }     
};
</script>
<style scoped>
.container {
    margin-top: 10px;
    
}
.user-name{
  text-align: center;
}

.back{
  background-image: url("~@/assets/Background5.png");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
}
.card {
  padding-bottom: 50px;
  margin-bottom: 100px;

}
.card-font {
  font-weight: bold;
  font-size: 1.3em;
}
.card-font2 {
  font-weight: bold;
  font-size: 1.1em;
}

</style>