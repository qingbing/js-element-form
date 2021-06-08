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
    <el-date-picker
      v-if="isRange"
      :ref="field"
      v-model="formData[field]"
      :type="type"
      :readonly="readonly"
      :disabled="disabled"
      :editable="editable"
      :clearable="clearable"
      :align="align"
      :prefix-icon="prefixIcon"
      :clear-icon="clearIcon"
      :validate-event="validateEvent"
      :placeholder="placeholder"
      :picker-options="pickerOptions"
      :value-format="valueFormat"
      :format="format"
      :range-separator="rangeSeparator"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      @change="handleChange"
      @blur="handleBlur"
    >
    </el-date-picker>
    <el-date-picker
      v-else
      :ref="field"
      v-model="formData[field]"
      :type="type"
      :readonly="readonly"
      :disabled="disabled"
      :editable="editable"
      :clearable="clearable"
      :align="align"
      :prefix-icon="prefixIcon"
      :clear-icon="clearIcon"
      :validate-event="validateEvent"
      :placeholder="placeholder"
      :picker-options="pickerOptions"
      :value-format="valueFormat"
      :format="format"
      @change="handleChange"
      @blur="handleBlur"
    >
    </el-date-picker>
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
import { isUndefined, isString } from "@qingbing/helper";
// 导出
export default {
  extends: Base,
  data() {
    return {
      trigger: "change",
    };
  },
  created() {
    if (!this.isText) {
      // 日期类型
      this.type = this.getExtData("type", "date");
      this.readonly = this.getExtData("readonly", false);
      this.disabled = this.getExtData("disabled", false);
      this.editable = this.getExtData("editable", true);
      this.clearable = this.getExtData("clearable", true);
      this.align = this.getExtData("align", "left");
      this.prefixIcon = this.getExtData("prefixIcon", "el-icon-date");
      this.clearIcon = this.getExtData("clearIcon", "el-icon-circle-close");
      this.validateEvent = this.getExtData("validateEvent", true);
      // 区别字段
      let rangeSeparator = this.getExtData("rangeSeparator");
      let startPlaceholder = this.getExtData("startPlaceholder");
      let endPlaceholder = this.getExtData("endPlaceholder");

      let placeholder = this.getExtData("placeholder");
      let valueFormat = this.getExtData("valueFormat");
      let format = this.getExtData("format");
      this.isRange = false;

      switch (this.type) {
        case "daterange":
          this.isRange = true;
          isUndefined(rangeSeparator) && (rangeSeparator = "-");
          isUndefined(placeholder) && (placeholder = "请选择日期");
          isUndefined(startPlaceholder) &&
            (startPlaceholder = "请选择开始日期");
          isUndefined(endPlaceholder) && (endPlaceholder = "请选择结束日期");

          isUndefined(valueFormat) && (valueFormat = "yyyy-MM-dd");
          isUndefined(format) && (format = valueFormat);
          break;
        case "month":
          isUndefined(placeholder) && (placeholder = "请选择月");

          isUndefined(valueFormat) && (valueFormat = "yyyy-MM");
          isUndefined(format) && (format = valueFormat);
          break;
        case "monthrange":
          this.isRange = true;
          isUndefined(rangeSeparator) && (rangeSeparator = "-");
          isUndefined(placeholder) && (placeholder = "请选择月份范围");
          isUndefined(startPlaceholder) &&
            (startPlaceholder = "请选择开始月份");
          isUndefined(endPlaceholder) && (endPlaceholder = "请选择结束月份");

          isUndefined(valueFormat) && (valueFormat = "yyyy-MM");
          isUndefined(format) && (format = valueFormat);
          break;
        case "year":
          isUndefined(placeholder) && (placeholder = "请选择年");

          isUndefined(valueFormat) && (valueFormat = "yyyy");
          isUndefined(format) && (format = valueFormat);
          break;
        case "week":
          isUndefined(placeholder) && (placeholder = "请选择周");

          isUndefined(valueFormat) && (valueFormat = "yyyy-MM-dd");
          isUndefined(format) && (format = "yyyywWW");
          break;
        case "datetime":
          isUndefined(placeholder) && (placeholder = "请选择时间");

          isUndefined(valueFormat) && (valueFormat = "yyyy-MM-dd HH:mm:ss");
          isUndefined(format) && (format = valueFormat);
          break;
        case "datetimerange":
          this.isRange = true;
          isUndefined(rangeSeparator) && (rangeSeparator = "-");
          isUndefined(placeholder) && (placeholder = "请选择时间范围");
          isUndefined(startPlaceholder) &&
            (startPlaceholder = "请选择开始时间");
          isUndefined(endPlaceholder) && (endPlaceholder = "请选择结束时间");

          isUndefined(valueFormat) && (valueFormat = "yyyy-MM-dd HH:mm:ss");
          isUndefined(format) && (format = valueFormat);
          break;
        case "dates":
        case "date":
        default:
          isUndefined(placeholder) && (placeholder = "请选择日期");

          isUndefined(valueFormat) && (valueFormat = "yyyy-MM-dd");
          isUndefined(format) && (format = valueFormat);
          break;
      }

      this.rangeSeparator = rangeSeparator;
      this.startPlaceholder = startPlaceholder;
      this.endPlaceholder = endPlaceholder;
      this.placeholder = placeholder;
      this.valueFormat = valueFormat;
      this.format = format;

      this.pickerOptions = {};
      this.pickerOptions.firstDayOfWeek = this.getExtData("firstDayOfWeek", 7);
      // 快捷标签
      const shortcuts = this.getExtData("shortcuts", []);
      if (shortcuts.length > 0) {
        this.pickerOptions.shortcuts = shortcuts;
      }
      const timeSource = this.getExtData("timeSource", "none");
      if (timeSource === "past") {
        this.pickerOptions.disabledDate = this.isFuture;
      } else if (timeSource === "future") {
        this.pickerOptions.disabledDate = this.isPast;
      }
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
  watch: {
    formData: {
      handler(newValue, oldValue) {
        if (
          isString(this.formData[this.field]) &&
          this.formData[this.field] < "1100-01-01"
        ) {
          this.formData[this.field] = "";
        }
      },
      immediate: true,
      // deep:true,
    },
  },
};
</script>