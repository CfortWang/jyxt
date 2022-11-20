<template>
  <!-- ///platform/bpmn/bpmInstHis/list -->
  <div class="tracking">
    <!-- 不符合项开立报告的完成情况(完成节点跟踪) -->
    
    <div class="tracking_title">不符合及纠正跟踪列表</div>
    <div class="table_content">
      <!-- 每次截取从当前页码开始*页容量
        第一页  0，页容量
        第二页  10 = 当前页码-1*页容量，20 -->
        <!-- :data="dataList.slice((currentPage - 1) * pageSize,currentPage*pageSize)" -->
        <!--  -->
      <el-table
        :data="dataList.slice((currentPage - 1) * pageSize,currentPage*pageSize)"
        :header-cell-style="{background:'#409EFF'}"
        style="{width: 100%}"
        row-key="id"
        stripe
        height="740px"
        border
        lazy
        :load="load"
        :span-method="objectSpanMethod">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
       <!-- <el-table-column
      prop="id"
      label="流程id"
      sortable
      :index="indexMethod"
      width="180"> 
      </el-table-column> -->
      <el-table-column
        prop="name"
        label="表单名称"
        width="220">
        
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="department"
        label="被内审部门"
        width="180">
      </el-table-column>
      <el-table-column
        prop="standardNumber"
        label="标准编号">
      </el-table-column>
      <el-table-column
        prop="termsNumber"
        label="条款编号">
      </el-table-column>
      <el-table-column
        prop="completion"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="date"
        label="开立时间">
      </el-table-column>
      <el-table-column
        prop="date"
        label="详情">
        <!-- <template slot-scope="scope">
              查看报告页按钮
              <router-link to="/doctor/firstanalysis/hla1seachReport2">
                <el-button @click="seach(scope.row)" type="disabled" size="mini" prop="id">查 看</el-button>
              </router-link>
            </template> -->
      <!-- 查看此流程id下所有的不符合条款号，条款数量 -->
      <template slot-scope="scope">
        <!-- <router-link to="https://www.baidu.com/"> -->
          <el-button  @click="toHome(scope.row)" type="disabled" size="mini" prop="id">查 看</el-button>
        <!-- </router-link> -->
      </template>
        <!-- <template>
          <el-button @click="goTo()" type="text" size="small">查看</el-button>
        </template> -->
        <!-- <router-link to='/inconformity'>
          <button>点击跳转2</button>
        </router-link> -->
      </el-table-column>
      </el-table>
      
    </div>
    <div class="paging_block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 30, 40,50]"
      :total="dataList.length"
      :page-size="pageSize"
      :current-page="currentPage">
    </el-pagination>
  </div>

    </div>
</template>

