export default {
    setLoginUser({ commit }, loginUser){
        commit("setLoginUser", loginUser);
        console.log("setLoginUserのActionsを呼び出しました");
    },
    setUserList({ commit }, userList){
        commit("setUserList", userList);
        console.log("setUserListのActionsを呼び出しました");
    },
    setTodoList({ commit }, todoList){
        commit("setTodoList", todoList);
        console.log("setTodoListのActionsを呼び出しました");
    },
    setDailyReport({ commit }, dailyReport){
        commit("setDailyReport", dailyReport)
        console.log("setDailyReportのActionsを呼び出しました");
    },
    setMonthlyReport({ commit }, monthlyReport){
        commit("setMonthlyReport", monthlyReport);
        console.log("setMonthlyReportのActionsを呼び出しました");
    },
    setObjective({ commit }, objective){
        commit("setObjective", objective);
        console.log("setObjectiveのActionsを呼び出しました");
    },
    setFollowingList({ commit }, followingList){
        commit("setFollowingList", followingList);
        console.log("setFollowingListのActionsを呼び出しました");
    },
    // increment(context, number){
    //     context.commit('increment', number);
    // }
    increment({commit}, number){
        commit("increment",number);
    },
    setCount({commit}, count){
        commit("setCount",count);
    },
    updateName({ commit }, newName) {
        commit("updateName", newName);
      }
}