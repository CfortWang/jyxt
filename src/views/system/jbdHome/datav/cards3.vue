<template>
  <div id="cards">
    <div
      class="card-item"
      v-for="(card, i) in cards"
      :key="card.title"
      >

      <div class="card-header">
        <!-- 月 、周的统计-->
      	<div class="card-header-left" v-if="i==3">
          <span style="color: #FFFFFF;">报告</span>
        年度
         <span style="color: #FFFFFF;">完成量</span>
        </div>
        <div class="card-header-left" v-if="i==2">
          <span style="color: #FFFFFF;">检测</span>
        月度
         <span style="color: #FFFFFF;">完成量</span>
        </div>
        <div class="card-header-left" style="color: #00baff;" v-if="i==0">
        检测委托
         <span style="color: #FFFFFF;">受理量</span>
        </div>

      </div>

      <dv-charts  class="ring-chartsDead" :option="option" v-if="i==0"/>
      <water-level-chart class="ring-charts-water" v-else-if="i==1"/>

      <dv-charts class="ring-charts" :option="optionTask2"  v-else-if="i==2"/>
      <dv-charts class="ring-charts" :option="optionTask3"  v-else-if="i==3"/>

    </div>
  </div>
</template>

<script>
  import { stageCompleteStatis } from '@/api/platform/system/jbdHome'
  import echarts from 'echarts'
  import waterLevelChart from './waterLevelChart'
export default {
  name: 'Cards',
  components: {
    waterLevelChart
  },
  data () {
    return {
      cards: [{},{},{},{}],
      dataDate:['日','周','月度','年度'],
      config:{
        data:[],
          radius: '65%',
          activeRadius: '80%',
          digitalFlopStyle: {
              fontSize: 16
            },
          showOriginValue: true,
           lineWidth: 22

          },
      option: {},
      optionTask1: {},
      optionTask2: {},
      optionTask3: {},
    }
  },
  methods: {
    createData () {
      const { randomExtend } = this
     this.caseInof()
     this.coffinInof()
     this.amountCons()
    },
    randomExtend (minNum, maxNum) {
      if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10)
      } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      }
  },
  //类别未定义
  caseInof(){
    let case1 = [120,130,140,150,160,170,180,190,200,220,230,240]
    let case2 = [190,200,210,220,230,240,250,260,270,280,290,300]
    let max = 0
    max=300
    this.option =  {
             legend: {
               data: [
                 {
                   name: '检测委托',
                   color: '#00baff'
                 },
                 {
                   name: '检测受理',
                   color: '#f5d94e'
                 }
               ],
               textStyle: {
                 fill: '#fff'
               }
             },
             xAxis: {
               data: [
                 '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
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
               maxTax: max
             },
             series: [
               {
                 name: '检测委托',
                 data:  case1,
                 type: 'bar',
                 barStyle: {
                   fill: 'rgba(0, 186, 255, 0.4)'
                 }
               },
               {
                 data: case2,
                 type: 'line',
                 name: '检测受理',
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

  },

  coffinInof(){

    let data1 = [];
    data1.push("受理");
    data1.push("待检测");
    data1.push("检测");
    data1.push("返样");
    data1.push("留样");

    let data2 = [];
    data2.push(230);
    data2.push(190);
    data2.push(130);
    data2.push(230);
    data2.push(250);

    let dataAxis = data1;
    let data = data2;
    let yangPinIdChart = echarts.init(document.getElementById("yangPinId"))
    this.optionTask1 =  {
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
      yangPinIdChart.setOption(this.optionTask1);
  },
  amountCons(){
    let case1 = [190,200,210,220,230,240,250,260,270,280,290,300]
    let case2 = [120,130,140,150,160,170,180,190,200,210,220,230]
    let max = 300

    this.optionTask2 =  {
             legend: {
               data: [
                 {
                   name: '已检样品',
                   color: '#00baff'
                 },
                 {
                   name: '未检样品',
                   color: '#f5d94e'
                 }
               ],
               textStyle: {
                 fill: '#fff'
               }
             },
             xAxis: {
               data: [
                 '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
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
               maxTax: max
             },
             series: [
               {
                 name: '已检样品',
                 data:  case1,
                 type: 'bar',
                 barStyle: {
                   fill: 'rgba(0, 186, 255, 0.4)'
                 }
               },
               {
                 data: case2,
                 type: 'line',
                 name: '未检样品',
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
        this.optionTask3  = {
          series: [
            {
              type: 'gauge',
              startAngle: -Math.PI / 2,
              endAngle: Math.PI * 1.5,
              arcLineWidth: 13,
              radius: '80%',
              data: [
                { name: '完成占比', value: 32 }
              ],
              axisLabel: {
                show: false
              },
              axisTick: {
                show: false
              },
              pointer: {
                show: false
              },
              backgroundArc: {
                style: {
                  stroke: '#224590'
                }
              },
              details: {
                show: true,
                formatter: '完成占比{value}%',
                style: {
                  fill: '#1ed3e5',
                  fontSize: 16
                }
              }
            }
          ],
          color: ['#03d3ec']
        }
 },

 yearSynthesize(data){
   // let cofData =[]
   // for(let i = 0; i　< data.length; i++) {
   //   let param ={}
   //   param.total =   data[i].num
   //   param.name  =   data[i].type
   //   cofData.push(param)
   //   }


      //this.config.data = cofData
 },

},
  mounted () {
    const { createData } = this
    createData()

  }
}
</script>

<style lang="less">
#cards {
  display: flex;
  width: 92%;
  justify-content: space-between;
  height: 50%;

  .card-item {
    background-color: rgba(6, 30, 93, 0.5);
    border-top: 2px solid rgba(1, 153, 209, .5);
    width: 24.3%;
    display: flex;
    flex-direction: column;
  }
  .card-header {
    margin-top: 1%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .card-header-left {
      font-size: 1.5rem;
      font-weight: bold;
      padding-left: 1.25rem;
      color: #03d3ec;
    }
    .card-header-right {
      padding-right: 1.25rem;
      font-size: 32px;
    }
  }
  .ring-charts-water {
    height:90%;
    width:100%;
  }
  .ring-charts {
    height:80%;
  }
  .ring-chartsDead {
    height:80%;
  }
  .card-footer {
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .card-footer-item {
    padding: 0.5rem 0.75rem 0px 0.75rem;
    box-sizing: border-box;
    width: 45%;
    background-color: rgba(6, 30, 93, 0.7);
    border-radius: 3px;
    .footer-title {
      font-size:1rem;
    }
    .footer-detail {
      color: #1294fb;
      display: flex;
	  font-size:1.125rem;
      align-items: center;
      .dv-digital-flop {
        margin-right: 0.3125rem;
      }
    }
  }
}
</style>