<script>
 import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
  export default {
    data() {
      return {
        // totalSize: 1,
        dataList:[],
        pageSize: 20,  //页容量
        currentPage: 1,  //当前页码，前往第5页
        //页码总数
        // pageTotal:0,
        spanArr: [],
     
      }
    },
    created(){
      this.getInconformityData()
      this.creatCompare(propertyName) 
      this.setArray(this.dataList)
     
    },
    mounted(){
    },
    methods: {
      toHome(item){
        // console.log('111111111',item)
        this.$router.push({
          path:'/inconformity',
          query:{
            id:item.id,
            //条款类型
            type:item.standardNumber,
            //条款编号
            clause:item.termsNumber
          }
          
          // params:{
          //   id:item.id
          // }
          // params: {type:item},
        
        })
      // console.log('1111',params)
		 },
      // handleClick(row) {
      //   console.log('点击查询按钮跳转页面',row);
      // },
      // goTo(){
      //   this.$router.push('./inconformity.vue')
      // },
      //合并第二项和第十项
      // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //   //表格合并行
      //   if (columnIndex === 0) {
      //     const _row = this.spanArr[rowIndex];
      //     const _col = _row > 0 ? 1 : 0;
      //     return {
      //       rowspan: _row,
      //       colspan: _col
      //     };
      //   }
        // if (columnIndex === 9) {
        //   const _row = this.spanArr[rowIndex];
        //   const _col = _row > 0 ? 1 : 0;
        //   return {
        //     rowspan: _row,
        //     colspan: _col
        //   };
        // }
      // },
      //每页n条
      handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      // console.log(`每页 ${val} 条`);
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val;
      // console.log(`当前页: ${val}`);
    },
    //获取受审核部门的id的对应部门    最后按照部门
      getInconformityData(){
        //内审不符合
        let sql1 = "select a.ji_hua_zong_wai_j,a.bu_fu_he_bao_gao_,b.name_, a.biao_zhun_bian_ha,a.bu_fu_he_xiang_ti,a.zhuang_tai_,a.ri_qi_ FROM t_bfhxbgyjzcsjlbx a LEFT JOIN ibps_party_org b ON a.shou_shen_he_bu_m=b.id_ WHERE a.bu_fu_he_bao_gao_ != '日常监督' AND a.bu_fu_he_bao_gao_ != '外部审核'  ORDER BY a.create_time_  DESC"
        //所有不符合
        //let sql1 = "select a.ji_hua_zong_wai_j,a.bu_fu_he_bao_gao_,b.name_, a.biao_zhun_bian_ha,a.bu_fu_he_xiang_ti,a.zhuang_tai_,a.ri_qi_ from t_bfhxbgyjzcsjlbx a left join ibps_party_org b on a.shou_shen_he_bu_m=b.id_ order by a.create_time_  desc"
        curdPost('sql',sql1).then(response => { 
          let data = response.variables.data
          // console.log('计划总外键',data)
          //对从年度计划 或内审实施计划 流程过来 创建的不符合项  返回result
          // const result =  data.filter(item => item.ji_hua_zong_wai_j !=='' && item.ji_hua_zong_wai_j)
          this.dataList = data.map((item)=>({
            name:"不符合项报告与纠正措施记录列表",
            id:item.ji_hua_zong_wai_j,
            type:item.bu_fu_he_bao_gao_,
            department:item.name_,
            standardNumber:item.biao_zhun_bian_ha,
            termsNumber:item.bu_fu_he_xiang_ti,
            completion:item.zhuang_tai_,
            date:item.ri_qi_,

          }));
          // console.log('选出所需要的数据',this.dataList)
         
          //对完成情况进行处理  !== "已完成"
          this.dataList = this.dataList.map(item=>{
            if(item.completion !== '已完成'){
              return {
              ...item,
              completion:'未完成'
              }
            }else{
              return{
                ...item,
              }
             
            }
          })
          // console.log('执行情况数据',this.dataList)
           // 排序(对有效流程的流程id) 做流程id合并（先排序，后分页）
          //  function compare(property){
          //   return function(a,b){
          //     var value1 = a[property];
          //     var value2 = b[property];
          //     return value1 - value2;
          //   }
          // }
          // this.dataList = this.dataList.sort(compare('id'))
          // console.log('流程id排序后数据',this.dataList)
          //排序（对不符合项类型）  先排序，后分页    
          //如何实现字符串的排序
          //优化：表格  不符合项类型 支持查询   完成情况支持查询
          function compare(property){
            return function(a,b){
              var value1 = a[property];
              var value2 = b[property];
              return value1 - value2;
            }
          }
          this.dataList = this.dataList.sort(compare('type'))
          // console.log('不符合项类型排序后数据',this.dataList)
        })

      },

      //获取第一列的值，如果值相等，则合并
      // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //   if (columnIndex === 0 ) {
      //         let _row = this.arr1[rowIndex]
      //         let _col = this.arr1[rowIndex] > 0 ? 1 : 0
      //         return [_row,_col]
      //   }
      // }
  
 
  
    
    },
  }

</script>

<style  lang="scss" scoped>
* {
  padding: 0px;
  margin: 0px;
}
.tracking{
  width: 100%;
  height: 100%;
  // position: relative;
  // border: 2px solid gold;
  .tracking_title{
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-weight: 600;
    font-size: 20px;

}
.table_content{
  width: 100%;
  height: calc(100% - 50px);

}
.paging_block{
  position: fixed;
  bottom: 0px;
  left: 200px;
  right: 0px;
  width: 100%;
  height: 36px;
  line-height: 36px;
  border-top: 1px solid rgb(233, 222, 222);
  padding-top: 6px;
  background-color: rgb(250, 250, 250);
  z-index:1000;
}
}


</style>