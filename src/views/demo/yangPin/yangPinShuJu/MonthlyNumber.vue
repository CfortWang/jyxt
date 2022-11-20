<template>
  <div class="entrustNumber" >
   <!-- 月度样品检测情况组件  -->
    <dv-border-box-7  backgroundColor="rgba(6, 30, 93, 0.5)" >
      <div class="entrustNumber_title">
        <span class="demonstration">月度样品检测情况</span>
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
       //留样样品数据
       retentionData:[],
       //对应月份的每一天的数组
       days:[],
       //月份天数
       day:0,
      //需要填充的数组
      newArrayNum:[]
       
 
 }
   },
   created(){
    
   },
   mounted() {
    this.getNowTime()
   
   },
 methods:{
   //样品相关数据时间控件 :页面进来显示当前时间
   getNowTime(){
      const nowDate = new Date();
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
    }
      this.NowTime = date.year + '-' + date.month
      // console.log('页面第一次进来显示时间',date.year,date.month)
      //进来获取当前时间 之后获取当前月份天数 传给
      this.getDaysInMonth(date.year,date.month)
      
    },
   

  //手动操作时间控件改变时间
  changeTime(e){
    // console.log('改变时间',e)
    let year = e.slice(0,4)
    let month = e.slice(5,7)
    this.getDaysInMonth(year,month)
  },
  //用户操作获取月份对应天数,
  getDaysInMonth(year,month){
    let temp = new Date(year,month,0);
    this.day = temp.getDate(); 
    // console.log('当前月份：',month,',天数',this.day);
    for( let i=1;i <= this.day ;i++){
      this.days.push(i)
    }
    // console.log('月份每一天',this.days)
    // console.log('当前月天数',this.day)
    this.getUnqualifiedData(this.day)
  },
   
  
   
   //3.已经收到不合格xx
   getUnqualifiedData(dayNum){
     let sql3 = "select * from t_mjypdjb where yan_shou_zhuang_t = '残缺'"
       curdPost('sql',sql3).then(response => { 
       this.unqualifiedData = response.variables.data
       let data = response.variables.data
       let newArray = data.reduce((total, cur, index) => {
        let hasValue = total.findIndex(current => {
          return current.shou_yang_ri_qi_ === cur.shou_yang_ri_qi_;
        });
        hasValue === -1 && total.push(cur);
        hasValue !== -1 && (total[hasValue].shou_yang_shu_lia = total[hasValue].shou_yang_shu_lia + cur.shou_yang_shu_lia);
        return total;
      }, []);
      //console.log('日期数量11111111',newArray);
      //创建一个长度为当前月份天数的数组
      this.newArrayNum = Array(dayNum)
      this.newArrayNum = this.newArrayNum.fill(0)
      //console.log('创建对应月份的数组',this.newArrayNum)
      //遍历拿到的数组，截取出月份对应的 // 2022-11-01
      newArray.forEach(item =>{
        let key = item.shou_yang_ri_qi_.slice(8,10) < 10 ?item.shou_yang_ri_qi_.slice(9,10) :item.shou_yang_ri_qi_.slice(8,10)
        let value =parseInt(item.shou_yang_shu_lia)
        this.newArrayNum.splice(key - 1,1,value)
      })
      //console.log('处理好的数据',this.newArrayNum)
      //拿到月份数组和y轴数量数组
      this.entrustNumberInit(this.days,this.newArrayNum)

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
   entrustNumberInit(dayArray,numAray){
     var entrustNumber = this.$echarts.init(this.$refs.Number_refs);
     var entrustNumberOption = {
         xAxis:{
           type: "category",
           //获取当前月的日期1到30日
          //  data: ["1号", "2号", "3号", "4号", "5号", "6号", "7号","8号","9号","10号",
          //  "11号","12号","13号", "14号", "15号", "16号", "17号", "18号", "19号","20号",
          //  "21号","22号","23号","24号","25号","26号","27号","28号","29号","30号"],
          data: dayArray,
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
             name:'不合格样品',
             label: {
               show: true,
               position: 'top',
               color:'#fff'
             },
            
             //data: [120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130,167,128],
             data:numAray,
            //柱子的颜色
             itemStyle:{
               show:true,
               color:'rgba(0, 186, 255, 0.4)'
               
             },
           },
          
         ],
     }
       entrustNumber.setOption(entrustNumberOption)
   }
 }
 }
 </script>
 
 <style lang="less" scoped >
 *body{
   padding: 0px;
   margin: 0px;
 }
.entrustNumber{
  width: 100%;
  height: 100%;
  #dv-border-box-7{
    background-size: 100% 100%;
    display: flex;
    flex-direction:column;
    align-content:space-between;
   
  } 
  .entrustNumber_title{
    width: 100%;
    height: 50px;
    position: relative;
    .demonstration{
      line-height: 50px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -60px;
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
    height: calc(100% - 50px);
  }     
}
 
 </style>