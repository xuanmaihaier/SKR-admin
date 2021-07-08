<!--
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-27 21:22:29
 * @LastEditors: stride
 * @LastEditTime: 2021-04-30 19:45:09
-->
<template>
  <a-modal :visible="commodity.visible" :title="!isChange?'查看工单':'修改工单'" okText="确认" @cancel="() => { $emit('cancel') }" @ok="() => { $emit('create') }">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-form-item label='标题'>
        <a-input disabled v-decorator="[
              'title',
              {
                 initialValue:commodity.listact.title
              }
            ]" />
      </a-form-item>
      <a-form-item label='商品ID'>
        <a-input disabled v-decorator="[
              'id',
              {
                initialValue:commodity.listact.id
              }
            ]" />
      </a-form-item>
      <a-form-item label='商品销量'>
        <a-input disabled  v-decorator="[
              'count',
              {
                 initialValue:commodity.listact.sale
              }
            ]" />
      </a-form-item>
      <a-form-item label='商品价格'>
        <a-input :disabled="!isChange" v-decorator="[
              'price',
              {
                rules: [{ required: true,message: '请输入价格'}],
                initialValue:commodity.listact.price
              }
            ]" />
      </a-form-item>
      <a-form-item label="颜色" v-if="isChange">
        <a-checkbox-group @change="checkboxonChange" v-model="value" :options="plainOptions">
          <a-row>
            <a-col :span="8" v-for="(item,index) in plainOptions" :key="index">
              <a-checkbox>
                {{item.label}}
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item :label="`库存(${index})`" v-if="isChange" v-for="(item,index) in IMGlength" :key="index">
        <a-input-number :disabled="!isChange" :min="1" :max="9999" v-decorator="[
              `input-number${index}`,
              {
                rules: [{  required: true, message: '请填写对应库存'}],
                initialValue:commodity.listact.stock,
               
              }
            ]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import bus from "@/utils/bus"
export default {
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinat' }),
      value: [],
      plainOptions: ['红色', '黄色', '蓝色', "绿色", "黑色", "白色", "其他"],
      IMGlength: 1
    }
  },
  props: {
    isChange: {
      type: Boolean,
      default: false
    }
  },
  created() {

  },
  computed: {
    commodity() {
      return { ...this.$store.state.commodity }
    }
  },
  methods: {
    checkboxonChange(e) {
      this.IMGlength = this.value.length
      this.$store.dispatch('commodity/getLengthsec', this.IMGlength)
      bus.$emit('checkboxsec', this.value)
    }
  },
};
</script>

<style>
</style>