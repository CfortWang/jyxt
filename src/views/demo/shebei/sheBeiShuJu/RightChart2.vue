<template>
  <div class="right-chart-2">
    <div class="lc1-header">校准结果</div>
     <dv-charts :option="option" />
  </div>
</template>


<script>
export default {
  name: 'RightChart2',
  data () {
    return {
      option: {
        legend: {
          data: [
            {
              name: '收费系统',
              color: '#00baff'
            },
            {
              name: '监控系统',
              color: '#ff5ca9'
            },
            {
              name: '通信系统',
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
          },
           
          // {
          //   name: '监控系统',
          //   data: [
          //     2.5, 3.5, 6.5, 6.5, 7.5, 6.5, 2.5
          //   ],
          //   type: 'line',
          //   lineStyle: {
          //     stroke: '#ff5ca9'
          //   },
          //   linePoint: {
          //     radius: 4,
          //     style: {
          //       fill: '#ff5ca9',
          //       stroke: 'transparent'
          //     }
          //   }
          // },
          // {
          //   name: '通信系统',
          //   data: [
          //     1.3, 2.3, 5.3, 5.3, 6.3, 5.3, 1.3
          //   ],
          //   type: 'line',
          //   smooth: true,
          //   lineArea: {
          //     show: true,
          //     gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)']
          //   },
          //   lineStyle: {
          //     lineDash: [5, 5]
          //   },
          //   linePoint: {
          //     radius: 4,
          //     style: {
          //       fill: '#00db95'
          //     }
          //   }
          // },
          // {
          //   data: [
          //     0.2, 1.2, 4.2, 4.2, 5.2, 4.2, 0.2
          //   ],
          //   type: 'line',
          //   name: '供配电系统',
          //   lineArea: {
          //     show: true,
          //     gradient: ['rgba(245, 217, 79, 0.8)', 'rgba(245, 217, 79, 0.2)']
          //   },
          //   lineStyle: {
          //     stroke: '#f5d94e'
          //   },
          //   linePoint: {
          //     radius: 4,
          //     style: {
          //       fill: '#f5d94e',
          //       stroke: 'transparent'
          //     }
          //   }
          // }
        ]
      }
    }
  }
}
</script>

<style lang="less">
.right-chart-2 {
  width: 100%;
  height: 50%;
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
    margin-bottom: 10px;
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