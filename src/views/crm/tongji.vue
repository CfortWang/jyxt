<template>
  <div>
   <div id="chart" style="width:100%;height:376px"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
  export default {
    data() {
      return {
             title:'人员培训',
             dialogOff:false,
           }
    },
    mounted() {
      this.getEchartData()
    },
    methods: {
      getEchartData() {
        if (true) {
          let myChart =  echarts.init(document.getElementById("chart"))
          let option = {
                tooltip: {
                  trigger: 'item'
                },
                legend: {
                  top: '5%',
                  left: 'center'
                },
                series: [
                  {
                    name: '类型',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                      }
                    },
                    labelLine: {
                      show: false
                    },
                    data: [
                      { value: 1048, name: '业务关系' },
                      { value: 735, name: '商桥' },
                      { value: 580, name: '供应商' },
                      { value: 484, name: '合伙人' }
                    ]
                  }
                ]
              };
          option && myChart.setOption(option);
        }
      },
    },
  }
</script>
