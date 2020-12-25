<template>
  <v-container>
    <v-col>
       <v-row>
         <img :src="flowerImage">
       </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  props:{
    flowerStatus: Number
  },
  computed: {
    //花の状態を表示
    flowerImage(){
      let image;
      let flowerState = this.flowerStatus;
      if(0 <= flowerState && flowerState <= 4){
        image = require("../images/flower1_0day.png");
      } else if(5 <= flowerState && flowerState <= 9){
        image = require("../images/flower2_5day.png");
      } else if(10 <= flowerState && flowerState <= 14){
        image = require("../images/flower3_10day.png");
      } else if(15 <= flowerState && flowerState <= 19){
        image = require("../images/flower4_15day.png");
      } else if(20 <= flowerState && flowerState <= 24){
        image = require("../images/flower5_20day.png");
      } else if(25 <= flowerState && flowerState <= 29) {
        image = require("../images/flower6_25day.png");
      } else if(flowerState == 30){
        image = require("../images/flower7_30day.png");
      } else if (flowerState == 31){
        image = require("../images/flower8_31day.png");
      }

      return image;
    }
  }
}
</script>