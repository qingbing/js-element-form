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
    <el-select
      v-model="formData[field]"
      :clearable="clearable"
      :multiple="multiple"
      :filterable="filterable"
      :placeholder="placeholder"
    >
      <template v-for="(val, key) in item.exts.options">
        <el-option :label="val" :key="uniqid + key" :value="key"> </el-option>
      </template>
    </el-select>
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
import { isArray, isUndefined, sprintf, col_value } from "@qingbing/helper";
// 导出
export default {
  extends: Base,
  created() {
    if (this.isText) {
      const vals = [];
      let selected = this.formData[this.field];
      if (!isArray(selected)) {
        if (isUndefined(selected)) {
          selected = [];
        } else {
          selected = [selected];
        }
      }
      const options = this.item.exts.options;
      const ts = [];
      for (const i in selected) {
        if (options[selected[i]]) {
          ts.push(options[selected[i]]);
        }
      }
      this.viewText = ts.join(",");
    } else {
      const placeholder = this.getExtData("placeholder");
      if (isUndefined(placeholder)) {
        this.placeholder = sprintf("请选择 %s", this.item.label);
      } else {
        this.placeholder = placeholder;
      }

      this.clearable = this.getExtData("clearable", true);
      this.multiple = this.getExtData("multiple", false);
      this.filterable = this.getExtData("filterable", false);
    }

    // 远程搜索
  },
};
</script>