<template>
<div v-if="loading">
      <Loading></Loading>
</div>
<v-container v-else>
  <v-row>
    <v-col>
        <h2>カレンダー</h2>
        <CalendarComponent :userId="$store.state.loginUser.id"></CalendarComponent>
    </v-col>
    <v-col>
      <v-card>
        <ChartJs :values="values"></ChartJs>
      </v-card>
      <v-col>
      <NyokkiFlower></NyokkiFlower>
    </v-col>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import CalendarComponent from '../components/CalendarComponent.vue';
import NyokkiFlower from '../components/NyokkiFlower.vue';
import ChartJs from '../components/ChartJs.vue';
import Loading from '@/components/Loading.vue';
import axios from "axios";


  export default {
    name: "Calendar",
    components:{
      CalendarComponent,
      ChartJs,
      NyokkiFlower,
      Loading
    },
    data: () => ({
    loading: true,
    values:""
  }),
  async created () {

        await axios.post("/get/showCalender", {loginUser : this.$store.state.loginUser})
        .then((res) => {
        let list = res.data ;
        var achievementList=[];

          for(let num in list){
            achievementList.push({
              value:list[num].levelAchievementlevelAchievement,
            }
            )
          }
          console.log(achievementList);
          var values = achievementList.map((x) => x.value)
          this.values = values;
          console.log("データ"+ values);
          })
          .catch((error) => {
            alert("編集失敗");
            console.log("編集失敗" + error);
    });
      this.loading = false;
    },

  };
</script>