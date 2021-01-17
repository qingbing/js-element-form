<template>
  <div>
    <template v-for="(item, index) in items">
      <template v-if="!inArray(item.field, ignoreFields)">
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
        <template v-if="item.input_type == 'input'">
          <component-input
            :key="'' + uniqid + index"
            :isForm="isForm"
            :uniqid="'' + uniqid + index"
            :labelAlgin="labelAlgin"
            :viewFields="viewFields"
            :item="item"
            :formData="formData"
            :field="item.field"
          ></component-input>
        </template>
        <!-- input_radio -->
        <template v-if="item.input_type == 'radio'">
          <component-radio
            :key="'' + uniqid + index"
            :isForm="isForm"
            :uniqid="'' + uniqid + index"
            :labelAlgin="labelAlgin"
            :viewFields="viewFields"
            :item="item"
            :formData="formData"
            :field="item.field"
          ></component-radio>
        </template>
        <!-- input_checkbox -->
        <template v-if="item.input_type == 'checkbox'">
          <component-checkbox
            :key="'' + uniqid + index"
            :isForm="isForm"
            :uniqid="'' + uniqid + index"
            :labelAlgin="labelAlgin"
            :viewFields="viewFields"
            :item="item"
            :formData="formData"
            :field="item.field"
          ></component-checkbox>
        </template>
        <!-- switch -->
        <template v-if="item.input_type == 'switch'">
          <component-switch
            :key="'' + uniqid + index"
            :isForm="isForm"
            :uniqid="'' + uniqid + index"
            :labelAlgin="labelAlgin"
            :viewFields="viewFields"
            :item="item"
            :formData="formData"
            :field="item.field"
          ></component-switch>
        </template>
        <!-- number -->
        <template v-if="item.input_type == 'number'">
          <component-number
            :key="'' + uniqid + index"
            :isForm="isForm"
            :uniqid="'' + uniqid + index"
            :labelAlgin="labelAlgin"
            :viewFields="viewFields"
            :item="item"
            :formData="formData"
            :field="item.field"
          ></component-number>
        </template>
        <!-- select -->
        <template v-if="item.input_type == 'select'">
          <component-select
            :key="'' + uniqid + index"
            :isForm="isForm"
            :uniqid="'' + uniqid + index"
            :labelAlgin="labelAlgin"
            :viewFields="viewFields"
            :item="item"
            :formData="formData"
            :field="item.field"
          ></component-select>
        </template>
        <!-- cascader -->
        <template v-if="item.input_type == 'cascader'">
          <component-cascader
            :key="'' + uniqid + index"
            :isForm="isForm"
            :uniqid="'' + uniqid + index"
            :labelAlgin="labelAlgin"
            :viewFields="viewFields"
            :item="item"
            :formData="formData"
            :field="item.field"
          ></component-cascader>
        </template>
        <!-- cascader -->
        <template v-if="item.input_type == 'slider'">
          <component-slider
            :key="'' + uniqid + index"
            :isForm="isForm"
            :uniqid="'' + uniqid + index"
            :labelAlgin="labelAlgin"
            :viewFields="viewFields"
            :item="item"
            :formData="formData"
            :field="item.field"
          ></component-slider>
        </template>
        <!-- END : v-if="ignoreFields[item.field]" - end -->
      </template>
      <!-- END : v-for="(item, index) in items" -->
    </template>

    <h1>
      <p>component</p>
      {{ formData }}
    </h1>
  </div>
</template>

<script>
import { uniqid, inArray } from "@qingbing/helper";
import ComponentText from "./components/text";
import ComponentInput from "./components/input";
import ComponentRadio from "./components/radio";
import ComponentCheckbox from "./components/checkbox";
import ComponentSwitch from "./components/switch";
import ComponentNumber from "./components/number";
import ComponentSelect from "./components/select";
import ComponentCascader from "./components/cascader";
import ComponentSlider from "./components/slider";

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
    // 直接隐藏字段
    ignoreFields: {
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
    ComponentInput,
    ComponentRadio,
    ComponentSwitch,
    ComponentCheckbox,
    ComponentNumber,
    ComponentSelect,
    ComponentCascader,
    ComponentSlider,
  },
  methods: {
    inArray(v, arr) {
      return inArray(v, arr);
    },
  },
};
</script>

<style scoped>
</style>