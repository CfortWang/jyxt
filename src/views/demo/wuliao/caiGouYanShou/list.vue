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
import { queryPageList, remove } from '@/api/demo/wuliao/caiGouYanShou'
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
            { prop: 'Q^JI_HUA_ZONG_WAI_J^SL', label: '计划总外键' }
            ,{ prop: 'Q^TENANT_ID_^SL', label: '租户ID' }
            ,{ prop: 'Q^IP_^SL', label: 'IP地址' }
            ,{ prop: 'Q^CREATE_BY_^SL', label: '创建人' }
            ,{ prop: 'Q^CREATE_TIME_^DG', label: '创建时间' }
            ,{ prop: 'Q^UPDATE_BY_^SL', label: '更新人' }
            ,{ prop: 'Q^UPDATE_TIME_^DG', label: '更新时间' }
            ,{ prop: 'Q^WAI_JIAN_^SL', label: '外键' }
            ,{ prop: 'Q^WU_PIN_MING_CHENG^SL', label: '物品名称' }
            ,{ prop: 'Q^GONG_YING_SHANG_^SL', label: '供应商' }
            ,{ prop: 'Q^YAN_SHOU_REN_^SL', label: '验收人' }
            ,{ prop: 'Q^YAN_SHOU_RI_QI_^SL', label: '验收日期' }
            ,{ prop: 'Q^WAI_GUAN_QING_KUA^SL', label: '外观情况' }
            ,{ prop: 'Q^GUI_GE_QING_KUANG^SL', label: '规格情况' }
            ,{ prop: 'Q^JI_BIE_QING_KUANG^SL', label: '级别情况' }
            ,{ prop: 'Q^SHU_LIANG_QING_KU^SL', label: '数量情况' }
            ,{ prop: 'Q^YAN_SHOU_FANG_FA_^SL', label: '验收方法' }
            ,{ prop: 'Q^JIAN_YAN_JIE_GUO_^SL', label: '检验结果' }
            ,{ prop: 'Q^QI_TA_QING_KUANG_^SL', label: '其他情况' }
            ,{ prop: 'Q^WAI_GUAN_FU_HE_^SL', label: '外观符合' }
            ,{ prop: 'Q^JI_BIE_FU_HE_^SL', label: '级别符合' }
            ,{ prop: 'Q^SHU_LIANG_FU_HE_^SL', label: '数量符合' }
            ,{ prop: 'Q^ZHI_LIANG_FU_HE_^SL', label: '质量符合' }
            ,{ prop: 'Q^GUI_GE_FU_HE_^SL', label: '规格符合' }
            ,{ prop: 'Q^ZHI_LIANG_QING_KU^SL', label: '质量情况' }
            ,{ prop: 'Q^SHI_FOU_GUO_SHEN_^SL', label: '是否过审' }
            ,{ prop: 'Q^SHU_LIANG_ZHUANG_^SL', label: '数量状况' }
            ,{ prop: 'Q^BIAN_ZHI_BU_MEN_^SL', label: '编制部门' }
            ,{ prop: 'Q^BIAN_ZHI_REN_^SL', label: '编制人' }
            ,{ prop: 'Q^BIAN_ZHI_SHI_JIAN^SL', label: '编制时间' }
            // ,{ prop: ['Q^CREATE_TIME_^DL', 'Q^CREATE_TIME_^DG'], label: '创建时间', fieldType: 'daterange' }
          ]
        },
        // 表格字段配置
        columns: [
          { prop: 'jiHuaZongWaiJ', label: '计划总外键' }
          ,{ prop: 'tenantId', label: '租户ID' }
          ,{ prop: 'ip', label: 'IP地址' }
          ,{ prop: 'createBy', label: '创建人' }
          ,{ prop: 'createTime', label: '创建时间' }
          ,{ prop: 'updateBy', label: '更新人' }
          ,{ prop: 'updateTime', label: '更新时间' }
          ,{ prop: 'waiJian', label: '外键' }
          ,{ prop: 'wuPinMingCheng', label: '物品名称' }
          ,{ prop: 'gongYingShang', label: '供应商' }
          ,{ prop: 'yanShouRen', label: '验收人' }
          ,{ prop: 'yanShouRiQi', label: '验收日期' }
          ,{ prop: 'waiGuanQingKua', label: '外观情况' }
          ,{ prop: 'guiGeQingKuang', label: '规格情况' }
          ,{ prop: 'jiBieQingKuang', label: '级别情况' }
          ,{ prop: 'shuLiangQingKu', label: '数量情况' }
          ,{ prop: 'yanShouFangFa', label: '验收方法' }
          ,{ prop: 'jianYanJieGuo', label: '检验结果' }
          ,{ prop: 'qiTaQingKuang', label: '其他情况' }
          ,{ prop: 'waiGuanFuHe', label: '外观符合' }
          ,{ prop: 'jiBieFuHe', label: '级别符合' }
          ,{ prop: 'shuLiangFuHe', label: '数量符合' }
          ,{ prop: 'zhiLiangFuHe', label: '质量符合' }
          ,{ prop: 'guiGeFuHe', label: '规格符合' }
          ,{ prop: 'zhiLiangQingKu', label: '质量情况' }
          ,{ prop: 'shiFouGuoShen', label: '是否过审' }
          ,{ prop: 'shuLiangZhuang', label: '数量状况' }
          ,{ prop: 'bianZhiBuMen', label: '编制部门' }
          ,{ prop: 'bianZhiRen', label: '编制人' }
          ,{ prop: 'bianZhiShiJian', label: '编制时间' }
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
          this.title = '添加t_cgysdj'
          break
        case 'edit':// 编辑
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id)
            this.title = '编辑t_cgysdj'
          }).catch(() => { })
          break
        case 'detail':// 明细
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id, true)
            this.title = 't_cgysdj明细'
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