
<template>
  <!--   RB/T 214-2017条款不符合统计情况 -->
  
  <div class="audit">
    
    <!-- 1.不符合条款统计柱状图 -->
    <div class="audit_title">不符合条款统计情况</div>
    <!-- 图表 -->
    <div class="audit_content">
      <div  class="clauseA">
        <el-select v-model="value1" placeholder="请选择" class="selectorA" @change="changeTypeA">
          <el-option
            v-for="item in options1"
            :key="item.value1"
            :label="item.label"
            :value="item.value1">
          </el-option>
        </el-select>
        <div  class="clauseA_content" ref="clauseA_refs"></div>
      </div>
      <div  class="clauseB" >
        <el-select v-model="value2" placeholder="请选择" class="selectorB" @change="changeTypeB">
          <el-option
            v-for="item in options2"
            :key="item.value2"
            :label="item.label"
            :value="item.value2">
          </el-option>
        </el-select>
        <div class="clauseB_content" ref="clauseB_refs"></div>
      </div>
    </div>

 
     

    <!-- 暂时撤掉的需求（条款分布统计，条款组统计） -->

    <!-- <div class="pieChart">
      <div  class="categories">
      <dv-border-box-7 backgroundColor="rgba(6, 30, 93, 0.5)" >
          <div class="categories_title">2.条款分类统计</div>
          <div class="categoriess_content" ref="categories_refs"></div>
      </dv-border-box-7>  
    </div>
    <div  class="department">
      <dv-border-box-7 backgroundColor="rgba(6, 30, 93, 0.5)" >
          <div class="department_title">3.不符合部门统计</div>
          <div class="department_content" ref="department_refs"></div>
      </dv-border-box-7>  
    </div>
    </div> -->

    
   
    
  </div>
</template>

<script>
 import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
