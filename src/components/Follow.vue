<template>
<v-container>
  <h2 style="text-align: center">フォローしている人</h2>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      offset-sm="3"
    >
      <v-card>
        <v-list two-line>
          <template v-for="(item, index) in items.slice(0, 6)">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>
            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>
            <v-list-item
              v-else
              :key="item.title"
            >
              <v-list-item-avatar size="90">
                <img src="../images/same.jpeg">
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle v-html="item.subtitle">
                </v-list-item-subtitle>
                <v-list-item-avatar size="50">
                <img src="../images/flower4_15day.png">
              </v-list-item-avatar>
              </v-list-item-content>


              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

              <v-btn 
                color="pink lighten-4"
                @click="addNewCard()"
               >フォロー解除😇</v-btn>
                
              </v-list-item-action>

            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-col>
  </v-row>

</v-container>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { header: '養分を吸収しよう🌱' },
        { 
        title: 'ユーザーD',
        subtitle: '咲かせた花数🌷：10🌸'},
        { divider: true, inset: true },
        { 
        title: 'ユーザーE', subtitle: '咲かせた花数🌷：50🌸'},
        { divider: true, inset: true },
        { title: 'ユーザーF', 
        subtitle: '咲かせた花数🌷：100🌸',
         },
      ],
    }),
  }
</script>