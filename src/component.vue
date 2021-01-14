<template>
  <div>
    <template v-for="(item, index) in items">
      <!-- text -->
      <template v-if="item.input_type == 'text'">
        <component-text
          :key="'' + uniqid + index"
          :isForm="isForm"
          :uniqid="'' + uniqid + index"
          :labelAlgin="labelAlgin"
          :item="item"
          :formData="formData"
          :field="item.field"
        ></component-text>
      </template>
      <!-- input_text -->
      <template v-if="item.input_type == 'input_text'">
        <component-input-text
          :key="'' + uniqid + index"
          :isForm="isForm"
          :uniqid="'' + uniqid + index"
          :labelAlgin="labelAlgin"
          :viewFields="viewFields"
          :item="item"
          :formData="formData"
          :field="item.field"
        ></component-input-text>
      </template>
      <!-- input_radio -->
      <template v-if="item.input_type == 'input_radio'">
        <component-input-radio
          :key="'' + uniqid + index"
          :isForm="isForm"
          :uniqid="'' + uniqid + index"
          :labelAlgin="labelAlgin"
          :viewFields="viewFields"
          :item="item"
          :formData="formData"
          :field="item.field"
        ></component-input-radio>
      </template>
    </template>

    <h1>
      <p>component</p>
      {{ formData }}
    </h1>
  </div>
</template>

<script>
import { uniqid } from "@qingbing/helper";
import ComponentText from "./components/text";
import ComponentInputText from "./components/input-text";
import ComponentInputRadio from "./components/input-radio";
/**
 * ajax 的函数在 use 后面自定义
 * 自定义一些验证规则
 *
 * 表格组件定义
 *
 */
export default {
  props: {
    // 组件唯一标志符
    uniqid: {
      type: String,
      default: () => {
        return uniqid();
      },
    },
    // 文字时对齐方式
    labelAlgin: {
      type: String,
      default: "left",
    },
    // 是否表单组件
    isForm: {
      type: Boolean,
      default: true,
    },
    // 字段信息
    items: {
      type: Array,
      required: true,
    },
    // 表单数据
    formData: {
      type: Object,
      required: true,
    },
    // 直接显示字段
    viewFields: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  beforeCreate() {},
  created() {},
  data() {
    return {};
  },
  components: {
    ComponentText,
    ComponentInputText,
    ComponentInputRadio,
  },
  methods: {},
};
</script>

<style scoped>
</style>