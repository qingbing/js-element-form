<template>
  <!-- 表单显示 -->
  <el-form-item
    v-if="isText"
    :label="item.label"
    :key="uniqid"
    :style="{ textAlign: labelAlgin }"
  >
    {{ viewText }}
  </el-form-item>

  <!-- 表单组件 -->
  <el-form-item v-else :label="item.label" :prop="field" :key="uniqid" class="text-left">
    <el-radio-group v-model="formData[field]">
      <template v-for="(val, key) in item.exts.options">
        <el-radio :label="key" :key="uniqid + key" border>
          {{ val }}
        </el-radio>
      </template>
    </el-radio-group>
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
import { col_value } from "@qingbing/helper";
// 导出
export default {
  extends: Base,
  created() {
    if (this.isText) {
      this.viewText = col_value(
        this.formData[this.field],
        this.item.exts.options,
        ""
      );
    }
  },
};
</script>