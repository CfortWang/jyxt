<template>


  <div class="main-container">
    <ibps-crud
      :displayField = "'检测项目/参数配置'"
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
      <div class="el-icon-refresh" style="color:#67C23A" @click="handleEditMe(scope.row)" >编辑</div>
    </template>
      <template slot="dsBuMenSelect">
        <el-select v-model="bianZhiBuMenId" clearable placeholder="请选择" style="width:120px">
          <el-option
            v-for="(item, index) in buMenList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
 <template slot="ds2isCnaselect"  slot-scope="scope">

                 <ibps-link-data
                      v-model="scope.row.shiFouCnas"
                      template-key="cnaszly"
                      :readonly="true"
                      :value-key="KEY_"
                      :label-key="NAME_"
                    />
           </template>


           <template slot="ds2StatusSelect"  slot-scope="scope">

                 <ibps-link-data
                      v-model="scope.row.status"
                      template-key="ztzly"
                      :readonly="true"
                      :value-key="KEY_"
                      :label-key="NAME_"
                    />
           </template>


      <template slot="dsDuiXiangSelect">
        <el-select v-model="duiXiang" clearable placeholder="请选择" style="width:120px">
          <el-option
            v-for="(item, index) in duiXiangList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
import Edit from './edit'
import curdPost from '@/business/platform/form/utils/custom/joinCURD.js' //增删改查规则
import { query,deleteMe } from '@/api/detection/jcsjpz.js'
import common from '@/constants/common.js'
import { statusOptions, typeOptions } from '../../constants'
import IbpsDictionary from '@/business/platform/cat/dictionary/select'
import IbpsLinkData from '@/business/platform/data/templaterender/link-data'

export default {
  components: {
      'ibps-dictionary': IbpsDictionary,
         'ibps-org-selector':IbpsOrgSelector,
         'ibps-link-data': IbpsLinkData,
        Edit
  },
  mixins: [FixHeight],
  data() {
    return {
      typeOptions: typeOptions,
      statusOptions: statusOptions,

      status:'',
      bianZhiBuMenId:'',
      duiXiang:'',
      buMenList:[],
      duiXiangList:[],
      title: '',
      loading: true,
      editId: '', // 编辑dialog需要使用
      pkKey: 'id', // 主键  如果主键不是pk需要传主键
      readonly: false, // 是否只读
      dialogFormVisible: false, // 弹窗
      apiGrantVisible: false,
      openType: 'add',
      height: "600px",
      listData: [],
      pagination: {},
      sorts: {},
      listConfig: {
        toolbars: [
          {
            key: 'search'
          },
          { key: 'add',  label: '新增' },
          {
            key: 'remove'
          }
        ],
       searchForm: {
          forms: [
            { prop: 'BIAN_ZHI_BU_MEN_ID_', label: '部门', fieldType: 'slot', slotName: 'dsBuMenSelect',itemWidth:'120'},
            { prop: 'SHI_FOU_CNAS_', options: typeOptions,label: '检测类别',itemWidth:'120',fieldType: 'select' },
            { prop: 'JIAN_CE_DUI_XIANG', label: '检测对象',itemWidth:'120',fieldType: 'slot',  slotName: 'dsDuiXiangSelect' },
            { prop: 'STATUS_',  options: statusOptions, label: '状态', fieldType: 'select',itemWidth:'120' },
          ]
        },
        // 表格字段配置
        columns: [
           { prop: 'id', label: 'ID',hidden:'true'}
           ,{ prop: 'bianZhiBuMen', label: '部门',width:'80' }
           ,{ prop: 'shiFouCnas', label: '检测类别',width:'90',fieldType: 'slot',  slotName: 'ds2isCnaselect' }
           ,{ prop: 'jianCeDuiXiang', label: '检测对象' }
           ,{ prop: 'jianCeLeiBie', label: '检测类型' }
          ,{ prop: 'xiangMuCanShu', label: '项目/参数' }
           ,{ prop: 'status', label: '状态',width:'70',fieldType: 'slot',  slotName: 'ds2StatusSelect' }
          ,{ prop: 'bianZhiRen', label: '编制人',width:'70' }
          ,{ prop: 'updateTimeStr', label: '编制时间' }
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
    let that = this
    let sql = "select id_ as id,name_ as keHuMingCheng  FROM ibps_party_org WHERE role_ids_ LIKE '%466555896126767104%'"
    curdPost('sql',sql).then(response => {
         let dbData = response.variables.data
         that.buMenList=[]
         if(dbData){
           dbData.forEach(function(e){
              that.buMenList.push({label:e.keHuMingCheng,value:e.id})
           })
         }
    })
    sql = "select distinct jian_ce_dui_xiang FROM t_jclx"
    curdPost('sql',sql).then(response => {
         let dbData = response.variables.data
         that.duiXiangList=[]
         if(dbData){
           dbData.forEach(function(e){
              that.duiXiangList.push({label:e.jian_ce_dui_xiang,value:e.jian_ce_dui_xiang})
           })
           //that.models.jianCeDuiXiang=dbData[0].jian_ce_dui_xiang
         }
    })
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
      this.dialogFormVisible = true
      this.title = '检测配置项目/参数编辑'
    },
    handleAddMe(){
      this.openType='add'
      this.editId = ""
      this.readonly = false
      this.dialogFormVisible = true
      this.title = '检测配置项目/参数添加'
    },

    // 加载数据
    loadData(closeFlag) {
      this.dialogFormVisible =closeFlag
      const params = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}

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
    search(closeFlag) {
      this.loadData(closeFlag)
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
          this.title = '检测项目/参数配置'
          break
        case 'edit':// 编辑
          this.openType='edit'
          this.editId = data[0].id
          this.readonly = false
          this.dialogFormVisible = true
          this.title = '检测项目/参数配置'
          break
        case 'detail':// 明细
          this.openType='edit'
          this.editId = selection.id
          this.readonly = false
          this.dialogFormVisible = true
          this.title = '检测配置项目/参数查看'
          break
        case 'remove':// 删除
          let ids = [];
          console.log(data)
          data.forEach(function (b) {
            ids.push(b.id)
          });
          let idStr = ids.join(",")
          deleteMe({data:idStr}).then(response => {
             this.listData=[]
             this.search()
           })
          this.loading = false
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
      if(this.bianZhiBuMenId){
        if(!results.parameters)
          results.parameters={}
        results.parameters.push({key:'BIAN_ZHI_BU_MEN_ID_',value:this.bianZhiBuMenId})
      }
      if(this.status){
        if(!results.parameters)
          results.parameters={}
        results.parameters.push({key:'STATUS_',value:this.status})
      }
      if(this.duiXiang){
        if(!results.parameters)
          results.parameters={}
        results.parameters.push({key:'JIAN_CE_DUI_XIANG',value:this.duiXiang})
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
