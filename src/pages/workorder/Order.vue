<!--
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-30 23:52:50
 * @LastEditors: stride
 * @LastEditTime: 2021-05-04 16:42:01
-->
<template>
  <div>
    <page-layout>
      <a-card :bordered="false">
        <div style="display: flex; flex-wrap: wrap">
          <head-info title="总订单数" :content="orderLength" :bordered="true" />
          <head-info title="已收货" :content="count" :bordered="true" />
          <head-info title="未收货" :content="orderLength-count" />
        </div>
      </a-card>
      <a-card style="margin-top: 24px" :bordered="false" title="订单信息">
        <div slot="extra">
          <a-input-search style="margin-left: 16px; width: 272px;" />
        </div>
        <a-button type="dashed" style="width: 100%" icon="plus" @click="addOrder">添加</a-button>
        <a-list :loading="isloading" size="large" :pagination="{pageSizeOptions,showSizeChanger: true, showQuickJumper: true, defaultPageSize: 10, total: orderLength,onChange,onShowSizeChange}">
          <a-list-item :key="index" v-for="(item,index) in order">
            <a-list-item-meta :description="item.code">
              <a slot="title" @click="read(item.id)">订单号</a>
            </a-list-item-meta>
            <div slot="actions">
              <a @click="read(item.id)">编辑</a>
            </div>
            <div slot="actions">
              <a-dropdown>
                <a-menu slot="overlay">
                  <a-menu-item @click="showDeleteConfirm(item.id)"><a>删除</a></a-menu-item>
                </a-menu>
                <a>更多
                  <a-icon type="down" />
                </a>
              </a-dropdown>
            </div>
            <div class="list-content">
              <div class="list-content-item">
                <span>创建时间</span>
                <p>{{item.create_time}}</p>
              </div>
              <div class="list-content-item">
                <span>修改时间</span>
                <p>{{item.update_time}}</p>
              </div>
              <div class="list-content-item">
                <span>用户ID</span>
                <p>{{item.customer_id}}</p>
              </div>
              <div class="list-content-item">
                <span>商品ID</span>
                <p>{{item.id}}</p>
              </div>
              <div class="list-content-item">
                <span>消费金额</span>
                <p>{{item.money}}</p>
              </div>
            </div>
          </a-list-item>
        </a-list>
      </a-card>
      <Form :orderDetail="orderDetail" :Delivery="Delivery" ref="coordinated" @cancel="cancel" @create="create" />
      <FormAdd ref="formadd" @cancel="cancelsec" @create="createsec" />
    </page-layout>
  </div>
</template>

