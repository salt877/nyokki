<template>
    <v-container>
        <h2>{{ name }}さんのページ</h2>
        
        <v-row>
            <v-col>
                <v-avatar size="150">
                    <img src="../images/same.jpeg">
                </v-avatar>
            </v-col>
            <v-col>
                <p>咲かせた花数🌷：10+</p>
                    <v-avatar size="150" class="userpage-flower">
                        <NyokkiFlower :testData="testData"></NyokkiFlower>
                    </v-avatar>
            </v-col>
            <v-col>
                <v-btn color="light-green accent-2">フォロー申請</v-btn>
                <!-- フォロー申請中の場合 -->
                <v-btn color="light-green" @click="applying(item)">申請中</v-btn>
                <!-- フォロー済みの場合 -->
                <v-btn color="light-green accent-1" @click="follow(item)">フォロー済み</v-btn>
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
import NyokkiFlower from '../components/NyokkiFlower.vue';

  export default {
    name: "Userpage",
    components:{
      CalendarComponent,
      NyokkiFlower
    },
    props: {
        name: String,
        testData: String
    }
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
    margin: auto 0;
}
.v-btn {
    top: 50%;
    bottom: 50%;
}
.follow-yet {
    padding: 100px;
}
.userpage-flower {
    border-radius: 0%;
}

</style>