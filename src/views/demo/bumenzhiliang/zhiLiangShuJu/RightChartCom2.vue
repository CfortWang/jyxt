<template>
  <dv-border-box-6 class="right-chart-Com-2">
      <div class="lc1-header">内审检查</div>
      <dv-charts :option="option" class="lc1-chart"/>
  </dv-border-box-6>
</template>


<script>
export default {
  name: 'RightChartCom2',
  data () {
    return {
      option: {
        legend: {
          data: [
            {name: 'DNA检验室',color: '#37a2da'},
            {name: '理化检验室',color: '#32c5e9'},
            {name: '声纹检验室',color: '#67e0e3'},
            {name: '痕迹检验室',color: '#9fe6b8'},
            {name: '文件检验室',color: '#3de7c9'},
            {name: '电子证据室',color: '#00baff'},
            {name: '质量管理办公室',color: '#96bfff'}
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
            name: '理化检验室',
            data: [
              1, 0, 3, 2, 0, 2, 3,5,4,0,2,3
            ],
            type: 'line',
            lineStyle: {
              stroke: '#32c5e9'
            },
            linePoint: {
              radius: 4,
              style: {
                fill: '#32c5e9',
                stroke: 'transparent'
              }
            },
            label: {
              show: true,
              formatter: '{value} 件'
            }
          },
          {
            data: [
              0, 1, 0, 2, 4, 3,0,1,3,2,2,1
            ],
            type: 'line',
            name: 'DNA检验室',
            // lineArea: {
            //   show: true,
            //   gradient: ['rgba(245, 217, 79, 0.8)', 'rgba(245, 217, 79, 0.2)']
            // },
            lineStyle: {
              stroke: '#f5d94e'
            },
            linePoint: {
              radius: 4,
              style: {
                fill: '#f5d94e',
                stroke: 'transparent'
              }
            },
            label: {
              show: true,
              formatter: '{value} 件'
            }
          },
           {
            data: [
              0, 2,3, 1, 2, 0,2,1,3,2,4,3
            ],
            type: 'line',
            name: '声纹检验室',
            // lineArea: {
            //   show: true,
            //   gradient: ['rgba(245, 217, 79, 0.8)', 'rgba(245, 217, 79, 0.2)']
            // },
            lineStyle: {
              stroke: '#67e0e3'
            },
            linePoint: {
              radius: 4,
              style: {
                fill: '#67e0e3',
                stroke: 'transparent'
              }
            },
            label: {
              show: true,
              formatter: '{value} 件'
            }
          },
           {
            data: [
              0, 1, 4, 3, 2, 1,0,2,4,3,2,4
            ],
            type: 'line',
            name: '痕迹检验室',
            // lineArea: {
            //   show: true,
            //   gradient: ['rgba(245, 217, 79, 0.8)', 'rgba(245, 217, 79, 0.2)']
            // },
            lineStyle: {
              stroke: '#9fe6b8'
            },
            linePoint: {
              radius: 4,
              style: {
                fill: '#9fe6b8',
                stroke: 'transparent'
              }
            },
            label: {
              show: true,
              formatter: '{value} 件'
            }
          },
           {
            data: [
              1, 2, 4, 3, 5, 2,2,1,2,5,2,4
            ],
            type: 'line',
            name: '文件检验室',
            // lineArea: {
            //   show: true,
            //   gradient: ['rgba(245, 217, 79, 0.8)', 'rgba(245, 217, 79, 0.2)']
            // },
            lineStyle: {
              stroke: '#3de7c9'
            },
            linePoint: {
              radius: 4,
              style: {
                fill: '#3de7c9',
                stroke: 'transparent'
              }
            },
            label: {
              show: true,
              formatter: '{value} 件'
            }
          },
           {
            data: [
              2, 1, 3, 5, 5, 7,5,2,1,5,0,2
            ],
            type: 'line',
            name: '电子证据室',
            // lineArea: {
            //   show: true,
            //   gradient: ['rgba(245, 217, 79, 0.8)', 'rgba(245, 217, 79, 0.2)']
            // },
            lineStyle: {
              stroke: '#00baff'
            },
            linePoint: {
              radius: 4,
              style: {
                fill: '#00baff',
                stroke: 'transparent'
              }
            },
            label: {
              show: true,
              formatter: '{value} 件'
            }
          },
          {
            data: [
              5, 4, 0, 1, 3, 2,0,1,3,2,4,3
            ],
            type: 'line',
            name: '质量管理办公室',
            // lineArea: {
            //   show: true,
            //   gradient: ['rgba(245, 217, 79, 0.8)', 'rgba(245, 217, 79, 0.2)']
            // },
            lineStyle: {
              stroke: '#96bfff'
            },
            linePoint: {
              radius: 4,
              style: {
                fill: '#96bfff',
                stroke: 'transparent'
              }
            },
            label: {
              show: true,
              formatter: '{value} 件'
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="less">
.right-chart-Com-2 {
 width: 100%;
  height: 60%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  // border-top: 2px solid rgba(1,153,209,.5);
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
    height: calc(~"100% - 80px");
    flex: 1;
  }
}
</style>