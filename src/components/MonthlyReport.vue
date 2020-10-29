<template>
    <v-container>
        <p>月報詳細</p>
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
                    <v-card-text>所感が表示されます</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: 'monthlyReport'
}
</script>
<style scoped>
.container{
    border: solid 0.25rem green;
}
</style>