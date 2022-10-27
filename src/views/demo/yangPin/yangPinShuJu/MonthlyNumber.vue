<template>
  <!-- 月度检测情况组件 -->
  <div class="monthlyNumber">
    <dv-border-box-7  backgroundColor="rgba(6, 30, 93, 0.5)" >
        <div class="monthlyNumber" ref="MonthlyNumber_refs">
          月度检测量
        </div>
    </dv-border-box-7>    
  </div>
</template>

<script>

import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
export default {
  data(){
    return{
      monthlyNumber:null
    }
  },
  created(){

  },
  mounted(){
    this.monthlyNumberInit()

  },
  methods:{
    monthlyNumberInit(){
    var monthlyNumber = this.$echarts.init(this.$refs.MonthlyNumber_refs);
    var monthlyNumberOption = {
        xAxis:{
          type: "category",
          //获取当前月的日期1到30日
          data: ["1号", "2号", "3号", "4号", "5号", "6号", "7号","8号","9号","10号",
          "11号","12号","13号", "14号", "15号", "16号", "17号", "18号", "19号","20号",
          "21号","22号","23号","24号","25号","26号","27号","28号","29号","30号"],
          splitLine:{
            show:false
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: 'white',//坐标线的颜色
                
            }
          }
        },
        yAxis: {
          type: "value",
          name:'数量',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: 'white',//坐标线的颜色
                
            }
          }
        },
        title: {
          text: '委托样品数量柱形图',
        },
        grid:{
          left:'2%',
          right:"5%",
          top:'15%',
          bottom:'2%',
          containLabel:true
        
        },
        // tooltip悬浮提示框
        tooltip:{
          show:true
        },
        //图例的位置
        legend: {
          show:true, 
          orient: 'horizontal',  //horizontal 水平排列
          top:'5%',
          left:'center',
          lineStyle:{

          }
        },
        //隐藏刻度线
        axisTick:{
              show:false,
            },
      
        series: [
          {
            //
            data: [120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130,167,128],
            type: "bar",
            name: '未收到样品',
           //柱子的颜色
            itemStyle:{
              show:true,
              color:'rgba(0, 186, 255, 0.4)'
              
            },
            label: {
              show: true,
              position: 'top'
            },
           
            //背景颜色
            // backgroundStyle: {
            //   color: "rgba(0, 186, 255, 0.4)",
            // },
          },
          {
          type: 'line',
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
          itemStyle:{
              color:'rgba(55, 162, 218, 0.6)'
              
            },
          label: {
              show: true,
              position: 'bottom'
            },
        },
        ],   
    }
    monthlyNumber.setOption(monthlyNumberOption)
  }

  }

}
</script>

<style lang="less" >
* border,body{
  padding: 0px;
  margin: 0px;
}
.monthlyNumber{
  width: 1100px;
  height: 400px;
}
// .monthlyNumber{
//       flex: 3;
//       // background-color: rgb(39, 3, 59);
//       display: flex;
//       flex-direction:cloumn;
//       flex-wrap :wrap;
//       // justify-content:center;
//       .monthlyNumber_title{
//         width: 100%;
//         height: 50px;
//         background-color: rgb(25, 97, 156);
//         font-weight: bold;
//         font-size: 16px;
//       }
//       .monthlyNumber_content{
//         width: 100%;
//         height: 300px;
//         // background-color: red($color: #000000);
//       }
//     }

</style>