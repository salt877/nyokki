<template>
<v-main  class="back">
  <!-- ナビゲーション -->
      <navigation></navigation>
  <div >
      <h2>FAQ</h2>
      <h4>よくあるご質問</h4>
 <v-container>
   <v-spacer></v-spacer>
  <v-expansion-panels focusable>
   <div class="about"><v-icon>mdi-menu-right</v-icon>&nbsp;&nbsp;にょっきについて</div>
    <!-- にょっきについて -->
    <v-expansion-panel
      height="300"
      width="300"
    >
      <v-expansion-panel-header class="lime lighten-4">にょっきとは何ですか？</v-expansion-panel-header>
      <v-expansion-panel-content>
        毎日続けて日報を書くことで植物を育てることができるアプリケーションです。
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel
      height="300"
      width="300"
    >
      <v-expansion-panel-header class="lime lighten-4">にょっきでは何ができますか？</v-expansion-panel-header>
      <v-expansion-panel-content>
        <strong>▶︎ToDo登録</strong><br>
        その日のToDoを登録することができます。<br><br>
        <strong>▶︎ToDo管理</strong><br>
        登録したToDoの状態を登録することができます。<br><br>
        <strong>▶︎日報登録</strong><br>
        本日の日報を登録することができます。<br><br>
        <strong>▶︎月報登録</strong><br>
        今月の月報を登録することができます。<br><br>
        <strong>▶︎カレンダー</strong><br>
        これまでの日報・月報、達成度の変化、現在のお花の成長を確認できます。<br><br>
        <strong>▶︎みんなの達成度</strong><br>
        他のユーザーが育てたお花の数を確認できます。
        フォローしたいユーザーを見つけてフォローすることも可能です。<br><br>
      </v-expansion-panel-content>
    </v-expansion-panel>

  <!-- ToDoについて -->
  <div class="about"><v-icon>mdi-format-list-bulleted</v-icon>&nbsp;&nbsp;ToDo登録・管理ついて</div>
    <v-expansion-panel
      height="300"
      width="300"
    >
      <v-expansion-panel-header class="lime lighten-4">登録したToDoの修正はできますか？</v-expansion-panel-header>
      <v-expansion-panel-content>
        1度登録したToDoは修正できません。
      </v-expansion-panel-content>
    </v-expansion-panel>
       <v-expansion-panel
      height="300"
      width="300"
    >
      <v-expansion-panel-header class="lime lighten-4">未完了のToDoを完了にしてしまいました。</v-expansion-panel-header>
      <v-expansion-panel-content>
        ToDoの状態管理はいつでも修正できます。
      </v-expansion-panel-content>
    </v-expansion-panel>

  <!-- 日報・月報の登録について -->
  <div class="about"><v-icon>mdi-clipboard-text</v-icon>&nbsp;&nbsp;日報・月報について</div>
    <v-expansion-panel
      height="300"
      width="300"
    >
      <v-expansion-panel-header class="lime lighten-4">登録した日報・月報の修正はできますか？</v-expansion-panel-header>
      <v-expansion-panel-content>
        1度登録した日報・月報は修正できません。
      </v-expansion-panel-content>
    </v-expansion-panel>

  <!-- カレンダーについて -->
  <div class="about"><v-icon>mdi-calendar-text</v-icon>&nbsp;&nbsp;カレンダーについて</div>
    <v-expansion-panel
      height="300"
      width="300"
    >
      <v-expansion-panel-header class="lime lighten-4">日にちを押しても日報が表示されません。</v-expansion-panel-header>
      <v-expansion-panel-content>
        日報が記入されていない可能性があります。
      </v-expansion-panel-content>
    </v-expansion-panel>


  <!-- フォローについて -->
  <div class="about"><v-icon>mdi-account-multiple</v-icon>&nbsp;&nbsp;フォローについて</div>
    <v-expansion-panel
      height="300"
      width="300"
    >
      <v-expansion-panel-header class="lime lighten-4">フォローやフォロワーはどこから確認できますか？</v-expansion-panel-header>
      <v-expansion-panel-content>
        マイページの【フォロー一覧】【フォロワー一覧】から確認できます。
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel
      height="300"
      width="300"
    >
       <v-expansion-panel-header class="lime lighten-4">何日経ってもフォロー申請のまま表示が変わりません。</v-expansion-panel-header>
      <v-expansion-panel-content>
        フォロー申請が承認されていないか、拒否された可能性があります。<br>
        暫く経ってから再度ご確認をお願いします。
      </v-expansion-panel-content>
    </v-expansion-panel>

     <!-- プロフィールについて -->
     <div class="about"><v-icon>mdi-account</v-icon>&nbsp;&nbsp;プロフィールについて</div>
    <v-expansion-panel
      height="300"
      width="300"
    >
      <v-expansion-panel-header class="lime lighten-4">プロフィールの変更はできますか？</v-expansion-panel-header>
      <v-expansion-panel-content>
        マイページの【プロフィール変更】から変更が可能です。
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
 </v-container>
</div>
</v-main>
</template>

<script>
import Navigation from '../components/Navigation';
  export default {
    name: "FAQ",
    components:{
      Navigation,
    },
  };
</script>
<style scoped>
h2, h4 {
  text-align: center;
}
.about {
  padding-top: 40px;
  padding-bottom: 5px;
  font-size: 20px;
  font-weight: bold;
}
.v-expansion-panels {
  display: block;
}
.v-expansion-panel-content__wrap {
  padding: 20px 24px 16px;
}
.back{
  background-image: url("~@/assets/Background7.png");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 200vh;
}
</style>