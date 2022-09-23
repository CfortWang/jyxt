<template>
  <div class="main-container">
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
      @action-event="handleAction"
      @sort-change="handleSortChange"
      @pagination-change="handlePaginationChange"
    />
    <edit
      :id="editId"
      :title="title"
      :visible="dialogFormVisible"
      :readonly="readonly"
      @callback="search"
      @close="visible => dialogFormVisible = visible"
    />
  </div>
</template>

<script>
import { queryPageList, remove } from '@/api/demo/wuliao/wuLiaoYanShou'
import ActionUtils from '@/utils/action'
import FixHeight from '@/mixins/height'
import Edit from './edit'

export default {
  components: {
    Edit
  },
  mixins: [FixHeight],
  data() {
    return {
      dialogFormVisible: false, // 弹窗
      apiGrantVisible: false,
      editId: '', // 编辑dialog需要使用
      readonly: false, // 是否只读
      pkKey: 'id', // 主键  如果主键不是pk需要传主键

      title: '',

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
            key: 'add'
          },
          {
            key: 'edit'
          },
          {
            key: 'remove'
          }
        ],
        searchForm: {
          forms: [
            { prop: 'Q^TENANT_ID_^SL', label: '租户ID' }
            ,{ prop: 'Q^IP_^SL', label: 'IP地址' }
            ,{ prop: 'Q^CREATE_BY_^SL', label: '创建人' }
            ,{ prop: 'Q^CREATE_TIME_^DG', label: '创建时间' }
            ,{ prop: 'Q^UPDATE_BY_^SL', label: '更新人' }
            ,{ prop: 'Q^UPDATE_TIME_^DG', label: '更新时间' }
            ,{ prop: 'Q^JI_HUA_ZONG_WAI_J^SL', label: '计划总外键' }
            ,{ prop: 'Q^BIAN_ZHI_REN_^SL', label: '编制人' }
            ,{ prop: 'Q^BIAN_ZHI_SHI_JIAN^SL', label: '编制时间' }
            ,{ prop: 'Q^BIAN_ZHI_BU_MEN_^SL', label: '编制部门' }
            ,{ prop: 'Q^SHI_FOU_GUO_SHEN_^SL', label: '是否过审' }
            ,{ prop: 'Q^BIAO_ZHUN_WU_ZHI_^SL', label: '标准物质' }
            ,{ prop: 'Q^DUI_YING_CAI_GOU_^SL', label: '对应采购计划' }
            ,{ prop: 'Q^SHEN_QING_WU_PIN_^SL', label: '申请物品' }
            // ,{ prop: ['Q^CREATE_TIME_^DL', 'Q^CREATE_TIME_^DG'], label: '创建时间', fieldType: 'daterange' }
          ]
        },
        // 表格字段配置
        columns: [
          { prop: 'tenantId', label: '租户ID' }
          ,{ prop: 'ip', label: 'IP地址' }
          ,{ prop: 'createBy', label: '创建人' }
          ,{ prop: 'createTime', label: '创建时间' }
          ,{ prop: 'updateBy', label: '更新人' }
          ,{ prop: 'updateTime', label: '更新时间' }
          ,{ prop: 'jiHuaZongWaiJ', label: '计划总外键' }
          ,{ prop: 'bianZhiRen', label: '编制人' }
          ,{ prop: 'bianZhiShiJian', label: '编制时间' }
          ,{ prop: 'bianZhiBuMen', label: '编制部门' }
          ,{ prop: 'shiFouGuoShen', label: '是否过审' }
          ,{ prop: 'biaoZhunWuZhi', label: '标准物质' }
          ,{ prop: 'duiYingCaiGou', label: '对应采购计划' }
          ,{ prop: 'shenQingWuPin', label: '申请物品' }
          // { prop: 'createTime', label: '创建时间', sortable: 'custom' }
        ],
        rowHandle: {
          actions: [
            { key: 'edit' },
            { key: 'remove' },
            { key: 'detail' }
          ]
        }
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
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
      return ActionUtils.formatParams(
        this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {},
        this.pagination,
        this.sorts)
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
          this.title = '添加t_cgysnk'
          break
        case 'edit':// 编辑
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id)
            this.title = '编辑t_cgysnk'
          }).catch(() => { })
          break
        case 'detail':// 明细
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id, true)
            this.title = 't_cgysnk明细'
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
      remove({ ids: ids }).then(response => {
        ActionUtils.removeSuccessMessage()
        this.search()
      }).catch(() => {})
    }
  }
}
</script>