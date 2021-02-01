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
  <el-form-item v-else :label="item.label" :prop="field" :key="uniqid" class="text-left">
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
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
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

      this.uploadName = this.getExtData("uploadName", "uplaod"); //
      this.headers = this.getExtData("headers"); // 文件头
      this.data = this.getExtData("params", {}); // 上传时附带的参数
      this.withCredentials = this.getExtData("withCredentials", false); // 支持发送 cookie 凭证信息

      this.accept = this.getExtData("accept"); // 接受上传的文件类型
      this.autoUpload = this.getExtData("autoUpload", true); // 是否在选取文件后立即进行上传

      this.beforeUpload = this.getExtData("beforeUpload"); // 上传前检查
      this.succCallback = this.getExtData("succCallback"); // 上传成功后处理
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      if (isFunction(this.beforeUpload)) {
        return this.beforeUpload(file, this);
      }
      return true;
    },
    handleAvatarSuccess(res, file) {
      if (isFunction(this.succCallback)) {
        this.formData[this.field] = this.succCallback(res, file, this);
      } else {
        this.formData[this.field] = URL.createObjectURL(file.raw);
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