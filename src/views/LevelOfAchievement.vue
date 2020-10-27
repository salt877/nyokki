<template>

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
              <v-list-item-avatar>
                <img src="../images/same.jpeg">
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle v-html="item.subtitle">
                </v-list-item-subtitle>
              </v-list-item-content>


 <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                >
                  mdi-star-outline
                </v-icon>

                <v-icon
                  v-else
                  color="yellow darken-3"
                >
                  mdi-star
                </v-icon>
              </v-list-item-action>



            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-col>
  </v-row>

  
</template>

<script>
  export default {
    data: () => ({
      items: [
        { header: 'みんなの達成度一覧' },
        { 
        title: 'ユーザーA',
        subtitle: 'トータルの花の数'},
        { divider: true, inset: true },
        { 
        title: 'ユーザーB', subtitle: 'トータルの花の数'},
        { divider: true, inset: true },
        { title: 'ユーザーC', 
        subtitle: 'トータルの花の数' },
      ],
    }),
  }
</script>