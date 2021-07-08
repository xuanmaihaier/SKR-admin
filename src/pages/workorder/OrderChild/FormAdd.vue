<!--
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-05-02 13:50:42
 * @LastEditors: stride
 * @LastEditTime: 2021-05-02 15:02:15
-->
<template>
  <a-modal :visible="commodity.visibleSec" title="添加订单" okText='确定' @cancel="() => { $emit('cancel') }" @ok="() => { $emit('create') }">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="用户ID">
        <a-input-number :min="1" :max="9999" v-decorator="['customer_id', {initialValue:'7' ,rules: [{ required: true, message: '请输入用户id' }] }]" />
      </a-form-item>
      <a-form-item label="店铺ID">
        <a-input-number :min="1" :max="1" v-decorator="['store_id', { rules: [{ required: true, message: '请输入店铺id' }] }]" />
      </a-form-item>
      <a-form-item label="商品金额">
        <a-input-number :min="1" :max="9999" v-decorator="['money', { rules: [{ required: true, message: '请输入消费金额' }] }]" />
      </a-form-item>
      <a-form-item label="订单号">
        <a-input v-decorator="['code', { rules: [{ required: true, message: '请输入订单号' }] }]" />
      </a-form-item>
      <a-form-item label="商品ID">
        <a-input v-decorator="['id', { initialValue:'649', rules: [{ required: true, message: '请输入商品id' }] }]" />
      </a-form-item>
      <a-form-item label="商品名称">
        <a-input v-decorator="['title', { rules: [{ required: true,  message: '请输入商品名称' }] }]" />
      </a-form-item>
      <a-form-item label="购买数量">
        <a-input-number :min="1" :max="9999" v-decorator="['num', { rules: [{ required: true, message: '请输入购买数量' }] }]" />
      </a-form-item>
      <a-form-item label="实际付款">
        <a-input-number :min="1" :max="9999" v-decorator="['actual_price', { rules: [{ required: true, message: '请输入实际付款' }] }]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: "FormSec",
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'formadd' }),
    };
  },
  props: {

  },
  components: {
  },
  methods: {
    handleSelectChange() {

    },
  },
  updated() {

  },
  computed: {
    commodity() {
      return { ...this.$store.state.order }
    }
  },

};
</script>