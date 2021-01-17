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
  <el-form-item v-else :label="item.label" :key="uniqid" class="text-left">
    <el-time-select
      v-if="pickerType == 'select'"
      v-model="formData[field]"
      :placeholder="placeholder"
      :pickerOptions="pickerOptions"
    ></el-time-select>
    <el-time-picker
      v-else-if="pickerType == 'picker'"
      v-model="formData[field]"
      :placeholder="placeholder"
      :pickerOptions="pickerOptions"
      :value-format="valueFormat"
    >
    </el-time-picker>
    <el-time-picker
      v-else-if="pickerType == 'range'"
      v-model="formData[field]"
      is-range
      :placeholder="placeholder"
      :pickerOptions="pickerOptions"
      :value-format="valueFormat"
      :startPlaceholder="startPlaceholder"
      :endPlaceholder="endPlaceholder"
      :rangeSeparator="rangeSeparator"
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
      const isRange = this.getExtData("range");
      let pickerOptions = {};
      if (isRange) {
        this.pickerType = "range";
        // 提示
        this.placeholder = this.getExtData(
          "placeholder",
          sprintf("请输入时间范围", this.item.label)
        );
        this.startPlaceholder = this.getExtData("startPlaceholder", "开始时间");
        this.endPlaceholder = this.getExtData("endPlaceholder", "结束时间");
        this.rangeSeparator = this.getExtData("rangeSeparator");
      } else {
        this.placeholder = this.getExtData(
          "placeholder",
          sprintf("请输入 %s", this.item.label)
        );
        // 默认为 time-picker
        this.pickerType = "picker";
        // 固定时间点
        const step = this.getExtData("step"); // 有被认为是 select
        if (!isUndefined(step)) {
          const start = this.getExtData("start", "00:00");
          const end = this.getExtData("end", "24:00");
          // time-select
          this.pickerType = "select";
          pickerOptions = {
            start,
            end,
            step,
            minTime: this.getExtData("minTime"),
            maxTime: this.getExtData("maxTime"),
          };
        }
      }

      // time-picker 的相关属性处理
      if (this.pickerType === "picker" || this.pickerType == "range") {
        const selectableRange = this.getExtData("selectableRange");
        if (!isUndefined(selectableRange)) {
          pickerOptions.selectableRange = selectableRange;
        }
        this.valueFormat = pickerOptions.format = this.getExtData(
          "valueFormat",
          "HH:mm:ss"
        );
      }
      this.pickerOptions = pickerOptions;
    }
  },
};
</script>