<template>
  <el-form-item
    :label="item.label"
    :key="uniqid"
    :style="{ textAlign: labelAlgin }"
  >
    {{ formData[field] }}
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
// 导出
export default {
  extends: Base,
};
</script>