export default {

  data(){
    return{
      options1: [{
          value1: '常规内审',
          label: '常规内审'
        }, {
          value1: '附加内审',
          label: '附加内审'
        }, {
          value1: '日常监督',
          label: '日常监督'
        },{
          value1: '外部审核',
          label: '外部审核'
        }],
        options2: [{
          value2: '常规内审',
          label: '常规内审'
        }, {
          value2: '附加内审',
          label: '附加内审'
        }, {
          value2: '日常监督',
          label: '日常监督'
        },{
          value2: '外部审核',
          label: '外部审核'
        }],
        value1: '常规内审',
        value2: '常规内审',
        clause:null,
        titleNumA:{},
        regulation:null,
        titleNumB:{}
        // categories:null,
        // department:null,
        // newArray:[],
        // new:[],
        
    }
  },
  mounted(){
    this.getRetentionData(this.value1);
    this.getInconformityData(this.value2)
  },
  methods:{
    changeTypeA(e){
      this.value1 = e
      //e是value,
      // console.log('改变类型',this.value1)
      this.getRetentionData(this.value1)
    },
    changeTypeB(e){
      this.value2 = e
      console.log('改变类型',this.value2)
      this.getInconformityData(this.value2)
    },

    //RBT 214_2017不符合项执行情况页面的数据
    getRetentionData(type){
      // let sql = "select  a.bu_fu_he_xiang_ti from t_bfhxbgyjzcsjlbx a where a.biao_zhun_bian_ha like '%RB-T 214-2017%' order by a.create_time_   desc"
      //某一类型(常规，附加，日常，外部)的 标准编号为"RB-T 214-2017"的  按时间降序的  不符合数据（标准号，条款号，类型）
      let sql ="select  a.biao_zhun_bian_ha,a.bu_fu_he_xiang_ti, a.bu_fu_he_bao_gao_  from t_bfhxbgyjzcsjlbx a where concat(a.biao_zhun_bian_ha) like '%RB-T 214-2017%' and concat(a.bu_fu_he_bao_gao_) like '%"+type+"%' order by a.create_time_ desc"
      curdPost('sql',sql).then(response => { 
      let data = response.variables.data 
      console.log('RB-T214-2017常规内审的',data)
      let titleList = data.map(item => {
        return item.bu_fu_he_xiang_ti
      })
      console.log('不符合条款',titleList)
      //计算条款数量，以对象形式返回
      this.titleNumA = titleList.reduce((pre,cur)=>{
        if(cur in pre){
          pre[cur]++
        }else{
          pre[cur] = 1
        }
        return pre
      },{})
      console.log('条款对应数量',this.titleNumA)
      this.clauseInit(this.titleNumA);
      //-----------------------------------
      //条款号，数量；以数组对象形式返回
      // let newArray = [];
      // for(let i in this.titleNum){
      //     let obj = {
      //         title:i,
      //         num:this.titleNum[i]
      //     }
      //     newArray.push(obj)
      // }
      // console.log('最终数据',newArray)
      //获取条款名称数组
      // let titleName = newArray.map(item => {
      //   return item.title
      // })
      // console.log('条款名称数组',titleName)

      //获取条款名称对应的数量
      // let num = newArray.map(item => {
      //   return item.num
      // })
      // console.log('条款数量数组',num)
      // this.new.push(titleName)
      // this.new.push(num)
      })
     
   },
   
   //17025 不符合项执行情况
   getInconformityData(type){
      let sql ="select a.bu_fu_he_xiang_ti  from t_bfhxbgyjzcsjlbx a where concat(a.biao_zhun_bian_ha) like '%17025%' and concat(a.bu_fu_he_bao_gao_) like '%"+type+"%' order by a.create_time_ desc"
      curdPost('sql',sql).then(response => { 
      let data = response.variables.data 
      console.log('17025标准的条款号',data)
      let titleList = data.map(item => {
        return item.bu_fu_he_xiang_ti
      })
      // console.log('不符合条款',titleList)
      //计算条款数量
      this.titleNumB = titleList.reduce((pre,cur)=>{
        if(cur in pre){
          pre[cur]++
        }else{
          pre[cur] = 1
        }
        return pre
      },{})
      this.regulationInit(this.titleNumB);
    
      })
     
   },
    // RBT 214-2017 不符合条款数量统计
    clauseInit(initData){
      var clause = this.$echarts.init(this.$refs.clauseA_refs);
      var clauseOption = {
        title: {
          text: 'RB/T 214-2017不符合条款数量统计',
          textStyle: {
            // color: '#fff',
            fontSize: 20,
            fontWeight: '600'
          },
          textAlign: 'center',
          left: '50%',
          top: '20px'
        },
       
        //鼠标悬浮显示效果
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
       
        grid: {
          left: '3%',
          right: '5%',
          bottom: '25%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          // boundaryGap: [0, 0.01],
          splitLine: {
            show: false
          },
        },
        yAxis: {
          type: 'category',
          //条款编号
          data:Object.keys(initData)
        },
        series: [
          {
            name: 'RB-T214-2017',
            type: 'bar',
            data:Object.values(initData)
          },
        ]
      }
      clause.setOption(clauseOption);

    },
    //17025 不符合条款数量统计
    regulationInit(regulationData){
      var regulation = this.$echarts.init(this.$refs.clauseB_refs);
      var regulationOption = {
        title: {
          text: '17025 不符合条款数量统计',
          textStyle: {
            fontSize: 20,
            fontWeight: '600'
          },
          textAlign: 'center',
          left: '50%',
          top: '20px'
        },
       
        //鼠标悬浮显示效果
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
       
        grid: {
          left: '3%',
          right: '10%',
          bottom: '25%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          // boundaryGap: [0, 0.01],
          splitLine: {
            show: false
          },
        },
        yAxis: {
          type: 'category',
          data:Object.keys(regulationData)
        },
        series: [
          {
            name: '17025',
            type: 'bar',
            data:Object.values(regulationData)
          },
        ]
      }
      regulation.setOption(regulationOption);

    },
    // 暂时撤掉的需求（条款分布统计，条款组统计）
    //条款分类统计
    // categoriesInit(){
    //   var categories = this.$echarts.init(this.$refs.categories_refs);
      
    //   var categoriesOption ={
    //     grid:{
    //       left:'',
    //       top:'0%',
    //       bottom:'0%',
    //       containLabel:true  //?
    //     },
      
    //    //鼠标滑过显示信息
    //     tooltip: {
    //       trigger: "item",
    //       formatter: '{d}%\n{b}',//
    //     },
    //     //图例的位置
    //     // legend: {
    //     //   orient: 'vertical',  //horizontal 水平排列
    //     //   // left: 'right',
    //     //   right:'10%',
    //     //   bottom:'10%',
    //     //   lineStyle:{

    //     //   }
    //     // },
    //     series: [
       
        
    //       {
    //         name: 'Access From',
    //         type: 'pie',
    //        // radius: ['40%', '70%'],
    //         //center: ["50%", "48%"],//图表的位置 以圆心为基准 水平竖直位置
    //         avoidLabelOverlap: true,//是否启用防止标签重叠策略
    //         label: {
    //           show: true,
    //           formatter: " {b}\n {c} ({d}%)",
    //           // formatter: '{d}%\n{b}',// 显示百分比，
    //           position: 'outside',
    //           color:'#fff'
    //         },
    //         emphasis: {
    //           label: {
    //             show: true,
    //             fontSize: '40',
    //             fontWeight: 'bold'
    //           }
    //         },
    //         labelLine: {
    //           show: false
    //         },
    //         data: [
    //           { value: 5, name: '4.1人员' },
    //           { value: 6, name: '4.2机构' },
    //           { value: 12, name: '4.3场所环境' },
             
    //         ]
    //       }
    //    ]
    //   }
    //   categories.setOption(categoriesOption);

    // },
    // //不符合部门统计
    // departmentInit(){
    //   var department = this.$echarts.init(this.$refs.department_refs);
    //   var departmentOption ={
    //     grid:{
    //       left:'',
    //       top:'0%',
    //       bottom:'0%',
    //       containLabel:true  //?
    //     },
      
    //    //鼠标滑过显示信息
    //     tooltip: {
    //       trigger: "item",
    //       formatter: '{d}%\n{b}',
    //     },
    //     //图例的位置
    //     // legend: {
    //     //   orient: 'vertical',  //horizontal 水平排列
    //     //   // left: 'right',
    //     //   right:'10%',
    //     //   bottom:'10%',
    //     //   lineStyle:{

    //     //   }
    //     // },
    //     series: [
       
        
    //       {
    //         name: 'Access From',
    //         type: 'pie',
    //         avoidLabelOverlap: true,//是否启用防止标签重叠策略
    //         label: {
    //           show: true,
    //           formatter: " {b}\n {c} ({d}%)",
    //           // formatter: '{d}%\n{b}',// 显示百分比，
    //           position: 'outside',
    //           color:'#fff'
    //         },
    //         emphasis: {
    //           label: {
    //             show: true,
    //             fontSize: '40',
    //             fontWeight: 'bold'
    //           }
    //         },
    //         labelLine: {
    //           show: false
    //         },
    //         data: [
    //           { value: 5, name: '4.1人员' },
    //           { value: 6, name: '4.2机构' },
    //           { value: 12, name: '4.3场所环境' },
             
    //         ]
    //       }
    //    ]
    //   }
    //   department.setOption(departmentOption);

    // },
  }


}


</script>

<style  lang="scss" scoped>
*padding,body{
  padding: 0px;
  margin: 0px;
}
.audit{
  width: 100%;
  height: 100%;
  
  .audit_title{
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-weight: 600;
    font-size: 20px;
  }
  
  .audit_content{
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    justify-content:space-between ;
    // align-items:flex-start;
    .clauseA{
      width: 100vw;
      height: 100vh;
      .selectorA{
        width: 100px;
        height: 30px;
        margin:10px;
      }
      .clauseA_content{
        width: 100%;
        height: 100%;

      }
      
    }
    .clauseB{
      width: 50%;
      height: 100%;
      .selectorB{
        width: 100px;
        height: 30px;
        margin:10px;
      }
      .clauseB_content{
        width: 100%;
        height: 100%;

      }
    }
    
  }
  
}
  

</style>






















