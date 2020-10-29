import Vue from 'vue';
import Router from 'vue-router';
import SignIn from './views/SignIn.vue'
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


Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        { path: '/signIn', component: SignIn },
        { path: '/', component: Top },
        { path: '/faq', component: FAQ },
        { path: '/levelForAchivement', component: LevelOfAchievement },
        { path: '/manageToDo', component: ManageToDo },
        { path: '/mypage', component: Mypage },
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