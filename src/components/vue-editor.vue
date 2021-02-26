<template>
  <el-form-item :label="item.label" :prop="field" :key="uniqid">
    <!-- 编辑器 -->
    <vue-editor
      v-if="!isText"
      v-model="formData[field]"
      :id="eleId"
      :editor-toolbar="editorToolbar"
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
        let targets = el.querySelectorAll("pre code");
        for (let i = 0; i < targets.length; i++) {
          targets[i].innerHTML =
            "<ul><li>" +
            targets[i].innerHTML.replace(/\n/g, "\n</li><li>") +
            "\n</li></ul>";
          hljs.highlightBlock(targets[i]);
        }
      },
      // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
      componentUpdated: function (el) {
        let targets = el.querySelectorAll("pre code");
        for (let i = 0; i < targets.length; i++) {
          targets[i].innerHTML =
            "<ul><li>" +
            targets[i].innerHTML.replace(/\n/g, "\n</li><li>") +
            "\n</li></ul>";
          hljs.highlightBlock(targets[i]);
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
/* code 行号样式 */
.hljs ul {
  list-style: decimal;
  margin: 0 0 0 40px !important;
  padding: 0;
}
.hljs li {
  list-style: decimal-leading-zero;
  border-left: 1px solid #111 !important;
  padding: 2px 5px !important;
  margin: 0 !important;
  line-height: 14px;
  width: 100%;
  box-sizing: border-box;
}
.hljs li:nth-of-type(even) {
  background-color: rgba(255, 255, 255, 0.015);
  color: inherit;
}
</style>