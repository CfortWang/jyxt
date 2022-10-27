<template>
  <!-- 样品数据总览组件 -->
  <div class="baseBgColor">
      <div class="totalNumber">
        <div>委托样品总数</div>
        <div class="number">{{EntrustedTotal}}个</div>
      </div>
      <div class="notReceived">
        <div>待收样数量(已委托未收样)</div>
        <div class="number">{{NotReceiveNumber}}个</div>
      </div>
      <div class="received">
        <div>已收样数量</div>
        <div class="number">{{ReceiveNumber}}个</div>
      </div>
      <div class="staging">
        <div>待检样品数量</div>
        <div class="number">{{StagingNumber}}个</div>
      </div>
      <div class="unqualified">
        <div>不合格样品数量</div>
        <div class="number">{{UnqualifiedNumber}}个</div>
      </div>
      <div class="retention">
        <div>留样样品数量</div>
        <div class="number">{{RetentionNumber}}个</div>
      </div>
      <!-- <button @click="getTime">时间</button> -->
    
  </div>
  
</template>

<script>
import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
export default {
  data(){
    return{
      timer:null,
      sendTime:'',
      EntrustedTotal:0,
      NotReceiveNumber:0,
      ReceiveNumber:0,
      StagingNumber:0,
      UnqualifiedNumber:0,
      RetentionNumber:0
    }
  },
  created(){
    //数据获取
    this.getEntrustedTotalData()
    this.getNotReceivedData()
    this.getReceivedData()
    this.getUnqualifiedData()
    this.getStayData()
    this.getStagingNumberData()
    //拿到数据后先获取当前时间，把时间传给父组件
    this.getNowTime()
    // this.$emit('getUpdateTime',this.sendTime)
    // 页面进来先清除定时器
    clearInterval(this.timer)
    this.timer = null
    this.timer = setInterval(() =>{
      this.getEntrustedTotalData()
      this.getNotReceivedData()
      this.getReceivedData()
      this.getUnqualifiedData()
      this.getStayData()
      console.log('执行了定时器',this.sendTime)
      //数据回来之后调用触发this.$emit,触发父组件自定义方法获取时间
      this.getNowTime()
      // this.$emit('getUpdateTime',this.sendTime)
    }, 1000 * 60 *30);
    // 组件销毁清楚定时器
    this.$once('hook:beforeDestroy', () => {
    clearInterval(this.timer); 
    })
  },

  methods:{
   
     //获取时间
     getNowTime(){
      const nowDate = new Date();
      const date = {
          year: nowDate.getFullYear(),
          month: nowDate.getMonth() + 1,
          day: nowDate.getDate(),
          hour: nowDate.getHours(),
      }
      this.sendTime = date.year + '年' + date.month + '月' + date.day + '日' +date.hour + '时' 
      console.log("获取时间函数执行了",this.sendTime)
      //获取时间的时候直接传给父组件
      this.$emit('getUpdateTime',this.sendTime)
    },
    //委托样品总数:样品表所有
    getEntrustedTotalData(){
      let sql1 = "select count(id_) as sum from t_mjypb" 
      curdPost('sql',sql1).then(response => { 
      let data = response.variables.data
      this.EntrustedTotal = data[0].sum
      })
      
    },
    //待收样数量:已委托，未收到
    getNotReceivedData(){
      let sql2= "select count(id_) as sum from  t_mjypb WHERE wai_jian_ in(select id_ from t_mjwtsqb where zhuang_tai_ = '待样品接收')" 
      curdPost('sql',sql2).then(response => { 
      let data = response.variables.data
      this.NotReceiveNumber = data[0].sum

    })
  },
     //已经收样
     getReceivedData(){
      let sql3= "select count(id_) as sum from t_mjypdjb" 
      curdPost('sql',sql3).then(response => { 
      let data = response.variables.data
      this.ReceiveNumber = data[0].sum
    })

     },
     //待检样品数量
     getStagingNumberData(){
      // let sql6 = "select * from t_mjypdjb"
      let sql6= "select count(id_) as sum from t_mjypdjb where liu_zhuan_zhuang_ = '待检' " 
      curdPost('sql',sql6).then(response => { 
      let data = response.variables.data
      this.StagingNumber =data[0].sum
      // console.log("样品登记表数据777",this.StagingNumber)

    })
      },
     //不合格样品数量
     getUnqualifiedData(){
      let sql4= "select count(id_) as sum from t_mjypdjb where yan_shou_zhuang_t = '残缺'" 
      curdPost('sql',sql4).then(response => { 
      let data = response.variables.data
      this.UnqualifiedNumber =data[0].sum

    })
     },
     //留样样品数量
     getStayData(){
      let sql5= "select  * from (select * from t_mjypdjb where  liu_yang_ri_qi_ ='' ) a where   a.shi_fou_liu_yang_ != '否'" 
      curdPost('sql',sql5).then(response => { 
      let data = response.variables.data
      this.RetentionNumber = data.length 

    })
     }

  },
 


}
</script>

<style lang="scss" scoped>
.baseBgColor{
    width: 100%;
    height: 80px;
    background-color: rgba(6, 30, 93, 0.5);
    display: flex;
    .totalNumber,
    .notReceived,
    .received,
    .staging,
    .unqualified,
    .retention
    {
        border-right: 1px solid #00db95;
        flex: 1;
        text-align: center;
        font-size: 16px;
        display: flex;
        flex-direction:cloumn; 
        flex-wrap :wrap; 
        align-content: space-around;

        margin: 10px 0px;
        position:relative;
        text-align:center;
        display:table-cell;
        vertical-align:middle;
        .number{
          display:inline-block;
          margin: 15px 0px 0px 0px;
        }
      }
    

}
</style>