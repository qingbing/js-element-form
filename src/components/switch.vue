<template>
  <el-form-item :label="item.label" :key="uniqid" class="text-left">
    <el-switch
      v-model="formData[field]"
      :disabled="isText"
      :activeText="activeText"
      :activeValue="activeValue"
      :inactiveText="inactiveText"
      :inactiveValue="inactiveValue"
    >
    </el-switch>
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
import { isUndefined, isArray, isObject } from "@qingbing/helper";
// 导出
export default {
  extends: Base,
  created() {
    this.activeText = "";
    this.inactiveText = "";
    if (isArray(this.item.options)) {
      this.activeValue = this.item.options[0];
      this.inactiveValue = this.item.options[1];
    } else if (isObject(this.item.options)) {
      this.activeText = this.item.options.active.label;
      this.activeValue = this.item.options.active.value;

      this.inactiveText = this.item.options.inactive.label;
      this.inactiveValue = this.item.options.inactive.value;
    } else {
      this.activeValue = "1";
      this.inactiveValue = "0";
    }
  },
};
</script>