<template>
  <div  class="data-view">
      <!-- 全屏显示容器 -->
      <dv-full-screen-container>
        <div class="headerContent">
           <!-- 标题装饰组件 -->
          <header-decoration :titleName="outputData.headerName"/> 
          <div
                   style="width: 18%;
                     cursor: pointer;
                      height:2.825rem;
                      line-height: 2.825rem;
                      text-align:center;
                      margin-left:70%;
                      margin-top:-60px;
                      flex: 1;
                      position: absolute;
                      color: #FFFFFF;"
                      >
                <dv-border-box-8 >
                 
                  上一次更新时间:{{this.sendTime}}
                      </dv-border-box-8>
      </div>
          <!-- <div>当前时间</div> -->
          <!-- 样品数据总览 -->
          <div class="overView">
            <!-- <header-content/> -->
            <headerContent  @getUpdateTime="getTime"></headerContent>
            <dv-decoration-10 style="width:100%;height:5px;" />
          </div> 

        </div>
       

        <!-- 主体内容(图表部分) -->
        <div class="mainContent">
          <div class="entrust">
            <div class="entrustNumber" ref="Number_refs">
              <!-- 委托样品条目情况组件 -->
              <entrust-number/>
            </div>
            <!-- 委托样品类型组件 -->
            <div class="entrustType" >
              <entrust-type/>
            </div>
          </div>
          <div class="detection">
            <div class="monthlyStatus" ref="MonthlyStatus_refs"><monthlyStatus/></div>
            <div class="monthlyNumber" ref="MonthlyNumber_refs"><monthlyNumber/></div>
            <div class="annualStatus" ref="AnnualStatus_refs"><annualStatus/></div>
          </div>
        </div>
        
      </dv-full-screen-container>
   </div>
</template>

<script>
//全屏展示
import screenfull from 'screenfull'
//大屏标题组件
import headerDecoration from './headerDecoration'
//头部内容组件
import headerContent from './headerContent'
//委托样品条目情况组件
import entrustNumber from './EntrustNumber'
//委托样品类型组件
import entrustType from './EntrustType'  
// 月度检测完成情况(环形图)
import monthlyStatus from './MonthlyStatus'
//年度检测完成情况(环形图)
import annualStatus from './AnnualStatus'
//月度检测情况组件
import monthlyNumber from './MonthlyNumber'
export default {

  components:{
    headerDecoration,
    headerContent,
    entrustNumber,
    entrustType,
    monthlyStatus,
    annualStatus,
    monthlyNumber
  },
  data(){
    return{
      sendTime:'',
      outputData:{
        headerName:"月度样品管理看板"
      }

    }
    
  },
  mounted(){
    // this.getTime()
  },
  created() {
    //时间
    this.currentTime()
    if(screenfull.isEnabled && !screenfull.isFullscreen){
     
      
    }
  },
  beforeDestroy() {
      if(screenfull.isFullscreen){
        screenfull.toggle()
        }
    },
  methods: {
    getTime(val){
      console.log('触发了父组件接收时间方法',val)
      this.sendTime = val
      
    },

    allView(){
      screenfull.request() //默认显示全屏
    },
    //时间
    currentTime() {
      setInterval(this.getNowTime, 500);
    },
    // getNowTime(){  
    //   const nowDate = new Date();
    //   const date = {
    //       year: nowDate.getFullYear(),
    //       month: nowDate.getMonth() + 1,
    //       day: nowDate.getDate(),
    //       hour: nowDate.getHours(),
    //       // minute: nowDate.getMinutes(),
    //       // second: nowDate.getSeconds()
    //   }
    //   this.sendTime = date.year + '年' + date.month + '月' + date.day + '日' +date.hour + '时' 
    //   // this.sendTime = date.year + '年' + date.month + '月' + date.day + '日' +date.hour + '时' + date.minute + '分' + date.second + '秒'
    // },
 

       

      
     
     
     
          
    
  }

}
</script>

<style lang="less" >
*body{
  padding: 0px;
  margin: 0px;
}
.data-view {
  width: 100%;
  height: 100%;
  // position: absolute;
  color: #fff;
  z-index: 9999;
  #dv-full-screen-container {
    background-image: url('./img/stars.png');
    background-size: 100% 100%;
    // box-shadow: 0 0 3px blue;bete
    // display: flex;
    // flex-direction: column;
    display: flex;
    flex-direction:column;
    align-items: stretch;
    
   .headerContent{
    flex: 1;
    // background-color: rgb(99, 12, 41);
    

   }
   .mainContent{
    width: 100%;
    height: 100%;
    flex: 4;
    display: flex;
    flex-direction:column;
    // align-items: stretch;
    // align-items: flex-start;
    align-content:space-between;
    // margin-top: 20px;
    
    // background-color: rgb(12, 99, 58);
      .entrust{
      // width: 100%;
      flex: 1;
      // border: 1px solid rgb(25, 156, 91);
      // background-color: rgb(6, 47, 161);
      display: flex;
      justify-content:space-between;
      margin-bottom: 15px ;
        .entrustNumber{
          flex: 5;
          margin-right: 10px;
          // background-color: rgb(25, 97, 156);
        }
        .entrustType{
          flex: 3;
         
        }
      }

      .detection{
      // width: 100%;
      flex: 1;
      display: flex;
      // border: 1px solid rgb(39, 3, 59);
      // background-color: rgb(226, 77, 134);
        .monthlyStatus{
          flex: 1;
        
          // background-color: rgb(25, 156, 91);
        }
        .monthlyNumber{
          flex: 3;
          // margin: 0px 10px;
          // background-color: rgb(39, 3, 59);
        }
        .annualStatus{
          flex: 1;
        // margin-right: 10px;
        // background-color: rgb(25, 156, 91);
        }
      
      }
   

  
  }
 
    .overView{
      width: 100%;
      height: 80px;
    }
  
}
}

</style>