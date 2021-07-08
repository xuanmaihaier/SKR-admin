<!--
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-05-03 12:45:24
 * @LastEditors: stride
 * @LastEditTime: 2021-05-04 16:42:17
-->
<template>
  <div>
    <page-layout>
      <a-card :bordered="false">
        <div class="card-list">
          <a-list :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}" :dataSource="dataSource">
            <a-list-item slot="renderItem" slot-scope="item">
              <template v-if="item.add">
                <a-button class="new-btn" type="dashed" @click="addBrands">
                  <a-icon type="plus" />新增品牌
                </a-button>
              </template>
              <template v-else>
                <a-card :hoverable="true">
                  <a-card-meta @click="edit(item)">
                    <div style="margin-bottom: 3px" slot="title">{{item.title}}</div>
                    <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" :size="50" />
                    <div class="meta-content" slot="description">{{item.content}}</div>
                  </a-card-meta>
                  <a slot="actions" @click="edit(item)">编辑</a>
                  <a slot="actions" @click="showDeleteConfirm(item)">删除</a>
                </a-card>
              </template>
            </a-list-item>
          </a-list>
        </div>
      </a-card>
      <From v-if="dataSource.length>1" ref="coordinat" :listNow="dataSource[index+1]" @cancel="cancel" @create="create" />
      <FromAdd ref="coordinatadd" @cancel="canceladd" @create="createadd" />
    </page-layout>
  </div>
</template>

<script>
import PageLayout from "@/layouts/PageLayout"
import HeadInfo from '@/components/tool/HeadInfo'
import From from './BrandChild/Form'
import FromAdd from './BrandChild/FormAdd'
import { getBrands, updataBrand, addBrand, deletBrand } from '@/services/brands'
const dataSource = []
dataSource.push({
  add: true
})
export default {
  name: 'Brand',
  data() {
    return {
      brand: {},
      dataSource,
      index: 0
    }
  },
  computed: {
    brands() {
      return { ...this.$store.state.brands }
    }
  },
  components: { PageLayout, HeadInfo, From, FromAdd },
  methods: {
    async getBrands_init() {
      let res = await getBrands(this.$store.state.account.user.id)
      if (res.data.code != 200) {
        return
      }
      this.brand = res.data.data
      this.dataSource = [
        {
          add: true
        }
      ]
      this.brand.forEach((item, index) => {
        this.dataSource.push({
          title: item.name,
          avatar: item.image,
          content: item.letter,
          index
        })
      });
    },
    async updataBrand_init(obj) {
      let res = await updataBrand(obj)
      if (res.data.code != 200) {
        this.$message.error("请检查参数")
      }
      this.$message.success("更改成功")
      this.getBrands_init()
    },
    async addBrand_init(obj) {
      let res = await addBrand(obj)
      if (res.data.code == 501) {
        this.$message.error("已经存在该品牌")
        return
      }
      if (res.data.code == 401) {
        this.$message.error("请检查参数")
        return
      }
      if (res.data.code == 200) {
        this.$message.success("添加成功，但是由于数据表问题无法显示")
      }
    },
    async deletBrand_init(id) {
      let res = await deletBrand(id)
      if (res.data.code != 200) {
        this.$message.error("删除失败")
        return
      }
      this.$message.success("删除成功")
      this.getBrands_init()
    },
    edit(item) {
      this.index = item.index
      // this.index = index
      this.$store.dispatch('brands/getVisible', true)
    },
    cancel() {
      const form = this.$refs.coordinat.form;
      this.$store.dispatch('brands/getVisible', false)
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
        if (values.avatar == this.dataSource[this.index + 1].avatar && values.content == this.dataSource[this.index + 1].content && values.title == this.dataSource[this.index + 1].title) {
          this.$message.info("没有什么可修改的")
          this.$store.dispatch('brands/getVisible', false)
          return
        }
        let obj = {
          name: values.title,
          image: values.avatar,
          letter: values.content
        }
        this.updataBrand_init(obj)
        this.$store.dispatch('brands/getVisible', false)
        form.resetFields();
      })
    },
    addBrands() {
      this.$store.dispatch('brands/getVisibleSec', true)
    },
    canceladd() {
      this.$store.dispatch('brands/getVisibleSec', false)
      const form = this.$refs.coordinatadd.form;
      form.resetFields();
    },
    createadd() {
      const form = this.$refs.coordinatadd.form;
      form.validateFields((err, values) => {
        // 为满足表单 return
        if (err) {
          this.$message.error("请正确填写参数")
          return
        }
        let obj = {
          name: values.title,
          image: values.avatar,
          letter: values.content
        }
        this.addBrand_init(obj)
      })
    },
    showDeleteConfirm(item) {
      let that = this
      this.$confirm({
        title: '您确定删除该项数据吗',
        content: '此操作不可恢复，非管理员请勿操作',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          that.deletBrand_init(item.index + 1)
        },
        onCancel() {

        },
      });
    },
  },
  created() {
    this.getBrands_init()
  },
}
</script>

<style lang="less" scoped>
.card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
}
.new-btn {
  border-radius: 2px;
  width: 100%;
  height: 187px;
}
.meta-content {
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  height: 64px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>

