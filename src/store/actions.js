export default {
  resetState({ commit }) {
    commit("resetState");
  },
  setLoginUser({ commit }, loginUser) {
    commit("setLoginUser", loginUser);
    console.log("setLoginUserのActionsを呼び出しました");
  },
  setUserList({ commit }, userList) {
    commit("setUserList", userList);
    console.log("setUserListのActionsを呼び出しました");
  },
  setTodoList({ commit }, todoList) {
    commit("setTodoList", todoList);
    console.log("setTodoListのActionsを呼び出しました");
  },
  setDailyReport({ commit }, dailyReport) {
    commit("setDailyReport", dailyReport);
    console.log("setDailyReportのActionsを呼び出しました");
  },
  setDailyReportList({ commit }, dailyReportList) {
    commit("setDailyReportList", dailyReportList);
    console.log("setDailyReportListのActionsを呼び出しました");
  },
  setMonthlyReport({ commit }, monthlyReport) {
    commit("setMonthlyReport", monthlyReport);
    console.log("setMonthlyReportのActionsを呼び出しました");
  },
  setThisMonthObjective({ commit }, thisMonthobjective) {
    commit("setThisMonthObjective", thisMonthobjective);
    console.log("setThisMonthObjectiveのActionsを呼び出しました");
  },
  setNextMonthObjective({ commit }, nextMonthobjective) {
    commit("setNextMonthObjective", nextMonthobjective);
    console.log("setThisMonthObjectiveのActionsを呼び出しました");
  },
  setFollowingList({ commit }, followingList) {
    commit("setFollowingList", followingList);
    console.log("setFollowingListのActionsを呼び出しました");
  },
  incrementOne: function(context) {
    context.commit("increment");
  },
  increment(context, number) {
    context.commit("increment2", number);
    console.log("actionsが呼ばれた！" + number + "が渡された！");
  },
  // increment(context, number){
  //     context.commit('increment', number);
  // }
  // increment({commit}, number){
  //     commit("increment",number);
  // },
  setCount({ commit }, count) {
    commit("setCount", count);
  },
  updateName({ commit }, newName) {
    commit("updateName", newName);
  },
  setUncompleteList({ commit }, uncompleteList) {
    commit(" setUncompleteList", uncompleteList);
  },
  setCompleteList({ commit }, completeList) {
    commit(" setCompleteList", completeList);
  },
  // setNippo({ commit }, nippos) {
  //   commit("setNippo", nippos);
  // },
};
