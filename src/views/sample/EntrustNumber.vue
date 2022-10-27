<template>
  <div class="com_echarts" ref="Number_refs">委托样品数量</div>
</template>

<script>
import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
export default {
  data(){ 
    return{
      entrustNumber:null,

}
  },
  mounted() {
    this.entrustNumberInit();
    // this.getData()
    
  },
methods:{
  entrustNumberInit(){
    var entrustNumber = this.$echarts.init(this.$refs.Number_refs);
    var entrustNumberOption = {
        xAxis:{
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
          name:'数量'
        },
        title: {
          text: '委托样品数量柱形图',
          textStyle:{
            color: "#00baff"
          }
        },
        grid:{
          left:'2%',
          right:"5%",
          top:'15%',
          bottom:'2%',
          containLabel:true
        
        },
        tooltip:{
          show:true
        },
      
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            //每条柱子的背景颜色
            // showBackground: true,
            label: {
              show: true,
              position: 'top'
            },
            // backgroundStyle: {
            //   color: "rgba(180, 180, 180, 0.2)",
            // },
          },
          {
          type: 'line',
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
          label: {
              show: true,
              position: 'bottom'
            },
        },
        ],
        
        legend: {
          data: [
            {
              name:'Forest',
              icon:'circle'
            },
            {
              name:'edgd',
              icon:'circle'
            }
          ],
      }
       
        
    }
      entrustNumber.setOption(entrustNumberOption)
  }
}
}
</script>

<style lang="scss" scoped>
* border,body{
  padding: 0px;
  margin: 0px;
}
.com_echarts{
  background-color: rgba(6, 30, 93, 0.5);
    border-top: 2px solid rgba(1, 153, 209, .5);
  width: 400px;
  height: 180px;
}

</style>