<template>
  <v-app name="App">
    <div>
    <v-app-bar class="light-green accent-1">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>にょっき！</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary> 
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            にょっき！
          </v-list-item-title>
          <v-list-item-subtitle>
            にょきにょき育成日記
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list nav dense>

          <v-list-item v-for="nav_list in nav_lists" :key="nav_list.name" :to="nav_list.link">
            <v-list-item-icon>
              <v-icon>{{ nav_list.icon }}</v-icon>
            </v-list-item-icon> 
            <v-list-item-content>
              <v-list-item-title>{{ nav_list.name }}</v-list-item-title> 
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
    </div>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer>
      <!-- フッダー-->
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      drawer: false,
      nav_lists: [
        { name: 'Top' ,icon: 'mdi-home', link: '/'},
        { name: 'マイページ' ,icon: 'mdi-account', link: '/mypage'},
        { name: 'ToDo登録' ,icon: 'mdi-pencil', link: '/registerToDo'},
        { name: 'ToDo管理' ,icon: 'mdi-format-list-bulleted', link: '/manageToDo'},
        { name: '日報登録' ,icon: ' mdi-clipboard-text', link: '/registerDailyReport'},
        { name: '月報登録' ,icon: 'mdi-note-text', link: '/registerMonthlyReport'},
        { name: 'カレンダー' ,icon: 'mdi-calendar-text', link: '/calendar'},
        { name: 'みんなの達成度' ,icon: 'mdi-account-multiple-outline', link: '/levelForAchivement'},
        { name: 'FAQ' ,icon: 'mdi-help', link: '/faq'},
        { name: 'ログアウト' ,icon: 'mdi-logout', link: ''}
      ]
    }
  }
};
</script>

