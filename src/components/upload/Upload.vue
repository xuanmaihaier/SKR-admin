<!--
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-28 13:09:57
 * @LastEditors: stride
 * @LastEditTime: 2021-04-29 23:17:22
-->
<template>
  <div class="clearfix">
    <a-upload action="https://stride.fun/upload/upload" list-type="picture-card" :file-list="fileList" @preview="handlePreview" @change="handleChange">
      <div v-if="fileList.length < (commodity.length=commodity.length==0?1:commodity.length)">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
import bus from "@/utils/bus"
export default {
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [

      ],
      imgFile: []
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
      console.log(this.previewImage);
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
      bus.$emit('fileList', this.fileList)
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJPG) {
        this.$message.error('仅支持jpeg/png格式!');
      }
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.error('上传不能超过5MB!');
      }
      return isJPG && isLt2M;
    },
  },
  computed: {
    commodity() {
      return { ...this.$store.state.commodity }
    }
  },
};
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>