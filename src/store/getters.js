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
    doubleCount: state => state.count * 2
    
}