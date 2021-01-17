<template>
  <!-- 表单显示 -->
  <el-form-item
    v-if="isText"
    :label="item.label"
    :key="uniqid"
    :style="{ textAlign: labelAlgin }"
  >
    {{ formData }}
  </el-form-item>

  <!-- 表单组件 -->
  <el-form-item v-else :label="item.label" :key="uniqid">
    <el-input
      v-model="formData[field]"
      :placeholder="item.placeholder"
    ></el-input>
  </el-form-item>
</template>

<script>
// 导入
import { inArray, isUndefined } from "@qingbing/helper";
// 导出
export default {
  props: {
    // 是否表单组件
    isForm: {
      type: Boolean,
      required: true,
    },
    // 组件唯一标志符
    uniqid: {
      type: String,
      required: true,
    },
    // 如果为文字时的对其方式
    labelAlgin: {
      type: String,
      required: true,
    },
    // 直接显示字段
    textFields: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 字段信息
    item: {
      type: Object,
      required: true,
    },
    // 整个表单的数据
    formData: {
      type: Object,
      required: true,
    },
    // 字段名
    field: {
      type: String,
      required: true,
    },
  },
  created() {
    if (!this.isForm) {
      this.isText = true;
    } else if (this.item.input_type === "text") {
      this.isText = true;
    } else if (inArray(this.field, this.textFields)) {
      this.isText = true;
    } else {
      this.isText = false;
    }
    // console.log(this.field, this.isText); //todo delete
  },
  data() {
    return {
      isText: true,
    };
  },
  methods: {
    /**
     * 获取扩展数据中的字段信息
     */
    getExtData(field, defaultVal) {
      if (isUndefined(this.item.exts)) {
        return defaultVal;
      }
      if (isUndefined(this.item.exts[field])) {
        return defaultVal;
      }
      return this.item.exts[field];
    },
  },
};
</script>

<style lang="scss">
.text-left {
  text-align: left;
}
</style>
