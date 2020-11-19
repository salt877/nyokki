<template>
  <v-container>
    <h2>マイページ</h2>
    <v-row>
      <v-col>
      </v-col>
      <v-col >
        <v-avatar size="150" >
         <img src="../images/same.jpeg">
        </v-avatar>
        <v-card-actions>
        <v-text>ユーザー名：サメ</v-text>
        </v-card-actions>
      </v-col>
      <v-col>
        <v-list-item-avatar size="150">
        <NyokkiFlower></NyokkiFlower>
        </v-list-item-avatar>
      </v-col>
      <v-col>
      </v-col>
    </v-row>
    <br>
    <br>
    <v-row>
      <v-col>
          <v-card-actions>
            <v-btn color="warning" @click="componentName='Follow'">フォロー一覧</v-btn>
        <v-card-actions>
        <v-text>フォロー数：{{followingLength}}人</v-text>
        </v-card-actions>
        </v-card-actions>
          
      </v-col>
      <v-col>
        <v-card-actions>
            <v-btn color="warning" @click="componentName='Follower'">フォロワー一覧</v-btn>
        <v-card-actions>
        <v-text>フォロワー数：{{followedLength}}人</v-text>
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
           <component :is="componentName"></component>
        </v-card>
      </v-col>
    </v-row>
    

  </v-container>
</template>

<script>
import ProfileChange from '../components/ProfileChange.vue';
import Follow from '../components/Follow.vue';
import Follower from '../components/Follower.vue';
import NyokkiFlower from '../components/NyokkiFlower.vue';
// import {mapActions} from 'vuex';

  export default {
    name: "Mypage",
    data: () => ({
    componentName: ['Follow', 'Follower', 'ProfileChange'],

    // followingList:[
    //   {
    //   id:"",
    //   followFlag:"",
    //   followingId:"",
    //   followedId:""
    // }
    // ],
     userList:[
      {
        id:"",
        name:"",
        gmail:"",
        continuationDays:"",
        firstdayContinuation: "",
        levelAchievement:"",
      }
    ],
  }),
    components:{
      ProfileChange,
      Follow,
      Follower,
      NyokkiFlower
    },
    created(){
      
        this.followingList.id = this.$store.state.followingList.id
        this.followingList.followFlag = this.$store.state.followingList.followFlag
        this.followingList.followingId = this.$store.state.followingList.followingId
        this.followingList.followedId = this.$store.state.followingList.followedId
        // console.log("てすと:"+ this.$store.state.followingList);
      
      this.userList.id = this.$store.state.userList.id
      this.userList.name = this.$store.state.userList.name
      this.userList.gmail = this.$store.state.userList.gmail
      this.userList.continuationDays = this.$store.state.userList.continuationDays
      this.userList.firstdayContinuation = this.$store.state.userList.firstdayContinuation
      this.userList.levelAchievement = this.$store.state.userList.levelAchievement




        
    },

    computed:{
      followingLength() {
        //自分がフォローしている人数
      var followingLength;
      var followingLengthList = [];

      for( var number in this.$store.state.followingList) {
        for(var key in this.$store.state.followingList[number]){
            if(key === 'followingId'){
            // console.log(this.$store.state.followingList[number][key])
            
            // ログインユーザーのIDが１のとき
            if(this.$store.state.followingList[number][key] === 1){
              followingLengthList.push(this.$store.state.followingList[number][key])
            }

            }
        }
      }
      console.log(followingLengthList.length);

      followingLength = followingLengthList.length;
      return followingLength;
    },


    followedLength() {
        //自分がフォローされている人数
      var followedLength;
      var followedLengthList = [];

      for( var number2 in this.$store.state.followingList) {
        for(var key2 in this.$store.state.followingList[number2]){
            if(key2 === 'followedId'){
              // console.log(this.$store.state.followingList[number][key])
            // ログインユーザーのIDが１のとき
            if(this.$store.state.followingList[number2][key2] === 1){
              followedLengthList.push(this.$store.state.followingList[number2][key2])
            }

            }
        }
      }
      console.log(followedLengthList.length);

      followedLength = followedLengthList.length;
      return followedLength;
    },

      }
    
  };
</script>