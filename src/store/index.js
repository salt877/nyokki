import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const defaultState = () => {
  return {
    // ログインしているユーザの情報
    loginUser: {
      id: null,
      name: "",
      gmail: "",
      continuationDays: null,
      firstdayContinuation: null,
      levelAchevement: null,
      photoUrl: "",
    },

    // DBに登録されているユーザ情報一覧
    userList: [
      {
        id: null,
        name: "",
        gmail: "",
        continuationDays: null,
        firstdayContinuation: null,
        levelAchevement: null,
      },
    ],

    // タスク一覧
    todoList: [
      {
        id: null,
        userId: null,
        task: "",
        status: null,
        registrationDate: null,
      },
    ],

    //日報情報
    dailyReport: {
      id: null,
      userId: null,
      todoId: null,
      todayReport: "",
      levelAchievementlevelAchievement: null,
      impressions: "",
      registrationDate: null,
    },
    dailyReportList: [
      {
        id: null,
        impressions: "",
        levelAchievementlevelAchievement: null,
        registrationDate: null,
        userId: null,
      },
    ],
    // 月報情報
    monthlyReport: {
      id: null,
      userId: null,
      objectiveId: null,
      thisMonthObjectiveId: "",
      impressions: "",
      nextMonthObjective: "",
      registrationDateId: null,
    },

    // 今月目標情報
    thisMonthObjective: {
      id: null,
      userId: null,
      objective: "",
      objectiveMonth: null,
    },
    // 来月目標情報
    nextMonthObjective: {
      id: null,
      userId: null,
      objective: "",
      objectiveMonth: null,
    },

    // フォロー一覧
    followingList: [
      {
        id: null,
        followFlag: null,
        followingId: null,
        followedId: null,
      },
    ],
  };
};

var initializeState = defaultState();

export default new Vuex.Store({
  state: {
    initializeState,
  },
  mutations,
  getters,
  actions,
  // modules: {
  //     following
  // },
  plugins: [createPersistedState()], // この行でvuexに「vuex-persistedstate」を追加
});
