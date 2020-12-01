<template>
  <v-container>
    <h2>日報詳細</h2>
    <v-row>
      <v-col cols="8">
        <v-card>
          <v-card-text v-for="todo in todos" :key="todo.id">
            {{ todo.text }}
            <v-btn elevation="2" fab x-small color="gray">
              <v-icon>
                mdi-minus
              </v-icon>
            </v-btn>
          </v-card-text>
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
          <v-card-text>
            自分のカレンダー画面から見たときだけ所感が表示されます<br />
            ユーザーページでは所感は表示されません
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "dailyReport",
  data() {
    return {
      toDoCard: "",
      todos: [],
      aaa: "",
    };
  },
};
</script>
<style scoped>
.container {
  border: solid 0.2em pink;
  margin: 5em 0;
}
</style>
