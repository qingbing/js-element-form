<template>
  <el-form-item :label="item.label" :prop="field" :key="uniqid">
    <vue-json-editor
      v-model="formData[field]"
      :expandedOnStart="true"
      :showBtns="false"
      :mode="mode"
      :modes="modes"
      @json-change="onJsonChange"
      @has-error="onError"
    />
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
import VueJsonEditor from "vue-json-editor";
// 导出
export default {
  extends: Base,
  created() {
    if (!this.isText) {
      this.mode = this.getExtData("mode", "code");
      this.modes = this.getExtData("mode", []);

      const rule = {
        type: "callback",
        callback: this.isValidJson,
        trigger: "change",
      };
      this.callbackRule(rule);
    } else {
      this.mode = "view";
      this.modes = [];
    }
  },
  data() {
    return {
      isJson: true,
      errMsg: "",
    };
  },
  components: {
    VueJsonEditor,
  },
  methods: {
    onJsonChange(value) {
      this.isJson = true;
      this.errMsg = "";
    },
    onError(err) {
      this.isJson = false;
      this.errMsg = err.message;
    },
    isValidJson(data, formData) {
      if (!this.isJson) {
        return this.errMsg;
      }
    },
  },
};
</script>

<style>
/* jsoneditor右上角默认有一个链接,加css去掉了 */
div.jsoneditor-menu .jsoneditor-poweredBy {
  display: none;
}
.ace_scroller {
  text-align: left;
}
</style>