
<template>
  <!--   RB/T 214-2017条款不符合统计情况 -->
  
  <div class="audit">
    
    <!-- 1.不符合条款统计柱状图 -->
    <div class="audit_title">
      <span class="title">不符合条款统计情况</span>
      <!-- //数据更新没有触发视图更新 -->
      <!-- <el-date-picker
        class="selectorYear"
        v-model="annual"
        @change="changeAnnual"
        type="year"
        placeholder="选择年">
      </el-date-picker>
      <el-select v-model="value" placeholder="请选择" class="selectorType" @change="changeType">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <!-- 路由 -->
      <p>{{this.$route.params.id}}</p>
    </div>
    <!-- 图表 -->
    <div class="audit_content">
      <div  class="clauseA">
        <div  class="clauseA_content" ref="clauseA_refs"></div>
      </div>
      <div  class="clauseB">
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

      options: [{
          value: '常规内审',
          label: '常规内审'
        }, {
          value: '附加内审',
          label: '附加内审'
        }, {
          value: '日常监督',
          label: '日常监督'
        },{
          value: '外部审核',
          label: '外部审核'
        }],
        value: '常规内审',
        // date:{},
        annual:'',
        clause:null,
        titleNumA:{},
        regulation:null,
        titleNumB:{},
        //计划总外键
        id:'',
        type:'',
        clause:''
        // categories:null,
        // department:null,
        // newArray:[],
        // new:[],
        
    }
  },
  created(){
    // this.getNowAnnual()
   
    // this.$axios.get().then(res =>{
    //   this.data ={}
    //   this.data.value=res
    // })
    // data:{}
    // {{data.value}}
  },
  mounted(){
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    this.clause = this.$route.query.clause
    // console.log('444444',this.id)
    // console.log('555555',this.type)
    // console.log('666',this.clause)
   
    // this.id = this.$route.params.item.id
    //组件加载时获取评审类型
    // this.getRetentionData(this.value);
    // this.getInconformityData(this.value)
   this.getType(this.type,this.id);
  },
  methods:{
    //如果传过来的standardNumber="17025"
    //页面进来获取当前年度
    // getNowAnnual(){
    //   const nowDate = new Date();
    //   const date = { year: nowDate.getFullYear() }
      // console.log('获取年度',nowDate)
      // console.log('当前年度',date)
      // console.log('date.year',date.year)
      // this.annual = date.year
      // this.annual = date.year
      // this.$set(this.annual,'annual',this.annual)
      
      //修改的数组或对象，修改的对象名，修改成功的值
      // Vue.set(target,propertyName/index, value)
      // this.$set(this.date,'annual',this.date.annual)
      // console.log('this.date.annual111',this.date.annual)
      // console.log('this.$set方法',this.$set)
      // Vue.set(this.namelist,1,{message:"yeluosen",id:"1"})
     
      
    // },
    //用户操作获取评审类型
    // changeType(e){
    //   this.value = e
    //   this.getRetentionData(this.value)
    //   this.getInconformityData(this.value)
    // },
    



    // //RBT 214_2017不符合项执行情况页面的数据
    getType(type,id) {
      // console.log("getType type is ", type === '17025');
      if(type === 'RB-T 214-2017'){
        this.getRetentionData(id)
  
      }else if(type === '17025'){
        this.getInconformityData(id)
      }
    },
    getRetentionData(id){
      // console.log("getRetentionData id is ", id);
      let sql = "select  a.biao_zhun_bian_ha,a.bu_fu_he_xiang_ti, a.bu_fu_he_bao_gao_  FROM t_bfhxbgyjzcsjlbx a WHERE CONCAT(a.biao_zhun_bian_ha) LIKE   '%RB-T 214-2017%' AND a.ji_hua_zong_wai_j='"+id+"' ORDER BY a.create_time_ DESC"      
      //某一类型(常规，附加，日常，外部)的 标准编号为"RB-T 214-2017"的  按时间降序的  不符合数据（标准号，条款号，类型）
      //let sql ="select  a.biao_zhun_bian_ha,a.bu_fu_he_xiang_ti, a.bu_fu_he_bao_gao_  from t_bfhxbgyjzcsjlbx a where concat(a.biao_zhun_bian_ha) like '%RB-T 214-2017%' and concat(a.bu_fu_he_bao_gao_) like '%"+type+"%' order by a.create_time_ desc"
      curdPost('sql',sql).then(response => { 
      let data = response.variables.data 
      // console.log('RB-T214-2017常规内审的',data)
      let titleList = data.map(item => {
        return item.bu_fu_he_xiang_ti
      })
      // console.log('不符合条款',titleList)
      //计算条款数量，以对象形式返回
      this.titleNumA = titleList.reduce((pre,cur)=>{
        if(cur in pre){
          pre[cur]++
        }else{
          pre[cur] = 1
        }
        return pre
      },{})
      // console.log('条款对应数量',this.titleNumA)
      this.clauseInit(this.titleNumA,titleList.length);
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
   getInconformityData(id){
    // let sql = "select  a.biao_zhun_bian_ha,a.bu_fu_he_xiang_ti, a.bu_fu_he_bao_gao_  FROM t_bfhxbgyjzcsjlbx a WHERE CONCAT(a.biao_zhun_bian_ha) LIKE '%17025%' AND a.ji_hua_zong_wai_j='"+id+"' ORDER BY a.create_time_ DESC"
      let sql = "select  a.biao_zhun_bian_ha,a.bu_fu_he_xiang_ti, a.bu_fu_he_bao_gao_  FROM t_bfhxbgyjzcsjlbx a WHERE CONCAT(a.biao_zhun_bian_ha) LIKE '%"+17025+"%' AND a.ji_hua_zong_wai_j='"+id+"' ORDER BY a.create_time_ DESC"
      //获取所有不符合项目
      //let sql ="select a.bu_fu_he_xiang_ti  from t_bfhxbgyjzcsjlbx a where concat(a.biao_zhun_bian_ha) like '%17025%' and concat(a.bu_fu_he_bao_gao_) like '%"+id+"%' order by a.create_time_ desc"
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
      // console.log('条款对应数量',this.titleNumB)
      // this.regulationInit(this.titleNumB);
      this.regulationInit(this.titleNumB,titleList.length);
    
      })
     
   },
    // RBT 214-2017 不符合条款数量统计
    clauseInit(initData,total){
      var clause = this.$echarts.init(this.$refs.clauseA_refs);
      var clauseOption = {
        title: {
          text: 'RB/T 214-2017不符合条款统计',
          subtext: '总计:'+ total,
          textStyle: {
            // color: '#fff',
            fontSize: 14,
            fontWeight: '600'
          },
          textAlign: 'center',
          left: '50%',
          top: '10px'
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
          right: '18%',
          bottom: '12%',
          top:'16%',
          containLabel: true
        },
        xAxis: {
          name:'数量',
          type: 'value',
          // boundaryGap: [0, 0.01],
          splitLine: {
            show: false
          },
        },
        yAxis: {
          name:'条款编号',
          type: 'category',
          //条款编号
          data:Object.keys(initData)
        },
        series: [
          {
            name: 'RB-T214-2017',
            type: 'bar',
            data:Object.values(initData),
            barWidth: '25%',
          },
        ]
      }
      clause.setOption(clauseOption);

    },
    //17025 不符合条款数量统计
    regulationInit(regulationData,total){
      var regulation = this.$echarts.init(this.$refs.clauseB_refs);
    //   var mWidth = $(".entrustNumber").width();  // 获取父节点宽高
    // var mHeight = $(".entrustNumber").height();
    // chart_preHist.resize({width:mWidth, height:mHeight})
      var regulationOption = {
        title: {
          text: 'CNAS-Cl01:2018不符合条款统计',
          subtext: '总计:'+ total,
          textStyle: {
            fontSize: 14,
            fontWeight: '600'
          },
          textAlign: 'center',
          left: '50%',
          top: '10px'
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
          right: '18%',
          bottom: '12%',
          top:'16%',
          containLabel: true
        },
        xAxis: {
          name:'数量',
          type: 'value',
          // boundaryGap: [0, 0.01],
          splitLine: {
            show: false
          },
        },
        yAxis: {
          name:'条款编号',
          type: 'category',
          data:Object.keys(regulationData)
        },
        series: [
          {
            name: '17025',
            type: 'bar',
            data:Object.values(regulationData),
            barWidth: '25%',
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
*body{
  padding: 0px;
  margin: 0px;
}
.audit{
  width: 100vw;
  height: 100vh;
  // border: 2px solid rgb(53, 5, 129);
  
  .audit_title{
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-weight: 600;
    font-size: 20px;
    position: relative;
    .title{
      height: 50px;
      line-height: 50px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -170px;
      margin-top: -25px;
      font-size:16px;
      font-weight:600;

    }
    .selectorYear{
      position: absolute;
      width: 100px;
      height: 30px;
      left: 20px;
    }
    .selectorType{
      position: absolute;
      width: 100px;
      height: 30px;
      left: 120px;
    }
  }
  
  .audit_content{
    width: 100%;
    height: calc(100% - 50px);
    
    display: flex;
    justify-content:flex-start ;
    .clauseA{
      width: 25%;
      height: 50%;
      .clauseA_content{
        width: 100%;
        height: 100%;
        // border: 2px solid rgb(50, 136, 93);

      }
      
    }
    .clauseB{
      width: 25%;
      height: 50%;
      .clauseB_content{
        width: 100%;
        height: 100%;
        // border: 2px solid rgb(136, 50, 103);

      }
    }
    
  }
  
}
  

</style>






















