<template>
  <!-- 月度检测完成情况(环形图) -->
  <div  class="monthlyStatus">
    <dv-border-box-7 backgroundColor="rgba(6, 30, 93, 0.5)" >
        <div class="monthlyStatus_title">月度检测情况统计</div>
        <div class="monthlyStatus_content" ref="MonthlyStatus_refs"></div>
    </dv-border-box-7>  
  </div>
</template>

<script>
import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
export default {
  data(){
    return{
      monthlyStatus:null,
      testedData:[]
    }
  },
  created(){
    this.getTestedData()
    this.getTestTotalData()

  },
  mounted(){
    this.enmonthlyStatusData()

  },
  methods:{
    
    // SELECT * FROM t_mjypb WHERE yang_pin_bian_hao IN (SELECT yang_pin_bian_hao FROM t_jchzb WHERE jian_ce_zhuang_ta = '已完成')

    //获取检测样品任务总数
    getTestTotalData(){

      let sql1 = "select * from t_mjypb" 
      curdPost('sql',sql1).then(response => { 
        let  data = response.variables.data
       
        // console.log('检测样品任务总数',data.length)
        let obj = {};
        let newArray = data.reduce((cur,next) => {
            obj[next.yang_pin_bian_hao] ? "" : obj[next.yang_pin_bian_hao] = true && cur.push(next);
            return cur;
        },[])
         this.testedData = newArray.length
        // console.log("检测样品任务总数3333", this.testedData)
      })
      //定义一个对象：任务总量
      let newObj = {name:"任务总量",value:this.testedData}
      // console.log("检测样品任务总数444", newObj)
    },

    //已经完成检测的样品
    getTestedData(){
      let sql2 = "select * from t_mjypb where yang_pin_bian_hao in (select yang_pin_bian_hao from t_jchzb where jian_ce_zhuang_ta = '已完成')" 
      curdPost('sql',sql2).then(response => { 
      let  data = response.variables.data
      // this.testedData 
      // console.log('已经完成检测数据',data.length)

      })
      
    },
    enmonthlyStatusData(){
      var monthlyStatus = this.$echarts.init(this.$refs.MonthlyStatus_refs);
      var monthlyStatusOption ={
        grid:{
          left:'',
          top:'0%',
          bottom:'0%',
          containLabel:true  //?
        },
        title: {
          text: '检测任务总量',
          subtext: '424',
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
              position: 'outside',
              color:'#fff'
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
              { value: 127, name: '未检测' }
            ]
          }
       ]
      }
      monthlyStatus.setOption(monthlyStatusOption);

    },
  }

}
</script>

<style lang="less" scoped>
*body{
  padding: 0px;
  margin: 0px;
}
.monthlyStatus{
  width: 100%;
  height: 100%;
  #dv-border-box-7{
    background-size: 100% 100%;
    display: flex;
    flex-direction:column;
    align-content:space-between;
    
  }
  .monthlyStatus_title{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    color:'#fff';
  }
  .monthlyStatus_content{
    width: 100%;
    height: calc(100% - 50px);
  }
  
}
</style>