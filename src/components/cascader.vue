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
    <el-cascader
      v-model="formData[field]"
      :options="options"
      :clearable="clearable"
      :showAllLevels="showAllLevels"
      :props="props"
      :filterable="filterable"
    ></el-cascader>
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
import { copy, isArray, isUndefined, each } from "@qingbing/helper";
// 导出
export default {
  extends: Base,
  data() {
    return {
      trigger: "change",
    };
  },
  created() {
    this.options = this.getExtData("options", []);
    if (this.isText) {
      let selected = copy(this.formData[this.field]);
      if (!isArray(selected)) {
        selected = [];
      }
      let options = copy(this.getExtData("options", []));
      if (!isArray(options)) {
        throw new Error("级联选项必须为数组");
      }
      // 计算选择过的标签的值
      let viewText = [];
      while (selected.length > 0) {
        if (options.length <= 0) {
          break;
        }
        let key = selected.shift();
        let inOption = false;
        each(options, (option) => {
          if (option.value != key) {
            return;
          }
          inOption = true;
          viewText.push(option.label);
          options = isUndefined(option.children) ? [] : option.children;
          return false;
        });
        if (!inOption) {
          break;
        }
      }
      this.viewText = viewText.join("/");
    } else {
      this.clearable = this.getExtData("clearable", false);
      this.showAllLevels = this.getExtData("showAllLevels", true);
      this.filterable = this.getExtData("filterable", true);
      this.props = {};
      this.props.checkStrictly = this.getExtData("checkStrictly", false);
    }
  },
};
</script>

<style scoped>
</style>