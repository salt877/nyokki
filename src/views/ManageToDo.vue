<template>
      <v-container>
        <h2>ToDo管理</h2>
        <h3>達成率：○○％</h3>
        <div id="box1" class="box">
            <draggable tag="ul" :options="{group:'ITEMS'}">
                <li v-for="incomplete in incompletes" :key="incomplete.no">{{ incomplete.name }} </li>    
            </draggable>
        </div>
        <div id="box2" class="box">
            <draggable tag="ul" :options="{group:'ITEMS'}">
                <li v-for="complete in completes" :key="complete.no">{{ complete.name }} </li>    
            </draggable>
        </div>
      </v-container>
</template>

<script>
import draggable from 'vuedraggable';

  export default {
    name: "ManageToDo", 
    components: {
        draggable
    },
    data() {
        return {
            incompletes: [
                { no:1 , name: 'ToDoの移動ができる1' },
                { no:2 , name: 'ToDoの移動ができる2' },
                { no:3 , name: 'ToDoの移動ができる3' }
            ],
             completes: [
                { no:4 , name: 'ToDoの移動ができる4'},
                { no:5 , name: 'ToDoの移動ができる5' },
                { no:6 , name: 'ToDoの移動ができる6' }
            ]
        }
    }
  };
</script>

<style scoped>
h2 {
    text-align: center;
}
h3 {
    text-align: right;
    margin-right: 5%;
}
.box {
    width: 49%;
    float: left;
    border-radius: 1em;
    padding: 2em;
    position: relative;
    margin: 5em 0em;
}
#box1 {
    border: 0.3em solid rgb(255, 123, 123);
    margin-right: 1%; 
}
#box2 {
    border: 0.3em solid rgb(142, 159, 255);
    margin-left: 1%;
}

#box1::before {
    background-color: #fff;
    color: #333;
    content: "未完了";
    font-weight: bold;
    font-size: 1.6em;
    padding: 0px 10px;
    position: absolute;
    top: -0.8em;
    left: 44%;
}
#box2::before {
    background-color: #fff;
    color: #333;
    content: "完了";
    font-weight: bold;
    font-size: 1.6em;
    padding: 0px 10px;
    position: absolute;
    top: -0.8em;
    right: 42%;
}
ul {
    padding: 0px 0px;
    list-style-type: none;
}
li {
    cursor:pointer;
    padding: 10px;
    border: solid #ddd 1px;
}
</style>