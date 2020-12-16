<template>
<v-container>
  <h2 style="text-align: center">フォローしている人</h2>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      offset-sm="3"
    >
      <v-card>
        <v-list two-line>
          <p>新しいユーザーをフォローしよう！</p>
          <template v-for="(item, index) in followUserList.slice(0, 6)">
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
                <v-col>
              <v-list-item-avatar size="80">
                <!-- <img src="../images/same.jpeg"> -->
                <img :src="item.photoUrl">
              </v-list-item-avatar>
                </v-col>
              <v-list-item-content>
                <v-list-item-title v-html="item.userName">
                </v-list-item-title>
                <v-list-item-subtitle >
                咲かせた花数🌷:
                {{ item.continuationDays}}本＋
                </v-list-item-subtitle>
              
                <v-col>
               <v-list-item-avatar size="70" >
                    <NyokkiFlower :flowerStatus="item.flowerStatus"></NyokkiFlower>
                  </v-list-item-avatar>
                </v-col>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                <v-btn
                  color="pink lighten-4"
                  @click="unfollow(item)"
                >フォロー解除😇</v-btn>
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
import NyokkiFlower from '../components/NyokkiFlower.vue';
import axios from 'axios';

  export default {
    components:{
      NyokkiFlower
    },
    data: () => ({
      items: [
        { header: '養分を吸収しよう🌱' },
        { 
        title: 'ユーザーD',
        subtitle: '咲かせた花数🌷：10🌸'},
        { divider: true, inset: true },
      ],
      followUserList:[]
    }),
    props: ["followList"],
    created(){
        let followUserList = [];

        this.followList.forEach(user => {
          
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
            continuationDays: flowerCount,
            photoUrl: user.photoUrl,
            flowerStatus: flowerStatus,
            followingsId: user.followingsId,
            followFlag: user.followFlag,
            followingId: user.followingId,
            followedId: user.followedId
          };
          if(user.followFlag === false){
            return ;
          } else {
            followUserList.push(createUserList); 
          }
           
        })
        this.followUserList = followUserList;
    },
    methods: {
      //フォロー解除
      unfollow(item){
        axios.post("/get/unFollow",{followingsId: item.followingsId});
          console.log(item.followingsId);
          console.log(JSON.stringify(this.followUserList));
          
          this.followUserList.forEach(follow => {
            
            if(item.followingsId === follow.followingsId){
              alert(follow.userName+"さんのフォローを解除します");
              let friendIndex = this.followUserList.indexOf(follow);
              this.followUserList.splice(friendIndex,1);
            }
          })
              this.$emit("followingLength", this.followUserList.length);
      }
    }
  }
</script>