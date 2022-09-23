<template>
  <div class="main-container">
    <ibps-crud
      :displayField = "'待分配列表'"
      ref="crud"
      :height="height"
      :data="listData"
      :toolbars="listConfig.toolbars"
      :search-form="listConfig.searchForm"
      :pk-key="pkKey"
      :columns="listConfig.columns"
      :row-handle="listConfig.rowHandle"
      :pagination="pagination"
      :loading="loading"
      :index-row="false"
      @action-event="handleAction"
      @pagination-change="handlePaginationChange"
    >
    <template slot="selectCont" slot-scope="scope">
          <div class="el-icon-refresh" style="color:#67C23A" @click="handleEditMe(scope.row)" >办理</div>
    </template>
    <template slot="selectOrg1" slot-scope="scope">

          <ibps-org-selector
               :multiple="false"
               @input="getAppKey"
           />
    </template>
    <template slot="selectOrg2" slot-scope="scope">

              <ibps-org-selector
                   :multiple="false"
                   @input="getAppKey"
               />
        </template>
    </ibps-crud>
    <edit
      v-if="dialogFormVisible"
      :id="editId"
      :title="title"
      :visible="dialogFormVisible"
      :readonly="readonly"
      :openType="openType"
      @loadData="search"
      @callback="search"
      @close="visible => dialogFormVisible = visible"
    />
  </div>
</template>

<script>
import IbpsOrgSelector from '@/business/platform/org/org/selector'
import ActionUtils from '@/utils/action'
import FixHeight from '@/mixins/height'
import Edit from './rwfp'
import curdPost from '@/business/platform/form/utils/custom/joinCURD.js' //增删改查规则
import { query,deleteMe,selects } from '@/api/detection/jcwtd.js'
import common from '@/constants/common.js'
import IbpsLink from '@/components/ibps-link'
import IbpsLinkData from '@/business/platform/data/templaterender/link-data'

export default {
  components: {
    'ibps-org-selector':IbpsOrgSelector,
    'ibps-link-data': IbpsLinkData,
   'ibps-link': IbpsLink,
    Edit
  },
  mixins: [FixHeight],
  data() {
    return {
      title: '',
      loading: true,
      editId: '', // 编辑dialog需要使用
      pkKey: 'id', // 主键  如果主键不是pk需要传主键
      readonly: false, // 是否只读
      dialogFormVisible: 0, // 弹窗
      apiGrantVisible: false,
      openType: 'add',
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
            { prop: 'Q^LIAN_XI_BU_MEN_LI^SL', label: '部门',fieldType: 'slot',slotName:"selectOrg1" }
            ,{ prop: 'Q^WEI_TUO_DAN_HAO_^SL', label: '委托单号' }
            ,{ prop: 'Q^SHOU_LI_BU_MEN_^SL', label: '受理部门',fieldType: 'slot',slotName:"selectOrg2" }

          ]
        },
        // 表格字段配置
        columns: [

           { prop: 'lianXiBuMenLi', label: '部门' }
          ,{ prop: 'weiTuoDanHao', label: '委托单号' }
         ,{ prop: 'xiangMuMingChe', label: '项目名称' }
         ,{ prop: 'shouLiShiJian', label: '受理时间' }

        ],
        rowHandle: {
          actions: [],
          effect:'display',
           width:'100'//固定按钮
        }
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    handlePaginationChange(pageObject){
      this.pagination.page=pageObject.page
      this.pagination.limit=pageObject.limit
      this.loadData()
    },

    handleEditMe(selectionRow){
      this.openType='edit'
      this.editId = selectionRow.id
      this.readonly = false
      if(selectionRow.jinDu=='待合同评审'){
        this.title = '合同评审'
        this.dialogFormVisible = 2
      }else if(selectionRow.jinDu=='待任务分配'){
        this.title = '任务分配确认'
        this.dialogFormVisible = 1
      }
    },
    /*csnz 貌似没用到*/
    handleAddMe(){
      this.openType='add'
      this.editId = ""
      this.readonly = false
      this.dialogFormVisible = true
      this.title = '检测委托单'
    },
    // 加载数据
    loadData() {
          this.dialogFormVisible =false
          const params = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}
          params['listType']="rwfpList"
          query(this.formatParams(params,this.pagination)).then(response => {
              this.listData=[]
              let listData_ = this.listData
              let dbData = response.variables.data
              let resPage = response.variables.page
              dbData.forEach(function(e){
                listData_.push(e)
              })
              this.pagination = {}
              this.pagination['totalCount']=resPage.totalCount
              this.pagination['page']=resPage.page
              this.pagination['limit']=resPage.limit
          })
          this.loading = false
    },

    /**
     * 查询
     */
    search() {
      this.loadData()
    },
    /**
     * 处理按钮事件
     */
    handleAction(command, position, selection, data) {

      switch (command) {
        case 'search':// 查询
          this.search()
          this.loading = false
          break
        case 'add':// 添加
          this.openType='add'
          this.editId = ''
          this.readonly = false
          this.dialogFormVisible = true
          this.title = '检测委托单'
          break
        case 'edit':// 编辑
          this.openType='edit'
          this.editId = data[0].id
          this.readonly = false
          this.dialogFormVisible = true
          this.title = '检测委托单'
          break
        case 'detail':// 明细
          this.openType='edit'
          this.editId = selection.id
          this.readonly = true
          this.dialogFormVisible = true
          this.title = '委托单查看'
          break
        case 'remove':// 删除
          // let ids = [];
          // data.forEach(function (b) {
          //   ids.push(b.id)
          // });
          // let idStr = ids.join(",")
          // deleteMe({ids:idStr}).then(response => {
          //    this.listData=[]
          //    this.search()
          //  })
          // this.loading = false
          break
        default:
          break
      }
    },
    formatParams(params, page) {
      const results = {}
      if (params) {
        results.parameters = Object.keys(params).map((k) => {
          return {
            'key': k,
            'value': params[k]
          }
        })
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
  },
}
</script>
