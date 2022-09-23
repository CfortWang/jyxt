<template>
  <div>
    <ibps-crud
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
      :indexRow="false"
      @action-event="handleAction"
      @sort-change="handleSortChange"
      @pagination-change="handlePaginationChange"
    >

            <!-- 查询部门 -->
             <template slot="textOrg" slot-scope="scope">
                 <ibps-org-selector
                      :multiple="false"
                      @input="getAppKey"
                  />
                </template>

    </ibps-crud>

    <bmrygl
      :id="editId"
      :visible="dialogFormVisible"
      :readonly="readonly"
      @callback="search"
      @close="visible => dialogFormVisible = visible"
    />

    <bpmn-formrender
      :visible="npmDialogFormVisible"
      :def-id="defId"
      @callback=""
      @close="visible => npmDialogFormVisible = visible"
    />

  </div>
</template>

<script>
import { queryPageList, remove } from '@/api/demo/codegen/buMenYuanGong'
import ActionUtils from '@/utils/action'
import FixHeight from '@/mixins/height'
import bmrygl from './bmrygl'
import IbpsUserSelector from '@/business/platform/org/selector'
import IbpsOrgSelector from '@/business/platform/org/org/selector'
import BpmnFormrender from '@/business/platform/bpmn/form/dialog'//新增流程打开页面
export default {
  components: {
    bmrygl,
    BpmnFormrender,
    'ibps-user-selector': IbpsUserSelector,
    'ibps-org-selector':IbpsOrgSelector
  },
  mixins: [FixHeight],
  data() {
    return {
      npmDialogFormVisible: false, // 弹窗
      defId: '', // 编辑dialog需要使用

      visible:false,
      dialogFormVisible: false, // 弹窗
      apiGrantVisible: false,
      editId: '', // 编辑dialog需要使用
      readonly: false, // 是否只读
      pkKey: 'id', // 主键  如果主键不是pk需要传主键
      textOrg:'',
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
           { key: 'edit'},
          /* {key:'nengli',label:"能力监控",icon:"el-icon-thumb", "type":"success"},
           {key:'kaoHe',label:"能力考核",icon:"el-icon-thumb", "type":"success"},
           {key:'shouQuan',label:"业务能力确认授权",icon:"el-icon-thumb", "type":"success"},
           {key:'jiHua',label:"培训计划",icon:"el-icon-thumb", "type":"success"},
           {key:'jieGuo',label:"培训记录",icon:"el-icon-thumb", "type":"success"}, */
        ],
        searchForm: {
          forms: [
            { prop: 'Q^NAME_^SL', label: '名称:' },
            { prop: 'Q^group_Id_^SL', label: '部门',fieldType: 'slot',slotName:"textOrg" }
          ]
        },
        // 表格字段配置
        columns: [
          { prop: 'groupId', label: '部门',width:120 }
          ,{ prop: 'name', label: '名称' ,width:100}
          ,{ prop: 'email', label: '邮箱' ,width:150}
          ,{ prop: 'address', label: '地址' ,width:250}
          ,{ prop: 'mobile', label: '电话' ,width:120}
          ,{ prop: 'positions', label: '岗位' ,width:320}
          ,{ prop: 'jiNengZhiCheng', label: '技能职称' }
        ],
        rowHandle: {
          actions: [
            { key: 'edit' ,label:"编辑"},
            { key: 'detail' ,label:"明细"}
          ],
          effect:'display' //固定按钮
        }
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    getAppKey(getValue) {
        this.textOrg = getValue
        if("isMaster" !== localStorage.getItem('statistic')){
          this.$message("当前角色无法进行部门过滤")
        }
      },
    // 加载数据
    loadData() {
      this.loading = true
      queryPageList(this.getSearcFormData()).then(response => {
        ActionUtils.handleListData(this, response.data)
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    /**
     * 获取格式化参数
     */
    getSearcFormData() {
      const params = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}
        params['Q^GROUP_ID_^SNE'] = 'GROUP_ID_'
      if("isCharger" == localStorage.getItem('statistic')){
        params['Q^GROUP_ID_^S'] =  this.$store.getters.userInfo.org.id|| ''
       }
       if("isNormal" == localStorage.getItem('statistic') ){
         params['Q^ID_^S'] =  this.$store.getters.userInfo.user.id|| ''
       }
      return ActionUtils.formatParams(
        params, //查询参数条件
        this.pagination, //分页条件
        this.sorts )//排序条件
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
    openTask(id){
      this.npmDialogFormVisible = true
      this.defId =id
    },
    handleAction(command, position, selection, data) {
      switch (command) {
        case 'search':// 查询
          this.loadData()
          break
        case 'nengli':// 开启流程
          this.openTask("714492434100256768")
        break
        case 'kaoHe':// 开启流程
            this.openTask("714483790663122944")
        break
        case 'shouQuan':// 开启流程
            this.openTask("714485761684013056")
        break
        case 'jiHua':// 开启流程
            this.openTask("780767239254048768")
        break
        case 'jieGuo':// 开启流程
            this.openTask("735495300176674816")
        break
        case 'edit':// 编辑
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id)
          }).catch(() => { })
          break
        case 'detail':// 明细
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id,true)
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

  }
}
</script>
