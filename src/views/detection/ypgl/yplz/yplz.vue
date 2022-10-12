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
    </ibps-crud>

  </div>
</template>

<script>
import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
import {validateRequired} from '@/utils/validate' //参数校验
import IbpsUserSelector from '@/business/platform/org/selector' //用户 /组织 / 岗位选择框
import IbpsAttachment from '@/business/platform/file/attachment/selector' //文件选择框
import relevanceTable from '@/business/platform/form/formrender/dynamic-form/mixins/relevanceTable' //表头懒加载
import getDbCol from '@/business/platform/form/utils/custom/getDbCol.js' //字段映射
import { zhuangTaiOptions} from './index'
import { query,remove,removeMulti,selectById } from '@/api/detection/universalCRUD.js' // 封装的通用CRUD文件
import common from '@/constants/common.js'
import ActionUtils from '@/utils/action'

export default{
  data(){
    return {
      dialogFormVisible: false, // 弹窗
      apiGrantVisible: false,
      editId: '', // 编辑dialog需要使用
      readonly: false, // 是否只读
      pkKey: 'id', // 主键  如果主键不是pk需要传主键
      Title: '样品流转列表',
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
          }
        ],
        searchForm: {
          forms: [
             {
               prop: 'yangPingMingChen',
               label: '样品名称',
             },

             {
                prop: 'yangPingBianHao',
                label: '样品编号'
             },

            {
                prop: 'zhuangTai',
                label: '状态',
                fieldType: 'select',
                options: zhuangTaiOptions
            }
          ]
        },
        // 表格字段配置
        columns: [
           {prop: 'id',label:'主键',hidden:'false'}
           ,{prop: 'shouLiBuMen' , label: '部门' , width:'80px'}
          ,{ prop: 'weiTuoDanHao', label: '委托单号' , width:'160px'}
          ,{ prop: 'yangPinBianHao', label: '样品编号', width:'160px' }
          ,{ prop: 'yangPinMingChe', label: '样品名称', width:'90px' }
          ,{ prop: 'shouYangRiQi', label: '收样日期' , width:'100px' }
          ,{ prop: 'cunFangWeiZhi', label: '存放位置' , width:'100px' }
          , {prop: 'zhuangTai',label: '状态'}
        ],
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    // 加载数据
   loadData() {
     let this_ = this;
     const params = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}
               query('ypjs','selects',this.formatParams(params,this.pagination)).then(response => {
                  this_.listData=[]
                  let dbData = response.variables.data
                  console.log(dbData)
                  let rp = response.variables.page
                   dbData.forEach(function(e){
                     this_.listData.push(e)
                   })
                   this_.pagination = {}
                   this_.pagination['totalCount']=rp.totalCount
                   this_.pagination['page']=rp.page
                   this_.pagination['limit']=rp.limit
                })
         this.loading = false

   },
    /**
     * 获取格式化参数
     */
    formatParams(params, page) {
      console.log("page: ",page)
      const results = {}
      if (params) {
        console.log(params)
          let data={
             userId:this.$store.getters.userInfo.user.id,
             userName:this.$store.getters.userInfo.user.name,
             entity:
                    {
                      yangPinMingChe:params['yangPingMingChen'],
                      yangPinBianHao:params['yangPingBianHao'],
                      zhuangTai:params['zhuangTai']
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
      switch (command) {
        case 'search':// 查询
          this.loadData()
          break
        default:
          break
      }
    },
  }
}
</script>
