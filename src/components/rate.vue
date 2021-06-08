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
    <el-rate
      v-model="formData[field]"
      :max="max"
      :allowHalf="allowHalf"
      :lowThreshold="lowThreshold"
      :highThreshold="highThreshold"
      :colors="colors"
      :showText="showText"
      :texts="texts"
      @change="handleChange"
    ></el-rate>
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
// 导出
export default {
  extends: Base,
  created() {
    if (!this.isText) {
      this.max = this.getExtData("max", 5);
      this.allowHalf = this.getExtData("allowHalf", false);
      this.lowThreshold = this.getExtData("lowThreshold");
      this.highThreshold = this.getExtData("highThreshold", false);
      this.colors = this.getExtData("colors", [
        "#99A9BF",
        "#F7BA2A",
        "#FF9900",
      ]);
      this.showText = this.getExtData("showText", false);
      this.texts = this.getExtData("texts", [
        "极差",
        "失望",
        "一般",
        "满意",
        "惊喜",
      ]);
    }
  },
};
</script>