<template>
  <div class="left-chart-cmp-1">
    <div @click.prevent="toHome()"
                  style="width: 140px;
                     height: 40px;
                     position: absolute;
                     cursor: pointer;
                     color: #FFFFFF;
                     line-height: 40px;
                     font-size: 14px;
                     padding: 20px;
                     ">
              <dv-border-box-8>
                   <span style="padding-left: 30px;">返回首页</span>
                    </dv-border-box-8>
    </div>
      <div class="lc1-header">标准方法证实</div>
      <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: 'LeftChartCmp1',
  data () {
    return {
      option: {}
    }
  },
  methods: {
    toHome() {
      this.$router.push({
        name: 'dashboard'
      })
    },

    createData () {
      const { randomExtend } = this
      this.option = {
        series: [
          {
            type: 'pie',
            radius: '50%',
            roseSort: false,
            data: [
              { name: '审核通过率', value: randomExtend(5, 20) },
              { name: '人员技术比例', value: randomExtend(20, 30) },
              { name: '电子证据室使用率', value: randomExtend(30, 70) },
              { name: '环境条件良好率', value: randomExtend(10, 40) }
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
        color: ['#da2f00', '#fa3600', '#ff4411', '#ff724c']
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
.left-chart-cmp-1 {
  width: 100%;
  height:50%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  .lc1-header {
    text-align: center;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    margin-top: 10px;
  }
  .lc1-details {
    height: 50px;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-indent: 20px;
    span {
      color: #096dd9;
      font-weight: bold;
      font-size: 35px;
      margin-left: 20px;
    }
  }
  .lc1-chart {
    flex: 1;
  }
}
</style>
