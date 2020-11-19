import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const defaultState = () => {
  return {
    followingList:[
      {
        id:"",
        followFlag:"",
        followingId:"",
        followedId:"",
      }
    ],
    userList:[
      {
        id:"",
        name:"",
        gmail:"",
        continuationDays:"",
        firstdayContinuation: "",
        levelAchievement:"",
      }
    ],
  }
};

var initializeState = defaultState();

export default new Vuex.Store({
  state: initializeState,
  mutations:{
    setFollowingList(state, followingList){
        state.followingList = followingList;
        console.log('mutations:'+ followingList);
    },
    setUserList(state, userList){
      state.userList = userList;
      console.log('mutations:'+ userList);
  }
  },
  actions:{
    setFollowingList({ commit }, followingList) {
      commit("setFollowingList", followingList);
      console.log('actions:'+ followingList);
    },
    setUserList({ commit }, userList) {
      commit("setUserList", userList);
      console.log('actions:'+ userList);
    }
  },
  plugins: [createPersistedState()] // この行でvuexに「vuex-persistedstate」を追加

});