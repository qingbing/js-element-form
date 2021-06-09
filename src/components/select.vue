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

  <!-- 表单组件～常规选项 -->
  <el-form-item
    v-else-if="!isRemote"
    :label="item.label"
    :prop="field"
    :key="uniqid"
    class="text-left"
  >
    <el-select
      v-model="formData[field]"
      :placeholder="placeholder"
      :clearable="clearable"
      :multiple="multiple"
      :filterable="filterable"
      @change="handleChange"
      @blur="handleBlur"
    >
      <el-option
        v-for="(val, key) in item.exts.options"
        :key="key"
        :label="val"
        :value="key"
      >
      </el-option>
    </el-select>
  </el-form-item>

  <!-- 表单组件～远端选项 -->
  <el-form-item
    v-else
    :label="item.label"
    :prop="field"
    :key="uniqid"
    class="text-left"
  >
    <el-select
      v-model="formData[field]"
      :placeholder="placeholder"
      :clearable="clearable"
      :multiple="multiple"
      remote
      filterable
      :loading="loading"
      :remote-method="remoteMethod"
      @change="handleChange"
      @blur="handleBlur"
    >
      <el-option
        v-for="(val, key) in item.exts.options"
        :key="key"
        :label="val"
        :value="key"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
import {
  isArray,
  isUndefined,
  isFunction,
  sprintf,
  each,
} from "@qingbing/helper";
// 导出
export default {
  extends: Base,
  data() {
    return {
      trigger: "change",
    };
  },
  created() {
    this.formData[this.field] = "" + this.formData[this.field];
    if (!this.isText) {
      const placeholder = this.getExtData("placeholder");
      if (isUndefined(placeholder)) {
        this.placeholder = sprintf("请选择 %s", this.item.label);
      } else {
        this.placeholder = placeholder;
      }
      this.clearable = this.getExtData("clearable", true);
      this.multiple = this.getExtData("multiple", false);
      // 默认选项
      // this.options = this.getExtData("options", {});

      const callback = this.getExtData("callback");
      const fetchUrl = this.getExtData("fetchUrl");
      // 远端定义 url
      this.beforeFetch = this.getExtData("beforeFetch");
      if (!isUndefined(callback)) {
        // 远端定义方法
        if (!isFunction(callback)) {
          throw new Error(`ElementForm-select 中 callback 必须定义成函数`);
        }
        this.userCallback = callback;

        this.isRemote = true;
        this.remoteType = "function";
        this.remoteMethod = this.customRemoteMethod;
      } else if (!isUndefined(fetchUrl)) {
        this.fetchUrl = fetchUrl;
        this.fetchData = this.getExtData("fetchData", {});
        this.fetchMethod = this.getExtData("fetchMethod", "POST");

        this.isRemote = true;
        this.remoteType = "ajax";
        this.remoteMethod = this.customRemoteMethod;
      } else {
        this.isRemote = false;
      }
      // 非远端和远端的参数赋值
      if (this.isRemote) {
        this.loading = false;
      } else {
        // 可搜索
        this.filterable = this.getExtData("filterable", false);
      }
    }
  },
  methods: {
    async customRemoteMethod(keyword) {
      if (isFunction(this.beforeFetch)) {
        // 在获取远端数据之前需要执行的函数，可在该函数中添加获取是的参数等信息
        await this.beforeFetch(this.fetchData, this.formData);
      }
      this.loading = true;
      if ("function" == this.remoteType) {
        this.item.exts.options = await this.userCallback(keyword);
      } else {
        // 增加查询的输入框信息
        this.fetchData.keyword = keyword;
        // 获取远端数据
        this.item.exts.options = await this.ajaxMethod(
          this.fetchUrl,
          this.fetchData,
          this.fetchMethod
        );
      }
      this.loading = false;
    },
  },
  watch: {
    formData: {
      handler(newValue, oldValue) {
        this.formData[this.field] = "" + this.formData[this.field];
      },
      immediate: true,
      // deep:true,
    },
  },
  computed: {
    viewText() {
      // 计算选择过的标签的值
      let selected = this.formData[this.field];
      if (!isArray(selected)) {
        if (isUndefined(selected)) {
          selected = [];
        } else {
          selected = [selected];
        }
      }
      const options = this.item.exts.options;
      const text = [];
      each(selected, (select) => {
        text.push(options[select]);
      });
      return text.join(",");
    },
  },
};
</script>