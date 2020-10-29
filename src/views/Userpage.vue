<template>
  <v-container>
    <h2>ユーザーページ</h2>
    <v-row>
      <v-col>
      </v-col>
      <v-col >
        <v-avatar size="150" >
         <img src="../images/same.jpeg">
        </v-avatar>
        <v-card-actions>
        <v-text>ユーザー名：サメ</v-text>
        </v-card-actions>
      </v-col>
      <v-col>
        <v-list-item-avatar size="150">
                <img src="../images/flower8_31day.png">
        </v-list-item-avatar>
  
      </v-col>
      <v-col>
      </v-col>
    </v-row>
    <br>
    <br>
    <v-row>
      <v-col>
          <v-card-actions>
            <v-btn color="warning">フォロー申請</v-btn>
        </v-card-actions>
          
      </v-col>
    </v-row>
    
    <v-row>
      <v-col>
        <v-card>
        <p>フォローOKなら日報・月報に切り替わる</p>
        <p>カレンダーコンポーネント</p>
        <CalendarComponent></CalendarComponent>
          <p>日報コンポーネント</p>
          <DailyReport></DailyReport>
          <p>日報コンポーネント</p>
          <MonthlyReport></MonthlyReport>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import CalendarComponent from '../components/CalendarComponent.vue';
import DailyReport from '../components/DailyReport.vue';
import MonthlyReport from '../components/MonthlyReport.vue';


  export default {
    name: "Userpage",
    components:{
      CalendarComponent,
      DailyReport,
      MonthlyReport
      
    },
  };
</script>