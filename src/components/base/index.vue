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
  isNumber,
  isArray,
  isUndefined,
  isFunction,
  isObject,
  isEmpty,
  inArray,
  replace,
  copy,
  each,
} from "@qingbing/helper";
import DefMsgs from "./../../message";
import moment from "moment";

function strtotime(str) {
  return parseFloat(moment(str).format("x"));
}

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
    if (!isArray(this.item.rules)) {
      return;
    }
    // 规则处理
    each(this.item.rules, (rule) => {
      if (!isUndefined(rule.type)) {
        rule.label = this.item.label;
        const methodName = rule.type + "Rule";
        if (isFunction(this[methodName])) {
          this[methodName](rule);
        }
      }
    });
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
      if (!isEmpty(rule.message)) {
        return rule.message;
      }
      if (isString(defMsg)) {
        return replace(defMsg, rule);
      }
      if (!isEmpty(rule.len)) {
        return replace(defMsg.len, rule);
      }
      if (!isEmpty(rule.min) && !isEmpty(rule.max)) {
        return replace(defMsg.range, rule);
      }
      if (!isEmpty(rule.max)) {
        return replace(defMsg.max, rule);
      }
      if (!isEmpty(rule.min)) {
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
      if (this.trigger) {
        return this.trigger;
      }
      return "blur";
    },
    // 常规规则添加
    addCommonRule(rule, type, defEvent) {
      this.addRule({
        type,
        message: this.getRuleMessage(rule, DefMsgs[type]),
        trigger: this.getRuleTrigger(rule, defEvent),
      });
    },
    // 必填规则
    requiredRule(rule) {
      if (!isUndefined(rule.value) && !rule.value) {
        return;
      }
      this.addRule({
        required: true,
        message: this.getRuleMessage(rule, DefMsgs.required),
        trigger: this.getRuleTrigger(rule),
      });
    },
    booleanRule(rule) {
      rule.enum = [0, 1];
      this.addRule({
        type: "enum",
        enum: rule.enum,
        message: this.getRuleMessage(rule, DefMsgs.enum),
        trigger: this.getRuleTrigger(rule, "click"),
      });
    },
    enumRule(rule) {
      if (isEmpty(rule.enum)) {
        let ops = this.getExtData("options");
        if (isArray(ops)) {
          rule.enum = copy(ops);
        } else {
          rule.enum = [];
          each(ops, (_, key) => {
            rule.enum.push(key);
          });
        }
      }
      if (!isArray(rule.enum)) {
        throw new Error("element-form 验证规则 enum 必须设置成数组");
      }
      this.addRule({
        type: "enum",
        enum: rule.enum,
        message: this.getRuleMessage(rule, DefMsgs.enum),
        trigger: this.getRuleTrigger(rule),
      });
    },
    emailRule(rule) {
      this.addCommonRule(rule, "email", "blur");
    },
    urlRule(rule) {
      this.addCommonRule(rule, "url", "blur");
    },
    regexpRule(rule) {
      this.addCommonRule(rule, "regexp", "blur");
    },
    hexRule(rule) {
      this.addCommonRule(rule, "hex", "blur");
    },
    patternRule(rule) {
      if (isEmpty(rule.pattern)) {
        throw new Error("element-form 验证规则 pattern 必须设置 pattern");
      }
      if (isString(rule.pattern)) {
        rule.pattern = eval(rule.pattern);
      }
      this.addRule({
        pattern: rule.pattern,
        message: this.getRuleMessage(rule, DefMsgs.pattern),
        trigger: this.getRuleTrigger(rule),
      });
    },
    usernameRule(rule) {
      rule.message = this.getRuleMessage(rule, DefMsgs.username);
      rule.pattern = /^[\u4e00-\u9fa5a-zA-Z0-9_\-.]{2,18}$/;
      this.patternRule(rule);
    },
    passwordRule(rule) {
      rule.message = this.getRuleMessage(rule, DefMsgs.password);
      rule.pattern = /(?!^\d+$)(?!^[A-Za-z]+$)(?!^[^A-Za-z0-9]+$)^\S{6,20}$/;
      this.patternRule(rule);
    },
    zipcodeRule(rule) {
      rule.message = this.getRuleMessage(rule, DefMsgs.zipcode);
      rule.pattern = /^\d{6}$/;
      this.patternRule(rule);
    },
    mobileRule(rule) {
      rule.message = this.getRuleMessage(rule, DefMsgs.mobile);
      rule.pattern = /^0?1\d{10}$/;
      this.patternRule(rule);
    },
    phoneRule(rule) {
      rule.message = this.getRuleMessage(rule, DefMsgs.phone);
      rule.pattern = /^0[1-9]\d{1,2}-[1-9]\d{6,7}(-\d{1,4})?$/;
      this.patternRule(rule);
    },
    contactRule(rule) {
      rule.message = this.getRuleMessage(rule, DefMsgs.contact);
      rule.pattern = /^(0[1-9]\d{1,2}-[1-9]\d{6,7}(-\d{1,4})?)|(0?1\d{10})$/;
      this.patternRule(rule);
    },
    faxRule(rule) {
      rule.message = this.getRuleMessage(rule, DefMsgs.fax);
      rule.pattern = /^0[1-9]\d{1,2}-[1-9]\d{6,7}(-\d{1,4})?$/;
      this.patternRule(rule);
    },
    ipv4Rule(rule) {
      rule.message = this.getRuleMessage(rule, DefMsgs.ipv4);
      rule.pattern = /^((25[0-5])|(2[0-4]\d)|(1?\d{1,2})\.){3}((25[0-5])|(2[0-4]\d)|(1?\d{1,2}))$/;
      this.patternRule(rule);
    },
    dateRule(rule) {
      this.isDateRule = true;
      if (
        !isEmpty(this.formData[this.field]) &&
        !isNumber(this.formData[this.field])
      ) {
        this.formData[this.field] = strtotime(this.formData[this.field]);
      }
      const _msg = DefMsgs.date;

      const dateType = this.getExtData("type", "date");
      let valueFormat;
      switch (dateType) {
        case "year":
          valueFormat = "YYYY";
          break;
        case "month":
          valueFormat = "YYYY-MM";
          break;
        case "datetime":
          valueFormat = "YYYY-MM-DD hh:mm:ss";
          break;
        default:
          valueFormat = "YYYY-MM-DD";
          break;
      }
      const rule1 = copy(rule);
      if (!isEmpty(rule.min)) {
        if (isNumber(rule.min)) {
          rule1.min = moment(rule.min).format(valueFormat);
        } else {
          rule.min = strtotime(rule.min);
        }
      }
      if (!isEmpty(rule.max)) {
        if (isNumber(rule.max)) {
          rule1.max = moment(rule.max).format(valueFormat);
        } else {
          rule.max = strtotime(rule.max);
        }
      }
      rule.message = this.getRuleMessage(rule1, DefMsgs.date);
      rule.trigger = this.getRuleTrigger(rule, "blur");
      this.addRule(rule);
    },
    stringRule(rule) {
      if (isEmpty(rule.max)) {
        // 取 input-text 的配置
        const max = this.getExtData("maxlength");
        if (!isEmpty(max) && max > 0) {
          rule.max = max;
        }
      }
      if (isEmpty(rule.min)) {
        // 取 input-text 的配置
        const min = this.getExtData("minlength");
        if (!isEmpty(min) && min > 0) {
          rule.min = min;
        }
      }
      rule.message = this.getRuleMessage(rule, DefMsgs.string);
      this.addRule(rule);
    },
    numberRule(rule, dataType) {
      this.isNumberRule = true;
      if (isEmpty(dataType)) {
        dataType = "number";
      }
      if (isEmpty(rule.max)) {
        // 取 input-number 的配置
        const max = this.getExtData("max");
        if (!isEmpty(max)) {
          rule.max = max;
        }
      }
      if (isEmpty(rule.min)) {
        // 取 input-number 的配置
        const min = this.getExtData("min");
        if (!isEmpty(min)) {
          rule.min = min;
        }
      }
      rule.message = this.getRuleMessage(rule, DefMsgs[dataType]);
      this.addRule(rule);
    },
    integerRule(rule) {
      this.numberRule(rule, "integer");
    },
    floatRule(rule) {
      this.numberRule(rule, "float");
    },
    arrayRule(rule) {
      if (isEmpty(rule.max)) {
        // 取 input-number 的配置
        const max = this.getExtData("max");
        if (!isEmpty(max)) {
          rule.max = max;
        }
      }
      if (isEmpty(rule.min)) {
        // 取 input-number 的配置
        const min = this.getExtData("min");
        if (!isEmpty(min)) {
          rule.min = min;
        }
      }
      rule.trigger = "change";
      rule.message = this.getRuleMessage(rule, DefMsgs.array);
      this.addRule(rule);
    },
    // 回调验证
    callbackRule(rule) {
      rule.trigger = this.getRuleTrigger(rule, "blur");
      rule.validator = this.customRuleCallback;
      this.addRule(rule);
    },
    customRuleCallback(rule, val, cb) {
      const params = isObject(rule.params) ? copy(rule.params) : {};
      if (isArray(rule.fields)) {
        each(rule.fields, (value) => {});
      }
      console.log(rule, val);
      console.log("========");
    },
  },
};
</script>

<style lang="scss">
.text-left {
  text-align: left;
}
</style>
