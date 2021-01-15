<template>
  <el-form-item :label="item.label" :key="uniqid" class="text-left">
    <el-checkbox-group v-model="formData[field]">
      <template v-for="(val, key) in item.options">
        {{ val }}
        <el-checkbox :label="key" :key="uniqid + key" :disabled="isText" border>{{
          val
        }}</el-checkbox>
      </template>
    </el-checkbox-group>
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