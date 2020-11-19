export default {
    setLoginUser(state, loginUser){
        state.loginUser = loginUser;
        console.log("setLoginUserのmutationが呼ばれました");
    },
    setUserList(state, userList){
        state.userList = userList;
        console.log("setUserListのmutationが呼ばれました");
    }
}
