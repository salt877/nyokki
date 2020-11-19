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
        commit("todoList", todoList);
        console.log("setTodoListのActionsを呼び出しました");
    }
}