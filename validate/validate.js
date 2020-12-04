import Vue from "vue";
// Vee-validateのインポート
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";
import { email, max, max_value, min_value, numeric, required, oneOf, regex } from "vee-validate/dist/rules";

setInteractionMode("eager");
extend("regex", regex);

extend("required", {
  validate(value) {
    return {
      required: true,
      valid: ["", undefined, null].indexOf(value) === -1,
    };
  },
  computesRequired: true,
  message: "入力は必須です",
});

extend("selectSkill", {
  ...required,
  message: "技術は最低１つ選択してください",
});

extend("max", {
  ...max,
  message: "300文字以内で記入してください",
});

extend("email", {
  ...email,
  message: "メールアドレスの形式が異なります",
});

extend("password", {
  ...regex,
  message: "パスワードには英半角子文字、英半角大文字、半角数字を必ず含み、8文字以上20文字以内で設定してください",
});

// ユーザ登録に使うvalidation
extend("regex", regex);
extend("userName", {
  ...required,
  ...regex,
  message: "全角で入力してください。",
});

extend("nearestStation", {
  ...regex,
  message: "全角で入力してください。",
});

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
