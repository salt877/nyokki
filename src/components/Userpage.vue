<template>
    <v-container>
        <h2>○○さんのページ</h2>
        <v-row>
            <v-col>
                <v-avatar size="150" >
                    <img src="../images/same.jpeg">
                </v-avatar>
                    <p>ユーザー名：サメ</p>
            </v-col>
            <v-col>
                <p>咲かせた花数🌷：10🌸 +</p>
                <img class="flower" src="../images/flower8_31day.png">
            </v-col>
            <v-col>
                <v-btn color="light-green accent-2">フォロー申請</v-btn>
                <!-- フォロー済の場合-->
                <!-- <v-btn color="green">フォロー中</v-btn> -->
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                <p>フォロー済なら日報・月報に切り替わる</p>
                <CalendarComponent></CalendarComponent>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <p>未フォローならこれが表示される</p>
                    <p class="follow-yet">フォロー申請を送ろう！</p>
                </v-card>
            </v-col>
        </v-row>
  </v-container> 
</template>

<script>
import CalendarComponent from '../components/CalendarComponent.vue';

  export default {
    name: "Userpage",
    components:{
      CalendarComponent
    },
  };
</script>

<style scoped>
.container {
    text-align: center;
}
p {
    margin-top: 16px;
}
.row {
    margin: 20px 0;
}
.col {
    text-align: center;
}
.flower {
    width: auto;
    height: 150px;
}
.v-btn {
    top: 50%;
    bottom: 50%;
}
.follow-yet {
    padding: 100px;
}

</style>