<!--
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-05-03 14:37:52
 * @LastEditors: stride
 * @LastEditTime: 2021-05-03 19:47:01
-->
<template>
  <a-modal :visible="brands.visibleSec" title="添加商品" okText='确定' @cancel="() => { $emit('cancel') }" @ok="() => { $emit('create') }">
    <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="品牌商提供URL">
       <a-input v-decorator="['avatar', { rules: [{ required: true, message: '请输入url' }] }]" />
      </a-form-item>
      <a-form-item label="品牌名">
        <a-input v-decorator="['title', {   rules: [{ required: true, message: '请输入品牌名' }] }]" />
      </a-form-item>
      <a-form-item label="品牌首字母">
          <a-input v-decorator="['content', {   rules: [{ required: true, message: '请输入品牌首字母' }] }]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinatadd' }),
    };
  },
  props:{

  },
  components: {
    
  },
  methods: {

  },
  updated() {

  },
  computed: {
    brands() {
      return { ...this.$store.state.brands }
    }
  },

};
</script>