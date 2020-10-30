<template>
<v-container>
  <h2 style="text-align: center">みんなの達成度</h2>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      offset-sm="3"
    >
      <v-card>
        <v-list two-line>
          <template v-for="(item, index) in items.slice(0, 6)" :to="user.link">
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
             <router-link :to="user.link">
              <v-list-item-avatar size="90" >
                <img src="../images/same.jpeg">
              </v-list-item-avatar>
              </router-link>
              <v-list-item-content >
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle v-html="item.subtitle">
                </v-list-item-subtitle>
                <v-list-item-avatar size="50">
                <img src="../images/flower6_25day.png">
              </v-list-item-avatar>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

              <v-btn 
                color="light-green accent-2"
                @click="addNewCard()"
               >フォロー申請</v-btn>
                
              </v-list-item-action>

            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-col>
  </v-row>

  <v-content>
    <router-view/>
  </v-content>

</v-container>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { header: 'たくさんお花を育てているお友達をリスペクトしよう🌱' },
        { 
        title: 'ユーザーA',
        subtitle: '咲かせた花数🌷：10🌸'},
        { divider: true, inset: true },
        { 
        title: 'ユーザーB', subtitle: '咲かせた花数🌷：50🌸'},
        { divider: true, inset: true },
        { title: 'ユーザーC', 
        subtitle: '咲かせた花数🌷：100🌸',
         },
      ],
      user:[
        {name: '詳細' ,icon: 'mdi-account-multiple-outline',link: '/userpage'}
      ]
    }),
  }
</script>