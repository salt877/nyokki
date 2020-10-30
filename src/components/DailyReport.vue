<template>
    <v-container>
        <h2>日報詳細</h2>
        <v-row>
            <v-col cols="8">
                <v-card>
                    <v-card-title>タスク</v-card-title>
                    <v-card-text>・タスク1</v-card-text>
                    <v-card-text>・タスク2</v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title>達成度</v-card-title>
                    <v-card-text>😐</v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>報告</v-card-title>
                    <v-card-text>報告内容が表示されます</v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>所感</v-card-title>
                    <v-card-text>所感が表示されます</v-card-text>
                </v-card>
            </v-col>
        </v-row>    
    </v-container>
</template>
<script>
export default {
    name: 'dailyReport'
}
</script>
<style scoped>
.container{
    border: solid 0.20em pink;
    margin: 5em 0;
}
</style>