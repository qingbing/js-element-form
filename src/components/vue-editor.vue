<template>
  <el-form-item :label="item.label" :prop="field" :key="uniqid">
    <!-- 编辑器 -->
    <vue-editor
      v-if="!isText"
      v-model="formData[field]"
      :id="eleId"
      :editor-toolbar="editorToolbar"
      v-light
    ></vue-editor>

    <!-- 视图显示 -->
    <div v-else v-html="formData[field]" v-light></div>
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
import { VueEditor } from "vue2-editor";
import { uniqid } from "@qingbing/helper";
// 代码高亮
import hljs from "highlight.js";
import "highlight.js/styles/tomorrow-night.css";
// 导出
export default {
  extends: Base,
  directives: {
    light: {
      // 被绑定元素插入父节点时调用
      inserted: function (el) {
        let blocks = el.querySelectorAll("pre code");
        for (let i = 0; i < blocks.length; i++) {
          hljs.highlightBlock(blocks[i]);
        }
      },
      // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
      componentUpdated: function (el) {
        let blocks = el.querySelectorAll("pre code");
        for (let i = 0; i < blocks.length; i++) {
          hljs.highlightBlock(blocks[i]);
        }
      },
    },
  },
  created() {
    if (!this.isText) {
      let editorToolbar = [
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
        { list: "ordered" },
        { list: "bullet" },
        { script: "sub" },
        { script: "super" },
      ];
      if (this.getExtData("needCode")) {
        editorToolbar.push("code-block");
      }
      if (this.getExtData("needImage")) {
        editorToolbar.push("image");
      }
      if (this.getExtData("needVideo")) {
        editorToolbar.push("video");
      }
      editorToolbar.push("link");
      editorToolbar.push("clean");
      this.editorToolbar = editorToolbar;
      this.eleId = this.getExtData("id", uniqid());
    }
  },
  components: {
    VueEditor,
  },
};
</script>

<style>
/* 将菜单项左对齐 */
.quillWrapper .ql-snow.ql-toolbar {
  text-align: left;
}
</style>