import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const defaultState = () => {
    return {
        // ログインしているユーザの情報
        loginUser: {
            id: null,
            name: '',
            gmail: '',
            continuationDays: null,
            firstdayContinuation: null,
            levelAchevement: null
        },

        // DBに登録されているユーザ情報一覧
        userList: [
            {
                id: null,
                name: '',
                gmail: '',
                continuationDays: null,
                firstdayContinuation: null,
                levelAchevement: null 
            }
        ],

        // タスク一覧
        todoList: [
            {
                id: null,
                userId: null,
                task: '',
                status: null,
                registrationDate: null
            }
        ],

        //日報情報
        dailyReport: {
            id: null,
            userId: null,
            todoId: null,
            todayReport: '',
            levelAchievementlevelAchievement: null,
            impressions: '',
            registrationDate: null
        },

        // 月報情報
        monthlyReport: {
            id: null,
            userId: null,
            objectiveId: null,
            thisMonthObjective: '',
            impressions: '',
            nextMonthObjective: '',
            registrationDate: null
        },

        // 目標情報
        objective: {
            id: null,
            userId: null,
            objective: '',
            objectiveMonth: null
        },

        // フォロー一覧
        followingList: [
            {
                id: null,
                followFlag: null,
                followingId: null,
                followedId: null
            }
        ],

    }
}

var initializeState = defaultState();

export default new Vuex.Store({
    state: {
        initializeState,
        count : 0
    },
    mutations,
    getters,
    actions,
    plugins: [createPersistedState()] // この行でvuexに「vuex-persistedstate」を追加
});