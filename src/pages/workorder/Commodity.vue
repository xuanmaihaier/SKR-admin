<!--
 * @Descripttion: 商品信息
 * @version: 
 * @Author: stride
 * @Date: 2021-04-27 10:20:21
 * @LastEditors: stride
 * @LastEditTime: 2021-05-05 19:49:34
-->
<template>
  <div>
    <page-layout>
      <a-card :bordered="false">
        <div style="display: flex; flex-wrap: wrap">
          <head-info title="一级目录个数" :content="typeOne.length" :bordered="true" />
          <head-info title="二级目录个数" :content="typeTwo.length" :bordered="true" />
          <head-info title="列表个数" :content="shopList.length" />
        </div>
      </a-card>
      <a-card style="margin-top: 24px" :bordered="false" title="商品分类">
        <div slot="extra">
          <a-select v-if="typeOne.length>0" label-in-value :default-value="{key:typeOne[0]}" style="width: 120px" @change="handleChange">
            <a-select-option v-for="(item,index) in typeOne" :key="index" :value="item">
              {{item}}
            </a-select-option>
          </a-select>
          <a-select v-if="typeTwo.length>0" v-model="typeTwo_fir" style="width: 120px" @change="handleChangeSec">
            <a-select-option v-for="(item,index) in typeTwo" :key="index" :value="item">
              {{item}}
            </a-select-option>
          </a-select>
          <a-input-search style="margin-left: 16px; width: 272px;" />
        </div>
        <a-button type="dashed" style="width: 100%" icon="plus" @click="addShop">添加</a-button>
        <a-list :loading="isloading" size="large" :pagination="{pageSizeOptions,showSizeChanger: true, showQuickJumper: true, defaultPageSize: 10, total: length,onChange,onShowSizeChange}">
          <a-list-item :key="index" v-for="(item,index) in shopList.slice(slice_start,slice_end)">
            <a-list-item-meta :description="`Id:${item.id}`">
              <a-avatar slot="avatar" size="large" shape="square" :src="item.img" />
              <a slot="title" @click="cardClick(index,false)">{{item.title}}</a>
            </a-list-item-meta>
            <div slot="actions" @click="cardClick(index,true)">
              <a>编辑</a>
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
                <span>销量:{{item.sale}}</span>
                <p>价格:{{item.price}}</p>
              </div>
              <div class="list-content-item">
                <span>上架时间</span>
                <p>2021-04-27 22:44</p>
              </div>
              <div class="list-content-item">
                <a-progress :percent="Number((stock[index]/Allstore*100).toFixed(2))" style="width: 180px" />
              </div>
            </div>
          </a-list-item>
        </a-list>
      </a-card>
      <div :key="Date.now()">
        <Form ref="coordinat" :listAct="listAct" :isChange="isChange" @cancel="cancel" @create="create" />
      </div>
      <!-- 点击清除上传图片缓存 -->
      <div :key="Date.now()+1">
        <FormSec ref="collectionForm" @cancel="cancelsec" @create="createsec" :brandName="brandName" :isValue="isValue" />
      </div>
      <div :key="Date.now()+2">
        <FormThr ref="coordinatedsec" @cancel="cancelthr" @create="createthr" />
      </div>
    </page-layout>
  </div>
</template>

<script>
import { getTypeOne, getTypeTwo } from "@/services/getType"
import { getList } from "@/services/getList"
import { getStock } from "@/services/getStock"
import { getBrands } from "@/services/getBrands"
import { addShop, getShop, addSku } from "@/services/addShop"
import { upData } from '@/services/upData'
import { deletShop } from '@/services/deletShop'
import bus from "@/utils/bus"
import HeadInfo from "@/components/tool/HeadInfo"
import Form from "./CommodityChild/Form"
import FormSec from "./CommodityChild/FormSec"
import FormThr from './CommodityChild/FormThr'
import PageLayout from "@/layouts/PageLayout"

