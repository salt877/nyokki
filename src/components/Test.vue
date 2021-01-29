<template>

  <v-container fluid>
      <v-row >
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
          class="card-design"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="brack--text align-top"
              gradient="to bottom, rgba(148,255,234,0.4), rgba(224,255,255,0.5)"
              height="200px"
              width="400px"
            >
              <v-card-title v-text="card.title"></v-card-title>



            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  
  <!-- <div>
   
    <v-sheet height="94vh">
      <v-calendar
        ref="calendar"
        v-model="value"
        :events="events"
        :event-color="getEventColor"
        locale="ja-jp"
        :day-format="(timestamp) => new Date(timestamp.date).getDate()"
        :month-format="(timestamp) => new Date(timestamp.date).getMonth() + 1 + ' /'"
        @change="getEvents"
        @click:event="showEvent"
        @click:date="viewDay"
      ></v-calendar>
    </v-sheet>
  </div> -->
</template>

<script>
export default {
    data: () => ({
      cards: [
        
        { title: '日報継続度', flex: 6 },
        { title: '今月の自己達成度', flex: 6 },
      ],
    }),
  }
// import moment from 'moment';

// export default {
//   data: () => ({
//     events: [],
//     value: moment().format('yyyy-MM-DD'),
//   }),
//   computed: {
//     title() {
//       return moment(this.value).format('yyyy年 M月');
//     },
//   },
//   methods: {
//     setToday() {
//       this.value = moment().format('yyyy-MM-DD');
//     },
//     showEvent({ event }) {
//       alert(`clicked ${event.name}`);
//     },
//     viewDay({ date }) {
//       alert(`date: ${date}`);
//     },
//     getEvents() {
//       const events = [
//         // new Dateからmomentに変更
//         {
//           name: '日報',
//           start: moment('2021-01-03 10:00:00').toDate(),
//           end: moment('2021-01-03 11:00:00').toDate(),
//           color: 'orange',
//           timed: false,
//         },
//         // イベントを追加
//         {
//           name: '休暇',
//           start: moment('2021-01-03').toDate(),
//           end: moment('2021-01-03').toDate(),
//           color: 'green',
//           timed: false,
//         },
        
//       ];
//       this.events = events;
//     },
//     getEventColor(event) {
//       return event.color;
//     },
//   },
// };
</script>
<style scoped>
.card-design div {
  font-weight: bold;
  font-size: 1.2em;
  margin:4px;
}
</style>