<script>
import PageLayout from "@/layouts/PageLayout"
import HeadInfo from '@/components/tool/HeadInfo'
import Form from './OrderChild/Form'
import FormAdd from './OrderChild/FormAdd'
import package_data_format from '@/utils/timer'
import { getOrder, getOrderDetail, updateOrder, addOrder, deletOrder } from '@/services/order'
import { getDelivery } from '@/services/getDelivery'
export default {
  name: 'StandardList',
  data() {
    return {
      orderLength: 0,
      order: [],
      pageSizeOptions: ['10', '20', '30'],
      size: 10,
      page: 1,
      orderDetail: {},
      isloading: true,
      Delivery: {},
      status: 0,
      id: 0,
      count: 0
    }
  },
  components: { HeadInfo, Form, FormAdd,PageLayout },
  methods: {
    async getOrder_init() {
      let res = await getOrder(1, this.size, this.page)
      let count = 0
      if (res.data.code != 200) throw new Error("getOrder error")
      this.orderLength = res.data.data[1]
      this.order = res.data.data[0]
      this.order.forEach(item => {
        if (item.status == 2) {
          count++
        }
        this.count = count
        item.create_time = String(item.create_time)
        let fotmat = "YYYY-MM-DD hh:mm:ss"
        item.create_time = package_data_format(item.create_time, fotmat)
        item.update_time = package_data_format(item.update_time, fotmat)
      });
      this.isloading = false
    },
    async getOrderDetail_init(id) {
      let res = await getOrderDetail(id)
      if (res.data.code != 200) throw new Error("getOrderDetail error")
      this.orderDetail = res.data.data
      this.status = res.data.data.status
    },
    async getDelivery_init(id) {
      let res = await getDelivery(id)
      if (res.data.code != 200) {
        return
      }
      this.Delivery = res.data.data[0]
    },
    async updateOrder_init(val) {
      let res = await updateOrder(val)
      if (res.data.code != 200) {
        this.$message.error('请正确填写参数');
        return
      }
      this.$message.success('修改成功');
    },
    async addOrder_init(val) {
      let res = await addOrder(val)
      if (res.data.code == 401) {
        this.$message.error('请正确填写参数');
        return
      }
      if (res.data.code == 501) {
        this.$message.info('添加成功,但是您没有填写正确的用户或商品id,或者订单号已经存在');
        return
      }
      if (res.data.code == 200) {
        this.$message.success('添加成功');
      }
      this.getOrder_init()
    },
    async deletOrder_init(id) {
      let res = await deletOrder(id)
      if (res.data.code != 200) {
        this.$message.error('删除失败，请联系管理员');
        return
      }
      this.$message.success('删除成功');
      this.getOrder_init()
    },
    onShowSizeChange(current, size) {
      this.size = size
      this.page = current
      this.getOrder_init()
    },
    onChange(page, pageSize) {
      this.page = page
      this.size = pageSize
      this.getOrder_init()
    },
    read(id) {
      this.id = id
      this.$store.dispatch('order/getVisible', true)
      this.getOrderDetail_init(id)
      this.getDelivery_init(id)
    },
    cancel() {
      this.$store.dispatch('order/getVisible', false)
      const form = this.$refs.coordinated.form
      form.resetFields();
      this.$refs.coordinated.show = false
    },
    create() {
      let status_init = ""
      const form = this.$refs.coordinated.form;
      const that = this
      form.validateFields((err, values) => {
        if (err) {
          this.$message.error('请正确填写参数');
          return
        }
        if (values.status == "已付款") {
          status_init = '0'
        }
        if (values.status == "已发货") {
          status_init = '1'
        }
        if (values.status == "已收货") {
          status_init = '2'
        } else {
          this.flag = false
        }
        if (that.status == status_init) {
          this.$message.info('没有什么需要修改的');
          this.$store.dispatch('order/getVisible', false)
          return
        }
        let obj = {}
        obj.id = values.id
        obj.status = status_init
        if (values.ecp) {
          obj.ecp = values.ecp
        }
        if (values.address) {
          obj.address = values.address
        }
        if (values.postid) {
          obj.postid = values.postid
        }
        this.updateOrder_init(obj)
        this.$store.dispatch('order/getVisible', false)
        this.getOrderDetail_init(id)
        this.getDelivery_init(id)
        form.resetFields();
      })
    },
    // 添加
    addOrder() {
      this.$store.dispatch('order/getVisibleSec', true)
    },
    cancelsec() {
      this.$store.dispatch('order/getVisibleSec', false)
      const form = this.$refs.formadd.form;
      form.resetFields();
    },
    createsec() {
      const form = this.$refs.formadd.form;
      form.validateFields((err, values) => {
        if (err) {
          return
        }
        let obj = {}
        obj.store_id = values.store_id
        obj.customer_id = values.customer_id
        obj.money = values.money
        obj.code = values.code
        let skus = [
          {
            id: values.id,
            title: values.title,
            num: values.num,
            actual_price: values.actual_price
          }
        ]
        obj.skus = JSON.stringify(skus)
        this.addOrder_init(obj)
        this.$store.dispatch('order/getVisibleSec', false)
        this.getOrder_init()
        this.getOrderDetail_init(obj.skus.id)
        this.getDelivery_init(obj.skus.id)
        form.resetFields();
      })
    },
    showDeleteConfirm(id) {
      let that = this
      this.$confirm({
        title: '您确定删除该项数据吗',
        content: '此操作不可恢复，非管理员请勿操作',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          that.deletOrder_init(id)
        },
        onCancel() {

        },
      });
    },
  },
  created() {
    this.getOrder_init()
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