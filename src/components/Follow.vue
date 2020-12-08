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
                <img src="../images/same.jpeg">
              </v-list-item-avatar>
                </v-col>
              <v-list-item-content>
                <v-list-item-title v-html="item.userName"></v-list-item-title>
                咲かせた花数🌷:
                <v-list-item-subtitle v-html="item.continuationDays">
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
                  color="pink lighten-4"
                  @click="addNewCard()"
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
    props: ["number","newUserList"],
      created(){

        console.log("aaa:"+JSON.stringify(this.newUserList));

        let followUserList = [];

        this.newUserList.forEach(user => {
          
          console.log("名前"+ user.userName);
          let flowerCount = user.continuationDays / 32;
          if( flowerCount < 1){
            flowerCount = 0;
          } else if(flowerCount >= 1){
            Math.floor(flowerCount);
          }

          const createUserList = {
            userId: user.userId,
            userName: user.userName,
            continuationDays: flowerCount,
            followFlag: user.followFlag,
            followingId: user.followingId,
            followedId: user.followedId
          };
          if(user.followFlag === false){
            console.log("フラグがfalse!"+ user.userName);
            return ;
          } else if(user.followFlag === true) {
            followUserList.push(createUserList); 
          }
       
        console.log("表示したいユーザー:"+JSON.stringify(createUserList));
        
        })
        console.log("このuserListを返す"+JSON.stringify(followUserList));
        this.followUserList = followUserList;
    
      
    }
    // created() {
    //   console.log("マイページのフォローコンポーネントを開いた");

    //    axios.post("/get/followList",{ loginUser: this.$store.state.loginUser }).then(res=> {

    //     this.allUserList = res.data;
    //     const loginUserId = this.$store.state.loginUser.id;
    //     const newUserList = [];

    //     this.allUserList.some(user => {

    //       let flowerCount = user.continuationDays / 32;
    //       if( flowerCount < 1){
    //         flowerCount = 0;
    //       } else if(flowerCount >= 1){
    //         Math.floor(flowerCount);
    //       }

    //       const createUserList = {
    //         userId: user.id,
    //         userName: user.name,
    //         continuationDays: flowerCount,
    //         followFlag: user.followFlag,
    //         followingId: user.followingId,
    //         followedId: user.followedId
    //       };
    //       if(user.followingId === null || user.followedId){
    //         user.followingId = null;
    //         user.followedId = null;
    //       }
          
    //     //followingIdとloginUserIdが一致しないなら
    //     if(user.followingId !== loginUserId){
    //       user.followFlag = null;

    //     //followingIdとLoginUserIdが一致してfollowFlagがfalse
    //     } else if(user.followingId === loginUserId && user.followFlag === false){
    //       user.followFlag = false;
          
    //     }
    //    //loginUserのデータは表示しない
    //    if(user.id === loginUserId){
    //      console.log("ログインユーザーとIDが一致したものは表示したくない:"+loginUserId)
      
    //     } else {
    //       newUserList.push(createUserList); 

    //     }
    //     console.log("表示したいユーザー:"+JSON.stringify(createUserList));
        
    //     })
    //     console.log("このuserListを返す"+JSON.stringify(newUserList));
    //     this.newUserList = newUserList;
    //   })
    // }
  }
</script>