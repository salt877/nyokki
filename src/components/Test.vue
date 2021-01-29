<template>
  <div>
   
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
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data: () => ({
    events: [],
    value: moment().format('yyyy-MM-DD'),
  }),
  computed: {
    title() {
      return moment(this.value).format('yyyy年 M月');
    },
  },
  methods: {
    setToday() {
      this.value = moment().format('yyyy-MM-DD');
    },
    showEvent({ event }) {
      alert(`clicked ${event.name}`);
    },
    viewDay({ date }) {
      alert(`date: ${date}`);
    },
    getEvents() {
      const events = [
        // new Dateからmomentに変更
        {
          name: '日報',
          start: moment('2021-01-03 10:00:00').toDate(),
          end: moment('2021-01-03 11:00:00').toDate(),
          color: 'orange',
          timed: false,
        },
        // イベントを追加
        {
          name: '休暇',
          start: moment('2021-01-03').toDate(),
          end: moment('2021-01-03').toDate(),
          color: 'green',
          timed: false,
        },
        
      ];
      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
  },
};
</script>