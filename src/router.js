import Vue from 'vue';
import Router from 'vue-router';
import Top from './views/Top.vue';
import Calendar from './views/Calendar.vue';
import FAQ from './views/FAQ.vue';
import LevelOfAchievement from './views/LevelOfAchievement.vue';
import ManageToDo from './views/ManageToDo.vue';
import Mypage from './views/Mypage.vue';
import RegisterDailyReport from './views/RegisterDailyReport.vue';
import RegisterMonthlyReport from './views/RegisterMonthlyReport.vue';
import RegisterToDo from './views/RegisterToDo.vue';
import CalendarComponent from './components/CalendarComponent.vue';
import Chart from './components/Chart.vue';
import ProfileChange from './components/ProfileChange.vue';
import Follow from './components/Follow.vue';
import Follower from './components/Follower.vue';


Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        { path: '/', component: Top },
        { path: '/faq', component: FAQ },
        { path: '/levelForAchivement', component: LevelOfAchievement },
        { path: '/manageToDo', component: ManageToDo },
        { path: '/mypage', component: Mypage,
            children: [
            { path: '/profileChange', component: ProfileChange },
            { path: '/follow', component: Follow },
            { path: '/follower', component: Follower },
         ]
        },
        { path: '/registerDailyReport', component: RegisterDailyReport },
        { path: '/registerMonthlyReport', component: RegisterMonthlyReport },
        { path: '/registerToDo', component: RegisterToDo },
        { path: '/calendar', component: Calendar, 
            children: [
                { path: '/calendarComponent', component: CalendarComponent },
                { path: '/chart', component: Chart },
            ]
        },
    ]
})