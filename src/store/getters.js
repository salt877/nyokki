export default {
    
    count:function(state){
      return state.count;
    },

    getContinuationDays(state) {
  


        console.log(state);
        
        for(var i= 0; i< state.userList.length; i++){
            
            console.log("継続日数:"+state.userList[i].continuationDays);
            const flowerCount = state.userList[i].continuationDays / 32;

            console.log("flowerCount:"+flowerCount);
            console.log("小数点を切り捨て"+Math.floor(flowerCount));

            if(flowerCount < 1){
                state.userList[i].continuationDays = 0;
                console.log("花の数が1本未満なら0と表示");
            } else if (flowerCount >= 1){
                console.log("花の数が1本以上");
                state.userList[i].continuationDays = Math.floor(flowerCount);
            }

            console.log("中身が変わってるか確認" +state.userList[i].continuationDays);
        }

        return state.userList;
    
    },

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




    // doubleCount: state => state.count * 2
    
}