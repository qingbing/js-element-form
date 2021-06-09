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
  <el-form-item
    v-else
    :label="item.label"
    :prop="field"
    :key="uniqid"
    class="text-left"
  >
    <el-checkbox-group
      v-model="formData[field]"
      :min="min"
      :max="max"
      @change="handleChange"
    >
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
  data() {
    return {
      trigger: "change",
    };
  },
  created() {
    if (!this.isText) {
      this.min = this.getExtData("min");
      this.max = this.getExtData("max");
    }
  },
  watch: {
    formData: {
      handler(newValue, oldValue) {
        if (!isArray(this.formData[this.field])) {
          this.formData[this.field] = [];
        } else {
          each(this.formData[this.field], (val, idx) => {
            this.formData[this.field][idx] = "" + val;
          });
        }
      },
      immediate: true,
      // deep:true,
    },
  },
  computed: {
    viewText() {
      // 计算选择过的标签的值
      let text = [];
      each(this.formData[this.field], (select) => {
        text.push(this.item.exts.options[select]);
      });
      return text.join("/");
    },
  },
};
</script>