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
    <el-input
      type="textarea"
      v-model="formData[field]"
      :rows="rows"
      :autosize="autosize"
      :placeholder="placeholder"
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
import ComponentInput from "./input";
// 导出
export default {
  extends: ComponentInput,
  created() {
    if (!this.isText) {
      this.rows = this.getExtData("rows", 3);
      this.autosize = this.getExtData("autosize", false);
    }
  },
};
</script>