<template>
  <div>
    <ibps-crud
      ref="crud"
      :data="listData"
      :pk-key="pkKey"
      :toolbars="listConfig.toolbars"
      :search-form="listConfig.searchForm"
      :columns="listConfig.columns"
      :row-handle="listConfig.rowHandle"
      :pagination="pagination"
      :height="tableHeight"
      :loading="loading"
      @action-event="handleAction"
      @sort-change="handleSortChange"
      @pagination-change="handlePaginationChange"
    />
  </div>
</template>
<script>
import ActionUtils from '@/utils/action'
export default {
  props: {
    data: {
      type: Array,
      default: () => { return [] }
    },
    parenId: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dataTemplateId: '691693239920492544', // 模板ID
      listData: [],
      loading: true,
      tableHeight: document.clientHeight,
      pkKey: 'id_',
      datasetKey: '',
      templateKey: '',
      formKey: '',
      rightsScope: 'data',
      dataTemplate: {},
      selecteds: '',
      listConfig: {
        toolbars: [
          { key: 'add' },
          { key: 'remove' }
        ],
        // 表格字段配置
        columns: [
          { prop: 'name_', label: '名称' },
          { prop: 'type_', label: '规格' },
          { prop: 'amount_', label: '数量' },
          { prop: 'remark_', label: '说明' },
          { prop: 'price_', label: '价格' }
        ],
        rowHandle: {
          actions: [{
            key: 'remove'
          }]
        }
      },
      pagination: {},
      sorts: {}
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    /** 获取数据模板 */
    loadData() {

    },

    /**
       * 处理排序
       */
    handleSortChange(sort) {
      ActionUtils.setSorts(this.sorts, sort)
      this.loadData()
    },

    /**
       * 处理分页事件
       */
    handlePaginationChange(page) {
      ActionUtils.setSorts(this.sorts)
      ActionUtils.setPagination(this.pagination, page)
      this.loadData()
    },

    handleAction(buttonKey, position, selection, data) {
      switch (buttonKey) {
        case 'search':// 查询
          this.loadData()
          break
        case 'add':// 添加
          // this.handleEdit()
          this.title = '添加'
          break
        case 'edit':// 编辑
          ActionUtils.selectedRecord(selection).then((id) => {
            // this.handleEdit(id)
            this.title = '编辑'
          }).catch(() => { })
          break
        case 'detail':
          ActionUtils.selectedRecord(selection).then((id) => {
            // this.handleEdit(id, true)
            this.title = '明细'
          }).catch(() => { })
          break
        case 'remove':// 删除
          ActionUtils.removeRecord(selection).then((ids) => {
            // this.handleRemove(ids)
          }).catch(() => { })
          break
        default:
          break
      }
    }

  }
}
</script>
