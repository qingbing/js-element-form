<template>
  <!-- 表单显示 -->
  <el-form-item
    v-if="type == 'text'"
    :label="item.label"
    :key="uniqid"
    :style="{ textAlign: labelAlgin }"
  >
    {{ viewText }}
  </el-form-item>

  <!-- 表单组件 -->
  <el-form-item v-else :label="item.label" :key="uniqid" class="text-left">
    <el-switch
      v-model="formData[field]"
      :disabled="type == 'view'"
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
import { isArray, isObject } from "@qingbing/helper";
// 导出
export default {
  extends: Base,
  created() {
    // 计算 activeText、inactiveText、activeValue、inactiveValue
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
    // 计算 type、 viewText
    if (!this.isText) {
      this.type = "form";
    } else if (this.activeText && this.inactiveText) {
      this.type = "text";
      if ((this.formData[this.field], this.activeValue)) {
        this.viewText = this.activeText;
      } else {
        this.viewText = this.inactiveText;
      }
    } else {
      this.type = "view";
    }
  },
};
</script>