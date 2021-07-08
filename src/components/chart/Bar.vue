<!--
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-26 10:03:33
 * @LastEditors: stride
 * @LastEditTime: 2021-05-05 15:36:13
-->
<template>
  <div class="bar">
    <h4>{{title}}</h4>
    <div class="chart">
      <v-chart :force-fit="true" height="312" :data="data" :padding="[24, 0, 0, 0]">
        <v-tooltip />
        <v-axis />
        <v-bar position="x*y" />
      </v-chart>
    </div>
  </div>
</template>

<script>

const data = []
const tooltip = [
  'x*y',
  (x, y) => ({
    name: x,
    value: y
  })
]

const scale = [{
  dataKey: 'x',
  min: 2
}, {
  dataKey: 'y',
  title: '时间',
  min: 1,
  max: 22
}]
export default {
  name: 'Bar',
  props: ['title', 'rankList'],
  data() {
    return {
      data,
      scale,
      tooltip
    }
  },
  mounted() {
    console.log(this.rankList);
    this.rankList.forEach(item => {
      this.data.push({
        x:item.title,
        y:Math.floor(item.sale)
      })
    });
  },
}
</script>

<style scoped lang="less">
.bar {
  position: relative;
  .chart {
  }
}
</style>
