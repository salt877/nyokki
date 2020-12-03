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

        <v-form
       ref="form"
        v-model="valid"
       >
        <v-text-field
          v-model="newName"
          placeholder="新しい名前"
          :rules="[rules.required, rules.newName]"
          name="newName"
          type="text"
          required
          >
        </v-text-field> 
       
        <v-btn
              color="primary"
              @click="updateUserName"
             :disabled="!valid"
              >名前変更
         </v-btn>
        </v-form>
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

  

</v-container>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';
import {mapActions} from 'vuex';
import axios from "axios";
// import {extend, ValidationProvider, ValidationObserver } from 'vee-validate';
import { required} from 'vee-validate/dist/rules';

required.message = '必須項目です';



export default {
  name:'ProfileChange',
  components:{
    // ValidationProvider,
    // ValidationObserver
  },
  props: {
    value2: String
  },
  data() {
    return {
      valid: true,
      msg: "",
      newName:'',
      input_image: null,
      uploadImageUrl: '',
      rules:{
        required: (value) => !!value || '変更したい名前を入力してください',
        newName: (value) => {
         return value.length <= 10 || "10文字以内で入力してください";
      },
      }
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
      const result = this.$refs.form.validate();
      console.log('名前変更', result);

      axios.post("/get/updateUserName", {loginUser : this.$store.state.loginUser, name: this.newName})
      .then((res) => {
          this.setLoginUser(res.data);
          alert("編集完了");
          this.newName = '';
        })
        .catch((error) => {
          alert("編集失敗");
          console.log("編集失敗" + error);
//         });
// }
  });
    },

    updateName: function() {
      this.$emit("input", this.newName);
    },


     onClickButton: function() {
      this.$emit("input", this.msg);
    },


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