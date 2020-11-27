export default {

  //名前変更に関すること
  name: state => state.loginUser.name,

  //フォロー人数に関すること
  followingLength(state) {
    //自分がフォローしている人数
    var followingLength;
    var followingLengthList = [];

    for( var number in state.followingList) {
      for(var key in state.followingList[number]){
        if(key === 'followingId'){

          // ログインユーザーのIDが１のとき
          if(state.followingList[number][key] === 1){
            followingLengthList.push(state.followingList[number][key])
          }
        }
      }
    }
    console.log('フォロー'+ followingLengthList.length);

    followingLength = followingLengthList.length;
    return followingLength;
  },

  //フォロワー人数に関すること
  followedLength(state) {
  //自分がフォローされている人数
    var followedLength;
    var followedLengthList = [];

    for( var number2 in state.followingList) {
      for(var key2 in state.followingList[number2]){
          if(key2 === 'followedId'){
        // ログインユーザーのIDが１のとき
          if(state.followingList[number2][key2] === 1){
            followedLengthList.push(state.followingList[number2][key2])
          }
        }
      }
    }
    console.log(' フォロワー' + followedLengthList.length);

    followedLength = followedLengthList.length;
    return followedLength;
  },



  //データ確認用
  doubleCount(state){
          console.log('gettersが呼ばれた')
          return state.count * 2

  // doubleCount:state => state.count * 2
  },






}