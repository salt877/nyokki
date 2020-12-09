<template>
<v-container>
  <h2 style="text-align: center">フォローされている人</h2>
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
                <img src="../images/same.jpeg">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.userName"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action> 
                <v-list-item-action-text></v-list-item-action-text>
                  <v-card-actions>
                    <v-btn color="amber darken-1" v-if="item.followFlag==true" @click="addNewCard()">フォロー許可済</v-btn>
                  </v-card-actions>
                  <v-card-actions v-if="item.followFlag==false">
                    <v-btn color="light-blue lighten-3"  @click="addNewCard()">承認⭕️</v-btn>
                    <v-btn color="pink lighten-4" @click="addNewCard()">否認❌</v-btn>
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
        value: 'userId'
      }],
    }),
    props: ["followerList"],
    created() {
    
      let followerUserList = [];

        this.followerList.forEach(user => {
          const createUserList = {
            userId: user.id,
            userName: user.name,
            followFlag: user.followFlag,
            followingId: user.followingId,
            followedId: user.followedId
          };
          
            followerUserList.push(createUserList); 

        })
        this.followerUserList = followerUserList;
    }
  }
</script>