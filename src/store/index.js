import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './actions'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const defaultState = () => {
    return {
        // ログインしているユーザの情報
        loginUser: {
            userId: null,
            userName: '',
            userGmail: '',
            continuationDays: null,
            firstdayContinuation: null,
            levelAchevement: null
        },

        // DBに登録されているユーザ情報一覧
        userList: [
            {
                userId: null,
                userName: '',
                userGmail: '',
                continuationDays: null,
                firstdayContinuation: null,
                levelAchevement: null 
            }
        ],

        // タスク一覧
        todoList: [
            {
                todoId: null,
                userId: null,
                task: '',
                status: null,
                registrationDate: null
            }
        ],

        //日報情報
        dailyReport: {
            dairyreportId: null,
            userId: null,
            todoId: null,
            todayReport: '',
            levelAchievementlevelAchievement: null,
            impressions: '',
            registrationDate: null
        },

        // 月報情報
        monthlyReport: {
            monthlyReportId: null,
            userId: null,
            objectiveId: null,
            thisMonthObjective: '',
            impressions: '',
            nextMonthObjective: '',
            registration_date: null
        },

        // 目標情報
        objective: {
            objectiveId: null,
            userId: null,
            objective: '',
            objectiveMonth: null
        },

        // フォロー一覧
        followingList: [
            {
                followId: null,
                followFlag: null,
                followingId: null,
                followedId: null
            }
        ],

        plugins: [createPersistedState()] // この行でvuexに「vuex-persistedstate」を追加
    }
}

var initializeState = defaultState();

export default new Vuex.Store({
    state: initializeState,
    mutations,
    actions,
});