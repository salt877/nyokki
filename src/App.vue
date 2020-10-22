<template>
  <v-app name="App">
    <div>
      <v-content>
    <v-app-bar dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title to="/">にょっき</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary> 
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item to="/registerToDo"> 
            <v-list-item-title>ToDo登録</v-list-item-title> 
          </v-list-item>
          <v-list-item to="/manageToDo"> 
            <v-list-item-title>ToDo管理</v-list-item-title> 
          </v-list-item>
          <v-list-item to="/registerDailyReport"> 
            <v-list-item-title>日報登録</v-list-item-title> 
          </v-list-item>
          <v-list-item to="/registerMonthlyReport"> 
            <v-list-item-title>月報登録</v-list-item-title> 
          </v-list-item>
          <v-list-item to="/calendar"> 
            <v-list-item-title>カレンダー</v-list-item-title> 
          </v-list-item>
          <v-list-item to="/levelForAchivement"> 
            <v-list-item-title>みんなの達成度</v-list-item-title> 
          </v-list-item>
          <v-list-item to="/faq"> 
            <v-list-item-title>FAQ</v-list-item-title> 
          </v-list-item>
          <v-list-item> 
            <v-list-item-title>ログアウト</v-list-item-title> 
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
      </v-content>
    </div>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      drawer: false,
    }
  }
};
</script>
