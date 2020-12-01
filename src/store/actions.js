export default {
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
  setMonthlyReport({ commit }, monthlyReport) {
    commit("setMonthlyReport", monthlyReport);
    console.log("setMonthlyReportのActionsを呼び出しました");
  },
  setObjective({ commit }, objective) {
    commit("setObjective", objective);
    console.log("setObjectiveのActionsを呼び出しました");
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
  setUncompleteList({ commit }, uncompleteList) {
    commit(" setUncompleteList", uncompleteList);
  },
  setCompleteList({ commit }, completeList) {
    commit(" setCompleteList", completeList);
  },
};
