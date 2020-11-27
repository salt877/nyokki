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
    setDailyReport(state, dailyReport){
        state.dailyReport = dailyReport;
        console.log(("setDailyReportのmutationが呼ばれました"));
    },
    setMonthlyReport(state, monthlyReport){
        state.monthlyReport = monthlyReport;
        console.log(("setMonthlyReportのmutationが呼ばれました"));
    },
    setObjective(state, objective){
        state.objective = objective;
        console.log(("setObjectiveのmutationが呼ばれました"));
    },
    setFollowingList(state, followingList){
        state.followingList = followingList;
        console.log(("setFollowingListのmutationが呼ばれました"));
    },
    // increment:function(state){
    //     state.count++;
    //   },
    increment2(state, number){
        state.count += number;
        console.log("mutationが呼ばれた！"+number+"を渡す");
    },
        increment(state,number){
            state.count += number;
        },
          
        setCount(state,count){
            state.count = count;
        },
        updateName(state, newName) {
            state.name = newName;
        }
    }
