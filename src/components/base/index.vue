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
import {
  isString,
  isArray,
  isUndefined,
  isEmpty,
  inArray,
  replace,
  each,
} from "@qingbing/helper";
import DefMsgs from "./../../message";
// 导出
export default {
  props: {
    // ajax post调用的函数
    ajaxMethod: {
      type: Function,
      default: null,
    },
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
    // 判断字段渲染的类型
    if (!this.isForm) {
      this.isText = true;
    } else if (this.item.input_type === "text") {
      this.isText = true;
    } else if (inArray(this.field, this.textFields)) {
      this.isText = true;
    } else {
      this.isText = false;
    }
    // 设置表单显示时的规则
    if (this.isText) {
      return;
    }
    // 将配置的规则处理成key-values
    this.itemsRules = {};
    if (!isArray(this.item.rules)) {
      return;
    }

    each(this.item.rules, (idx, rule) => {
      if (!isUndefined(rule.type)) {
        rule.label = this.item.label;
        this.itemsRules[rule.type] = rule;
      }
    });
    // 处理必须的规则
    this.addRuleRequired();
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
    // 添加一个规则
    addRule(rule) {
      this.$emit("addRule", this.field, rule);
    },
    // 获取规则的提示信息
    getRuleMessage(rule, defMsg) {
      // 设置
      if (!isUndefined(rule.message) && !rule.message) {
        return rule.message;
      }
      if (isString(defMsg)) {
        return replace(defMsg, rule);
      }
      if (rule.len && isNumber(rule.len)) {
        return replace(defMsg.len, rule);
      }
      if (rule.max && isNumber(rule.max) && rule.min && isNumber(rule.min)) {
        return replace(defMsg.range, rule);
      }
      if (rule.max && isNumber(rule.max)) {
        return replace(defMsg.max, rule);
      }
      if (rule.min && isNumber(rule.min)) {
        return replace(defMsg.min, rule);
      }
      return replace(defMsg.base, rule);
    },
    // 获取规则触发事件
    getRuleTrigger(rule, defEvent) {
      if (!isEmpty(rule.trigger)) {
        return rule.trigger;
      }
      if (!isEmpty(defEvent)) {
        return defEvent;
      }
      return "blur";
    },
    addRuleRequired() {
      if (this.itemsRules.required) {
        const rule = this.itemsRules.required;
        if (!isUndefined(rule.value) && !rule.value) {
          return;
        }
        this.addRule({
          required: true,
          message: this.getRuleMessage(rule, DefMsgs.required),
          trigger: this.getRuleTrigger(rule),
        });
      }
    },
  },
};
</script>

<style lang="scss">
.text-left {
  text-align: left;
}
</style>
