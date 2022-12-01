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
            format="yyyy-MM" 
            value-format="yyyy-MM"
            placeholder="请选择时间">
          </el-date-picker>
        </div>
        <div class="entrustNumber_content" ref="Number_refs"></div>
    </dv-border-box-7>       
  </div> 
</template>

<script>
 import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
import { resolve } from 'path';
export default {
  data(){ 
    return{
      NowTime: '',
      entrustNumber:null,
      //对应月份的每一天的数组
      days:[],
      //月份天数
      day:0,
      //填充数量的数组
      filledNum:[],

      // //已收到要填充的数组
      // ReceivedNum:[],
      // //不合格要填充的数据
      // UnqualifiedNum:[],
      // //留样要填充的数据
      // RetentionNum:[],
      //  //已收到样品数据
      //  received:[],
      // //不合格样品数据
      // unqualifiedData:[],
      // //留样样品数据
      // retentionData:[],
      
    }
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
      // console.log('页面显示的时间',this.NowTime)  //2022-11
      //把页面第一次进来的 当前年度月份 传给该方法处理 得到day及days
      this.getDaysInMonth(date.year,date.month)
      
    },
   

    //手动操作时间控件改变时间
    changeTime(e){
      console.log('改变时间',e) //2022-07
      let year = e.slice(0,4)
      let month = e.slice(5,7)
      this.NowTime = year + '-' + month
      // console.log('用户操作之后 页面显示的时间',this.NowTime,year,month) //2022-11 2022 11
      //把年度月份传给getDaysInMonth()之前，先清理上一次数据
      // this.entrustNumber.diswpose()  //这个方法干嘛的？？ 为啥清不掉entrustNumberInit()方法的数据
      this.days=[]
      //在这里打印一下this.days数组
      // console.log('用户操作了时间控件之后打印this.days数组',this.days)
      //把用户操作时间控件改变的时间 的年度月份 传给该方法处理 得到day及days
      this.getDaysInMonth(year,month)
    
    },
    //拿到当前年度 月份 获取当前月份的天数day及【天数数组】days
    getDaysInMonth(year,month){
      let temp = new Date(year,month,0);
      this.day = temp.getDate(); 
      // console.log('处理好的年 月 月份天数',year,month,this.day);   //2022 11 30
      //把月份对应天数转化为数组
      for( let i=1;i <= this.day ;i++){
        this.days.push(i)
      }
      // console.log('月份每一天',this.days)
      this.getdemandData(this.day)
      
    },

    getdemandData(dayNum){
      // console.log('返回的全部数据 传日期到sql查询',this.NowTime,dayNum)
      //SELECT shou_yang_ri_qi_ FROM t_mjypdjb WHERE yan_shou_zhuang_t = '残缺'  AND shou_yang_ri_qi_ LIKE '2022-11%'   //不合格
      //SELECT liu_yang_ri_qi_,liu_yang_shu_lian FROM (SELECT * FROM t_mjypdjb WHERE  liu_yang_ri_qi_ ='' ) a WHERE   a.shi_fou_liu_yang_ != '否' AND shou_yang_ri_qi_ LIKE '2022-11%'  //留样
      let sql1 = "select shou_yang_ri_qi_,shou_yang_shu_lia FROM t_mjypdjb WHERE shou_yang_ri_qi_ LIKE '"+this.NowTime+'%'+"'"
      let sql2 ="select shou_yang_ri_qi_,shou_yang_shu_lia FROM t_mjypdjb WHERE yan_shou_zhuang_t = '残缺'  AND shou_yang_ri_qi_ LIKE '"+this.NowTime+'%'+"'"
      let sql3 = "select liu_yang_ri_qi_,liu_yang_shu_lian FROM (SELECT * FROM t_mjypdjb WHERE  liu_yang_ri_qi_ ='' ) a WHERE   a.shi_fou_liu_yang_ != '否' AND shou_yang_ri_qi_ LIKE '"+this.NowTime+'%'+"'"
      Promise.all([
        curdPost('sql', sql1),
        curdPost('sql', sql2),
        curdPost('sql', sql3),
      ]).then(([ res1, res2, res3]) => {
        let data1 = res1.variables.data
        let data2 = res2.variables.data
        let data3 = res3.variables.data
        // console.log('返回的全部数据',data1,data2)
        // console.log('返回的全部数据',data1,data2,data3)
        const receivedData = this.dealingData(data1,dayNum)
        const unqualifiedData = this.dealingData(data2,dayNum)
        const retentionData = this.dealingRetentionData(data3,dayNum)
        // console.log('xxxxxxxxx方法返回的数据1   -------',receivedData)
        // console.log('xxxxxxxxx方法返回的数据2   -------',unqualifiedData)
        // console.log('xxxxxxxxx方法返回的数据3   -------',retentionData)
        //三组数据处理完毕之后，传给图表进行渲染  （月份天数数组，已收样，不合格，留样）
        this.entrustNumberInit(this.days,receivedData,unqualifiedData,retentionData)
      })
    },
    //处理sql查询出来的数据
    dealingData(data,dayNum){
      let newArray = data.reduce((total, cur, index) => {
          let hasValue = total.findIndex(current => {
            return current.shou_yang_ri_qi_ === cur.shou_yang_ri_qi_;
          });
          hasValue === -1 && total.push(cur);
          hasValue !== -1 && (total[hasValue].shou_yang_shu_lia = total[hasValue].shou_yang_shu_lia + cur.shou_yang_shu_lia);
          return total;
      }, []);
      //console.log('日期相同数量相加 处理结果',newArray);
      //创建一个长度为当前月份天数的数组
      this.filledNum = Array(dayNum).fill(0)
      //遍历拿到的数组，截取出月份对应的 // 2022-11-01
      newArray.forEach(item =>{
        let key = item.shou_yang_ri_qi_.slice(8,10) < 10 ?item.shou_yang_ri_qi_.slice(9,10) :item.shou_yang_ri_qi_.slice(8,10)
        let value =parseInt(item.shou_yang_shu_lia)
        this.filledNum.splice(key - 1,1,value)
      })
      //返回处理好的数量数组
      return this.filledNum;
    },
    //处理留样数据
    dealingRetentionData(data,dayNum){
      let newArray = data.reduce((total, cur, index) => {
          let hasValue = total.findIndex(current => {
            return current.liu_yang_ri_qi_ === cur.liu_yang_ri_qi_;
          });
          hasValue === -1 && total.push(cur);
          hasValue !== -1 && (total[hasValue].liu_yang_ri_qi_ = total[hasValue].liu_yang_ri_qi_ + cur.liu_yang_ri_qi_);
          return total;
      }, []);
        //console.log('日期相同数量相加 处理结果',newArray);
        //创建一个长度为当前月份天数的数组
        this.filledNum = Array(dayNum).fill(0)
        //遍历拿到的数组，截取出月份对应的 // 2022-11-01
        newArray.forEach(item =>{
          let key = item.liu_yang_ri_qi_.slice(8,10) < 10 ?item.liu_yang_ri_qi_.slice(9,10) :item.liu_yang_ri_qi_.slice(8,10)
          let value =parseInt(item.liu_yang_shu_lian)
          this.filledNum.splice(key - 1,1,value)
        })
        //返回处理好的数量数组
        return this.filledNum;
    },
    //1.已收到：样品登记表有数据
    getReceivedData(dayNum){
      // console.log('已收样品传日期到sql查询',this.NowTime)   //2022-11
      // console.log('getReceivedData function ',dayNum)
      //let sql2 = "select shou_yang_ri_qi_,shou_yang_shu_lia FROM t_mjypdjb"
      let sql2 = "select shou_yang_ri_qi_,shou_yang_shu_lia FROM t_mjypdjb WHERE shou_yang_ri_qi_ LIKE '"+this.NowTime+'%'+"'" 
        curdPost('sql',sql2).then(response => { 
        let data = response.variables.data
        // console.log('已收',data,data.length)

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
        this.ReceivedNum = Array(dayNum)
        this.ReceivedNum = this.ReceivedNum.fill(0)
        //console.log('创建对应月份的数组',this.ReceivedNum)
        //遍历拿到的数组，截取出月份对应的 // 2022-11-01
        newArray.forEach(item =>{
          let key = item.shou_yang_ri_qi_.slice(8,10) < 10 ?item.shou_yang_ri_qi_.slice(9,10) :item.shou_yang_ri_qi_.slice(8,10)
          let value =parseInt(item.shou_yang_shu_lia)
          this.ReceivedNum.splice(key - 1,1,value)
        })
        //console.log('getReceivedData 处理好的数据',this.ReceivedNum)
        //拿到月份数组和y轴数量数组
        this.entrustNumberInit(this.days,this.ReceivedNum)
      })
    },
  
    //2.已经收到不合格 xx
    getUnqualifiedData(dayNum){
      //let sql3 = "select shou_yang_ri_qi_,shou_yang_shu_lia from t_mjypdjb where yan_shou_zhuang_t = '残缺'"
      let sql3 ="select shou_yang_ri_qi_,shou_yang_shu_lia FROM t_mjypdjb WHERE yan_shou_zhuang_t = '残缺'  AND shou_yang_ri_qi_ LIKE '"+this.NowTime+'%'+"'"
        curdPost('sql',sql3).then(response => { 
        let data = response.variables.data
        console.log('不合格样品数据',data )
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
        //console.log("getUnqualifiedData function before this newArrayNew is ", this.newArrayNum);
        this.UnqualifiedNum = Array(dayNum)
        this.UnqualifiedNum = this.UnqualifiedNum.fill(0)
        //console.log('创建对应月份的数组',this.UnqualifiedNum)
        //遍历拿到的数组，截取出月份对应的 // 2022-11-01
        newArray.forEach(item =>{
          let key = item.shou_yang_ri_qi_.slice(8,10) < 10 ?item.shou_yang_ri_qi_.slice(9,10) :item.shou_yang_ri_qi_.slice(8,10)
          let value =parseInt(item.shou_yang_shu_lia)
          this.UnqualifiedNum.splice(key - 1,1,value)
        })
        // console.log('getUnqualifiedData 处理好的数据',this.UnqualifiedNum)
        return this.UnqualifiedNum;
        // 到这里说明上面的数据已经处理好了
        // 可以写return语句将处理好的数据返回
        //拿到月份数组和y轴数量数组
        this.entrustNumberInit(this.days,this.UnqualifiedNum)
        
        })
    },
      
    //3.留样样品数据xx
    getRetentionData(dayNum){
      let sql4 = "select  shou_yang_ri_qi_,shou_yang_shu_lia from (select * from t_mjypdjb where  liu_yang_ri_qi_ ='' ) a where   a.shi_fou_liu_yang_ != '否'"
        curdPost('sql',sql4).then(response => { 
        let data = response.variables.data
        // console.log('已收',data)
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
        this.RetentionNum = Array(dayNum)
        this.RetentionNum = this.RetentionNum.fill(0)
        //console.log('创建对应月份的数组',this.RetentionNum)
        //遍历拿到的数组，截取出月份对应的 // 2022-11-01
        newArray.forEach(item =>{
          let key = item.shou_yang_ri_qi_.slice(8,10) < 10 ?item.shou_yang_ri_qi_.slice(9,10) :item.shou_yang_ri_qi_.slice(8,10)
          let value =parseInt(item.shou_yang_shu_lia)
          this.RetentionNum.splice(key - 1,1,value)
        })
        // console.log('getRetentionData 处理好的数据',this.RetentionNum)
        return this.RetentionNum;
        })

    },
    //不合格
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
  
    //委托样品图表
    entrustNumberInit(dayArray,receivedData,unqualifiedData,retentionData){
      // console.log('拿到日期数组',dayArray)
      this.entrustNumber = this.$echarts.init(this.$refs.Number_refs);
      var entrustNumberOption = {
          xAxis:{
            type: "category",
            //当前月的每一天 数组
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
            splitLine: {
              show: false
            },
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
            top:'0',
            left:'center',
            lineStyle:{},
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
              name:'已收到样品',
              //显示数字的颜色
              label: {
                show: true,
                position: 'top',
                color:'#fff'
              },
              //柱子的颜色
              itemStyle:{
                show:true,
                color:'rgba(0, 186, 255, 0.4)',
              },
              data:receivedData 
            },
            {
              type: 'line',
              name:'不合格样品',
              label: {
                show: true,
                position: 'top',
                color:'#f5f12a'
              },
              //柱子的颜色
              itemStyle:{
                show:true,
                color:'rgba(245, 241, 42, 0.4)',
              },
              data:unqualifiedData 
            },
            {
              type: 'line',
              name:'留样样品',
              label: {
                show: true,
                position: 'top',
                color:'#f52aa0'
              },
              //柱子的颜色
              itemStyle:{
                show:true,
                color:'rgba(245, 41, 160,0.4)',
              },
              data:retentionData 
            },
          ],
      }
      this.entrustNumber.setOption(entrustNumberOption)
    }
  }
}
</script>
<style lang="less" scoped>
* body{
  padding: 0px;
  margin: 0px;
  border: 0;
}
.entrustNumber{
  width: 100%;
  height: 100%;
  #dv-border-box-7{
    background-size: 100% 100%;
    border: 2px solid rgb(3, 59, 31);
    display: flex;
    flex-direction:column;
    align-content:space-between;
    
  }
  .entrustNumber_title{
    width: 100%;
    height: 50px;
    position: relative;
    // border: 2px solid rgb(245, 41, 160);
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
    //calc()里面内容需要两边有空格，否则无效
    height: calc(100% - 50px);
  }
  
}

</style>