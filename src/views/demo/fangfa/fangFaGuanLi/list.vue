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
import { queryPageList, remove } from '@/api/demo/fangfa/fangFaGuanLi'
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
            ,{ prop: 'Q^FANG_FA_MING_CHEN^SL', label: '方法名称' }
            ,{ prop: 'Q^SHEN_BAO_BU_MEN_^SL', label: '申报部门' }
            ,{ prop: 'Q^JI_SHU_FU_ZE_REN_^SL', label: '技术负责人' }
            ,{ prop: 'Q^NEI_RONG_JI_YING_^SL', label: '内容及应用条件' }
            ,{ prop: 'Q^ZHUAN_JIA_PING_SH^SL', label: '专家评审意见' }
            ,{ prop: 'Q^FANG_FA_QI_YONG_R^DG', label: '方法启用日期' }
            ,{ prop: 'Q^SHEN_PI_TONG_GUO_^SL', label: '审批通过' }
            ,{ prop: 'Q^JIAN_DING_FANG_FA^SL', label: '鉴定方法类型' }
            ,{ prop: 'Q^BEI_YONG_YI_^SL', label: '备用一' }
            ,{ prop: 'Q^BEI_YONG_ER_^SL', label: '备用二' }
            ,{ prop: 'Q^BEI_YONG_SAN_^SL', label: '备用三' }
            ,{ prop: 'Q^WO_SHI_CE_SHI_ZI_^SL', label: '我是测试字段' }
            ,{ prop: 'Q^BIAO_ZHUN_FANG_FA^SL', label: '标准方法编号' }
            ,{ prop: 'Q^SHEN_QING_SHI_JIA^SL', label: '申请时间' }
            ,{ prop: 'Q^SHEN_QING_REN_^SL', label: '申请人' }
            ,{ prop: 'Q^SHEN_QING_REN_YUA^SL', label: '申请人员' }
            ,{ prop: 'Q^SHI_YONG_SHE_BEI_^SL', label: '适用设备' }
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
          ,{ prop: 'fangFaMingChen', label: '方法名称' }
          ,{ prop: 'shenBaoBuMen', label: '申报部门' }
          ,{ prop: 'jiShuFuZeRen', label: '技术负责人' }
          ,{ prop: 'neiRongJiYing', label: '内容及应用条件' }
          ,{ prop: 'zhuanJiaPingSh', label: '专家评审意见' }
          ,{ prop: 'fangFaQiYongR', label: '方法启用日期' }
          ,{ prop: 'shenPiTongGuo', label: '审批通过' }
          ,{ prop: 'jianDingFangFa', label: '鉴定方法类型' }
          ,{ prop: 'beiYongYi', label: '备用一' }
          ,{ prop: 'beiYongEr', label: '备用二' }
          ,{ prop: 'beiYongSan', label: '备用三' }
          ,{ prop: 'woShiCeShiZi', label: '我是测试字段' }
          ,{ prop: 'biaoZhunFangFa', label: '标准方法编号' }
          ,{ prop: 'shenQingShiJia', label: '申请时间' }
          ,{ prop: 'shenQingRen', label: '申请人' }
          ,{ prop: 'shenQingRenYua', label: '申请人员' }
          ,{ prop: 'shiYongSheBei', label: '适用设备' }
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
          this.title = '添加t_ffgl'
          break
        case 'edit':// 编辑
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id)
            this.title = '编辑t_ffgl'
          }).catch(() => { })
          break
        case 'detail':// 明细
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id, true)
            this.title = 't_ffgl明细'
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