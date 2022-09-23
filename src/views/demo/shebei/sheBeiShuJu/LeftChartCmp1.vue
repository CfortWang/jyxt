<template>
  <div class="left-chart-Cmp-1">
	  <div @click.prevent="toHome()"
	                style="width: 150px;
	                  cursor: pointer;
	                   text-align:center;
	                   color: #FFFFFF;
                     line-height: 5px;
	                   z-index: 999999;
	                   float: right;
	                   ">
	            <dv-border-box-8>
	                    返回首页
	                  </dv-border-box-8>
	  </div>
    <div class="lc1-header">购置申请</div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: 'LeftChartCmp1',
  data () {
    return {
      option: {
        legend: {
          data: [
             {
              name: '总设备金额',
              color: '#00baff'
            },
            {
              name: '单设备金额',
              color: '#3de7c9'
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
            name: '单设备金额',
            data: [
              2.5, 3.5, 6.5, 6.5, 7.5, 6.5,8.5,6.5,5.5,7.5,6.5,4.5
            ],
            type: 'line',
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
              formatter: '{value} 元'
            }
          },
          {
            data: [
              0.2, 1.2, 4.2, 4.2, 5.2, 4.2,2.2,4.2,3.2,3.2,4.2,3.2
            ],
            type: 'line',
            name: '总设备金额',
            lineArea: {
              show: true,
              gradient: ['rgba(245, 217, 79, 0.8)', 'rgba(245, 217, 79, 0.2)']
            },
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
              formatter: '{value} 元'
            }
          }
        ]
      }
    }
  },
  methods: {
    toHome(){
      this.$router.push({
      			name:'dashboard'
      })
  	 }

  }


}
</script>

<style lang="less">
.left-chart-Cmp-1 {
  width: 100%;
  height:55%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  padding-bottom: 20px;
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