// loading的key值
const key = 'updatable';
export default {
  name: "Commodity",
  data() {
    return {
      typeOne: [],
      typeTwo: [],
      shopList: [],
      // 总库存
      Allstore: 3000,
      // 单个商品总库存
      stock: 0,
      typeTwo_fir: "",
      length: 0,
      slice_start: 0,
      slice_end: 10,
      isloading: true,
      // 点击的是修改还是查看
      isChange: false,
      pageSizeOptions: ['10', '20', '30'],
      listAct: {},
      listAct_: {},
      // 品牌
      brand: [],
      brandName: [],
      // 添加的商品
      values: {},
      // 图片地址
      fileList: {},
      imgs: [],
      checkbox: [],
      checkboxsec: [],
      isValue: ""
    }
  },
  components: { HeadInfo, Form, FormSec, FormThr, PageLayout },
  methods: {
    // 获取一级
    async getTypeOne_init() {
      let data = await getTypeOne()
      if (data.data.code != 200) throw new Error('getTypeOne error')
      let typeOne = []
      typeOne = data.data.data.filter(item => {
        return item != ""
      });
      this.typeOne = typeOne
      // 初始化第一个二级
      if (typeOne.length > 0) {
        this.getTypeTwo_init(typeOne[0])
      }
    },
    // 获取二级
    async getTypeTwo_init(value) {
      let data = await getTypeTwo(value)
      if (data.data.code != 200) throw new Error('getTypeTwo error')
      let typeTwo = []
      typeTwo = data.data.data.filter(item => {
        return item != ""
      });
      this.typeTwo = typeTwo
      this.typeTwo_fir = typeTwo[0]
      this.isValue = typeTwo[0]
      // 默认渲染的列表
      if (typeTwo.length > 0) {
        this.getList_init(typeTwo[0])
      }
    },
    // 获取列表
    async getList_init(value) {
      let data = await getList(value)
      if (data.data.code != 200) throw new Error('getList error')
      this.shopList = data.data.data
      this.length = data.data.data.length
      this.getStock_init(data.data.data[0].category_id)
    },
    // 获取库存
    async getStock_init(value) {
      let data = await getStock(value)
      if (data.data.code != 200) throw new Error('getStock error')
      // this.shopList = data.data.data
      let stock = []
      data.data.data.forEach(item => {
        let res = JSON.parse(item.stock)
        let sum = res.reduce((sum, item) => {
          return sum += item
        }, 0);
        stock.push(sum)
      });
      this.stock = stock
      this.isloading = false
    },
    // 获取品牌
    async getBrands_init() {
      let data = await getBrands()
      if (data.data.code != 200) throw new Error('getBrands error')
      this.brand = data.data.data
    },
    // 一级联动回调
    handleChange(value) {
      this.getTypeTwo_init(value.key)
    },
    // 二级联动回调
    handleChangeSec(value) {
      this.isValue = value
      this.getList_init(value)
    },
    // 页码变化
    onChange(page, pageSize) {
      this.slice_start = (page - 1) * pageSize
      this.slice_end = page * pageSize
    },
    // 页码数变化
    onShowSizeChange(current, size) {
      this.slice_start = (current - 1) * size
      this.slice_end = current * size
    },
    // 卡片点击   
    cardClick(index, isChange) {
      this.listAct = this.shopList[index]
      // 该数据需要深拷贝一份 用于修改
      this.listAct_ = JSON.parse(JSON.stringify(this.shopList[index]))
      this.$store.dispatch('commodity/getVisible', true)
      this.$store.dispatch('commodity/getListAct', this.listAct_)
      this.isChange = isChange
    },
    // 关闭按钮
    cancel() {
      this.$store.dispatch('commodity/getVisible', false)
    },
    // 确认按钮
    create() {
      const form = this.$refs.coordinat.form;
      form.validateFields((err, values) => {
        if (err) {
          return
        }
        // (spu_id && price && stock && param
        let obj = {}
        obj.spu_id = values.id
        obj.param = JSON.stringify(this.checkboxsec)
        // obj.stock = JSON.stringify()
        let test = "input-number"
        // console.log(values);
        let arr = []
        for (let x in values) {
          if (x.indexOf(test) != -1) {
            arr.push(values[x])
          }
        }
        obj.stock = JSON.stringify(arr)
        obj.price = values.price
        if (this.checkboxsec.length == 0 || arr.length == 0) {
          this.penMessage("参数有误，请检查有无未填项", "error")
          return
        }
        if (this.checkboxsec.length != arr.length) {
          this.penMessage("一个颜色对应一个库存", "error")
          return
        }
        this.$store.dispatch('commodity/getVisible', false)
        upData(obj).then(res => {
          if (res.data.code != 200) {
            this.penMessage("请检查参数或联系管理员", "error")
            return
          }
          this.penMessage("修改成功", "success")
          form.resetFields();
          this.getList_init(this.isValue)
        })
      })

    },
    // 添加商品form显示
    addShop() {
      // 传入品牌
      let brandName = []
      this.brand.forEach(item => {
        brandName.push(item.name)
      });
      this.brandName = brandName
      this.$store.dispatch('commodity/getVisibleSec', true)
    },
    // 添加商品关闭按钮
    cancelsec() {
      const form = this.$refs.collectionForm.form;
      form.resetFields();
      this.values.img = ""
      this.$store.dispatch('commodity/getVisibleSec', false)
    },
    createsec() {
      let verifyIndex = Date.now()
      const form = this.$refs.collectionForm.form;
      form.validateFields((err, values) => {
        // 为满足表单 return
        if (err || this.fileList.length == undefined) {
          this.penMessage("请正确填写参数", "error")
          return
        }
        values.verifyIndex = verifyIndex
        let x = this.fileList[0].response.photoPath.replace(/dist\//, '')
        values.img = 'https://stride.fun/public' + x
        this.values = values
        // 重置
        addShop(this.values).then(res => {
          if (res.data.code == 401) {
            // 清空上传的图片缓存
            this.values.img = ""
            this.penMessage("参数有误，请检查有无未填项", "error")
            return
          }
          this.penMessage('添加成功,请继续添加类别', "success")
          form.resetFields();
          this.$store.dispatch('commodity/getVisibleSec', false)
          getShop(values.verifyIndex).then(res => {
            if (res.data.code != 200) throw new Error('getShop error')
            this.values.spu_id = res.data.data[0].id,
              this.$store.dispatch('commodity/getVisibleThr', true)
          })
        })
      });
    },
    // 第三个表单关闭
    cancelthr() {
      let code = "close"
      this.$store.dispatch('commodity/getVisibleThr', false)
      // 此处手动关闭 如果是第一次成功第二次取消要删除之前的数据
      this.deletShop_init(this.values.spu_id, code)

    },
    // 第三个表单确定
    createthr() {
      this.imgs = []
      let newfileList = this.fileList
      let obj = {};
      newfileList.forEach((item, index) => {
        if (item.response) {
          let x = item.response.photoPath.replace(/dist\//, '')
          obj.small = 'https://stride.fun/public' + x
          obj.normal = 'https://stride.fun/public' + x
          this.imgs.push(obj);
        }
      })
      if (this.imgs.length == 0 || this.commodity.length == 0) {
        this.penMessage("还没有添加图片", "error")
        return
      }
      if (!(this.imgs.length == this.commodity.length)) {
        this.penMessage("参数和图片数量不符", "error")
        return
      }
      const form = this.$refs.coordinatedsec.form;
      form.validateFields((err, values) => {
        // 为满足表单 return
        if (err) {
          this.imgs = []
          return;
        }
        let stock = []
        for (let x in values) {
          stock.push(values[x])
        }
        let ADDSKU = JSON.parse(JSON.stringify(this.values))
        ADDSKU.imgs = JSON.stringify(this.imgs);
        ADDSKU.stock = JSON.stringify(stock);
        ADDSKU.param = JSON.stringify(this.checkbox)
        addSku(ADDSKU).then(res => {
          if (res.data.code != 200) {
            this.penMessage("添加失败请检查参数", "error")
            return
          }
          this.penMessage("添加成功，请前往详情页查看", "success")
          form.resetFields();
          this.$store.dispatch('commodity/getVisibleThr', false)
          // 重新渲染页面
          this.getList_init(this.isValue)
        })
      });
    },
    // 删除
    showDeleteConfirm(id) {
      let that = this
      console.log(id);
      this.$confirm({
        title: '您确定删除该项数据吗',
        content: '此操作不可恢复，非管理员请勿操作',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          that.deletShop_init(id)
        },
        onCancel() {

        },
      });
    },
    deletShop_init(id, code) {
      deletShop(id).then(res => {
        if (res.data.code != 200) {
          this.penMessage("删除失败，请联系管理员", "error")
          return
        }
        if (code == "close") {
          this.penMessage("用户取消，创建失败", "error")
        } else {
          this.penMessage("删除成功", "success")
        }
        this.getList_init(this.isValue)
      })
    },
    // loading
    penMessage(contents, type) {
      this.$message.loading({ content: 'Loading...', key });
      setTimeout(() => {
        if (type == "success") { this.$message.success({ content: contents, key, duration: 2 }); }
      }, 1000);
      if (type == "error") this.$message.error({ content: contents, key, duration: 2 });
    },
  },
  computed: {
    commodity() {
      return { ...this.$store.state.commodity }
    }
  },
  created() {
    // 初始化一级
    this.getTypeOne_init()
    // 初始化品牌
    this.getBrands_init()
  },
  mounted() {
    bus.$on('fileList', res => {
      this.fileList = res
    })
    bus.$on('checkbox', res => {
      this.checkbox = res
    })
    bus.$on('checkboxsec', res => {
      this.checkboxsec = res
    })
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