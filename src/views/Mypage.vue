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
           <div class="mypage">
           <!-- <ProfileChange :value="newName" @input="newName = $event"/> -->
        <v-text :value2="newName" @input="newName = $event">ユーザー名：{{ this.$store.state.loginUser.name }}</v-text>
          </div>
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
        <v-text>フォロー数：{{ followingLength }}人</v-text>
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

<!-- <v-btn @click="increment2()">UP</v-btn>
<v-btn @click="setCount2()">SET</v-btn>

<h1>DoubleCount:{{doubleCount}}</h1>
<h1>Count:{{count}}</h1> -->



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
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';
import {mapActions} from 'vuex';

  export default {
    name: "Mypage",
    data: () => ({
    count:'',
    doubleCount:'',
    newName:"",
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
    this.setCount(1);


    },
    computed:{
      ...mapGetters(["doubleCount", "followingLength", "followedLength"]),
      //フォロー中の人数を表示
      followingLength(){
        let allFollowingList = this.$store.state.followingList;
        let followingList = [];

        allFollowingList.forEach(follow => {
          const followFlag = follow.followFlag;
          if(followFlag === true){
            followingList.push(this.allFollowingList);
          }
        })
        return followingList.length;
      },
  
    count:function(){
      return this.$store.getters.count;
    },

  },
  methods:{
    ...mapMutations(['increment','setCount']),
    ...mapActions(['increment','setCount']),

    setCount2(){
      this.setCount(1);
      console.log('set呼ばれた')
      this.count = this.$store.state.count
    },
    increment2(){
      this.doubleCount = this.$store.getters.doubleCount;
      console.log('increment2呼ばれた');
      this.setCount(this.doubleCount);
      this.count = this.$store.state.count;
    },
    
  }
    
  };
</script>