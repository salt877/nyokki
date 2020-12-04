<template>
<v-container>
  <h2 style="text-align: center">みんなの達成度</h2>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-card>
        <v-container>
          <v-row>
            <v-col> 
              <v-data-table :headers="headers" :items="newUserList">

                <template v-slot:[`item.userName`]="{ item }">
                  <router-link :to="{name: 'userpage', params: {name: item.userName}}">    
                    {{ item.userName }}
                
                  </router-link>
                </template>

                <template>
                  {{ item.continuationDays }}
                </template>
                
                <template v-slot:[`item.userId`]="{ item }">
                    <v-btn v-if="item.followFlag==null" color="light-green accent-4" @click="followRequest(item)">フォロー申請</v-btn>
                    <v-btn v-else-if="!item.followFlag" color="light-green" >申請中</v-btn>
                    <v-btn v-else-if="item.followFlag" color="light-green accent-2">フォロー済み</v-btn>
                </template>

              </v-data-table>
             <p>{{ newUserList }}</p>
            <p>全ユーザーリスト</p>
            <div v-for="user in newUserList" :key="user.id">
              <p>ユーザID : {{ user.userId }}</p>
              <p>名前 : {{ user.userName }}</p>
              <p>フラグ : {{ user.followFlag }}</p>
              <p>フォローする側のユーザID（ログインユーザID）: {{ user.followingId }}</p>
              <p>フォローされるID（ユーザIDと一致のはず）:{{ user.followedId}}</p>
              <hr>
            </div>
            </v-col>
          </v-row> 
    </v-container>
  
        <NyokkiFlower></NyokkiFlower> 
       
          <!-- <v-list two-line>
          <template v-for="(item, index) in items.slice(0, 6)" :to="user.link">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>
            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>
            <v-list-item
              v-else
              :key="item.title"
            >
             <router-link to="/userpage">
              <v-list-item-avatar size="90" >
                <img src="../images/same.jpeg">
              </v-list-item-avatar>
              </router-link>
              <v-list-item-content >
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle v-html="item.subtitle">
                </v-list-item-subtitle>
                <v-col></v-col>
                <v-col>
                <v-list-item-avatar size="100">
                <NyokkiFlower></NyokkiFlower>
              </v-list-item-avatar>
                </v-col>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

              <v-btn 
                color="light-green accent-2"
                @click="addNewCard()"
               >フォロー申請</v-btn>
                
              </v-list-item-action>

            </v-list-item>
          </template> 
        </v-list>    -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import NyokkiFlower from '../components/NyokkiFlower.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    NyokkiFlower,
  },
  props: {
    name: String,
  },
  computed: {
    ...mapGetters(["doubleCount", "getContinuationDays"]),
    // userList() {
    //   return this.$store.state.userList;
    // },
    getContinuationDays() {
      return this.$store.getters.getContinuationDays;
    },
    getUserInfomation(){
      return this.$store.getters.getUserInfomation;
    },
    // allUserList(){
    //   console.log("allUserListが呼ばれた");
    //   let allUserList = this.$created();
    //   console.log("allUserList"+JSON.stringify(allUserList));


    //   return this.userList;
    // }
      // followingList(){
      //   console.log("フォローテーブルの中身"+this.$store.getters.getFollowList);
      //   const userList = this.$store.state.userList;
      //   const loginUserId = this.$store.state.loginUser.id;
      //   const followingList = [];

      //   userList.forEach(user => {
      //     if(user.id !== loginUserId){
      //       let followFlag = null;
      //       this.$store.getters.getFollowList.some(following => {
      //         console.log(following);

      //         if(following.followingId === loginUserId && user.id === following.followedId){
      //           followFlag = following.followFlag;
      //           return true;
      //         }
      //       })
      //       const following = 
      //         { userId : user.id, 
      //           userName: user.name, 
      //           continuationDays: this.$store.getters.getContinuationDays, 
      //           followFlag: followFlag
      //         };
      //       followingList.push(following);
      //     }
      //   })
      //   return followingList;
      // },
    },
    created() {
      console.log("ログインユーザーID" +JSON.stringify(this.$store.state.loginUser))
      axios.post("/get/allUserInformation",{ loginUser: this.$store.state.loginUser }).then(res=> {

        this.allUserList = res.data;
        const loginUserId = this.$store.state.loginUser.id;
        const newUserList = [];

        console.log("全ユーザーデータ:"+ JSON.stringify(this.allUserList));
        console.log("ログインユーザID:"+ loginUserId);

        this.allUserList.some(user => {
          
          const createUserList = {
            userId: user.id,
            userName: user.name,
            continuationDays: user.continuationDays,
            followFlag: user.followFlag,
            followingId: user.followingId,
            followedId: user.followedId
          };
          if(user.followingId === null || user.followedId){
            user.followingId = null;
            user.followedId = null;
          }
          
        //followingIdとloginUserIdが一致しないなら
        if(user.followingId !== loginUserId){
          user.followFlag = null;

        //followingIdとLoginUserIdが一致してfollowFlagがfalse
        } else if(user.followingId === loginUserId && user.followFlag === false){
          user.followFlag = false;
          
        }
       //loginUserのデータは表示しない
       if(user.id === loginUserId){
         console.log("ログインユーザーとIDが一致したものは表示したくない:"+loginUserId)
      
        } else {
          newUserList.push(createUserList); 

        }
        console.log("表示したいユーザー:"+JSON.stringify(createUserList));
        
        })
        console.log("このuserListを返す"+JSON.stringify(newUserList));
        this.newUserList = newUserList;
      })
    },
    methods: {
      followRequest(item){
        axios.post("/get/followRequest", { loginUser: this.$store.state.loginUser, followedId: item.userId });
        alert("フォローするユーザID"+JSON.stringify(item.userId));
        item.followFlag = false;
      },
    },
    data: () => ({
      headers: [
        {
          text: 'ユーザー名',
          value: 'userName'
        }, 
        {
          text: '咲かせた花数🌷',
          value: 'continuationDays' 
        },
        {
          text: 'フォロー',
          value: 'userId',
          sortable: false,
         
        }
      ],
      item: [],
     newUserList: [],
      // items: [

      //  { header: 'たくさんお花を育てているお友達をリスペクトしよう🌱' },
      //   { 
      //     title: 'ユーザーA',
      //     subtitle: '咲かせた花数🌷：10🌸'
      //   },
      //   { divider: true, inset: true },
      //   { 
      //     title:  'ユーザーB', 
      //     subtitle: '咲かせた花数🌷：50🌸'
      //   },
      //   { divider: true, inset: true },
      //   { 
      //     title: 'ユーザーC', 
      //     subtitle: '咲かせた花数🌷：100🌸',
      //   },
      // ],
      user:[
        {name: '詳細' ,icon: 'mdi-account-multiple-outline',link: 'userpage'}
      ]
    })
  }

</script>