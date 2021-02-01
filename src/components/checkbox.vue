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
    <el-checkbox-group v-model="formData[field]" :min="min" :max="max">
      <template v-for="(val, key) in item.exts.options">
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
import { isArray, each } from "@qingbing/helper";

// 导出
export default {
  extends: Base,
  created() {
    if (!isArray(this.formData[this.field])) {
      this.formData[this.field] = [];
    }
    if (this.isText) {
      const ts = [];
      each(this.formData[this.field], (idx, select) => {
        ts.push(this.item.exts.options[select]);
      });
      this.viewText = ts.join(",");
    } else {
      this.min = this.getExtData("min", null);
      this.max = this.getExtData("max", null);
    }
  },
};
</script>