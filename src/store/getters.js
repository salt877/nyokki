export default {
    
    count:function(state){
      return state.count;
    },
    
    getContinuationDays(state) {

        let continuationDays;

        for(var i= 0; i< state.userList.length; i++){
            
            let user = state.userList[i];
            console.log("継続日数:"+user.continuationDays);
            const flowerCount = user.continuationDays / 32;

            console.log("flowerCount:"+flowerCount);
            console.log("小数点を切り捨て"+Math.floor(flowerCount));

            if(flowerCount < 1){
                user.continuationDays = 0;
                console.log("花の数が1本未満なら0と表示");
            } else if (flowerCount >= 1){
                console.log("花の数が1本以上");
                user.continuationDays = Math.floor(flowerCount);
            }

            console.log("中身が変わってるか確認" +user.continuationDays);
            continuationDays = user.continuationDays;
        }

        return continuationDays;
    
    },
    doubleCount: state => state.count * 2,

    getFollowList(state){
        console.log("gettersのgetFollowListが呼ばれた、ログインユーザのID:"+state.loginUser.id);
        console.log("gettersのgetFollowListが呼ばれた、followingId:"+state.followingList.followingId)
        return state.followingList;         
    }

    }

     
