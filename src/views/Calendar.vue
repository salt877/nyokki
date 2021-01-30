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
        <CalendarComponent :userId="$store.state.loginUser.id"
        :year="year" :month="month" :list="list" :items="items" :nippos="nippos" @child-event="parentMethod"
        ></CalendarComponent>
    </v-col>
    <v-col>
      <v-card height="61vh">
        <ChartJs :values="values" :key="resetKey"></ChartJs>
      </v-card>
      <v-col>
        <v-text class="card-font">
          咲かせた花数🌷：{{ getFlowerCount }}本+
        </v-text><br>
      <NyokkiFlower :flowerStatus="flowerStatus" ></NyokkiFlower>
    </v-col>
    </v-col>
  </v-row>
  <v-row><v-col></v-col></v-row>
    <v-row><v-col></v-col></v-row>
</v-container>
</v-main>
</template>

<script>
import CalendarComponent from '../components/CalendarComponent.vue';
import NyokkiFlower from '../components/NyokkiFlower.vue';
import ChartJs from '../components/ChartJs.vue';
import Loading from '@/components/Loading.vue';
import axios from "axios";
import moment from 'moment';
// import {mapActions, mapGetters} from 'vuex';
import Navigation from '../components/Navigation';
import { mapGetters } from "vuex";

  export default {
    name: "Calendar",
    components:{
      CalendarComponent,
      ChartJs,
      NyokkiFlower,
      Loading,
      Navigation,
    },
    data: () => ({
    loading: true,
    values:"",
    registrationDates:"",
    flowerStatus: "",
     item: "",
     year:"",
     month:"",
     resetKey:0,
     list:"",
     items:[],
     nippos:[]
  }),
  // computed:{
  //     ...mapGetters(["setNippo"]),
  // },
  methods: {
    // ...mapActions(["setNippo"]),
    // setNippo (event) {
    //   this.$store.commit('setNippo', event.target.nippos)
    // },

   parentMethod : function(value2) {
    //  this.loading = true;
    this.values = []
    // alert(value2.year);
    // alert(value2.month);
    this.year = value2.year;
    this.month = value2.month;
    console.log('子コンポーネントのイベントを検知しました',this.year,this.month);
    

    axios.post("/get/showCalender", {
      loginUser : this.$store.state.loginUser,
          date: this.value,
          year: this.year,
          month: this.month
          })
        .then((res) => {
        let list = res.data ;
        var achievementList=[];
        var registrationDateList =[];
        console.log(res.data,"2");
        
          //日付の加工
        list.forEach(e => {
          var dt = new Date(Date.parse(e.registrationDate));
          // console.log("xxxxx", typeof dt);
          dt.setHours(dt.getHours() + 9);
          // console.log("aaaaa", dt.toISOString());
          e.registrationDate = dt.toISOString();
          // console.log("aaaaa", e.registrationDate);
          // console.log("bbbbb", dt);
        });

        
        //お花の表示
        let flowerCount = this.$store.state.loginUser.continuationDays / 32;
        let flowerStatus = this.$store.state.loginUser.continuationDays % 32;

          if(flowerCount < 1){
            flowerCount = 0;
            this.flowerStatus = flowerStatus;

          } else if(flowerCount >= 1){
            flowerCount = Math.floor(flowerCount);
            this.flowerStatus = flowerStatus;
          }

          //達成度グラフの表示
          for(let num in list){
            achievementList.push({
              value:list[num].levelAchievementlevelAchievement,
            }
            )
          }
          // console.log(achievementList);
          var values = achievementList.map((x) => x.value)
          this.values = values;
          console.log("データだよ"+ values);

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
      // this.resetKey++;
      this.loading = false;
   
   
   }

  },
  async created () {
    this.values = []
    var year = moment().format('yyyy')
    var month =  moment().format('MM')
    // this.parentMethod()
    
    await axios.post("/get/showCalender", {
      loginUser : this.$store.state.loginUser,
          date: this.value,
          year: year,
          month: month
        })
        .then((res) => {
        let list = res.data ;
        var dayList = [];
        var achievementList=[];
        var registrationDateList =[];
        this.list = list;

          //日付の加工
        list.forEach(e => {
          var dt = new Date(Date.parse(e.registrationDate));
          // console.log("xxxxx", typeof dt);
          dt.setHours(dt.getHours() + 9);
          // console.log("aaaaa", dt.toISOString());
          e.registrationDate = dt.toISOString();
          // console.log("aaaaa", e.registrationDate);
          // console.log("bbbbb", dt);
        });

        //登録日付を一つづつ取り出す
        for(let num2 in list){
            registrationDateList.push({
              registrationDate:list[num2].registrationDate,
            })
          }
        var registrationDates = registrationDateList.map((x) => x.registrationDate)
          this.registrationDates = registrationDates;
          console.log("加工前の日付のデータ"+ registrationDates);          

        //登録日付を加工する
        registrationDates.forEach( item => {
        console.log( "中身を１つ取り出します" );
        const achievementListDates = moment(item);
        item = achievementListDates.format("YYYY-MM-DD");
        dayList.push(item);
        this.items.push(item);
        console.log("加工後の日付のデータ", this.items);
        //registrationDateに詰めなおす
      });
          // console.log("yyyyyy",dayList);
          
            // list.filter(day => {
            //   if ( day.registrationDate !== null  ){
            //     day.registrationDate = dayList[num3];
            //   }
            // });


      //  console.log("aaaaaa",item);
        console.log(list);
 
        
        
        // registrationDates = achievementListDate.format("YYYY-MM-DD");
        // this.registrationDates = registrationDates;
        // console.log("加工後の日付のデータ"+ this.registrationDates);
        
        
        //お花の表示
        let flowerCount = this.$store.state.loginUser.continuationDays / 32;
        let flowerStatus = this.$store.state.loginUser.continuationDays % 32;

          if(flowerCount < 1){
            flowerCount = 0;
            this.flowerStatus = flowerStatus;

          } else if(flowerCount >= 1){
            flowerCount = Math.floor(flowerCount);
            this.flowerStatus = flowerStatus;
          }

          //達成度グラフの表示
          for(let num in list){
            achievementList.push({
              value:list[num].levelAchievementlevelAchievement,
            }
            )
          }
          // console.log(achievementList);
          var values = achievementList.map((x) => x.value)
          this.values = values;
          console.log("データなのだよ"+ values);

          // 日報記述日の取得
        // for(let num in list){
        //   registrationDateList.push({
        //       nippo:list[num].registrationDate,
        //     }
        //     )
        // }
        console.log(registrationDateList,"registrationDateListのなかみ");
        // this.nippos = registrationDateList.map((x) => x.nippo)
        registrationDateList.forEach(datelist => {
          this.nippos.push(datelist.registrationDate);
        });
        // this.nippos = nippos;
        console.log("createされた日報です",this.nippos);
        // nippos.setHours(nippos.getHours() + 9); // +9時間
        // console.log("createされた日付加工済み日報です",nippos); 

          })
          .catch((error) => {
            alert("編集失敗");
            console.log("編集失敗" + error);
    });
      this.loading = false;
    },
  computed:{
    ...mapGetters(["getFlowerCount", "getFlowerStatus"]),
  }
  };
</script>
<style scoped>
.back{
  background-image: url("~@/assets/Background8.png");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
}
.card-font {
  font-weight: bold;
  font-size: 1.3em;
}
</style>