export default {
    setLoginUser(state, loginUser){
        state.loginUser = loginUser;
        console.log("setLoginUserのmutationが呼ばれました");
    },
    setUserList(state, userList){
        state.userList = userList;
        console.log("setUserListのmutationが呼ばれました");
    },
    setTodoList(state, todoList){
        state.todoList = todoList;
        console.log(("setTodoListのmutationが呼ばれました"));
    },
    setMonthlyReport(state, monthlyReport){
        state.monthlyReport = monthlyReport;
        console.log(("setMonthlyReportのmutationが呼ばれました"));
    }
}
