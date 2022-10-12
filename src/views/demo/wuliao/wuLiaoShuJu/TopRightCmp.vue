<template>
  <div class="top-right-cmp">
    <div class="chart-name">
      溶液物料对比图
      <dv-decoration-3 style="width:200px;height:20px;" />
    </div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: 'TopRightCmp',
  data () {
    return {
      option: {
        legend: {
          data: [
            {
              name: '标准溶液',
              color: '#00baff'
            },
            {
              name: '标准物料',
              color: '#ff5ca9'
            }
          ],
          textStyle: {
            fill: '#fff'
          }
        },
        xAxis: {
          data: [
            '01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01','08/01','09/01','10/01','11/01','12/01'
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
            name: '标准溶液',
            data: [
              2.5, 3.5, 6.5, 6.5, 7.5, 6.5, 4.5,3.5,5.5,7.5,6.5,4.5
            ],
            type: 'line',
            lineStyle: {
              stroke: '#ff5ca9'
            },
            linePoint: {
              radius: 4,
              style: {
                fill: '#ff5ca9',
                stroke: 'transparent'
              }
            }
          },
          {
            data: [
              0.2, 1.2, 4.2, 4.2, 5.2, 4.2,2.2,1.2,3.2,3.2,4.2,3.2
            ],
            type: 'line',
            name: '标准物料',
            lineArea: {
              show: true,
              gradient: ['rgba(245, 217, 79, 0.8)', 'rgba(245, 217, 79, 0.2)']
            },
            lineStyle: {
              stroke: '#f5d94e'
            },
            linePoint: {
              radius: 4,
              style: {
                fill: '#f5d94e',
                stroke: 'transparent'
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="less">
.top-right-cmp {
  position: relative;
  padding: 0 20px;
  box-sizing: border-box;
  .chart-name {
    position: absolute;
    right: 70px;
    text-align: right;
    font-size:28px;
    top: 10px;
  }
}
</style>