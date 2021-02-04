export default {
  count: function(state) {
    return state.count;
  },
  // nippos:function(state){
  //     return state.nippos;
  // },

  getDailyReportList(state){
    return state.dailyReportList;
  },
  getContinuationDays(state) {
    let continuationDays;

    for (var i = 0; i < state.userList.length; i++) {
      let user = state.userList[i];
      console.log("継続日数:" + user.continuationDays);
      const flowerCount = user.continuationDays / 32;

      console.log("flowerCount:" + flowerCount);
      console.log("小数点を切り捨て" + Math.floor(flowerCount));

      if (flowerCount < 1) {
        user.continuationDays = 0;
        console.log("花の数が1本未満なら0と表示");
      } else if (flowerCount >= 1) {
        console.log("花の数が1本以上");
        user.continuationDays = Math.floor(flowerCount);
      }

      console.log("中身が変わってるか確認" + user.continuationDays);
      continuationDays = user.continuationDays;
    }

    return continuationDays;
  },

  //名前変更に関すること
  name: (state) => state.loginUser.name,

  //フォロー人数に関すること
  followingLength(state) {
    //自分がフォローしている人数
    var followingLength;
    var followingLengthList = [];

    for (var number in state.followingList) {
      for (var key in state.followingList[number]) {
        if (key === "followingId") {
          // ログインユーザーのIDが１のとき
          if (state.followingList[number][key] === 1) {
            followingLengthList.push(state.followingList[number][key]);
          }
        }
      }
    }
    console.log("フォロー" + followingLengthList.length);

    followingLength = followingLengthList.length;
    return followingLength;
  },

  //フォロワー人数に関すること
  followedLength(state) {
    //自分がフォローされている人数
    var followedLength;
    var followedLengthList = [];

    for (var number2 in state.followingList) {
      for (var key2 in state.followingList[number2]) {
        if (key2 === "followedId") {
          // ログインユーザーのIDが１のとき
          if (state.followingList[number2][key2] === 1) {
            followedLengthList.push(state.followingList[number2][key2]);
          }
        }
      }
    }
    console.log(" フォロワー" + followedLengthList.length);

    followedLength = followedLengthList.length;
    return followedLength;
  },

  //データ確認用
  doubleCount(state) {
    console.log("gettersが呼ばれた");
    return state.count * 2;

    // doubleCount:state => state.count * 2
  },
  getFollowList(state) {
    return state.followingList;
  },
  //ログインユーザーの花の数を取得
  getFlowerCount(state) {
    let flowerCount = state.loginUser.continuationDays / 32;
    if (flowerCount < 1) {
      flowerCount = 0;
    } else if (flowerCount >= 1) {
      flowerCount = Math.floor(flowerCount);
    }
    return flowerCount;
  },
  //ログインユーザーの花の状態を取得
  getFlowerStatus(state) {
    let flowerStatus = state.loginUser.continuationDays % 32;
    return flowerStatus;
  },
  //ログインユーザーの今月の目標を取得
  getThisMonthObjective(state) {
    if (state.thisMonthObjective === null) {
      return "今月の目標を登録しよう！";
    } else if (state.ThisMonthObjective !== null) {
      return state.thisMonthObjective.objective;
    }
  },
  //ログインユーザーの今月の達成度を取得
  //よくできたの数を取得
  getLevelAchivementYokudekita(state) {
    var yokudekita = 0;
    state.dailyReportList.forEach((dailyReport) => {
      if (dailyReport.levelAchievementlevelAchievement == 3) {
        console.log("達成度が3です");
        yokudekita++;
      }
    });
    console.log("よくできたの数" + yokudekita);
    return yokudekita;
  },
  //まあまあできたの数を取得
  getLevelAchivementMaamaadekita(state) {
    var maamaadekita = 0;
    state.dailyReportList.forEach((dailyReport) => {
      if (dailyReport.levelAchievementlevelAchievement == 2) {
        console.log("達成度が2です");
        maamaadekita++;
      }
    });
    console.log("まあまあできたの数" + maamaadekita);
    return maamaadekita;
  },
  //できなかったの数を取得
  getLevelAchivementDekinakatta(state) {
    var dekinakatta = 0;
    state.dailyReportList.forEach((dailyReport) => {
      if (dailyReport.levelAchievementlevelAchievement == 1) {
        console.log("達成度が1です");
        dekinakatta++;
      }
    });
    console.log("できなかったの数" + dekinakatta);
    return dekinakatta;
  },
};
