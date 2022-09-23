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
   >

    <template slot="bianZhiBuMenSelector"  slot-scope="scope">
          <ibps-user-selector
             :value="scope.row.bianZhiBuMen"
             type="org"
             :multiple="false"
             :disabled="!readonly"
             readonly-text="text"
             @callback="data => formId = data.id"
         />
       </template>

   <template slot="bianZhiRenSelector"  slot-scope="scope">
       <ibps-user-selector
           :value="scope.row.bianZhiRen"
            type="user"
            :multiple="false"
            :disabled="!readonly"
            readonly-text="text"
            @callback="data => formId = data.id"
        />
      </template>

    </ibps-crud>
    <edit
      :id="editId"
      :title="title"
      :visible="dialogFormVisible"
      :readonly="readonly"
      :devId="deviceId"
      @callback="search"
      @close="visible => dialogFormVisible = visible"
    />
  </div>
</template>

<script>
import { queryPageList, remove } from '@/api/demo/shebei/sheBeiWeiHu'
import ActionUtils from '@/utils/action'
import FixHeight from '@/mixins/height'
import Edit from './edit'
import IbpsUserSelector from '@/business/platform/org/selector'
import IbpsOrgSelector from '@/business/platform/org/org/selector'
export default {
  components: {
    Edit,
    'ibps-user-selector': IbpsUserSelector,
    'ibps-org-selector':IbpsOrgSelector
  },
  mixins: [FixHeight],
   props:['deviceId'],
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
            { prop: 'Q^WEI_HU_RI_QI_^SL', label: '维护日期' }
            ,{ prop: 'Q^WEI_HU_NEI_RONG_^SL', label: '维护内容' }
          ]
        },
        // 表格字段配置
        columns: [
          { prop: 'bianZhiRen', label: '编制人' ,fieldType: 'slot',slotName:"bianZhiRenSelector"}
          ,{ prop: 'bianZhiBuMen', label: '编制部门' ,fieldType: 'slot',slotName:"bianZhiBuMenSelector"}
          ,{ prop: 'weiHuRiQi', label: '维护日期' , sortable: 'custom'}
          ,{ prop: 'weiHuNeiRong', label: '维护内容' }
          ,{ prop: 'beiZhu', label: '备注' }
          ,{ prop: 'createTime', label: '创建时间', sortable: 'custom' }
        ],
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
      let where ={}
      where =  this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}
      where['Q^wai_jian_^SL']= this.deviceId
      return ActionUtils.formatParams(
        where,
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
       case 'print':// 打印
         this.printId['id'] = data.parentId
          this.$refs.printResult.click()
         break
      case 'search':// 查询
        this.loadData()
        break
      case 'add':// 添加
        this.handleEdit()
        this.title = '添加设备保养记录'
        break
      case 'edit':// 编辑
        ActionUtils.selectedRecord(selection).then((id) => {
          this.handleEdit(id)
          this.title = '编辑设备保养记录'
        }).catch(() => { })
        break
      case 'detail':// 明细
        ActionUtils.selectedRecord(selection).then((id) => {
          this.handleEdit(id, true)
          this.title = '设备保养记录明细'
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
