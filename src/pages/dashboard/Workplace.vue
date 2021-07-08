<!--
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-26 10:24:29
 * @LastEditors: stride
 * @LastEditTime: 2021-05-04 21:38:50
-->
<template>
  <div class="Dashboard">
    <page-layout :avatar="avatar">
      <div slot="headerContent" class="user">
        <span>{{timerNow}}，{{user}}，希望你今天工作的愉快</span>
        <p>SKR前端部门成员</p>
      </div>
      <template slot="extra">
        <head-info class="split-right" title="project" content="3" />
        <head-info class="split-right" title="ranking" content="2/3" />
        <head-info class="split-right" title="visit" content="110" />
      </template>
      <template>
        <a-row style="margin: 0 -12px">
          <a-col style="padding: 0 12px" :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card class="project-list" style="margin-bottom: 24px;" :bordered="false" title="进行中的项目" :body-style="{padding: 0}">
              <div>
                <a-card-grid :key="i" v-for="(item, i) in projects">
                  <a-card :bordered="false" :body-style="{padding: 0}">
                    <a-card-meta :description="item.desc">
                      <div slot="title" class="card-title">
                        <a-avatar size="small" :src="item.logo" />
                        <span>{{item.name}}</span>
                      </div>
                    </a-card-meta>
                    <div class="project-item">
                      <a class="group" href="/#/">SKR团队</a>
                      <span class="datetime">{{item.time}}</span>
                    </div>
                  </a-card>
                </a-card-grid>
              </div>
            </a-card>
            <a-card title="动态" :bordered="false">
              <a-list>
                <a-list-item :key="index" v-for="(item, index) in activities">
                  <a-list-item-meta>
                    <div slot="title" v-html="item.title" />
                    <div slot="description">{{item.date}}</div>
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </a-card>
          </a-col>
        </a-row>
      </template>
    </page-layout>
  </div>
</template>

<script>
import PageLayout from "@/layouts/PageLayout"
import HeadInfo from '@/components/tool/HeadInfo'
import { timeFix } from "@/utils/timenow"
export default {
  name: "Dashboard",
  data() {
    return {
      user: this.$store.state.account.user.name,
      avatar: this.$store.state.account.user.avatar,
      timerNow: "",
      projects: [
        {
          name: "SKR C端",
          time: "1小时前",
          logo: require("@/assets/img/favicon.png")
        },
        {
          name: "SKR 手机端",
          time: "8小时前",
          logo: require("@/assets/img/favicon.png")
        },
        {
          name: "SKR Admin",
          time: "1天前",
          logo: require("@/assets/img/favicon.png")
        }
      ],
      activities: [
        {
          title: "确定框架为antd-admin-vue",
          date: "2021/4.30"
        },
        {
          title: "完成路由，删除多余界面",
          date: "2021/4.30"
        },
        {
          title: "完成客服功能",
          date: "2021/4.30"
        },
        {
          title: "完成我的事务页面大体功能",
          date: "2021/5.1-2021/5.4"
        }
      ]
    }
  },
  components: {
    PageLayout,
    HeadInfo
  },
  created() {
    let timerNow = timeFix()
    this.timerNow = timerNow.CN
  },
}
</script>

<style lang="less" scoped>
.Dashboard {
  .user {
    span {
      font-size: 20px;
      color: rgba(0, 0, 0, 0.85);
    }
    p {
      margin-top: 10px;
    }
  }
  .card-title {
    padding: 6px 0;
  }
  .card-title {
    span {
      margin-left: 3px;
    }
  }
}
/deep/ .page-header {
  margin: 0;
}
</style>