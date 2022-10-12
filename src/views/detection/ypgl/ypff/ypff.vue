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
      <div class="el-icon-refresh" style="color:#67C23A" @click="demo(scope.row)" >发放样品</div>
    </template>
    </ibps-crud>

  <!--  <edit
        v-if="dialogFormVisible"
        :id="editId"
        :title="title"
        :visible="dialogFormVisible"
        :readonly="readonly"
        :openType="openType"
        @callback="search"
        @close="visible => dialogFormVisible = visible"
      /> -->
  </div>
</template>

<script>
import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
import {validateRequired} from '@/utils/validate' //参数校验
import IbpsUserSelector from '@/business/platform/org/selector' //用户 /组织 / 岗位选择框
import IbpsAttachment from '@/business/platform/file/attachment/selector' //文件选择框
import relevanceTable from '@/business/platform/form/formrender/dynamic-form/mixins/relevanceTable' //表头懒加载
import getDbCol from '@/business/platform/form/utils/custom/getDbCol.js' //字段映射
// import { zhuangTaiOptions} from './index'
import { query,remove,removeMulti,selectById } from '@/api/detection/universalCRUD.js' // 封装的通用CRUD文件
import common from '@/constants/common.js'
import ActionUtils from '@/utils/action'

export default{
  components: {
   },
  data(){
    return {
      dialogFormVisible: false, // 弹窗
      apiGrantVisible: false,
      editId: '', // 编辑dialog需要使用
      readonly: false, // 是否只读
      pkKey: 'id', // 主键  如果主键不是pk需要传主键
      Title: '样品待发放列表',
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

            // {
            //     prop: 'zhuangTai',
            //     label: '状态',
            //     fieldType: 'select',
            //     options: zhuangTaiOptions
            // }
          ]
        },
        // 表格字段配置
        columns: [
           {prop: 'id',label:'主键',hidden:'false'}
           ,{prop: 'shouLiBuMen' , label: '部门' , width:'80px'}
          ,{ prop: 'weiTuoDanHao', label: '委托单号' , width:'160px'}
          ,{ prop: 'yangPinBianHao', label: '样品编号', width:'160px' }
          ,{ prop: 'yangPinMingChe', label: '样品名称', width:'90px' }
          ,{ prop: 'bianZhiShiJian', label: '委托时间' , width:'100px' }
          ,{ prop: 'shouYangRiQi', label: '收样日期' , width:'100px' }
          ,{ prop: 'cunFangWeiZhi', label: '存放位置' , width:'100px' }
          , {prop: 'zhuangTai',label: '状态'}
        ],
        rowHandle: {
          actions: [],
          effect:'display',
          columnHeader:'检测样品发放',
           width:'120'//固定按钮
        }
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
      demo(value){
        let data={
           userId:this.$store.getters.userInfo.user.id,
           userName:this.$store.getters.userInfo.user.name,
           entity:
                  [{
                    id:value['id'],
                    parentId:value['parentId'],
                  }]
           }
        let p = "{data:'"+JSON.stringify(data)+"'}"
        selectById('ypjs','grant',p).then(response => {
          // 将样品状态修改为 待检，委托单进度修改为待检
           if(response.state == 200){
             this.$message("样品发放成功！")
             this.loadData();
           }
        })
      },
    // 加载数据
   loadData() {
     let this_ = this;
     const params = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}
               query('ypjs','selects',this.formatParams(params,this.pagination)).then(response => {
                  this_.listData=[]
                  let dbData = response.variables.data
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
      const results = {}
      if (params) {
          let data={
             userId:this.$store.getters.userInfo.user.id,
             userName:this.$store.getters.userInfo.user.name,
             entity:
                    {
                      yangPinMingChe:params['yangPingMingChen'],
                      yangPinBianHao:params['yangPingBianHao'],
                      zhuangTai:"待检"
                    },
             pageNo:page.page,
             pageSize:page.limit,
             }
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
        case 'add':// 添加
          this.handleEdit()
          this.title = '添加t_sysjcwtdb'
          break
        case 'edit':// 编辑
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id)
            this.title = '编辑t_sysjcwtdb'
          }).catch(() => { })
          break
        case 'remove':// 删除
          ActionUtils.removeRecord(selection).then((ids) => {
            this.handleRemove(ids)
          }).catch(() => { })
          break
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
      remove('数据库表名',{ ids: ids }).then(response => {
        ActionUtils.removeSuccessMessage()
        this.search()
      }).catch(() => {})
    },
    handleDeal(ids) {
      // 办理
      remove('数据库表名',{ ids: ids }).then(response => {
        ActionUtils.removeSuccessMessage()
        this.search()
      }).catch(() => {})
    }
  }
}
</script>
