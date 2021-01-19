<template>
<v-main  class="back">
    <div v-if="loading">
      <Loading></Loading>
    </div>
    <v-container v-else>
        <h2>{{ user.userName }}さんのページ</h2>
        <v-row>
            <v-col>
                <v-avatar size="150">
                     <img :src="user.photoUrl">
                </v-avatar>
            </v-col>
            <v-col>
                <p>咲かせた花数🌷：{{user.continuationDays}}本+</p>
                    <v-avatar size="150" class="userpage-flower">
                        <NyokkiFlower :flowerStatus="user.flowerStatus"></NyokkiFlower>
                    </v-avatar>
            </v-col>
            <v-col>
                <v-btn v-if="user.followFlag==null" color="light-green accent-2" @click="followRequest(user)">フォロー申請</v-btn>
                <!-- フォロー申請中の場合 -->
                <v-btn v-if="user.followFlag==false" color="light-green">申請中</v-btn>
                <!-- フォロー済みの場合 -->
                <v-btn v-if="user.followFlag==true" color="light-green accent-1" disabled>フォロー済み</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card v-if="user.followFlag==true">
                <CalendarComponent :userId="user.userId" :year="year" :month="month"></CalendarComponent>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card v-if="user.followFlag==null">
                    <p class="follow-yet">フォロー申請を送ろう！</p>
                </v-card>
                <v-card v-if="user.followFlag==false">
                    <p class="follow-yet">フォロー許可されると日報が見れるよ！</p>
                </v-card>
            </v-col>
        </v-row>
  </v-container> 
</v-main>
</template>

<script>
import axios from 'axios';
import CalendarComponent from '../components/CalendarComponent.vue';
import NyokkiFlower from '../components/NyokkiFlower.vue';
import Loading from '@/components/Loading.vue';

  export default {
    name: "Userpage",
    components:{
        CalendarComponent,
        NyokkiFlower,
        Loading
    },
    created(){
        this.loading = true;
        axios.post("/get/userInformation",{ 
            userId: this.$route.params.id,
            loginUser: this.$store.state.loginUser
            })
        .then(res=> {
            let flowerCount = res.data.continuationDays / 32;
            let flowerStatus = res.data.continuationDays % 32;

            if(flowerCount < 1){
                flowerCount = 0;
                this.flowerStatus = flowerStatus;

            } else if(flowerCount >= 1){
                flowerCount = Math.floor(flowerCount);
                this.flowerStatus = flowerStatus;
            }

            const user = {
                userId: res.data.id,
                userName: res.data.name ,
                photoUrl: res.data.photoUrl,
                continuationDays: flowerCount,
                flowerStatus: flowerStatus,
                followingsId: res.data.followingsId,
                followFlag: res.data.followFlag,
                followedId: res.data.followedId,
                followingId: res.data.followingId,
            }
            this.user = user;
            })
            this.loading = false;
    },
    methods:{
        followRequest(user){
            axios.post("/get/followRequest", { loginUser: this.$store.state.loginUser, followedId: user.userId });
            user.followFlag = false;
        }
    },
     data: () => ({
       user: [],
       loading: ""
    })
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
.back{
  background-image: url("~@/assets/Background5.png");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 150vh;
}

</style>