<template>
<v-container>
  <h2 style="text-align: center">みんなの達成度</h2>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-card>
        <v-container>
          <v-row>
            <v-col> 
              <v-data-table
                :headers="headers"
                :items="userList"
              >
                <template v-slot:[`item.name`]="{ item }">
                  <router-link :to="{name: 'userpage', params: {name: item.name}}">
                    {{ item.name }}
                  </router-link>
                </template>
                <template>
                  {{ getContinuationDays }}
                </template>
                <template v-slot:[`item.id`]="{ item }">
                  <v-btn
                    color="light-green accent-2"
                    @click="follow(item)"
                  >
                    フォロー申請
                  </v-btn>
                </template> 
              </v-data-table>
            <div>
              <p>COUNT!!! : {{ doubleCount }}</p>
              <v-btn @click="increment(2)">+2</v-btn>
            </div>
            </v-col>
          </v-row> 
    </v-container>
  
        <NyokkiFlower></NyokkiFlower> 
       
          <!-- <v-list two-line>
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
             <router-link to="/userpage">
              <v-list-item-avatar size="90" >
                <img src="../images/same.jpeg">
              </v-list-item-avatar>
              </router-link>
              <v-list-item-content >
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle v-html="item.subtitle">
                </v-list-item-subtitle>
                <v-col></v-col>
                <v-col>
                <v-list-item-avatar size="100">
                <NyokkiFlower></NyokkiFlower>
              </v-list-item-avatar>
                </v-col>
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
        </v-list>    -->

      </v-card>
    </v-col>
  </v-row>
</v-container> 
</template>

<script>
import NyokkiFlower from '../components/NyokkiFlower.vue';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
//import { mapActions } from 'vuex';

  export default {
    components:{
      NyokkiFlower
    },
    props: {
      name: String
    },
    computed: {
      ...mapGetters(["doubleCount","getContinuationDays"]),
      userList(){
          return this.$store.state.userList
      },
      getContinuationDays(){
        return this.$store.getters.getContinuationDays;
      },
      getUserInfomation (){
        return this.$store.getters.getUserInfomation;
      }
      // doubleCount(){
      //   return this.$store.getters.doubleCount;
      // }
    }
    ,
    methods: {
      // increment(){
      //   this.$store.commit('increment',10);
      // }
      ...mapMutations(["increment"]),
      increment(){
        this.$store.dispatch("increment",2);
      },
      //...mapActions(["increment"])
      follow(item){
        console.log("フォローボタンをクリック！"+JSON.stringify(item.id));

        alert("フォロー申請を送ります")
      }
    },
    data: () => ({
      headers: [
        {
          text: 'ユーザー名',
          value: 'name'
        }, 
        {
          text: '咲かせた花数🌷',
          value: 'continuationDays' 
        },
        {
          text: 'フォロー',
          value: 'id'
        }
        
      ],
      items: [

       { header: 'たくさんお花を育てているお友達をリスペクトしよう🌱' },
        { 
          title: 'ユーザーA',
          subtitle: '咲かせた花数🌷：10🌸'
        },
        { divider: true, inset: true },
        { 
          title:  'ユーザーB', 
          subtitle: '咲かせた花数🌷：50🌸'
        },
        { divider: true, inset: true },
        { 
          title: 'ユーザーC', 
          subtitle: '咲かせた花数🌷：100🌸',
        },
      ],
      user:[
        {name: '詳細' ,icon: 'mdi-account-multiple-outline',link: 'userpage'}
      ]
    })
  }
</script>