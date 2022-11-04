<template>
 <div class="entrustNumber" >
  <!-- 委托样品情况 -->
      <dv-border-box-7  backgroundColor="rgba(6, 30, 93, 0.5)" >
        <div class="entrustNumber_title">
          <span class="demonstration">委托样品情况</span>
          <el-date-picker
          class="chooseMonth"
            v-model="NowTime"
            type="month"
          
            @change="changeTime"
            placeholder="请选择时间">
          </el-date-picker>
        </div>

        <div class="entrustNumber_content" ref="Number_refs"></div>
    </dv-border-box-7>       
   </div>
  
    
</template>

<script>
import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
export default {
  data(){ 
    return{
      NowTime: '',
      entrustNumber:null,
      //已委托未收到样品数据
      notReceivedNumber:[],
      //已收到样品数据
      received:[],
      //不合格样品数据
      unqualifiedData:[],
      //留样样品数据
      retentionData:[],
      

}
  },
  created(){
    this.getNowTime()
    this.getNotReceivedData()
    this.getReceivedData()
    this.getUnqualifiedData()
    this.getRetentionData()
  },
  mounted() {
    //初始化组件
    this.entrustNumberInit();
  },
methods:{
  //样品相关数据时间控件默认显示当前时间
  getNowTime(){
      const nowDate = new Date();
      const date = {
          year: nowDate.getFullYear(),
          month: nowDate.getMonth() + 1,
      }
      this.NowTime = date.year + '-' + date.month 
    },
    //用户手动查看某月份 的 样品相关数据
  changeTime(e){
    console.log(e,'未收到样品数据',this.notReceivedNumber)
    console.log(e,'已收到样品数据',this.received)
    // this.filter(this.notReceivedNumber,'shou_yang_ri_qi_',e)
    console.log(this.filter(this.received,'shou_yang_ri_qi_',e))
    // console.log(this.filter(this.unqualifiedData,'shou_yang_ri_qi_',e))
    // console.log(this.filter(this.retentionData,'shou_yang_ri_qi_',e))
      },
      //筛选月份数据   filter(要处理的数据，6，时间)
  filter(array,keyname,date){
    let res=[]
    array.forEach(e => {
      //用户选中的时间
      let month= date.getMonth()+1
      month = month < 10 ? ('0' + month) :month
      let year =date.getFullYear()
     //数据库里每一项的年，月
      let year2= e[keyname].slice(0,4)
      let month2=e[keyname].slice(5,7)
      console.log('用户选择的时间',year + '年'  + month + '月' )
      console.log('数据库里的时间',year2 + '年'  + month2 + '月' )
      console.log('已收到的每一项',array)
      console.log('当前项的收养日期',e[keyname])
     
      //把用户选中的年，月 的样品相关数据筛选出来
      if(year2==year && month2 ==month  ){
        res.push(e)
        console.log("用户选择的时间 对应的数据",res)
      }  
    });
    // return res
   

    
  },
  //1.未收到样品：已委托未收到样品数量:样品表有，登记表没有
  getNotReceivedData(){
      let sql1 = "select * from t_mjypb where t_mjypb.yang_pin_bian_hao not in(select t_mjypdjb.wei_tuo_bian_hao_ from t_mjypdjb)"
      curdPost('sql',sql1).then(response => { 
      this.notReceivedNumber = response.variables.data
      // console.log('样品表未收样数据aa',this.notReceivedNumber)
      })
  },
  
  //2.已收到：样品登记表有数据
  getReceivedData(){
    let sql2 = "select * from t_mjypdjb"
      curdPost('sql',sql2).then(response => { 
      this.received = response.variables.data
      // console.log('已收到样品数据aa',this.received)
      // let dataList = this.received.map((item)=>{
      //   return isNaN(parseInt(item.shou_yang_shu_lia))?0:parseInt(item.shou_yang_shu_lia);
      // });
      // console.log('已收',dataList);
    })
  },
  
  //3.已经收到不合格xx
  getUnqualifiedData(){
    let sql3 = "select * from t_mjypdjb where yan_shou_zhuang_t = '残缺'"
      curdPost('sql',sql3).then(response => { 
      this.unqualifiedData = response.variables.data
      // console.log('不合格样品数据aa',this.unqualifiedData)
      })
  },
  //4.留样样品数据xx
   getRetentionData(){
    let sql4 = "select  * from (select * from t_mjypdjb where  liu_yang_ri_qi_ ='' ) a where   a.shi_fou_liu_yang_ != '否'"
      curdPost('sql',sql4).then(response => { 
      this.retentionData = response.variables.data
      // console.log('留样样品数据aa',this.retentionData)
      })

   },
  
  //委托样品图表
  entrustNumberInit(){
    var entrustNumber = this.$echarts.init(this.$refs.Number_refs);
    var entrustNumberOption = {
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
          },
          axisLabel: {
            style: {
                fill: '#fff'
            }
        },
        },
        yAxis: {
          type: "value",
          name:'数量',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: 'white',//坐标线的颜色
                
            }
          },
          //去除网格线
          splitLine: {
            show: false
        },
        },
        // title: {
        //   text: '委托样品数量柱形图',
        // },
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
          top:'0%',
          left:'center',
          lineStyle:{

          },
          textStyle: {
            color: '#fff',
        },
        },
        //隐藏刻度线
        axisTick:{
              show:false,
            },
      
        series: [
          {
            type:"bar",
            name:'未收到样品',
            label: {
              show: true,
              position: 'top',
              color:'#fff'
             
            },
           
            data: [120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130,167,128],
            
           //柱子的颜色
            itemStyle:{
              show:true,
              color:'rgba(0, 186, 255, 0.4)',
            },
          
           
            //背景颜色
            // backgroundStyle: {
            //   color: "rgba(0, 186, 255, 0.4)",
            // },
          },
          {
            name:'已收到样品',
            type: 'line',
            label: {
              show: true,
              position: 'bottom',
              color:'#fff'  
            },
            data: [22 ,18, 33, 45, 63, 12, 20, 24, 23, 16, 12, 34,
            22 ,18, 33, 45, 63, 12, 20, 24, 23, 16, 12, 34,
            22 ,18, 12, 20, 24,  34],
            itemStyle:{
                color:'rgba(55, 162, 218, 0.6)'
            },
          
          },
        ],
        // series:this.series
    }
      entrustNumber.setOption(entrustNumberOption)
  }
}
}
</script>

<style lang="less" >
* border,body{
  padding: 0px;
  margin: 0px;
}
.entrustNumber{
  width: 1190px;
  height: 416px;
}
// .entrustNumber_content{
//   width: 100%;
//   height: 100%;
// }
.entrustNumber{
      // flex: 3;
      // background-color: rgb(39, 3, 59);
      display: flex;
      flex-direction:cloumn;
      flex-wrap :wrap;
      // justify-content:center;
      .entrustNumber_title{
        // background-color: rgb(25, 97, 156);
        width: 100%;
        height: 50px;
        position: relative;
        .demonstration{
          line-height: 50px;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -50px;
          margin-top: -25px;
          color: '#fff';
          font-size:20px;
          font-weight:600;

        }
        .chooseMonth{
          width: 120px;
          line-height: 50px;
          margin-left: 10px;
        }
      }
      .entrustNumber_content{
        width: 100%;
        height: 366px;
        // background-color: red;
      }
    }

</style>