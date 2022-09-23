<template>
  <div class="left-chart-cmp-2">
      <div class="lc1-header">标准查新记录</div>
      <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: 'LeftChartCmp2',
  data () {
    return {
       option: {
        legend: {
          data: [
            {
              name: '标准查新时间',
              color: '#00baff'
            },
            {
              name: '查新人',
              color: '#ff5ca9'
            },
            {
              name: '部门',
              color: '#3de7c9'
            },
            {
              name: '供配电系统',
              color: '#f5d94e'
            }
          ],
          textStyle: {
            fill: '#fff'
          }
        },
        xAxis: {
          data: [
            '优秀', '良好', '一般', '差'
          ],
          axisLine: {
            style: {
              stroke: '#999'
            }
          },
          axisLabel: {
            style: {
              fill: '#999'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          data: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            style: {
              stroke: '#999'
            }
          },
          axisLabel: {
            style: {
              fill: '#999'
            }
          },
          axisTick: {
            show: false
          },
          min: 0,
          max: 8
        },
        series: [
          {
            // name: '收费系统',
            data: [
              5.5, 7.5, 2.5,0.1
            ],
            label: {show: true}, 
            type: 'bar',
            barStyle: {
              fill: 'rgba(0, 186, 255, 0.4)'
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="less">
.left-chart-cmp-2 {
  width: 100%;
  height: 50%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  margin-top:2%;
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