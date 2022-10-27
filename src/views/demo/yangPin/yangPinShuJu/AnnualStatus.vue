<template>
  <!-- 年度检测完成情况(环形图) -->
  <div  class="annualStatus">
    <dv-border-box-7 backgroundColor="rgba(6, 30, 93, 0.5)" >
        <div class="annualStatus_title">年度检测情况统计</div>
        <div class="annualStatus_content" ref="AnnualStatus_refs"></div>
    </dv-border-box-7>  
  </div>
</template>

<script>
export default {
  data(){
    return{
      annualStatus:null,
      annualTotal:0,
    }
  },
  created(){

  },
  mounted(){
    this.annualStatusData()

  },
  methods:{
    annualStatusData(){
      var annualStatus = this.$echarts.init(this.$refs.AnnualStatus_refs);
      var annualStatusOption ={
        grid:{
          left:'',
          top:'0%',
          bottom:'0%',
          containLabel:true  //?
        },
        title: {
          text: '检测任务总量',
          subtext: 424,
          // center: ["40%", "48%"],
          x: "50%",     //X坐标   
          y: "42%",    //Y坐标
           // left:195,//慎用百分比（相对环形图宽度）
          // top: '160px',
          //主副标题之间的间距
          itemGap:10,
          textAlign:'center',  //竖直居中对齐
          // textVerticalAlign:'auto',
          textStyle: {    //标题样式
            fontSize: 18,
            fontWeight: "bolder",  //bold??
            color: "#aaa",
            transform: "translate(-50%,-50%)",
            marginTop:"-50%",
            marginLeft:"-50%",
          },
          subtextStyle: {   //副标题样式
            fontSize: 26,
            fontWeight: "bolder",
            color: "#333",
            formatter: '', 
            marginTop:"-50%",
            marginLeft:"-50%",
            transfrom:"translate(-50%,-50%)",
            // align:'center'
          },
        },
       //鼠标滑过显示信息
        tooltip: {
          trigger: "item",
          formatter: '{d}%\n{b}',//
        },
        //图例的位置
        // legend: {
        //   orient: 'vertical',  //horizontal 水平排列
        //   // left: 'right',
        //   right:'10%',
        //   bottom:'10%',
        //   lineStyle:{

        //   }
        // },
        series: [
       
        
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ["50%", "48%"],//图表的位置 以圆心为基准 水平竖直位置
            avoidLabelOverlap: true,//是否启用防止标签重叠策略
            label: {
              show: true,
              formatter: " {b}\n {c} ({d}%)",
              // formatter: '{d}%\n{b}',// 显示百分比，
              position: 'outside'
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
              { value: 297, name: '已检测' },
              { value: 127, name: '未检测' },
             
            ]
          }
       ]
      }
      annualStatus.setOption(annualStatusOption);

    },
  }

}
</script>

<style lang="less" >
* border,body{
  padding: 0px;
  margin: 0px;
}
  .annualStatus{
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction:cloumn;
    flex-wrap :wrap;
    //  background-color: rgb(25, 97, 156);
    overflow: hidden;
     
      .annualStatus_title{
        width: 100%;
        height: 50px;
        line-height: 30px;
        margin-left: 20px;
        // background-color: rgb(25, 97, 156);
        font-weight: bold;
        font-size: 16px;
      }
      .annualStatus_content{
        width: 100%;
        height: 350px;
        // background-color: red;
      }
    }
</style>