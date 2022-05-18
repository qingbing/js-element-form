<template>
  <el-form-item :label="item.label" :prop="field" :key="uniqid">
    <!-- 编辑器 -->
    <vue-editor
      v-if="!isText"
      v-model="formData[field]"
      :id="eleId"
      :placeholder="item.placeholder"
      :toolbarMode="toolbarMode"
      :editorToolbar="editorToolbar"
      :editorOptions="editorOptions"
      :useSource="useSource"
      :useImageUrl="useImageUrl"
      :useImageHandle="useImageHandle"
      :useMarkdownShortcuts="useMarkdownShortcuts"
      @image-added="handleImageAdded"
    ></vue-editor>

    <!-- 视图显示 -->
    <div v-else v-html="formData[field]" v-light></div>
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
import { uniqid, dump, isFunction } from "@qingbing/helper";
import VueEditor from "@qingbing/vue2-editor";
// 代码高亮
import hljs from "highlight.js";
import "highlight.js/styles/tomorrow-night.css";
let _VUE_SELF;
// 导出
export default {
  extends: Base,
  directives: {
    light: {
      // 被绑定元素插入父节点时调用
      inserted: function (el) {
        let targets = el.querySelectorAll("pre code");
        for (let i = 0; i < targets.length; i++) {
          targets[i].innerHTML = "<ul><li>" + targets[i].innerHTML.replace(/\n/g, "\n</li><li>") + "\n</li></ul>";
          hljs.highlightBlock(targets[i]);
        }
      },
      // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
      componentUpdated: function (el) {
        let targets = el.querySelectorAll("pre code");
        for (let i = 0; i < targets.length; i++) {
          targets[i].innerHTML = "<ul><li>" + targets[i].innerHTML.replace(/\n/g, "\n</li><li>") + "\n</li></ul>";
          hljs.highlightBlock(targets[i]);
        }
      },
    },
  },
  created() {
    if (!this.isText) {
      this.toolbarMode = this.getExtData("toolbarMode", "common");
      this.editorToolbar = this.getExtData("editorToolbar", []);
      this.editorOptions = this.getExtData("editorOptions", {});
      this.useSource = this.getExtData("useSource", false); // 开启源码工具按钮
      this.useImageUrl = this.getExtData("useImageUrl", true); // 图片使用url输入模式
      this.useImageHandle = this.getExtData("useImageHandle", false); // 开启图片上传
      this.useMarkdownShortcuts = this.getExtData("useMarkdownShortcuts", false); // 使用markdown快捷模式
      this.eleId = this.getExtData("id", uniqid());
      // 图片上传方法
      this.imgAddedHandle = this.getExtData("imgAdded", false);
      _VUE_SELF = this;
    }
  },
  components: {
    VueEditor,
  },
  methods:{
    handleImageAdded:(file, Editor, cursorLocation, resetUploader) => {
      if(isFunction(_VUE_SELF.imgAddedHandle)){
        _VUE_SELF.imgAddedHandle(file, Editor, cursorLocation, resetUploader);
      }else{
        dump.error("element-form组件参数中vue-eidtor未设置图片上传方法");
      }
    }
  }
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