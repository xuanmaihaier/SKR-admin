<!--
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-05-04 13:28:12
 * @LastEditors: stride
 * @LastEditTime: 2021-05-04 16:41:39
-->
<template>
  <div>
    <page-layout>
      <a-card style="margin-top: 24px" :bordered="false" title="已发放优惠券">
        <div slot="extra">
          <a-input-search style="margin-left: 16px; width: 272px;" />
        </div>
        <a-button type="dashed" style="width: 100%" icon="plus" @click="addVoucher">添加</a-button>
        <a-list :loading="isloading" size="large">
          <a-list-item :key="index" v-for="(item,index) in vouchers">
            <a-list-item-meta :description="item.name">
              <a slot="title"  @click="edit(item)">优惠卷额度</a>
            </a-list-item-meta>
            <div slot="actions">
              <a @click="edit(item)">编辑</a>
            </div>
            <div slot="actions">
              <a-dropdown>
                <a-menu slot="overlay">
                  <a-menu-item @click="delet(item.id)"><a>删除</a></a-menu-item>
                </a-menu>
                <a>更多
                  <a-icon type="down" />
                </a>
              </a-dropdown>
            </div>
            <div class="list-content">
              <div class="list-content-item">
                <span>开始时间</span>
                <p>{{item.start_time}}</p>
              </div>
              <div class="list-content-item">
                <span>结束时间</span>
                <p>{{item.end_time}}</p>
              </div>
            </div>
          </a-list-item>
        </a-list>
      </a-card>
      <Form ref="coordinat" @cancel="cancel" @create="create" />
      <FormEdit ref="coordinatedit" :voucherNow="voucherNow" @cancel="canceledit" @create="createedit" />
    </page-layout>
  </div>
</template>

<script>
import PageLayout from "@/layouts/PageLayout"
import Form from './VoucherChild/Form'
import FormEdit from './VoucherChild/FormEdit'
import HeadInfo from '@/components/tool/HeadInfo'
import { getVoucher, addVoucher, editVoucher, deleteVoucher } from '@/services/voucher'
export default {
  name: 'StandardList',
  data() {
    return {
      vouchers: [],
      voucherNow: {},
      isloading: true
    }
  },
  computed: {
    voucher() {
      return { ...this.$store.state.voucher }
    }
  },
  components: { HeadInfo, PageLayout, Form, FormEdit },
  methods: {
    async getVoucher_init() {
      let res = await getVoucher(this.$store.state.account.user.id)
      if (res.data.code != 200) {
        this.$message.error("参数错误，请检查参数")
        return
      }
      this.isloading = false
      this.vouchers = res.data.data
    },
    async addVoucher_init(obj) {
      let res = await addVoucher(obj)
      if (res.data.code != 200) {
        this.$message.error("参数错误，请检查参数")
        return
      }
      if (res.data.code == 501) {
        this.$message.error("请检查id是否存在，商品测试id:973")
        return
      }
      this.$message.success("添加成功")
      this.getVoucher_init()
    },
    async editVoucher_init(obj) {
      let res = await editVoucher(obj)
      if (res.data.code != 200) {
        this.$message.error("参数错误，请检查参数")
        return
      }
      this.$message.success("修改成功")
      this.getVoucher_init()
    },
    async deleteVoucher_init(id) {
      let res = await deleteVoucher(id)
      if (res.data.code != 200) {
        this.$message.error("参数错误，请检查参数")
        return
      }
      this.$message.success("删除成功")
      this.getVoucher_init()
    },
    addVoucher() {
      this.$store.dispatch('voucher/getVisible', true)
    },
    cancel() {
      const form = this.$refs.coordinat.form;
      this.$store.dispatch('voucher/getVisible', false)
      form.resetFields();
    },
    create() {
      const form = this.$refs.coordinat.form;
      form.validateFields((err, values) => {
        // 为满足表单 return
        if (err) {
          this.$message.error("请正确填写参数")
          return
        }
        let start_time = values["range-time-picker"][0].format('YYYY-MM-DD')
        let end_time = values["range-time-picker"][1].format('YYYY-MM-DD')
        let date = new Date(start_time.replace(/-/g, '/'))
        let date_ = new Date(end_time.replace(/-/g, '/'))
        start_time = date.getTime()
        end_time = date_.getTime()
        let obj = {
          name: values.name,
          store_id: values.store_id,
          spu_id: values.spu_id,
          deno: values.deno,
          condition: values.condition,
          start_time,
          end_time
        }
        this.addVoucher_init(obj)
        form.resetFields();
        this.$store.dispatch('voucher/getVisible', false)
      })
    },
    edit(item) {
      this.voucherNow = item
      this.$store.dispatch('voucher/getVisibleSec', true)
    },
    canceledit() {
      this.$store.dispatch('voucher/getVisibleSec', false)
      const form = this.$refs.coordinatedit.form;
      form.resetFields();
    },
    createedit() {
      const form = this.$refs.coordinatedit.form;
      form.validateFields((err, values) => {
        // 为满足表单 return
        if (err) {
          this.$message.error("请正确填写参数")
          return
        }
        let start_time = values["range-time-picker"][0].format('YYYY-MM-DD')
        let end_time = values["range-time-picker"][1].format('YYYY-MM-DD')
        let date = new Date(start_time.replace(/-/g, '/'))
        let date_ = new Date(end_time.replace(/-/g, '/'))
        start_time = date.getTime()
        end_time = date_.getTime()
        let obj = {
          name: values.name,
          id: values.id,
          deno: values.deno,
          condition: values.condition,
          start_time,
          end_time
        }
        this.editVoucher_init(obj)
        form.resetFields();
        this.$store.dispatch('voucher/getVisibleSec', false)
      })
    },
    delet(id) {
      let that = this
      this.$confirm({
        title: '您确定删除该项数据吗',
        content: '此操作不可恢复，非管理员请勿操作',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          that.deleteVoucher_init(id)
        },
        onCancel() {

        },
      });

    }
  },
  created() {
    this.getVoucher_init()
    // this.addVoucher_init()
  },
}
</script>

<style lang="less" scoped>
.list-content-item {
  color: @text-color-second;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
  span {
    line-height: 20px;
  }
  p {
    margin: 4px 0 0;
    line-height: 22px;
  }
}
</style>