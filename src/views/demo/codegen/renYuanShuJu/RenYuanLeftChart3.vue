<template>
  <div class="ren-yuan-left-chart-3">
    <div class="ren-yuan-lc2-header">论文、著作专题</div>
    <!-- <div class="lc2-details">使用量<span>245</span></div> -->
    <dv-charts class="ren-yuan-lc2-chart" :option="option" />
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>
export default {
  name: 'RenYuanLeftChart3',
  data () {
    return {
      option: {
        series: [
          {
            type: 'pie',
            data: [
              { name: '论文数量', value:56 },
              { name: '著作专题数量', value: 57 },
              { name: '排名情况', value: 81 }
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
.ren-yuan-left-chart-3 {
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
    margin-top:20px;
    // margin-bottom: 20px;
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