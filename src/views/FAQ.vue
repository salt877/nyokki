<template>
  <div style="text-align: center">
  <h2>FAQ</h2>
  
 <v-container>
   <v-spacer></v-spacer>
  <v-expansion-panels focusable justify="center" align-content="center">
    <v-expansion-panel
      v-for="(item,i) in 5"
      :key="i"
      height="300"
      width="300"
    >
      <v-expansion-panel-header class="lime lighten-4">質問</v-expansion-panel-header>
      <v-expansion-panel-content>
        回答
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
 </v-container>

</div>
</template>

<script>
  export default {
    name: "FAQ"
  };
</script>