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
  <el-form-item v-else :label="item.label" :prop="field" :key="uniqid" class="text-left">
    <el-input-number
      v-model="formData[field]"
      :min="min"
      :max="max"
      :step="step"
      :stepStrictly="stepStrictly"
      :precision="precision"
      @change="handleChange"
      @blur="handleBlur"
    ></el-input-number>
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
// 导出
export default {
  extends: Base,
  created() {
    if (!this.isText) {
      this.min = this.getExtData("min");
      this.max = this.getExtData("max");
      this.step = this.getExtData("step", 1);
      this.stepStrictly = this.getExtData("stepStrictly", false);
      this.precision = this.getExtData("precision", 0);
    }
  },
};
</script>