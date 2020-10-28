<template>
  <v-container>
  <h2>日報登録</h2>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>今日のタスク</v-card-title>
          <v-card-text>登録したToDoが表示される1</v-card-text>
          <v-card-text>登録したToDoが表示される2</v-card-text>
          <v-card-text>登録したToDoが表示される3</v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>今日の報告</v-card-title>
          <v-card-text
            v-for="card in cards"
            :key="card"
          >
            {{card}}
          </v-card-text>
          <v-card-actions>
            <v-textarea 
              rows="1"
              placeholder="追加の記述も可能"
              v-model="newCard"
            >
            </v-textarea>
            <v-spacer></v-spacer>
            <v-btn 
            color="primary"
            @click="addNewCard()"
            >追加</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn color="warning">コピー</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            今日の達成度
          </v-card-title>
          <v-radio-group row>
            <v-radio label="😊 よくできた"></v-radio>
            <v-radio label="😐 まあまあできた"></v-radio>
            <v-radio label="😢 できなかった"></v-radio>
          </v-radio-group>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            所感
          </v-card-title>
          <v-textarea
            class="mt-0"
            auto-grow
            rows="3"
            value=""
            placeholder="今月の振り返りをしよう！"
          >
          </v-textarea>
          <v-card-actions>
            <v-btn
              color="warning"
              @click="copyImpressions()"
            >コピー
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
        class="save-button"
        color="error"
        @click="saveMonthlyReport"
        >保存する
      </v-btn> 
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "RegisterDailyReport",
    data() {
      return {
        newCard: '',
        cards: [
          '完了したToDoが表示されている1' ,
          '完了したToDoが表示されている2'
        ]
      }
    },
    methods: {
      addNewCard: function() {
        const addCard = this.newCard;
        if(!addCard){
          return ;
        }
        this.cards.push(addCard);
        this.newCard = '';
      }
    }
  };
</script>

<style scoped>
.container {
    text-align: center;
}
.v-input {
    width: 80%;
    margin: auto;
}
.v-input--radio-group.v-input--radio-group--row .v-radio {
  margin: 0 auto;
}
.v-btn {
    margin: 0 0 0 auto;
}
.save-button {
    margin: 3em auto;
}
</style>