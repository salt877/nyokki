<template>
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
}
</script>