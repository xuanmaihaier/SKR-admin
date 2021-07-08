<!--
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-05-03 14:37:52
 * @LastEditors: stride
 * @LastEditTime: 2021-05-04 15:59:40
-->
<template>
  <a-modal :visible="voucher.visible" title="添加优惠券" okText='确定' @cancel="() => { $emit('cancel') }" @ok="() => { $emit('create') }">
    <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="商家ID">
        <a-input-number v-decorator="['store_id', { rules: [{ required: true, message: '请输入商家ID' }] }]" />
      </a-form-item>
      <a-form-item label="产品ID">
        <a-input-number v-decorator="['spu_id', { rules: [{ required: true, message: '请输入产品ID' }] }]" />
      </a-form-item>
      <a-form-item label="优惠券名">
        <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入优惠券名' }] }]" />
      </a-form-item>
      <a-form-item label="优惠时间">
      <a-range-picker
        v-decorator="['range-time-picker' ,{ rules: [{ required: true, message: '请输入时间' }] }]"
        show-time
        format="YYYY-MM-DD HH:mm:ss"
      />
    </a-form-item>
      <a-form-item label="deno">
        <a-input-number v-decorator="['deno', {  rules: [{ required: true, message: '请输入deno' }] }]" />
      </a-form-item>
      <a-form-item label="条件">
        <a-input-number v-decorator="['condition', {  rules: [{ required: true, message: '请输入条件' }] }]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: "FormEdit",
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinatedit' }),
    };
  },
  components: {

  },
  methods: {
    handleSelectChange() {

    },
  },
  computed: {
    voucher() {
      return { ...this.$store.state.voucher }
    }
  },

};
</script>