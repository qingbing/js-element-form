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
      clearable
      v-model="formData[field]"
      :placeholder="item.placeholder"
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
    const placeholder = this.getExtData("placeholder");
    if (isUndefined[placeholder]) {
      this.item.placeholder = sprintf("请输入 %s", this.item.label);
    } else {
      this.item.placeholder = placeholder;
    }
  },
};
</script>