<template>
  <v-container>
    <v-col>
      {{ this.testData }}
      {{ flowerStatus }}
        <!-- <v-row>
         <v-img src="../images/flower.png"></v-img>
      </v-row>
      <v-row>
         <v-img src="../images/flower8_31day.png"></v-img>
      </v-row>
       <v-row>
         <v-img src="../images/flower7_30day.png"></v-img>
      </v-row>
       <v-row>
         <v-img src="../images/flower6_25day.png"></v-img>
      </v-row>
       <v-row>
         <v-img src="../images/flower5_20day.png"></v-img>
      </v-row>
      <v-row>
         <v-img src="../images/flower4_15day.png"></v-img>
      </v-row>
      <v-row>
         <v-img src="../images/flower3_10day.png"></v-img>
      </v-row>
       <v-row>
         <v-img src="../images/flower2_5day.png"></v-img>
      </v-row>
       <v-row>
         <v-img src="../images/flower1_0day.png"></v-img>
      </v-row>  -->
    </v-col>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    flowerStatus: 50,
    testData: 20
  }),
  props:{
    testData : Number
  }
}
</script>