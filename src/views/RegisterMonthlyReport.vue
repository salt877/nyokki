<template>
    <v-container>
        <h2>月報登録</h2>
         <v-row>
            <v-col>
                <v-card>
                    <v-card-title>今月の目標</v-card-title>
                    <v-card-text
                        v-for="tmGoal in thisMonthsGoals"
                        :key="tmGoal"
                    >
                        {{ tmGoal }}
                    </v-card-text>
                </v-card>
            </v-col>
         </v-row>
         <v-row>
            <v-col>
                <v-card>
                    <v-card-title>所感</v-card-title>
                    <v-textarea
                        class="mt-0"
                        auto-grow
                        rows="3"
                        value=""
                        placeholder="今月の振り返りをしよう！"
                    >
                    </v-textarea>
                    <v-card-actions>
                        <v-btn
                            color="warning"
                            @click="copyImpressions()"
                            >コピー
                        </v-btn>
                    </v-card-actions>
                </v-card> 
            </v-col>
         </v-row>  
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>来月の目標</v-card-title>
                    <v-card-text
                        v-for=" nmGoal in nextMonthsGoals"
                        :key="nmGoal">
                        {{ nmGoal }}
                    </v-card-text>
                    <v-text-field 
                        placeholder="来月の目標は？"
                        v-model="inputNextMonthsGoals"
                        >
                    </v-text-field> 
                    <v-card-actions>
                        <v-btn
                            color="primary"
                            @click="addNextMonthsTarget()"
                        >
                        追加
                        </v-btn>
                    </v-card-actions>
                </v-card>  
            </v-col>
        </v-row>
        <v-row>
            <v-btn
                class="save-button"
                color="error"
                @click="saveMonthlyReport"
            >保存する
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    name: "RegisterMonthlyReport",
    data() {
        return {
            thisMonthsGoals:[
                '目標1',
                '目標2'
            ],
            inputNextMonthsGoals: '',
            nextMonthsGoals: [
                '来月の目標1',
                '来月の目標2' 
            ]
        }
    },
    methods: {
        addNextMonthsTarget: function(){
            const newMonthsGoals = this.inputNextMonthsGoals;
            if (!newMonthsGoals){
                return ;
            }
            this.nextMonthsGoals.push(newMonthsGoals);
            this.inputNextMonthsGoals = '';
        }
    }
  };
</script>

<style scoped>
.container {
    text-align: center;
}
.v-input {
    width: 90%;
    margin: auto;
}
.v-btn {
    margin: 0 0 0 auto;
}
.save-button {
    margin: 3em auto;
}
</style>