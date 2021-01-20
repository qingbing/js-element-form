<template>
  <!-- 表单显示 -->
  <el-form-item
    v-if="isText"
    :label="item.label"
    :key="uniqid"
    :style="{ textAlign: labelAlgin }"
  >
    {{ formData[field] }}
  </el-form-item>

  <!-- 表单组件 -->
  <el-form-item v-else :label="item.label" :key="uniqid" class="text-left">
    <el-autocomplete
      v-model="formData[field]"
      :placeholder="placeholder"
      :prefixIcon="prefixIcon"
      :suffixIcon="suffixIcon"
      :clearable="clearable"
      :fetch-suggestions="fetchSuggestions"
      @select="handleSelect"
    ></el-autocomplete>
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
import { isDev, isUndefined, isFunction, sprintf } from "@qingbing/helper";
// 导出
export default {
  extends: Base,
  created() {
    if (!this.isText) {
      // 提示信息
      const placeholder = this.getExtData("placeholder");
      if (isUndefined(placeholder)) {
        this.placeholder = sprintf("请输入 %s", this.item.label);
      } else {
        this.placeholder = placeholder;
      }

      this.prefixIcon = this.getExtData("prefixIcon", null); // 输入框头部图标
      this.suffixIcon = this.getExtData("suffixIcon", null); // 输入框尾部图标
      this.clearable = this.getExtData("clearable", false); // 可清空
      // 选择后执行函数
      const handleSelect = this.getExtData("handleSelect");
      if (isFunction(handleSelect)) {
        this.handleSelect = handleSelect;
      } else {
        this.handleSelect = this.customHandleSelect;
      }
      // 远程输入
      const fetchSuggestions = this.getExtData("fetchSuggestions");
      if (isFunction(fetchSuggestions)) {
        this.fetchSuggestions = fetchSuggestions;
      } else {
        const fetchUrl = this.getExtData("fetchUrl");
        if (isUndefined(fetchUrl)) {
          this.fetchSuggestions = () => {};
          throw new Error("auto-complete组件缺少必要查询参数");
        } else {
          this.beforeFetch = this.getExtData("beforeFetch");
          this.fetchUrl = fetchUrl;
          this.fetchData = this.getExtData("fetchData", {});
          this.fetchSuggestions = this.customFetchSuggestions;
        }
      }
    }
  },
  methods: {
    customHandleSelect(item) {
      if (isDev()) {
        console.log(item);
      }
    },
    customFetchSuggestions(queryString, callback) {
      callback([
        { value: "三全鲜食1", address: "长宁区新渔路1" },
        { value: "三全鲜食2", address: "长宁区新渔路2" },
        { value: "三全鲜食3", address: "长宁区新渔路2" },
      ]);
    },
  },
};
</script>