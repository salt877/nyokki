<template>
    <v-container>
        <h2>月報詳細</h2>
         <v-row v-if="!monthlyReport.impressions">
        <v-col>
          <v-card>
            <v-card-title>この月の月報はありません</v-card-title>
          </v-card>
        </v-col>
      </v-row>
        <v-row v-if="monthlyReport.thisMonthObjective">
            <v-col>
                <v-card>
                    <v-card-title>{{this.month}}月の目標</v-card-title>
                    <v-card-text>{{this.monthlyReport.thisMonthObjective}}</v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="monthlyReport.impressions">
            <v-col>
                <v-card>
                    <v-card-title>所感</v-card-title>
                    <v-card-text>
                        {{this.monthlyReport.impressions}}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
name: 'monthlyReport'
,
props:{
    monthlyReport:Object,
    month:Number
},
created(){

    console.log("さめさめ",this.monthlyReport);
    console.log("さめさめ2",this.month);
}
}


</script>
<style scoped>
.container{
    border: solid 0.2em pink;
    margin: 5em 0;
}
</style>