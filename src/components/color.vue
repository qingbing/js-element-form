<template>
  <!-- 表单显示 -->
  <el-form-item
    v-if="isText"
    :label="item.label"
    :key="uniqid"
    :style="{ textAlign: labelAlgin }"
  >
    <el-color-picker v-model="formData[field]" disabled></el-color-picker>
    <el-tag class="color-view-tag">{{ formData[field] }}</el-tag>
  </el-form-item>

  <!-- 表单组件 -->
  <el-form-item v-else :label="item.label" :prop="field" :key="uniqid" class="text-left">
    <el-color-picker
      v-model="formData[field]"
      :predefine="predefineColors"
    ></el-color-picker>
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
      this.predefineColors = this.getExtData("predefineColors", undefined);
    }
  },
};
</script>

<style scoped>
.color-view-tag {
  position: relative;
  top: -13px;
  left: 10px;
  height: 36px;
  line-height: 36px;
}
</style>