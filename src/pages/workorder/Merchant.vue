<!--
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-30 21:24:01
 * @LastEditors: stride
 * @LastEditTime: 2021-05-03 14:45:27
-->
<template>
 <page-layout>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form :form="form" @submit="handleSubmit" ref="change">
      <a-form-item label="头像" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <Upload />
      </a-form-item>
      <a-form-item label="店铺名称" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input v-decorator="['name',{ initialValue:user.name}]" />
      </a-form-item>
      <a-form-item label="用户名" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input v-decorator="['real_name',{ initialValue:user.real_name}]" />
      </a-form-item>
      <a-form-item label="国家" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input v-decorator="['address',{ initialValue:user.address}]" />
      </a-form-item>
      <a-form-item label="地区" :labelCol="{span: 7}" :wrapperCol="{span: 10}">
        <a-input v-decorator="['region',{ initialValue:user.region}]" />
      </a-form-item>
      <a-form-item label="店铺ID" :labelCol="{span: 7}" :wrapperCol="{span: 10}" :required="false">
        <a-input v-decorator="['id',{ initialValue:user.id}]" />
      </a-form-item>
      <a-form-item label="店铺号码" :labelCol="{span: 7}" :wrapperCol="{span: 10}" :required="false">
        <a-input v-decorator="[`tel`,{ initialValue: user.tel }]" />
      </a-form-item>
      <a-form-item style="margin-top: 24px" :wrapperCol="{span: 10, offset: 7}">
        <a-button type="primary" @click="resest">重置</a-button>
        <a-button style="margin-left: 8px" html-type="submit">保存修改</a-button>
      </a-form-item>
    </a-form>
  </a-card>
 </page-layout>
</template>

<script>
import PageLayout from "@/layouts/PageLayout"
import Upload from "@/components/upload/Upload"
import bus from "@/utils/bus"
import { mapMutations } from 'vuex'
import { UpModify } from '@/services/UpModify'
export default {
  name: 'Merchant',
  data() {
    return {
      value: 1,
      fileList: ""
    }
  },
  computed: {
    user() {
      return { ...this.$store.state.account.user }
    }
  },
  components: {
    Upload,
    PageLayout
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'change' });
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    handleSubmit(e) {
      e.preventDefault();
      if (this.fileList[0] == undefined) {
        this.$message.error('请检查图片');
        return
      }
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let x = this.fileList[0].response.photoPath.replace(/dist\//, '')
          values.avatar = 'https://stride.fun/public' + x
          UpModify(values).then(res => {
            if (res.data.code == 401) {
              this.$message.error('请检查图片或者其他参数有无未填');
              return
            }
            if (res.data.code == 200) {
              this.setUser(values)
              this.$message.success('修改成功');
            }
          })
        }
      });
    },
    resest() {
      const form = this.$refs.change.form;
      form.resetFields();
    }
  },
  mounted() {
    bus.$on('fileList', res => {
      this.fileList = res
    })
  },
}
</script>

<style scoped>
</style>