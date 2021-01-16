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
  <el-form-item v-else :label="item.label" :key="uniqid" class="text-left">
    <el-checkbox-group v-model="formData[field]">
      <template v-for="(val, key) in item.options">
        <el-checkbox :label="key" :key="uniqid + key" border>{{
          val
        }}</el-checkbox>
      </template>
    </el-checkbox-group>
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
import { isArray } from "@qingbing/helper";

// 导出
export default {
  extends: Base,
  created() {
    if (this.isText) {
      const selected = this.formData[this.field];
      if (!isArray(selected)) {
        this.viewText = "";
        return;
      }
      const ts = [];
      const options = this.item.options;
      for (const i in selected) {
        if (options[selected[i]]) {
          ts.push(options[selected[i]]);
        }
      }
      this.viewText = ts.join(",");
    }
  },
};
</script>