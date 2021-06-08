<template>
  <!-- 表单组件 -->
  <el-form-item
    :label="item.label"
    :key="uniqid"
    :prop="field"
    class="text-left"
  >
    <el-switch
      v-model="formData[field]"
      :disabled="type == 'view'"
      :activeValue="activeValue"
      :inactiveValue="inActiveValue"
      @change="handleChange"
    >
    </el-switch>
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
import { isObject } from "@qingbing/helper";
// 导出
export default {
  extends: Base,
  created() {
    // 计算 activeText、inactiveText、activeValue、inActiveValue
    const options = this.getExtData("options", []);
    if (isObject(options)) {
      this.activeValue = options.activeValue;
      this.inActiveValue = options.inActiveValue;
    } else {
      this.activeValue = 1;
      this.inActiveValue = 0;
    }
    // 计算 type、 viewText
    if (!this.isText) {
      this.type = "form";
    } else {
      this.type = "view";
    }
  },
};
</script>