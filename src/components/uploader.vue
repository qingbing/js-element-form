<template>
  <!-- 表单显示 -->
  <el-form-item
    v-if="isText"
    :label="item.label"
    :key="uniqid"
    :style="{ textAlign: labelAlgin }"
  >
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      action=""
      disabled
    >
      <img v-if="formData[field]" :src="formData[field]" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </el-form-item>

  <!-- 表单组件 -->
  <el-form-item
    v-else
    :label="item.label"
    :prop="field"
    :key="uniqid"
    class="text-left"
  >
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :action="action"
      :name="uploadName"
      :withCredentials="withCredentials"
      :headers="headers"
      :data="data"
      :accept="accept"
      :autoUpload="autoUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :on-change="handleChange"
      :before-upload="beforeUpload"
    >
      <img v-if="formData[field]" :src="formData[field]" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </el-form-item>
</template>

<script>
// 导入
import Base from "./base";
import { isUndefined, isFunction } from "@qingbing/helper";
// 导出
export default {
  extends: Base,
  created() {
    if (!this.isText) {
      this.action = this.getExtData("action");
      if (isUndefined(this.action)) {
        this.$message.error("未填写上传的URL");
      }

      this.uploadName = this.getExtData("uploadName", "file"); // 上传的文件字段名
      this.headers = this.getExtData("headers"); // 文件头
      this.data = this.getExtData("params", {}); // 上传时附带的参数
      this.withCredentials = this.getExtData("withCredentials", false); // 支持发送 cookie 凭证信息

      this.accept = this.getExtData("accept"); // 接受上传的文件类型
      this.autoUpload = this.getExtData("autoUpload", true); // 是否在选取文件后立即进行上传

      this.handleBeforeUpload = this.getExtData("beforeUpload"); // 上传前检查
      this.successCallback = this.getExtData("handleSuccess"); // 上传成功后处理
      this.errorCallback = this.getExtData("handleError"); // 上传失败后处理
      this.progressCallback = this.getExtData("handleProgress"); // 上传时后处理
      this.changeCallback = this.getExtData("handleChange"); // 文件状态改变(添加文件、上传成功和上传失败)时处理
    }
  },
  methods: {
    // 文件上传前触发
    beforeUpload(file) {
      if (isFunction(this.handleBeforeUpload)) {
        return this.handleBeforeUpload(file, this);
      }
      return true;
    },
    // 文件上传成功后触发
    handleSuccess(response, file) {
      if (isFunction(this.successCallback)) {
        this.formData[this.field] = this.successCallback(response, file, this);
      } else {
        this.formData[this.field] = URL.createObjectURL(file.raw);
      }
    },
    // 文件上传失败后触发
    handleError(err, file, fileList) {
      if (isFunction(this.errorCallback)) {
        this.errorCallback(err, file, fileList, this);
      }
    },
    // 文件上传时触发
    handleProgress(event, file, fileList) {
      if (isFunction(this.errorCallback)) {
        this.errorCallback(event, file, fileList, this);
      }
    },
    // 文件状态改变(添加文件、上传成功和上传失败)时触发
    handleChange(file, fileList) {
      if (isFunction(this.errorCallback)) {
        this.errorCallback(file, fileList, this);
      }
    },
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>