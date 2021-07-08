<!--
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-28 21:58:50
 * @LastEditors: stride
 * @LastEditTime: 2021-04-29 23:53:11
-->
<template>
  <a-modal :visible="commodity.VisibleThr" title="添加商品类别" okText='完成' @cancel="() => { $emit('cancel') }" @ok="() => { $emit('create') }">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="颜色">
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
      <a-form-item :label="`库存(${index})`" v-for="(item,index) in IMGlength" :key="index">
        <a-input-number v-decorator="[`input-number${index}`,{ rules: [{ required: true, message: '请填写对应库存' }] }, { initialValue: 1 }]" :min="1" :max="9999" />
        <span class="ant-form-text">
          件
        </span>
      </a-form-item>
      <a-form-item label="图片">
        <Upload/>
        <a-alert message="一个颜色代表一张图片哦" type="info" show-icon />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import Upload from "@/components/upload/Upload"
import bus from "@/utils/bus"
export default {
  name: "FormSec",
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinatedsec' }),
      plainOptions : ['红色', '黄色', '蓝色',"绿色","黑色","白色","其他"],
      value: [],
      IMGlength:1
    };
  },
  props: {

  },
  components: {
    Upload,
  },
  methods: {
    handleSelectChange() {

    },
    checkboxonChange(e) {
      this.IMGlength = this.value.length
      this.$store.dispatch('commodity/getLength', this.IMGlength)
      bus.$emit('checkbox',this.value)
    }
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