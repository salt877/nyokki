<template>

<v-container>
  <h2>プロフィール変更</h2>
  <v-row>
      <v-col>
      </v-col>
      <v-col >
        <v-avatar size="150" >
         <img src="../images/same.jpeg">
        </v-avatar>
      </v-col>
      <v-col>
        
        <v-card-actions>
        <v-text-field
          v-model="newName"
          placeholder="新しい名前"
          >
        </v-text-field> 
        <v-spacer></v-spacer>
        <v-btn
              color="primary"
              @click="updateName"
              >名前変更
         </v-btn>
        </v-card-actions>
        <v-card-actions>
        <v-text>新しいユーザー名：{{newName}}</v-text>
        </v-card-actions>
        <v-card-actions>
        <v-text>現在のユーザー名：{{this.$store.state.loginUser.name}}</v-text>
        </v-card-actions>
      </v-col>
      <v-col>
      </v-col>
    </v-row>

    <v-row justify="center">
    <v-col sm="12" md="11" lg="9" xl="6">
      <v-sheet class="pa-3">
        <v-form ref="form">
          <img v-if="uploadImageUrl" :src="uploadImageUrl" />
          <v-file-input
            v-model="input_image"
            accept="image/*"
            show-size
            label="画像ファイルをアップロードしてください"
            prepend-icon="mdi-image"
            @change="onImagePicked"
          ></v-file-input>
        </v-form>
      </v-sheet>
    </v-col>
  </v-row>
<v-row justify="center">
      <v-btn
        class="save-button"
        color="error"
        @click="updateUserName"
        >変更を保存する
      </v-btn> 
    </v-row>

    <!-- <div class="child">
    <label>
      果物:
      <input v-model="msg">
    </label>
    <div>
      <button @click="onClickButton">反映↓</button>
    </div>
  </div> -->


</v-container>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';
import {mapActions} from 'vuex';
import axios from "axios";

export default {
  name:'ProfileChange',
  props: {
    value2: String
  },
  data() {
    return {
      msg: "",
      newName:'',
      input_image: null,
      uploadImageUrl: ''
   }
  },
  computed:{
    ...mapGetters(["updateName"]),
    // updateName2: {
    //   get() {
    //    return this.$store.getters.name;
    //   },
    //   set(value) {
    //    this.$store.dispatch("updateName", value);
    //   }
    // },
    
  },
  methods: {
    ...mapMutations(['updateName']),
    ...mapActions(['setLoginUser','updateName']),

    onImagePicked(file) {
      if (file !== undefined && file !== null) {
        if (file.name.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.uploadImageUrl = fr.result
        })
      } else {
        this.uploadImageUrl = ''
      }
    },

    // updateName(){
    //   this.name = this.$store.state.loginUser.name;
    // },
    // updateName2() {
    //   this.updateName2(this.newName);
    // },

    updateUserName(){
      axios.post("/get/updateUserName", {loginUser : this.$store.state.loginUser, name: this.newName})
      .then((res) => {
          this.setLoginUser(res.data);
          alert("編集完了");
          this.newName = '';
        })
        .catch((error) => {
          alert("編集失敗");
          console.log("編集失敗" + error);
        });

    },

    updateName: function() {
      this.$emit("input", this.newName);
    },


     onClickButton: function() {
      this.$emit("input", this.msg);
    }

  },
  watch: {
    value: function(newValue) {
      this.msg = newValue;
    },
    value2: function(newValue2) {
      this.newName = newValue2;
    }
  }
}
</script>_