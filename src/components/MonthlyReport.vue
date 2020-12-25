<template>
    <v-container>
        <h2>月報詳細</h2>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>○月の目標</v-card-title>
                    <v-card-text>・目標1</v-card-text>
                    <v-card-text>・目標2</v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>所感</v-card-title>
                    <v-card-text>
                        自分のカレンダー画面から見たときだけ所感が表示されます<br>
                        ユーザーページでは所感は表示されません
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
    monthlyReport:Object
},
created(){
    console.log("さめさめ",this.monthlyReport);
}


}
</script>
<style scoped>
.container{
    border: solid 0.2em pink;
    margin: 5em 0;
}
</style>