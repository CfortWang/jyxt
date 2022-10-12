<template>
  <div class="main-container">
    <ibps-crud
      ref="crud"
      :style="{ marginLeft: width+'px',minHeight:'550px' }"
      :height="height"
      :data="listData"
      :toolbars="listConfig.toolbars"
      :search-form="listConfig.searchForm"
      :pk-key="pkKey"
      :displayField="Title"
      :columns="listConfig.columns"
      :row-handle="listConfig.rowHandle"
      :pagination="pagination"
      :loading="loading"
      :index-row="false"
      @action-event="handleAction"
      @sort-change="handleSortChange"
      @pagination-change="handlePaginationChange"
    >
  <template slot="selectCont" slot-scope="scope">
      <div class="el-icon-refresh" style="color:#67C23A" @click="banLi(scope.row)" >办理</div>
  </template>

    <!--<template slot="selectCont">
       <div style="height:100%">
        <iframe src="https://www.szjyxt.com/demo/reportJsp/pdfReport.jsp?access_token%20=%202dad0c1433fe4683bb11190514c76844&rpx=%E4%B8%AD%E6%B1%87%E7%91%9E%E5%BE%B7%E6%A3%80%E6%B5%8B%E4%B8%AD%E5%BF%83/39%E6%A0%B7%E5%93%81%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/%E4%BA%91%E6%B6%A6%E6%B1%BD%E8%BD%A6-%E6%A0%B7%E5%93%81%E6%A0%87%E7%AD%BE%E5%B7%A6%E5%8F%B3.rpx&id_=55555" id="myiframe"  frameborder="0" scrolling="no" height="100%" width="100%" ></iframe>
      </div>
    </template>-->

    </ibps-crud>


    <edit
      v-if="dialogFormVisible"
      :id="editId"
      :title="title"
      :visible="dialogFormVisible"
      :readonly="readonly"
      :openType="openType"
      @callback="search"
      @close="visible => dialogFormVisible = visible"
      @loadData="loadData"
    />
  </div>
</template>

<script>
import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
import {validateRequired} from '@/utils/validate' //参数校验
import IbpsUserSelector from '@/business/platform/org/selector' //用户 /组织 / 岗位选择框
import IbpsAttachment from '@/business/platform/file/attachment/selector' //文件选择框
import relevanceTable from '@/business/platform/form/formrender/dynamic-form/mixins/relevanceTable' //表头懒加载
import getDbCol from '@/business/platform/form/utils/custom/getDbCol.js' //字段映射

import Edit from './ypjsEdit.vue'
import { query,remove,removeMulti } from '@/api/detection/universalCRUD.js' // 封装的通用CRUD文件
import  getPint  from '@/business/platform/form/utils/custom/pintText.js' //

import common from '@/constants/common.js'

