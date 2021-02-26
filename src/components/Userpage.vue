<template>
<v-main  class="back">
    <!-- ナビゲーション -->
      <navigation></navigation> 
    <div v-if="loading">
      <Loading></Loading>
    </div>
    <v-container v-else>
      <v-row>
      <v-col>
      <v-btn class="link">
        <p class="link" @click="$router.go(-1)">前のページに戻る</p>
      </v-btn>
      </v-col>
      <v-col>
        <v-text class="card-font">{{ user.userName }}<span>さんのページ</span></v-text>
      </v-col>
        <v-col></v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-avatar size="150">
                     <img :src="user.photoUrl">
                </v-avatar>
            </v-col>
            <v-col>
                <p class="card-font2">咲かせた花数🌷：{{user.continuationDays}}本+</p>
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
                <CalendarComponent :userId="user.userId" :year="year" :month="month" :nippos="nippos" :items="items"  @child-event="parentMethod"></CalendarComponent>
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
                <br>
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
import Navigation from '../components/Navigation';
import moment from 'moment';
// import {mapGetters} from 'vuex';

  export default {
    name: "UserpageComponent",
    components:{
       CalendarComponent,
        NyokkiFlower,
        Loading,
       Navigation,
    },
    // computed:{
    // ...mapGetters([
    //   'nippos'
    // ]),
    // },
    async created(){
        this.loading = true;
        axios.post("/get/userInformation",{ 
            userId: this.$route.params.id,
            loginUser: this.$store.state.loginUser
        }).then(res=> {
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
            
    //カレンダーの日報表示機能
    this.values = []
    var year = moment().format('yyyy')
    var month =  moment().format('MM')
    await axios.post("/get/showUserCalender", {
        userId: this.$route.params.id,
          date: this.value,
          year: year,
          month: month
          })
        .then((res) => {
        let list = res.data ;
        var registrationDateList =[];
        console.log(res.data,"3");
        
          //日付の加工
        list.forEach(e => {
          var dt = new Date(Date.parse(e.registrationDate));
          dt.setHours(dt.getHours() + 9);
          e.registrationDate = dt.toISOString();
        });

        //登録日付を一つづつ取り出す
        for(let num2 in list){
            registrationDateList.push({
              registrationDate:list[num2].registrationDate,
            })
          }
        var registrationDates = registrationDateList.map((x) => x.registrationDate)
          this.registrationDates = registrationDates;
          console.log("日付のデータ"+ registrationDates);

        console.log(registrationDateList,"registrationDateListのなかみ");
        registrationDateList.forEach(datelist => {
          this.nippos.push(datelist.registrationDate);
        });
        console.log("createされた日報です",this.nippos);

         }).catch((error) => {
            alert("編集失敗");
            console.log("編集失敗" + error);
     });
    },
  methods:{
        followRequest(user){
            axios.post("/get/followRequest", { loginUser: this.$store.state.loginUser, followedId: user.userId });
            user.followFlag = false;
        },
        parentMethod : function(value2) {
        //  this.loading = true;
        this.values = []
        // alert(value2.year);
        // alert(value2.month);
        this.year = value2.year;
        this.month = value2.month;
        console.log('子コンポーネントのイベントを検知しました',this.year,this.month);
        
        axios.post("/get/showUserCalender", {
        userId: this.$route.params.id,
          date: this.value,
          year: this.year,
          month: this.month
          })
        .then((res) => {
        let list = res.data ;
        var registrationDateList =[];
        console.log(res.data,"4");

          //日付の加工
        list.forEach(e => {
          var dt = new Date(Date.parse(e.registrationDate));
          dt.setHours(dt.getHours() + 9);
          e.registrationDate = dt.toISOString();
        });
        
        // 日報記述日の取得
        for(let num in list){
          registrationDateList.push({
              nippo:list[num].registrationDate,
            }
            )
        }
        var nippos = registrationDateList.map((x) => x.nippo)
        this.nippos = nippos;
        console.log("methodsの新たな日報",nippos);

        nippos = [];
        this.nippos.forEach (item =>{
          // item.setHours(item.getHours() + 9); // +9時間
        const registrationDates = moment(item);
        item = registrationDates.format("YYYY-MM-DD");
        // item.setHours(item.getHours() + 9); // +9時間
        nippos.push(item);
        console.log("methodsの日付加工済み日報ですeach内",nippos); 
        });
        this.nippos = nippos;


        })
         .catch((error) => {
            alert("編集失敗");
            console.log("編集失敗" + error);
     });
      
      this.loading = false;
      },
    },
    computed: {
    
    },
     data: () => ({
       user: [],
       loading: "",
       year:"",
       month:"",
       userId:"",
       value:"",
       values:"",
       nippos:[],
       items:[],
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
    font-weight: bold;
    font-size: 1.6em;
}
.userpage-flower {
    border-radius: 0%;
}
.back{
  background-image: url("~@/assets/Background5.png");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: auto;
}
.link {
    text-align: left;
    color: blue;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.0em;
}
.card-font {
  font-weight: bold;
  font-size: 1.9em;
}
.card-font2 {
  font-weight: bold;
  font-size: 1.1em;
}
span {
  font-weight: bold;
  font-size: 0.6em;

}
</style>