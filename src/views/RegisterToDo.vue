<template>
    <v-container>
        <h2>ToDo登録</h2>
        <v-row>
            <v-col>
                <v-text-field 
                    placeholder="今日のToDoを追加しよう！"
                    v-model="toDoCard"
                    >
                </v-text-field> 
                <v-btn
                    color="primary"
                    @click="addToDoCard()"
                >追加
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
            <v-card-title>
                今日のToDo
            </v-card-title>
            <v-card-text 
                v-for="todo in todos" 
                :key="todo" 
            >
                {{todo.text}}
                 <v-btn
                    elevation="2"
                    fab
                    x-small
                    color="gray"
                >  
                    <v-icon>
                        mdi-minus
                    </v-icon>
                </v-btn>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="warning"
                    @click="copyToDo"
                 >コピー
                 </v-btn>
                 <v-btn
                    color="error"
                    @click="saveToDo"
                 >保存
                </v-btn>
            </v-card-actions>
            </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    name: "RegisterToDo",
    data(){
        return {
            toDoCard: '',
            todos:[
                { text: 'ここにToDoが追加される1' },
                { text: 'ここにToDoが追加される2' },
                { text: 'ここにToDoが追加される3' }
            ]
        }
    },
    methods: {
        addToDoCard: function(){
            const newToDoCard = this.toDoCard;
            if (!newToDoCard){
                return ;
            }
            this.todos.push({
                text: newToDoCard
            });
            this.toDoCard = '';
        }
    }
  };
</script>
<style scoped>
.container {
    text-align: center;
}
.row {
    align-content: center;
    margin: 5em 0em;
}
.v-input, .v-card{
    max-width: 80%;
    margin: 0 auto;
}
.v-btn--fab.v-size--x-small {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 1rem;
}

</style>