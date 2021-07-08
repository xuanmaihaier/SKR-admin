<!--
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-05-01 18:17:42
 * @LastEditors: stride
 * @LastEditTime: 2021-05-01 23:26:06
-->
<template>
  <a-modal :visible="commodity.visible" title="查看订单" okText='确定' @cancel="() => { $emit('cancel') }" @ok="() => { $emit('create') }">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="用户名">
        <a-input disabled v-decorator="['name', {  initialValue:orderDetail.name,rules: [{ required: true, message: '请输入用户名' }] }]" />
      </a-form-item>
      <a-form-item disabled label="付款方式">
        <a-select disabled v-decorator="[
          'payment_type',
          {initialValue:'支付宝', rules: [{ required: true, message: '请输入状态' }] },
        ]">
          <a-select-option value="0">
            支付宝
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态" has-feedback>
        <a-select @change="selectChange" :disabled="flag" v-decorator="[
          'status',
          {initialValue:status, rules: [{ required: true, message: '请输入状态' }] },
        ]">
          <a-select-option value="已付款">
            已付款
          </a-select-option>
          <a-select-option value="已发货">
            已发货
          </a-select-option>
          <a-select-option value="已收货">
            已收货
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="商品价格">
        <a-input-number disabled :min="1" :max="9999" v-decorator="['money', {  initialValue:orderDetail.money,rules: [{ required: true, message: '请输入价格' }] }]" />
      </a-form-item>
      <a-form-item label="实际付款">
        <a-input-number disabled :min="1" :max="9999" v-decorator="['actual_price', {  initialValue:orderDetail.actual_price,rules: [{ required: true, message: '请输入价格' }] }]" />
      </a-form-item>
      <a-form-item label="联系电话">
        <a-input disabled v-decorator="['tel', { initialValue:orderDetail.tel,rules: [{ required: true,  message: '请输入联系电话' }] }]" />
      </a-form-item>
      <a-form-item label="联系地址">
        <a-input disabled v-decorator="['addressed', {initialValue:orderDetail.address, rules: [{ required: true, message: '请输入地址' }] }]" />
      </a-form-item>
       <a-form-item label="订单ID">
        <a-input disabled v-decorator="['id', {initialValue:orderDetail.id, rules: [{ required: true, message: '请输入id' }] }]" />
      </a-form-item>
      <a-form-item label="商品名" v-if="orderDetail.skus&&orderDetail.skus[0]">
        <a-input disabled :placeholder="orderDetail.skus[0].title" />
      </a-form-item>
      <a-form-item label="购买件数" v-if="orderDetail.skus&&orderDetail.skus[0]">
        <a-input disabled :placeholder="orderDetail.skus[0].num" />
      </a-form-item>
      <a-form-item label="收货地址" v-if="orderDetail.status==2">
        <a-input disabled :placeholder="Delivery.address" />
      </a-form-item>
      <a-form-item label="选择快递" v-if="orderDetail.status==2">
        <a-select disabled default-value="普通快递">
          <a-select-option :value="Delivery.ecp">
            {{Delivery.ecp}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="快递单号" v-if="orderDetail.status==2">
        <a-input disabled :placeholder="Delivery.postid" />
      </a-form-item>
      <div v-if="show">
        <a-form-item label="收货地址">
          <a-input v-decorator="['address', { rules: [{ required: true, message: '请输入地址' }] }]" />
        </a-form-item>
        <a-form-item label="选择快递">
          <a-select v-decorator="['ecp',{initialValue:'普通快递', rules: [{ required: true, message: '请输入快递' }] }, ]">
            <a-select-option value="普通快递">
              普通快递
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="快递单号">
          <a-input v-decorator="['postid', { rules: [{ required: true, message: '请输入订单号' }] }]" />
        </a-form-item>
      </div>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: "FormSec",
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      status: "",
      payment_type: "",
      flag: false,
      show: false
    };
  },
  watch: {
    orderDetail: {
      deep: true,
      handler: function (val) {
        if (val.status == 0) {
          this.status = "已付款"
        }
        if (val.status == 1) {
          this.status = "已发货"
        }
        if (val.status == 2) {
          this.flag = true
          this.status = "已收货"
        } else {
          this.flag = false
        }
        if (val.payment_type == 1) {
          this.payment_type = "支付宝"
        }
      }
    }
  },
  props: {
    orderDetail: {
      type: Object,
      default: () => { }
    },
    Delivery: {
      type: Object,
      default: () => { }
    }
  },
  components: {
  },
  methods: {
    handleSelectChange() {

    },
    selectChange(val) {
      if (val == '已收货') {
        this.show = true
      } else {
        this.show = false
      }
    }
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