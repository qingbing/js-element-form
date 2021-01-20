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
  <el-form-item v-else :label="item.label" :key="uniqid">
    <el-input
      v-model="formData[field]"
      :placeholder="placeholder"
      :showPassword="showPassword"
      :prefixIcon="prefixIcon"
      :suffixIcon="suffixIcon"
      :clearable="clearable"
      :maxlength="maxlength"
      :minlength="minlength"
      :showWordLimit="showWordLimit"
    ></el-input>
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
import { isUndefined, sprintf } from "@qingbing/helper";
// 导出
export default {
  extends: Base,
  created() {
    if (!this.isText) {
      const placeholder = this.getExtData("placeholder");
      if (isUndefined(placeholder)) {
        this.placeholder = sprintf("请输入 %s", this.item.label);
      } else {
        this.placeholder = placeholder;
      }
      this.showPassword = this.getExtData("showPassword", false);
      this.prefixIcon = this.getExtData("prefixIcon", null);
      this.suffixIcon = this.getExtData("suffixIcon", null);
      this.clearable = this.getExtData("clearable", false);
      this.maxlength = this.getExtData("maxlength", null);
      this.minlength = this.getExtData("minlength", null);
      this.showWordLimit = this.getExtData("showWordLimit", true);
    }
  },
};
</script>