export default{
  components: { Edit },
  data(){
    return {
      dialogFormVisible: false, // 弹窗
      apiGrantVisible: false,
      editId: '', // 编辑dialog需要使用
      readonly: false, // 是否只读
      pkKey: 'id', // 主键  如果主键不是pk需要传主键
      Title: '样品待接收列表',
      srcUrl:'',
      demoValue: false,
      loading: true,
      height: document.clientHeight,
      listData: [],
      pagination: {},
      sorts: {},
      listConfig: {
        toolbars: [
          {
            key: 'search'
          },
          {
            key:  'printTiaoMa',
            label:'样品标签条码打印'
          },
          {
            key: 'printErWeiMa',
            label: '样品标签二维码打印'
          }
        ],
        searchForm: {
          forms: [
             {
               prop: 'weiTuoDanHao',
               label: '委托单号',
               itemWidth:160,
               labelWidth:-50
             },

             {
                prop: 'weiTuoFang',
                label: '委托单位',
               itemWidth:120,
               labelWidth:-20
             },

            {
                prop: 'lianXiBuMenLi',
                label: '委托人',
               itemWidth:130,
               labelWidth:-20
            }
          ]
        },
        // 表格字段配置
        columns: [
           {prop: 'id',label:'主键',hidden:'false'}
          ,{ prop: 'weiTuoDanHao', label: '委托单号' , width:'160px'}
          ,{ prop: 'xiangMuMingChe', label: '检测项目', width:'160px' }
          ,{ prop: 'lianXiBuMenLi', label: '委托人', width:'90px' }
          ,{ prop: 'shouLiShiJian', label: '受理时间' , width:'100px' }
          ,{ prop: 'jianCeYuan', label: '检测员' , width:'120px' }
        ],
        rowHandle: {
          actions: [],
          effect:'display',
          columnHeader:'登记与接收',
           width:'100'//固定按钮
        }
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    tiaoMa(selection){
     let this_ = this;
       //批量打印标识
       let str = ''
       let result = selection

        if(result ==null || result==''){
         this_.$message.warning("未勾选要打印的样品")
         callback(false)
        }else{
          let sql = "select * from t_yptmyspz where lei_bie_ = '条码' and lei_xing_ = '使用'"
          curdPost('sql',sql).then(response => {
              let cont = response.variables.data
              if(cont[0]==null||cont[0]==''){ //结果为空表示条码的的类别未选择，此时使用默认的样式
                str = '39样品管理系统/云润汽车-样品标签.rpx'
              }else{
               let mc = cont[0].yang_shi_ming_che
                if(mc=='条码-左右样式'){
                  str = '39样品管理系统/云润汽车-样品标签左右.rpx'
                }
                if(mc=='条码-上下样式'){
                  str = '39样品管理系统/云润汽车-样品标签.rpx'
                }
              }
                let srcUrls =this_.$reportPash.replace("show","pdf")+str+'&id_='+result
                // getPint(this_,srcUrls)
                window.open(srcUrls)
               })
        }
    },
    erWeiMa(selection){
      let this_ = this;
        //批量打印标识
        let str = ''
        let result = selection

         if(result ==null || result==''){
          this_.$message.warning("未勾选要打印的样品")
          callback(false)
         }else{
           let sql = "select * from t_yptmyspz where lei_bie_ = '二维码' and lei_xing_ = '使用'"
           curdPost('sql',sql).then(response => {
               let cont = response.variables.data
               // console.log(cont)
               if(cont[0]==null||cont[0]==''){ //结果为空表示二维码的的类别未选择，此时使用默认的样式
                 str = '39样品管理系统/云润汽车-样品二维码标签.rpx'
               }else{
                let mc = cont[0].yang_shi_ming_che
                 if(mc=='二维码-左右样式'){
                   str = '39样品管理系统/云润汽车-样品二维码标签左右.rpx'
                 }
                 if(mc=='二维码-上下样式'){
                   str = '39样品管理系统/云润汽车-样品二维码标签上下.rpx'
                 }
               }
                 let srcUrls =this_.$reportPash.replace("show","pdf")+str+'&id_='+result
                 // getPint(this_,srcUrls)
                 window.open(srcUrls)
                })
         }
    },
      banLi(value){
        this.openType='edit'
        this.editId = value.id
        this.readonly = true
        this.dialogFormVisible = true
        this.title = '样品接收'
      },
    // 加载数据
   loadData() {
     let this_ = this;
     const params = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}
               query('sysjcwtdb','selects',this.formatParams(params ,this.pagination)).then(response => {
                  this_.listData=[]
                  let dbData = response.variables.data
                  let rp = response.variables.page
                   dbData.forEach(function(e){
                     console.log(e)
                     this_.listData.push(e)
                   })
                   this_.pagination = {}
                   this_.pagination['totalCount']=rp.totalCount
                   this_.pagination['page']=rp.page
                   this_.pagination['limit']=rp.limit
                })
         this.loading = false

   },
   formatParams(params, page) {
     const results = {}
     if (params) {
         let data={
            userId:this.$store.getters.userInfo.user.id,
            userName:this.$store.getters.userInfo.user.name,
            entity:
                   {
                     weiTuoDanHao:params['weiTuoDanHao'],
                     weiTuoFang:params['weiTuoFang'],
                     lianXiBuMenLi:params['lianXiBuMenLi'],
                     jinDu:'待样品接收',
                   },
             pageNo:page.page,
             pageSize:page.limit,
            }


          console.log("{data:'"+JSON.stringify(data)+"'}")
          return "{data:'"+JSON.stringify(data)+"'}"
     }
     if(page) {
       results.requestPage = {
         'pageNo': page.page || common.PAGE,
         'limit': page.limit || common.LIMIT,
         'offset':parseInt(page.limit)*(parseInt(page.page)-1) || 0
       }
       if (Utils.isNotEmpty(page.totalCount)) { // mock 数据时候要传
         results.requestPage['totalCount'] = page.totalCount
       }
     }
     return results
   },
    /**
     * 处理分页事件
     */
    handlePaginationChange(page) {
      ActionUtils.setSorts(this.sorts)
      ActionUtils.setPagination(this.pagination, page)
      this.loadData()
    },
    /**
     * 处理排序
     */
    handleSortChange(sort) {
      ActionUtils.setSorts(this.sorts, sort)
      ActionUtils.setPagination(this.pagination)
      this.loadData()
    },
    /**
     * 查询
     */
    search() {
      ActionUtils.setPagination(this.pagination)
      ActionUtils.setSorts(this.sorts)
      this.loadData()
    },
    /**
     * 处理按钮事件
     */
    handleAction(command, position, selection, data) {
      // console.log(command)
      switch (command) {
        case 'search':// 查询
          this.loadData()
          break
        case 'printTiaoMa':// 打印条码
          this.tiaoMa(selection)
          break
        case 'printErWeiMa':// 编辑
           this.erWeiMa(selection)
           break
        // case 'remove':// 删除
        //   ActionUtils.removeRecord(selection).then((ids) => {
        //     this.handleRemove(ids)
        //   }).catch(() => { })
        //   break
          default:
          break
      }
    },
    /**
     * 处理编辑
     */
    handleEdit(id = '', readonly = false) {
      this.editId = id
      this.readonly = readonly
      this.dialogFormVisible = true
    },
    /**
     * 处理删除
     */
    handleRemove(ids) {
      // 获取数据
      remove('sysjcwtdb','方法',{ ids: ids }).then(response => {
        ActionUtils.removeSuccessMessage()
        this.search()
      }).catch(() => {})
    },
    handleDeal(ids) {
      // 办理
      remove('sysjcwtdb','方法',{ ids: ids }).then(response => {
        ActionUtils.removeSuccessMessage()
        this.search()
      }).catch(() => {})
    }
  }
}
</script>
