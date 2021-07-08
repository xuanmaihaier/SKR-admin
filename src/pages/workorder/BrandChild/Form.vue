<!--
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-05-03 14:37:52
 * @LastEditors: stride
 * @LastEditTime: 2021-05-03 19:41:52
-->
<template>
  <a-modal :visible="brands.visible" title="修改商品" okText='确定' @cancel="() => { $emit('cancel') }" @ok="() => { $emit('create') }">
    <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="品牌商提供URL">
       <a-input v-decorator="['avatar', { initialValue:listNow.avatar, rules: [{ required: true, message: '请输入url' }] }]" />
      </a-form-item>
      <a-form-item label="品牌名">
        <a-input v-decorator="['title', { initialValue:listNow.title,  rules: [{ required: true, message: '请输入品牌名' }] }]" />
      </a-form-item>
      <a-form-item label="品牌首字母">
          <a-input v-decorator="['content', { initialValue:listNow.content,  rules: [{ required: true, message: '请输入品牌首字母' }] }]" />
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
      form: this.$form.createForm(this, { name: 'coordinat' }),
    };
  },
  props:{
    listNow:{
      type:Object,
      defalut:()=>{}
    }
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
    brands() {
      return { ...this.$store.state.brands }
    }
  },

};
</script>