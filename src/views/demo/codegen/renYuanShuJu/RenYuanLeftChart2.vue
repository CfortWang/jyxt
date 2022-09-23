<template>
  <div class="ren-yuan-left-chart-2">
    <div class="ren-yuan-lc2-header">获奖情况</div>
    <!-- <div class="lc2-details">使用量<span>245</span></div> -->
    <dv-charts class="renyuan-lc2-chart" :option="option" />
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>
export default {
  name: 'RenYuanLeftChart2',
  data () {
    return {
      option: {
        series: [
          {
            type: 'pie',
            data: [
              { name: '获奖等级', value: 93 },
              { name: '获奖数量', value: 32 },
              { name: '获奖排名', value: 65 }
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
.ren-yuan-left-chart-2 {
  width: 100%;
  height:40%;
  display: flex;
  flex-direction: column;
  .ren-yuan-lc2-header {
    text-align: center;
    height: 20px;
    line-height: 20px;
    font-size: 28px;
    // text-indent: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .ren-yuan-lc2-details {
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