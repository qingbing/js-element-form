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
  <el-form-item v-else :label="item.label" :prop="field" :key="uniqid">
    <el-slider
      v-model="formData[field]"
      :step="step"
      :showStops="showStops"
      :showInput="showInput"
      :min="min"
      :max="max"
      :range="range"
      :marks="marks"
    ></el-slider>
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
import { isArray, copy } from "@qingbing/helper";
// 导出
export default {
  extends: Base,
  created() {
    this.min = this.getExtData("min", null);
    this.range = this.getExtData("range", false);
    const defaultVal = this.formData[this.field];
    if (this.range && (!isArray(defaultVal) || defaultVal.length != 2)) {
      this.formData[this.field] = [this.min, this.min];
    }
    if (!this.isText) {
      this.step = this.getExtData("step", 1);
      this.showStops = this.getExtData("showStops", false);
      this.showInput = this.getExtData("showInput", true);
      this.max = this.getExtData("max", null);
      this.marks = this.getExtData("marks", {});
    }
  },
};
</script>