<template>
  <div class="yp-top-middle-cmp">
    <div class="chart-name">
      样品受理及退回
      <dv-decoration-3 style="width:200px;height:20px;" />
    </div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: 'TopMiddleCmp',
  data () {
    return {
      option: {
        legend: {
          data: [
            {
              name: '入库申请',
              color: '#00baff'
            },
            {
              name: '受理入库',
              color: '#00db95'
            },
            {
              name: '无效退回',
              color: '#ff5ca9'
            },

           ],
          textStyle: {
            fill: '#fff'
          }
        },
        xAxis: {
          data: [
            '10/01', '10/02', '10/03', '10/04', '10/05', '10/06',
            '10/07', '10/07', '10/08', '10/09', '10/10', '10/11',
            '10/12', '10/13', '10/14', '10/15'
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
            },
            formatter ({ value }) {
              return value.toFixed(2)
            }
          },
          axisTick: {
            show: false
          },
          min: 30,
          max: 100,
          interval: 10
        },
        series: [
          {
            data: [
              89.56, 77.66, 69.84, 88.22, 84.11, 99.45,
              79.44, 77.81, 89.84, 85.32, 81.14, 99.45,
              89.15, 79.45, 99.64, 87.89
            ],
            type: 'bar',
            name: '入库申请',
            barStyle: {
              fill: 'rgba(0, 186, 255, 0.4)'
            }
          },
          {
            name: '受理入库',
            data: [
               69.56, 54.66, 64.84, 64.22, 75.11, 79.45,
               69.44, 64.81, 69.84, 64.32, 54.14, 69.45,
               79.15, 79.45, 85.64, 74.89
            ],
            type: 'line',
            smooth: true,
            lineArea: {
              show: true,
              gradient: ['rgba(55, 62, 218, 0.6)', 'rgba(55, 162, 218, 0)']
            },
            lineStyle: {
              lineDash: [5, 5]
            },
            linePoint: {
              radius: 4,
              style: {
                fill: '#00db95'
              }
            }
          },
          {
            data: [
              49.56, 44.66, 54.84, 54.22, 65.11, 69.45,
              59.44, 44.81, 59.84, 44.32, 34.14, 59.45,
              69.15, 39.45, 45.64, 54.89
            ],
            type: 'line',
            name: '无效退回',
            smooth: true,
            lineArea: {
              show: true,
              gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)']
            },
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
          }
        ]
      }
    }
  }
}
</script>

<style lang="less">
.yp-top-middle-cmp {
  position: relative;
  padding: 0 50px;
  box-sizing: border-box;

  .chart-name {
    position: absolute;
    right: 150px;
    text-align: right;
    font-size: 20px;
    top: 10px;
  }
}
</style>
