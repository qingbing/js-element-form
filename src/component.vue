<template>
  <div>
    <template v-for="(field, index) in newViewFields">
      <!-- text -->
      <template v-if="newItems[field].input_type == 'text'">
        <component-text
          :key="'' + uniqid + index"
          :isForm="isForm"
          :uniqid="'' + uniqid + index"
          :labelAlgin="labelAlgin"
          :textFields="textFields"
          :item="newItems[field]"
          :formData="formData"
          :field="field"
        ></component-text>
      </template>
      <!-- input_text -->
      <template v-if="newItems[field].input_type == 'input'">
        <component-input
          :key="'' + uniqid + index"
          :isForm="isForm"
          :uniqid="'' + uniqid + index"
          :labelAlgin="labelAlgin"
          :textFields="textFields"
          :item="newItems[field]"
          :formData="formData"
          :field="field"
        ></component-input>
      </template>
      <!-- input_radio -->
      <template v-if="newItems[field].input_type == 'radio'">
        <component-radio
          :key="'' + uniqid + index"
          :isForm="isForm"
          :uniqid="'' + uniqid + index"
          :labelAlgin="labelAlgin"
          :textFields="textFields"
          :item="newItems[field]"
          :formData="formData"
          :field="field"
        ></component-radio>
      </template>
      <!-- input_checkbox -->
      <template v-if="newItems[field].input_type == 'checkbox'">
        <component-checkbox
          :key="'' + uniqid + index"
          :isForm="isForm"
          :uniqid="'' + uniqid + index"
          :labelAlgin="labelAlgin"
          :textFields="textFields"
          :item="newItems[field]"
          :formData="formData"
          :field="field"
        ></component-checkbox>
      </template>
      <!-- switch -->
      <template v-if="newItems[field].input_type == 'switch'">
        <component-switch
          :key="'' + uniqid + index"
          :isForm="isForm"
          :uniqid="'' + uniqid + index"
          :labelAlgin="labelAlgin"
          :textFields="textFields"
          :item="newItems[field]"
          :formData="formData"
          :field="field"
        ></component-switch>
      </template>
      <!-- number -->
      <template v-if="newItems[field].input_type == 'number'">
        <component-number
          :key="'' + uniqid + index"
          :isForm="isForm"
          :uniqid="'' + uniqid + index"
          :labelAlgin="labelAlgin"
          :textFields="textFields"
          :item="newItems[field]"
          :formData="formData"
          :field="field"
        ></component-number>
      </template>
      <!-- select -->
      <template v-if="newItems[field].input_type == 'select'">
        <component-select
          :key="'' + uniqid + index"
          :isForm="isForm"
          :uniqid="'' + uniqid + index"
          :labelAlgin="labelAlgin"
          :textFields="textFields"
          :item="newItems[field]"
          :formData="formData"
          :field="field"
        ></component-select>
      </template>
      <!-- cascader -->
      <template v-if="newItems[field].input_type == 'cascader'">
        <component-cascader
          :key="'' + uniqid + index"
          :isForm="isForm"
          :uniqid="'' + uniqid + index"
          :labelAlgin="labelAlgin"
          :textFields="textFields"
          :item="newItems[field]"
          :formData="formData"
          :field="field"
        ></component-cascader>
      </template>
      <!-- cascader -->
      <template v-if="newItems[field].input_type == 'slider'">
        <component-slider
          :key="'' + uniqid + index"
          :isForm="isForm"
          :uniqid="'' + uniqid + index"
          :labelAlgin="labelAlgin"
          :textFields="textFields"
          :item="newItems[field]"
          :formData="formData"
          :field="field"
        ></component-slider>
      </template>
      <!-- cascader -->
      <template v-if="newItems[field].input_type == 'time-picker'">
        <component-time-picker
          :key="'' + uniqid + index"
          :isForm="isForm"
          :uniqid="'' + uniqid + index"
          :labelAlgin="labelAlgin"
          :textFields="textFields"
          :item="newItems[field]"
          :formData="formData"
          :field="field"
        ></component-time-picker>
      </template>
      <!-- END : v-for="(field, index) in newViewFields" -->
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
import ComponentTimePicker from "./components/time-picker";

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
    // 显示成text文本的字段
    textFields: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 显示字段
    viewFields: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  beforeCreate() {},
  created() {
    // 将数组形式的字段信息转换成field对象
    const newItems = {};
    for (const index in this.items) {
      const item = this.items[index];
      newItems[item.field] = item;
    }
    this.newItems = newItems;
    // 计算真正显示的字段信息
    const newViewFields = [];
    if (0 === this.viewFields.length) {
      for (const key in this.newItems) {
        newViewFields.push(this.items[key].field);
      }
    } else {
      for (const key in this.viewFields) {
        const field = this.viewFields[key];
        if (this.newItems[field]) {
          newViewFields.push(field);
        }
      }
    }
    this.newViewFields = newViewFields;
  },
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
    ComponentTimePicker,
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