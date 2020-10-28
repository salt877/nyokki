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
      </v-col>
      <v-col>
        <p>ここにお花を表示</p>
      </v-col>
      <v-col>
      </v-col>
    </v-row>
    <br>
    <br>
    <v-row>
      <v-col>
          <v-card-actions>
            <v-btn color="warning">フォロー一覧</v-btn>
          </v-card-actions>
      </v-col>
      <v-col>
        <v-card-actions>
            <v-btn color="warning">フォロワー一覧</v-btn>
        </v-card-actions>
      </v-col>
      <v-col>
        <v-card-actions>
            <v-btn color="warning">プロフィール変更</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <p>3つのコンポーネントがボタンによって切り替わる</p>
          <p>プロフィール変更コンポーネント</p>
          <ProfileChange></ProfileChange>
          <p>フォロー一覧コンポーネント</p>
          <Follow></Follow>
          <p>フォロワー一覧コンポーネント</p>
          <Follower></Follower>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import ProfileChange from '../components/ProfileChange.vue';
import Follow from '../components/Follow.vue';
import Follower from '../components/Follower.vue';

  export default {
    name: "Mypage",
    components:{
      ProfileChange,
      Follow,
      Follower
      
    },
  };
</script>