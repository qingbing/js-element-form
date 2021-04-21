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
  <el-form-item
    v-else
    :label="item.label"
    :prop="field"
    :key="uniqid"
    class="text-left"
  >
    <el-time-picker
      v-if="isRange"
      v-model="formData[field]"
      is-range
      :placeholder="placeholder"
      :arrow-control="arrowControl"
      :readonly="readonly"
      :disabled="disabled"
      :editable="editable"
      :clearable="clearable"
      :value-format="valueFormat"
      :pickerOptions="pickerOptions"
      :star-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :range-separator="rangeSeparator"
    >
    </el-time-picker>
    <el-time-picker
      v-else
      v-model="formData[field]"
      :placeholder="placeholder"
      :arrow-control="arrowControl"
      :readonly="readonly"
      :disabled="disabled"
      :editable="editable"
      :clearable="clearable"
      :value-format="valueFormat"
      :pickerOptions="pickerOptions"
    >
    </el-time-picker>
  </el-form-item>
</template>


<script>
// 导入
import Base from "./base";
import { isUndefined, sprintf } from "@qingbing/helper";
// 导出
export default {
  extends: Base,
  created() {
    if (!this.isText) {
      this.isRange = this.getExtData("isRange", false);
      if (this.isRange) {
        // 提示
        this.placeholder = this.getExtData(
          "placeholder",
          sprintf("请输入时间范围", this.item.label)
        );
        this.startPlaceholder = this.getExtData("startPlaceholder", "开始时间");
        this.endPlaceholder = this.getExtData("endPlaceholder", "结束时间");
        this.rangeSeparator = this.getExtData("rangeSeparator", "-");
      } else {
        this.placeholder = this.getExtData(
          "placeholder",
          sprintf("请输入 %s", this.item.label)
        );
      }

      this.arrowControl = this.getExtData("arrowControl", false);
      this.readonly = this.getExtData("readonly", false);
      this.disabled = this.getExtData("disabled", false);
      this.editable = this.getExtData("editable", true);
      this.clearable = this.getExtData("clearable", true);
      this.valueFormat = this.getExtData("valueFormat", "HH:mm:ss");

      this.pickerOptions = {};
      this.pickerOptions.format = this.getExtData("format", "HH:mm:ss");
      const selectableRange = this.getExtData("selectableRange");
      if (selectableRange) {
        this.pickerOptions.selectableRange = selectableRange;
      }
    }
  },
};
</script>