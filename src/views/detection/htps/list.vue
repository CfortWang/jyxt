<template>
  <div class="main-container">
    <ibps-crud
      :displayField = "'检测委托受理列表'"
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
<template slot="selectOrg" slot-scope="scope">

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
import Edit from './wtsl'
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
      dialogFormVisible: false, // 弹窗
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
          },
          {
            key: 'remove'
          }
        ],
        searchForm: {
          forms: [

            { prop: 'Q^SHOU_LI_BU_MEN_^SL', label: '委托部门' ,fieldType: 'slot',slotName:"selectOrg" },
            { prop: 'Q^XIANG_MU_MING_CHE^SL', label: '检测项目' }
            // ,{ prop: 'Q^CREATE_TIME_^DG', label: '创建时间' }
            // ,{ prop: 'Q^WEI_TUO_FANG_^SL', label: '委托方' }
            // ,{ prop: 'Q^WEI_TUO_NEI_RONG_^SL', label: '委托内容' }
            // ,{ prop: 'Q^NIAN_DU_^SL', label: '年度' }
            // ,{ prop: 'Q^SHOU_LI_REN_^SL', label: '受理人' }
          ]
        },
        // 表格字段配置
        columns: [

           { prop: 'shouLiBuMen', label: '受理部门' }
          ,{ prop: 'weiTuoShiJian', label: '委托时间' }
          ,{ prop: 'weiTuoFangDai', label: '委托人' }
          ,{ prop: 'dianHua', label: '联系方式' }
          ,{ prop: 'weiTuoNeiRong', label: '检测项目' }

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
      console.log( this.pagination)
      this.loadData()
    },

    handleEditMe(selectionRow){

      this.openType='edit'
      this.editId = selectionRow.id
      this.readonly = false
      this.dialogFormVisible = true
      this.title = '编辑委托单'
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
          let params = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}
          params['listType']="htpsList"
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
