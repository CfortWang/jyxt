<template>
  <div class="top-right-con">
    <div class="chart-name"> 检材样品对比</div>
    <dv-charts :option="option" class="lc1-chart"/>
  </div>
</template>

<script>
export default {
  name: 'TopRightCon',
  data () {
    return {
      option: {}
    }
  },
  methods: {
    createData () {
      const { randomExtend } = this
      this.option = {
        series: [
          {
            type: 'pie',
            radius: '50%',
            roseSort: false,
            data: [
              { name: '检材取样记录', value: randomExtend(5, 20) },
              { name: '检材取样记录（部门）', value: randomExtend(20, 30) },
              { name: '检材登记台账（痕迹）', value: randomExtend(30, 70) },
              { name: '检材登记台账（电子）', value: randomExtend(10, 40) },
              { name: '检材登记台账（声纹）', value: randomExtend(5, 20) },
              { name: '检材登记台账（理化）', value: randomExtend(20, 30) },
              { name: '检材登记台账（DNA）', value: randomExtend(10, 50) },
              { name: '检材登记台账（总）', value: randomExtend(30, 30) },
              { name: '检材登记台账（文检）', value: randomExtend(10, 40) }
            ],
            insideLabel: {
              show: false
            },
            outsideLabel: {
              formatter: '{name} {percent}%',
              labelLineEndLength: 20,
              style: {
                fill: '#fff'
              },
              labelLineStyle: {
                stroke: '#fff'
              }
            },
            roseType: true
          }
        ],
       color: ['#da2f00', '#fa3600', '#ff4411', '#ff724c', '#541200', '#801b00', '#a02200', '#5d1400', '#b72700']
      }
    },
    randomExtend (minNum, maxNum) {
      if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10)
      } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      }
    }
  },
  mounted () {
    const { createData } = this
    createData()
    setInterval(createData, 30000)
  }
}
</script>

<style lang="less">
.top-right-con {
  position: relative;
  box-sizing: border-box;
  .chart-name {
    height: 50px;
    // text-indent: 20px;
    font-size: 28px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: center;
  }
  .lc1-chart {
    height: calc(~"100% - 80px");
    flex: 1;
  }
}
</style>
