<template>
<v-main  class="back">
  <!-- ナビゲーション -->
      <navigation></navigation>
<v-container>
  <h2 style="text-align: center">みんなの達成度</h2>
  <v-row>
    <v-col cols="12" sm="8" offset-sm="2">
      <v-card>
        <v-container>
          <v-row>
            <v-col> 
              <v-data-table :headers="headers" :items="newUserList">

                <template v-slot:[`item.photoUrl`]="{ item }">
                  <router-link :to="{name: 'userpage',  params: {id: item.userId}}"> 
                    <v-list-item-avatar size="70" >
                      <img :src="item.photoUrl">
                    </v-list-item-avatar>
                  </router-link>
                </template>

                <template v-slot:[`item.userName`]="{ item }">
                     <router-link 
                      :to="{name: 'userpage',  params: {id: item.userId}}"> 
                    {{ item.userName }} 
                  </router-link>
                </template>

                <template v-slot:[`item.continuationDays`]="{ item }">
                  {{ item.continuationDays }}本+
                </template>

                <template v-slot:[`item.flowerStatus`]="{ item }">
                  <v-list-item-avatar size="70" >
                    <NyokkiFlower :flowerStatus="item.flowerStatus"></NyokkiFlower>
                  </v-list-item-avatar>
                </template>

                <template v-slot:[`item.userId`]="{ item }">
                    <v-btn v-if="item.followFlag==null" color="light-green accent-1" @click="followRequest(item)">フォロー申請</v-btn>
                    <v-btn v-else-if="!item.followFlag" color="light-green" >申請中</v-btn>
                    <v-btn v-else-if="item.followFlag" color="light-green accent-2" disabled>フォロー済み</v-btn>
                </template>

              </v-data-table>
            </v-col>
          </v-row> 
    </v-container>
  
      
       
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
    <v-row><v-col></v-col></v-row>
    <v-row><v-col></v-col></v-row>
  </v-container>
</v-main>
</template>

<script>
import Navigation from '../components/Navigation';
import axios from 'axios';
import NyokkiFlower from '../components/NyokkiFlower.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    NyokkiFlower,
    Navigation,
  },
  props: {
    name: String,
  },
  computed: {
    ...mapGetters(["doubleCount", "getContinuationDays"]),
    getContinuationDays() {
      return this.$store.getters.getContinuationDays;
    },
    getUserInfomation(){
      return this.$store.getters.getUserInfomation;
    },
    },
    created() {
      axios.post("/get/allUserInformation",{ loginUser: this.$store.state.loginUser }).then(res=> {

        this.allUserList = res.data;
        const loginUserId = this.$store.state.loginUser.id;
        const newUserList = [];

        this.allUserList.some(user => {
          
          let flowerCount = user.continuationDays / 32;

          let flowerStatus = user.continuationDays % 32;

          if( flowerCount < 1){
            flowerCount = 0;
            this.flowerStatus = flowerStatus;

          } else if(flowerCount >= 1){
            flowerCount = Math.floor(flowerCount);
            this.flowerStatus = flowerStatus;
          }

          const createUserList = {
            userId: user.id,
            userName: user.name,
            photoUrl: user.photoUrl,
            continuationDays: flowerCount,
            flowerStatus: flowerStatus,
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
       if(user.id !== loginUserId){
         newUserList.push(createUserList); 
        } 
        })
        this.newUserList = newUserList;
      })
    },
    methods: {
      followRequest(item){
        axios.post("/get/followRequest", { loginUser: this.$store.state.loginUser, followedId: item.userId });
        item.followFlag = false;
      }
    },
    data: () => ({
      headers: [
        {
          value: 'photoUrl'
        }, 
        {
          text: 'ユーザー名',
          value: 'userName'
        }, 
        {
          text: '咲かせた花数🌷',
          value: 'continuationDays' 
        },
        {
          text: '現在の状態',
          value:  'flowerStatus'
        },
        {
          text: 'フォロー',
          value: 'userId',
          sortable: false,      
        }
      ],
      item: [],
      newUserList: [],
      user:[
        {name: '詳細' ,icon: 'mdi-account-multiple-outline',link: 'userpage'}
      ]
    })
  }

</script>
<style scoped>
.container {
  text-align: center;
}
.back{
  background-image: url("~@/assets/Background8.png");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
}

</style>