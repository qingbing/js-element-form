<template>
  <span>
    <template v-for="(field, index) in newViewFields">
      <template v-if="inSubComponent(newItems[field].input_type)">
        <component
          :is="newItems[field].input_type"
          :key="'' + uniqid + index"
          :ajaxMethod="ajaxMethod"
          :isForm="isForm"
          :uniqid="'' + uniqid + index"
          :labelAlgin="labelAlgin"
          :textFields="textFields"
          :item="newItems[field]"
          :formData="formData"
          :field="field"
        ></component>
      </template>
    </template>
  </span>
</template>

<script>
// 导入函数
import { uniqid, inArray, isDev } from "@qingbing/helper";
// 导入组件
import ComponentText from "./components/text";
import ComponentInput from "./components/input";
import ComponentTextarea from "./components/textarea";
import ComponentAutocomplete from "./components/autocomplete";
import ComponentRadio from "./components/radio";
import ComponentCheckbox from "./components/checkbox";
import ComponentSwitch from "./components/switch";
import ComponentNumber from "./components/number";
import ComponentSelect from "./components/select";
import ComponentCascader from "./components/cascader";
import ComponentSlider from "./components/slider";
import ComponentTimePicker from "./components/time-picker";
import ComponentDatetimePicker from "./components/datetime-picker";
import ComponentRate from "./components/rate";
import ComponentColorPicker from "./components/color";
import ComponentUploader from "./components/uploader";

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
    // 从本组件中获取定义支持的子组件
    const componentIds = [];
    for (const key in this.$options.components) {
      if (
        Object.hasOwnProperty.call(this.$options.components, key) &&
        "ElementForm" !== key
      ) {
        componentIds.push(key);
      }
    }
    return {
      componentIds,
    };
  },
  components: {
    "view-text": ComponentText,
    "input-text": ComponentInput,
    "input-password": ComponentInput,
    "input-area": ComponentTextarea,
    "input-number": ComponentNumber,
    "input-radio": ComponentRadio,
    "input-checkbox": ComponentCheckbox,
    "input-select": ComponentSelect,
    "ele-switch": ComponentSwitch,
    "ele-cascader": ComponentCascader,
    "ele-slider": ComponentSlider,
    "ele-rate": ComponentRate,
    "ele-color": ComponentColorPicker,
    "ele-uploader": ComponentUploader,
    "time-picker": ComponentTimePicker,
    "datetime-picker": ComponentDatetimePicker,
    "auto-complete": ComponentAutocomplete,
  },
  methods: {
    inSubComponent(componentId) {
      if (inArray(componentId, this.componentIds)) {
        return true;
      }
      if (isDev()) {
        console.error(`element-form中不支持子组件：${componentId}`);
      } else {
        console.log(`element-form中不支持子组件：${componentId}`);
      }
      return false;
    },
  },
};
</script>

<style scoped>
</style>