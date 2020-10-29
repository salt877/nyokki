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
      <v-text>
        サメ
      </v-text>
      </v-col>
      <v-col>
        
        <v-card-actions>
        <v-text-field 
          placeholder="新しい名前"
          >
        </v-text-field> 
        <v-spacer></v-spacer>
        <v-btn
              color="primary"
              @click="changeName()"
              >名前変更
         </v-btn>
        </v-card-actions>
        <v-card-actions>
        <v-text>ユーザー名：サメ</v-text>
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
        @click="saveMonthlyReport"
        >変更を保存する
      </v-btn> 
    </v-row>
  

</v-container>
</template>

<script>
export default {
  data() {
    return {
      input_image: null,
      uploadImageUrl: ''
    }
  },
  methods: {
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
    }
  }
}
</script>