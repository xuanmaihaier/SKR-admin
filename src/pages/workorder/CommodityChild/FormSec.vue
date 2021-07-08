<!--
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-28 11:32:11
 * @LastEditors: stride
 * @LastEditTime: 2021-05-03 14:44:39
-->
<template>
  <a-modal :visible="commodity.VisibleSec" title="添加商品" okText='下一步' @cancel="() => { $emit('cancel') }" @ok="() => { $emit('create') }">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="图片">
        <Upload />
      </a-form-item>
      <a-form-item label="标题">
        <a-input v-decorator="['title', { rules: [{ required: true, message: '请输入商品名' }] }]" />
      </a-form-item>
      <a-form-item label="品牌ID">
        <a-input-number :min="1" :max="1" v-decorator="['store_id', { rules: [{ required: true, message: '请输入品牌id' }] }]" />
      </a-form-item>
      <a-form-item label="品牌">
        <a-select v-decorator="[
          'brand',
          { rules: [{ required: true }] },
        ]" placeholder="请输入品牌商">
          <a-select-option v-for="(item,index) in brandName" :key="index" :value="item">
            {{item}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="商品分类">
        <a-select v-decorator="[
          'spec',
          { rules: [{ required: true, message: '请输入类别' }] },
        ]" placeholder="请选择该一级目录下的分类">
          <a-select-option  :value="isValue">
            {{isValue}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="价格">
        <a-input-number :min="1" :max="9999" v-decorator="['price', { rules: [{ required: true, message: '请输入价格' }] }]" />
      </a-form-item>
      <a-form-item label="是否优惠">
        <a-input-number :min="1" :max="2" v-decorator="['is_special', { rules: [{ required: true,  message: '请输入是否优惠（1或2）' }] }]" />
      </a-form-item>
      <a-form-item label="优惠价格">
        <a-input-number :min="1" :max="9999" v-decorator="['special_price', { rules: [{ required: true, message: '请输入是否优惠价格' }] }]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import Upload from "@/components/upload/Upload"
export default {
  name: "FormSec",
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  props: {
    brandName: {
      type: Array,
      default: () => []
    },
    isValue: {
      type: String,
      default: ()=> ""
    }
  },
  components: {
    Upload
  },
  methods: {
    handleSelectChange() {

    },
  },
  updated() {

  },
  computed: {
    commodity() {
      return { ...this.$store.state.commodity }
    }
  },

};
</script>