<!--
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-26 13:34:36
 * @LastEditors: stride
 * @LastEditTime: 2021-05-05 19:00:34
-->
<template>
  <div>
    <a-row style="margin-top: 0" :gutter="[24, 24]">
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" title="总销售额" :total="`￥ ${sum}`">
          <a-tooltip title="从开店以来的总销售额" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend style="margin-right: 16px" term="上涨" :percent="100" :is-increase="true" :scale="0" />
            <trend term="下降" :target="100" :value="99" :scale="0" />
          </div>
          <div slot="footer"><span>日均销售额 ￥{{dailysales}}</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" title="总商品数" :total="`${listLength}件`">
          <a-tooltip title="商品入库数量" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend style="margin-right: 16px" term="上涨" :percent="100" :is-increase="true" :scale="0" />
            <trend term="下降" :target="100" :value="99" :scale="0" />
          </div>
          <div slot="footer"><span>总商品数 {{listLength}} 件</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" title="总销量" :total="`${allSale}件`">
          <a-tooltip title="从开店以来的销量" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend style="margin-right: 16px" term="上涨" :percent="100" :is-increase="true" :scale="0" />
            <trend term="下降" :target="100" :value="99" :scale="0" />
          </div>
          <div slot="footer"><span>日均销量 {{allSaleDay}} 件</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <chart-card :loading="loading" title="开店时长" :total="`${T}天`">
          <a-tooltip title="开店时长" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
        </chart-card>
      </a-col>
    </a-row>
    <a-card :loading="loading" style="margin-top: 24px" :bordered="false" :body-style="{padding: '24px'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <a-tab-pane loading="true" tab="销量" key="1">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar title="销量图" :rankList="rankList"/>
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <ranking-list title="销量排行榜" :list="rankList" />
              </a-col>
            </a-row>
          </a-tab-pane>
          <!-- <a-tab-pane tab="收入" key="2">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar title="收入图" />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <ranking-list title="收入排行榜" :list="rankList" />
              </a-col>
            </a-row>
          </a-tab-pane> -->
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script>
import { getShopList } from "@/services/getShopList"
import ChartCard from '@/components/card/ChartCard'
import Trend from '@/components/chart/Trend'
import MiniBar from '@/components/chart/MiniBar'
import RankingList from '@/components/chart/RankingList'
import Bar from '@/components/chart/Bar'
import { getOrder } from '@/services/order'
import { all } from 'deepmerge'
const rankList = []
for (let i = 0; i < 8; i++) {
  rankList.push({
    name: '桃源村' + i + '号店',
    total: 1234.56 - i * 100
  })
}
export default {
  name: "Analysis",
  data() {
    return {
      loading: true,
      //总销售额
      sum: 0,
      // 创店时的时间戳
      start: 1619791305000,
      // 日均销售
      dailysales: 0,
      rankList,
      listLength: 0,
      // 总销量
      allSale: 0,
      //日均销量
      allSaleDay: 0,
      // 开店时长
      T:0,
      rankOrder:[
        
      ]
    }
  },
  components: {
    ChartCard,
    Trend,
    MiniBar,
    RankingList,
    Bar
  },
  methods: {
    async getOrder_init() {
      let res = await getOrder(this.$store.state.account.user.id, 999, 1)
      if (res.data.code != 200) throw new Error("获取订单失败")
      let sum = res.data.data[0].reduce((sum, item) => {
        return sum += item.money
      }, 0)
      console.log(res.data.data);
      this.sum = sum.toFixed(2)
      let timestamp = (new Date()).getTime();
      let timer = timestamp - this.start
      let T = this.formatDuring(timer)
      this.T =T
      let dailysales = parseInt(this.sum / T).toFixed(2)
      this.dailysales = dailysales
    },
    async getShopList_init() {
      let res = await getShopList(this.$store.state.account.user.id)
      if (res.data.code != 200) throw new Error("获取商品失败")
      let hot = res.data.data.sort((a, b) => b.sale - a.sale).slice(0, 8)

      hot.forEach(item => {
        item.name = item.title
        item.total = item.sale
      })
      let allSale = hot.reduce((sum, item) => {
        return sum += parseInt(item.sale)
      }, 0)
      this.allSale = allSale
      this.allSaleDay = parseInt(this.allSale / this.T)
      this.rankList = hot
      this.loading = false
      this.listLength = res.data.data.length
      console.log(allSale);
    },
    formatDuring(mss) {
      var days = parseInt(mss / (1000 * 60 * 60 * 24));
      return days
    }
  },


  created() {
    this.getOrder_init()
    this.getShopList_init()
  },
}
</script>

<style lang="less" scoped>
.extra-wrap {
  .extra-item {
    display: inline-block;
    margin-right: 24px;
    a:not(:first-child) {
      margin-left: 24px;
    }
  }
}
@media screen and (max-width: 992px) {
  .extra-wrap .extra-item {
    display: none;
  }
}
@media screen and (max-width: 576px) {
  .extra-wrap {
    display: none;
  }
}
</style>