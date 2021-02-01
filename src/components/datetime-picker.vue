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
  <el-form-item v-else :label="item.label" :prop="field" :key="uniqid" class="text-left">
    <el-date-picker
      v-model="formData[field]"
      :placeholder="placeholder"
      :rangeSeparator="rangeSeparator"
      :startPlaceholder="startPlaceholder"
      :endPlaceholder="endPlaceholder"
      :type="type"
      :format="format"
      :valueFormat="valueFormat"
      :pickerOptions="pickerOptions"
    >
    </el-date-picker>
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
      // 日期类型
      this.type = this.getExtData("type", "date");
      let pickerOptions = {};
      // 提示信息
      let placeholder = this.getExtData("placeholder");
      let format = this.getExtData("format");
      let valueFormat = this.getExtData("valueFormat");

      let rangeSeparator = this.getExtData("rangeSeparator", "至");
      let startPlaceholder = this.getExtData("startPlaceholder");
      let endPlaceholder = this.getExtData("endPlaceholder");
      switch (this.type) {
        case "monthrange":
          if (isUndefined(placeholder)) {
            placeholder = "请选择月";
          }
          if (isUndefined(valueFormat)) {
            valueFormat = "yyyy-MM";
          }
          if (isUndefined(format)) {
            format = valueFormat;
          }
          if (isUndefined(startPlaceholder)) {
            startPlaceholder = "开始月份";
          }
          if (isUndefined(endPlaceholder)) {
            endPlaceholder = "结束月份";
          }
          break;
        case "daterange":
          if (isUndefined(placeholder)) {
            placeholder = "请选择日期";
          }
          if (isUndefined(valueFormat)) {
            valueFormat = "yyyy-MM-dd";
          }
          if (isUndefined(format)) {
            format = valueFormat;
          }
          if (isUndefined(startPlaceholder)) {
            startPlaceholder = "开始日期";
          }
          if (isUndefined(endPlaceholder)) {
            endPlaceholder = "结束日期";
          }
          break;
        case "datetimerange":
          if (isUndefined(placeholder)) {
            placeholder = "请选择时间";
          }
          if (isUndefined(valueFormat)) {
            valueFormat = "yyyy-MM-dd HH:mm:ss";
          }
          if (isUndefined(format)) {
            format = valueFormat;
          }
          if (isUndefined(startPlaceholder)) {
            startPlaceholder = "开始时间";
          }
          if (isUndefined(endPlaceholder)) {
            endPlaceholder = "结束时间";
          }
          break;
        case "year":
          if (isUndefined(placeholder)) {
            placeholder = "请选择年";
          }
          if (isUndefined(valueFormat)) {
            valueFormat = "yyyy";
          }
          if (isUndefined(format)) {
            format = valueFormat;
          }
          break;
        case "week":
          if (isUndefined(placeholder)) {
            placeholder = "请选择周";
          }
          if (isUndefined(valueFormat)) {
            valueFormat = "yyyy-MM-dd";
          }
          if (isUndefined(format)) {
            format = "yyyy年第 WW 周";
          }
          break;
        case "month":
          if (isUndefined(placeholder)) {
            placeholder = "请选择月";
          }
          if (isUndefined(valueFormat)) {
            valueFormat = "yyyy-MM";
          }
          if (isUndefined(format)) {
            format = valueFormat;
          }
          break;
        case "datetime":
          if (isUndefined(placeholder)) {
            placeholder = "请选择时间";
          }
          if (isUndefined(valueFormat)) {
            valueFormat = "yyyy-MM-dd HH:mm:ss";
          }
          if (isUndefined(format)) {
            format = valueFormat;
          }
          break;
        default:
          if (isUndefined(placeholder)) {
            placeholder = "请选择日期";
          }
          if (isUndefined(valueFormat)) {
            valueFormat = "yyyy-MM-dd";
          }
          if (isUndefined(format)) {
            format = valueFormat;
          }
          // date
          break;
      }

      this.placeholder = placeholder;
      this.format = format;
      this.valueFormat = valueFormat;
      this.rangeSeparator = rangeSeparator;
      this.startPlaceholder = startPlaceholder;
      this.endPlaceholder = endPlaceholder;

      // 快捷标签
      const shortcuts = this.getExtData("shortcuts", []);
      if (shortcuts.length > 0) {
        pickerOptions.shortcuts = shortcuts;
      }

      const timeSource = this.getExtData("timeSource", "none");
      if (timeSource === "past") {
        pickerOptions.disabledDate = this.isFuture;
      } else if (timeSource === "future") {
        pickerOptions.disabledDate = this.isPast;
      }
      this.pickerOptions = pickerOptions;
    }
  },
  methods: {
    isFuture(time) {
      return time.getTime() > Date.now();
    },
    isPast(time) {
      return time.getTime() < Date.now();
    },
  },
};
</script>