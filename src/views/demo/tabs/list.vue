<template>
  <div>
    <ibps-container type="full" class="page">
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
      <edit
        :visible="dialogFormVisible"
        :edit-id="editId"
        :form-key="formKey"
        :rights-scope="rightsScope"
        :template-key="templateKey"
        :readonly="readonly"
        :title="title"
        @callback="search"
        @close="visible => dialogFormVisible = visible"
      />
    </ibps-container>
  </div>
</template>

<script>
import { getBuildDataById, queryDataTable, removeFormData } from '@/api/platform/data/dataTemplate'
import { debounce } from 'lodash'
import ActionUtils from '@/utils/action'
import Edit from './edit/index'

export default {
  components: {
    Edit
  },
  props: {
    dynamicParams: Object
  },
  data() {
    return {
      dataTemplateId: '691693239920492544', // 模板ID
      listData: [],
      title: '',
      editId: '',
      loading: true,
      tableHeight: document.clientHeight,
      dialogFormVisible: false,
      readonly: false,
      pkKey: 'id_',
      datasetKey: '',
      templateKey: '',
      formKey: '',
      rightsScope: 'data',
      dataTemplate: {},
      selecteds: '',
      listConfig: {
        toolbars: [
          { key: 'search' },
          { key: 'add' },
          { key: 'edit' },
          { key: 'remove' }
        ],
        // 查询条件
        searchForm: {
          forms: [
            { prop: 'Q^NAME_^SL', label: '名称', labelWidth: 80, itemWidth: 200 }
          ]
        },
        // 表格字段配置
        columns: [
          { prop: 'order_no_', label: '编号' },
          { prop: 'name_', label: '名称' },
          { prop: 'begin_date_', label: '日期' },
          { prop: 'create_by_', label: '创建人' },
          { prop: 'dept_id_', label: '部门' },
          { prop: 'examine_user_', label: '批准人' }
        ],
        rowHandle: {
          actions: [{
            key: 'edit'
          }, {
            key: 'remove'
          }, {
            key: 'detail'
          }]
        }
      },
      pagination: {},
      sorts: {}
    }
  },
  created() {
    this.loadDataTemplate()
  },
  methods: {
    /** 获取数据模板 */
    loadDataTemplate() {
      getBuildDataById({
        dataTemplateId: this.dataTemplateId,
        isFilterForm: false,
        isRightsFilter: true
      }).then(response => {
        // 从后台获取数据
        const data = this.$utils.parseData(response.data)
        this.initParameter(data)
        this.dataTemplate = this.getTemplate(data)
        this.loadData()
      }).catch(() => {})
      return this.dataTemplate
    },
    getTemplate(data) {
      const templates = data.templates || []
      if (data.showType === 'compose') {
        return templates
      } else {
        return templates.length > 0 ? templates[0] : {}
      }
    },

    initParameter(data) {
      if (data) {
        this.datasetKey = data.datasetKey
        this.formKey = data.attrs ? data.attrs.form_key || '' : ''
        this.templateKey = data.key
      }
    },

    /**
     * 加载数据
    */
    loadData() {
      this.loading = true
      queryDataTable(this.getFormatParams()).then(response => {
        this.loading = false
        ActionUtils.handleListData(this, response.data)
        if (this.$refs.crud) {
          this.$refs.crud.handleTableHeight()
          debounce(() => {
            if (this.$refs.crud) {
              this.$refs.crud.handleTableHeight()
            }
          }, 100)()
        }
      }).catch(() => {
        this.loading = false
      })
    },
    /**
     * 获取格式化参数
     */
    getFormatParams() {
      const formParams = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}
      const responseData = JSON.parse(JSON.stringify(this.dataTemplate))
      responseData.datasetKey = this.datasetKey
      responseData.unique = this.pkKey
      responseData['dynamic_params'] = this.dynamicParams
      formParams['response_data'] = JSON.stringify(responseData)
      return ActionUtils.formatParams(formParams, this.pagination, this.sorts)
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
          ActionUtils.setFirstPagination(this.pagination)
          this.loadData()
          break
        case 'add':// 添加
          this.handleEdit()
          this.title = '添加'
          break
        case 'edit':// 编辑
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id)
            this.title = '编辑'
          }).catch(() => { })
          break
        case 'detail':
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id, true)
            this.title = '明细'
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

    /** 删除数据  */
    handleRemove(ids) {
      removeFormData({
        formKey: this.formKey,
        ids: ids
      }).then(response => {
        ActionUtils.removeSuccessMessage()
        this.loadData()
      })
    },

    /**
       * 处理编辑
       */
    handleEdit(id = '', readonly = false) {
      this.editId = id
      this.dialogFormVisible = true
      this.readonly = readonly
    },

    /**
     * 查询
     */
    search() {
      this.loadData()
    }

  }
}
</script>

  <style>

  </style>
