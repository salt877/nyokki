<template>
    <v-container>
        <h2>ユーザーページ</h2>
        <v-row>
            <v-col>
                    <v-text>ユーザー名：サメ</v-text>
                <v-avatar size="150" >
                    <img src="../images/same.jpeg">
                    <br>
                </v-avatar>
                
                <v-list-item-avatar size="150">
                <NyokkiFlower></NyokkiFlower>
              </v-list-item-avatar>
                
            </v-col>
            </v-row>
            <v-row>
            <v-col>
                <v-card>
                <p>フォローOKなら日報・月報に切り替わる</p>
                <p>カレンダーコンポーネント</p>
                <CalendarComponent></CalendarComponent>
                </v-card>
            </v-col>
    </v-row>
  </v-container> 
</template>

<script>
import CalendarComponent from '../components/CalendarComponent.vue';
import NyokkiFlower from '../components/NyokkiFlower.vue';

  export default {
    name: "Userpage",
    components:{
      CalendarComponent,
      NyokkiFlower
    },
  };
</script>

<style scoped>
.col {
    text-align: center;
}
.flower {
    width: auto;
    height: 150px;
}
</style>