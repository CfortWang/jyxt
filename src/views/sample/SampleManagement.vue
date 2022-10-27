<template>
  <div class="sampleManagement">
    <div class="title">月度样品管理看板
      <span>当前时间</span>
    </div>
    <div  class="header_content">
      <div class="totalNumber">
        <div>委托样品总数</div>
        <div class="number">个</div>
      </div>
      <div class="notReceived">
        <div>待收样</div>
        <div>个</div>
      </div>
      <div class="received">
        <div>已收样</div>
        <div>个</div>
      </div>
      <div class="staging">
        <div>样品暂存量</div>
        <div>个</div>
      </div>
      <div class="unqualified">
        <div>不合格样品数量</div>
        <div>个</div>
      </div>
      <div class="retention">
        <div>留样样品数量</div>
        <div>个</div>
      </div>
    </div>
   
    <!-- <el-button type="header">主要按钮</el-button> -->
    <div class="echarts">
      <div class="entrust">
        <div class="entrustNumber" ref="Number_refs">委托样品数量</div>
        <div class="entrustType" >
          <div class="entrustType_title">委托样品类型占比情况</div>
          <div class="entrustType_content" ref="Type_refs">委托样品类型占比情况</div>
        </div>
    </div>
    <div class="detection">
      <div class="monthlyStatus" ref="MonthlyStatus_refs">月度检测情况（环形图）</div>
      <div class="monthlyNumber" ref="MonthlyNumber_refs">月度检测量</div>
      <div class="annualStatus" ref="AnnualStatus_refs">年度检测情况(环形图)</div>
    </div>
  </div>
    
  </div>
</template>

<script>
//全屏预览
import screenfull from "screenfull";
import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
export default {
  
  data() {
    return {
      entrustNumber: null,
      entrustType:null,
     
          };
  },
  mounted() {
    this.entrustNumberData();
    this.getData()
    this.entrustTypeData();
    // this.monthlyStatusData();
    // this.monthlyNumberData();
    // this.annualStatusData();
    // this.allView();
  },
  methods: {
    //1.样品表
    //2.样品登记表
    //3.样品出入库表
    //4.样品检测表
    //不合格样品：流程走完过滤掉样品状态为“完好”
    //委托样品总数:样品表里面的所有数据
    //留样样品数据：
    //样品类型数据：这里以委托样品数据来算
    //样品暂存区数量：
    //样品完成检测数量：以检测报告签批为准
    getData(){
      let sql = "select * from t_mjypb" 
      curdPost('sql',sql).then(response => { 
      let data = response.variables.data
      console.log('样品数据',data)
      })
      // console.log('样品数据',data)
      
    },
    
    
    
    //全屏预览
    allView(){
       screenfull.request() //默认显示全屏
     },
     //委托样品数量柱形图
     entrustNumberData() {
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
  },
    //委托样品类型环形图
    entrustTypeData(){
      var entrustType = this.$echarts.init(this.$refs.Type_refs);
      var entrustTypeOption ={
        grid:{
          left:'',
          top:'0%',
          bottom:'0%',
          containLabel:true  //?
        },
        title: {
          text: '委托样品总数',
          subtext: '400',
          // center: ["40%", "48%"],
          x: "40%",     //X坐标   
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
        legend: {
          orient: 'vertical',  //horizontal 水平排列
          // left: 'right',
          right:'10%',
          bottom:'10%',
          lineStyle:{

          }
        },
        series: [
       
        
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ["40%", "48%"],//图表的位置 以圆心为基准 水平竖直位置
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
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
       ]
      }
      entrustType.setOption(entrustTypeOption);

    },
    //月度检测情况（环形图）
    monthlyStatusData(){

    },
    //月度检测量
    monthlyNumberData(){

    },
    //年度检测情况（环形图）
    annualStatusData(){

    }


  },
};
</script>
<style lang="scss" scoped>
* border,body{
  padding: 0px;
  margin: 0px;
}
.sampleManagement{
  .title{
  width:100%;
  height: 60px;
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  margin:5px 0px;
}
.header_content{
  width: 100%;
  height: 80px;
  margin: 0px 20px;
  border-bottom: 2px solid blue;
  display: flex;
  .totalNumber,
  .notReceived,
  .received,
  .staging,
  .unqualified,
  .retention
  {
      border-right: 1px solid blue;
      flex: 1;
      text-align: center;
      // display: flex;
      // flex-direction:cloumn;
      // flex-wrap :wrap;
      align-content: space-around;
      margin: 6px 0px;
      position:relative;
      text-align:center;
	    display:table-cell;
      vertical-align:middle;
      .number{
        display:inline-block
      }
    }
  }


}
.echarts{
  width: 100%;
  height: 100%;
  margin: 20px 20px 0px 20px;
  border: 1px solid red;
  .entrust{
    width: 100%;
    height: 350px;
    border: 1px solid rgb(25, 156, 91);
    display: flex;
    margin-bottom: 15px ;
    .entrustNumber{
      flex: 5;
      margin-right: 10px;
      background-color: rgb(25, 97, 156);
    }
    .entrustType{
      flex: 3;
      background-color: rgb(39, 3, 59);
      display: flex;
      flex-direction:cloumn;
      flex-wrap :wrap;
      // justify-content:center;
      .entrustType_title{
        width: 100%;
        height: 50px;
        // background-color: rgb(25, 97, 156);
        font-weight: bold;
        font-size: 16px;
      }
      .entrustType_content{
        width: 100%;
        height: 300px;
        // background-color: red($color: #000000);
      }
    }

  }
  .detection{
    width: 100%;
    height: 350px;
    display: flex;
    border: 1px solid rgb(39, 3, 59);
    .monthlyStatus{
      flex: 1;
     
      background-color: rgb(25, 156, 91);
    }
    .monthlyNumber{
      flex: 3;
      margin: 0px 10px;
      background-color: rgb(39, 3, 59);
    }
      .annualStatus{
        flex: 1;
      margin-right: 10px;
      background-color: rgb(25, 156, 91);
      }
    
    }
   
  }
  




</style>




<!-- <template>
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
   -->