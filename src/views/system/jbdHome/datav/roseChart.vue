<template>
  <div id="rose-chart">
    <div class="rose-chart-title">检测受理类型</div>
    <div id="roseChartId" :style="{height:height}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'RoseChart',
  data () {
    return {

    }
  },
  props: {

    width:{
      type:String,
      default:"20%"
    },
    height:{
      type:String,
      default: "90%"
    },

  },
  methods: {
    createData () {

        let data1 = [];
         data1.push(130);
         data1.push(190);
         data1.push(230);
         data1.push(290);

         let data3 = [];
         data3.push("尺寸");
         data3.push("元素");
         data3.push("排放");
         data3.push("污染");


              let dataAxis = data3;
              let data = data1;
              let roseChart = echarts.init(document.getElementById("roseChartId"))
              let option ={
                 grid: {
                              top: '20%',
                              left: '3%',
                              right: '4%',
                              bottom: '10%',
                              containLabel: true
                          },
                title: {
                  text: '',
                  subtext: ""
                },
                xAxis: {
                  data: dataAxis,
                  axisLabel: {
                    inside: true,
                    color: '#000'
                  },
                  axisTick: {
                    show: true
                  },
                  axisLine: {
                    show: true
                  },
                  z: 10
                },
                yAxis: {
                  axisLine: {
                    show: false
                  },
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    color: '#999'
                  }
                },
                dataZoom: [
                  {
                    type: 'inside'
                  }
                ],

                series: [
                  {
                    type: 'bar',
                    showBackground: true,
                    itemStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                      ])
                    },
                    emphasis: {
                      itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          { offset: 0, color: '#2378f7' },
                          { offset: 0.7, color: '#2378f7' },
                          { offset: 1, color: '#83bff6' }
                        ])
                      }
                    },
                    data: data
                  }
                ]
              };
                roseChart.setOption(option);
          }
  },
  mounted () {
    const { createData } = this
    createData()
  }
}
</script>

<style lang="less">
#rose-chart {
  width: 25%;
  height: 100%;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, .5);
  box-sizing: border-box;
  .rose-chart-title {
    height: 50px;
    font-weight: bold;
    text-indent: 20px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }
  .dv-charts-container {
    height: calc(~"90% - 50px");
  }
}
 .ring-chartsDead {
    height:80%;
  }
</style>
