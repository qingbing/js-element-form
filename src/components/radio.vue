<template>
  <el-form-item :label="item.label" :key="uniqid" class="text-left">
    <el-radio-group v-model="formData[field]">
      <template v-for="(val, key) in item.options">
        {{ val }}
        <el-radio :label="key" :key="uniqid + key" :disabled="isText" border>{{
          val
        }}</el-radio>
      </template>
    </el-radio-group>
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
import { isUndefined, col_value } from "@qingbing/helper";
// 导出
export default {
  extends: Base,
};
</script>