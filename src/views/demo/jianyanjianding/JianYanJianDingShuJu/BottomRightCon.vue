<template>
  <div class="bottom-right-con">
     <div class="chart-name">检验检测比对</div>  
     <dv-charts class="lc1-chart" :option="option" />
  </div>
</template>

<script>
export default {
  name: 'BottomRightCon',
  data () {
    return {
      option: {
        series: [
          {
            type: 'pie',
            data: [
              { name: '痕迹检验（手印）', value: 7 },
              { name: '痕迹检验（枪弹）', value: 5 },
              { name: '手印检验报告', value: 7 },
              { name: '枪弹通知单', value: 5 }
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
                fill: '#fff'
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
.bottom-right-con {
  position: relative;
  padding: 0 20px;
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