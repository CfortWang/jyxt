<template>
  <div class="left-chart-2">
    <div class="lc2-header">标准溶液信息</div>
    <!-- <div class="lc2-details">使用量<span>245</span></div> -->
    <dv-charts class="lc2-chart" :option="option" />
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>
export default {
  name: 'LeftChart2',
  data () {
    return {
      option: {
        series: [
          {
            type: 'pie',
            data: [
              { name: '使用量', value: 93 },
              { name: '核查量', value: 32 },
              { name: '剩余数量', value: 65 }
            ],
            radius: ['45%', '65%'],
            insideLabel: {
              show: false
            },
            outsideLabel: {
              labelLineEndLength: 10,
              formatter: '{percent}%\n{name}',
              style: {
                fontSize:12,
                fill: '#96bfff'
              }
            }
          }
        ],
        color: ['#00baff', '#3de7c9', '#96bfff']
      }
    }
  }
}
</script>

<style lang="less">
.left-chart-2 {
  width: 100%;
  height:50%;
  display: flex;
  flex-direction: column;
  .lc2-header {
    text-align: center;
    height: 20px;
    line-height: 20px;
    font-size: 28px;
    // text-indent: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .lc2-details {
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
  .lc2-chart {
    height: calc(~"100% - 80px");
  }
}
</style>