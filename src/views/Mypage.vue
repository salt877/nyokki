<template>
  <v-container>
    <h2>マイページ</h2>
    <v-row align="center" justify="center">
      <v-col>
        <v-avatar size="150" >
          <v-img :src="photoUrl" />
        </v-avatar>
           <div class="mypage">
           <!-- <ProfileChange :value="newName" @input="newName = $event"/> -->
            <v-text :value2="newName" @input="newName = $event">ユーザー名：{{ this.$store.state.loginUser.name }}</v-text>
          </div>
      </v-col>
      <v-col>
        <p>現在の花の状態：</p>
        <v-list-item-avatar size="150">
          <NyokkiFlower :flowerStatus="flowerStatus"></NyokkiFlower>
        </v-list-item-avatar>
      </v-col>
    </v-row>
    <br>
    <br>
    <v-row>
      <v-col>
          <v-card-actions >
            <v-btn color="warning" @click="componentName='Follow'">フォロー一覧</v-btn>
        <v-card-actions> 
        <v-text>フォロー数：{{ followingLength }}人</v-text>
        </v-card-actions>
        </v-card-actions>
          
      </v-col>
      <v-col>
        <v-card-actions>
            <v-btn color="warning" @click="componentName='Follower'" >フォロワー一覧</v-btn>
        <v-card-actions>
          <v-text>フォロワー数：{{ followedLength }}人</v-text>
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
           <component :is="componentName" :followList="followList" :followerList="followerList" 
            @followedLength="followedLength=$event" @followingLength="followingLength=$event"></component>
        </v-card>
      </v-col>
    </v-row>
    

  </v-container>
</template>

<script>
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
      // photoUrl:this.$store.state.loginUser.photoUrl,
      componentName: ['Follow', 'Follower', 'ProfileChange'],
     followingLength: [],
     followedLength: []
  }),
    components:{
      ProfileChange,
      Follow,
      Follower,
      NyokkiFlower
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
        console.log("マイページを開いた"+JSON.stringify(this.followerList));
        
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