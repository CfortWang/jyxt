<template>
  <div  class="data-view">
      <!-- 全屏显示容器 -->
      <dv-full-screen-container>
        <!-- 头部内容部分 -->
        <div class="headerContent">
           <!-- 标题装饰组件 -->
          <header-decoration :titleName="outputData.headerName"/> 
          <!-- 返回按钮 -->
          <div 
            class="goBackButton" 
            @click.prevent="goBack()" 
            style="width: 12%;
            height:2.825rem;
            line-height: 2.825rem;
            text-align:center;
            position: absolute;
            left: 20%;
            top:4%;" >
            <dv-border-box-8>返回</dv-border-box-8>
          </div>
          <!-- 显示数据上一次更新的时间 -->
          <div
            class="changeTime"
            style="width: 18%;
            cursor: pointer;
            height:2.825rem;
            line-height: 2.825rem;
            text-align:center;
            position: absolute;
            left: 70%;
            top:4%;
            color: #FFFFFF;">
              <dv-border-box-8 >上一次更新时间:{{this.sendTime}}</dv-border-box-8>
          </div>
          <!-- 样品头部数据总览 -->
          <div class="overView">
            <headerContent  @getUpdateTime="getTime"></headerContent>
            <dv-decoration-10 style="width:100%;height:5px;" />
          </div> 

        </div>
       

        <!-- 主体内容(图表部分) -->
        <div class="mainContent">
          <div class="entrust">
            <div class="Number" ref="Number_refs"><entrustNumber/> </div>
            <div class="Type" ><entrustType/></div>
          </div>
          <div class="detection">
            <div class="monthlyS" ref="MonthlyStatus_refs"><monthlyStatus/></div>
            <div class="monthlyN" ref="MonthlyNumber_refs"><monthlyNumber/></div>
            <div class="annualS" ref="AnnualStatus_refs"><annualStatus/></div>
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
        headerName:"样品管理看板"
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
     this.allView()
      
    }
  },
  beforeDestroy() {
      if(screenfull.isFullscreen){
        screenfull.toggle()
        }
    },
  methods: {
    getTime(val){
      this.sendTime = val
    },

    allView(){
      screenfull.request() //默认显示全屏
    },
    goBack(){
      this.$router.back(-1)
    }
  }

}
</script>

<style lang="less" scoped>
*body{
  padding: 0px;
  margin: 0px;
}
.data-view {
  width: 100%;
  height: 100%;
  color: #fff;
  z-index: 9999;
  #dv-full-screen-container {
    background-image: url('./img/stars.png');
    background-size: 100% 100%;
    display: flex;
    flex-direction:column;
    align-items: center;
    .headerContent{
      width: 100%;
      height: 19%;
      position:relative
      .overView{
        width: 100%;
        height: 80px;
      }
    }
    
    .mainContent{
      width: 100%;
      height:80%;
      display: flex;
      flex-direction:column;
      align-content:space-between;
      // border: 1px solid rgb(71, 17, 197);
        .entrust{
        width: 100%;
        height: 48%;
        display: flex;
        justify-content:space-between;
        // border: 1px solid rgb(17, 110, 197);
          .Number{
            width: 62%;
            height: 100%;
            display: flex;
            justify-content: center;
            // background-color: rgb(171, 163, 204);
          }
          .Type{
            width: 37.5%;
            height: 100%;
            margin-left: 10px;
            // background-color: rgb(12, 103, 131);
          
          }
        }

        .detection{
          width: 100%;
          height: 48%;
          margin-top: 15px;
          display: flex;
          justify-content:space-between;
          // border: 1px solid rgb(142, 190, 30);
          .monthlyS{
            width: 23%;
            height: 100%;
            // background-color: rgb(12, 103, 131);
          }
          .monthlyN{
            flex: 3;
            width: 50%;
            height: 100%;
            margin: 0px 10px;
            // background-color: rgb(171, 163, 204);
          }
          .annualS{
            width: 23%;
            height: 100%;
            // background-color: rgb(12, 103, 131);
          }
        
        }
    } 
  } 
}

</style>