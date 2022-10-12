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
      :userId = "userId"
      @callback="search"
      @close="visible => dialogFormVisible = visible"
    />
  </div>
</template>

<script>
import { queryPageList, remove } from '@/api/demo/codegen/zhuYaoGongZuoJingLi'
import ActionUtils from '@/utils/action'
import FixHeight from '@/mixins/height'
import Edit from './edit'

export default {
  components: {
    Edit
  },
   props:['userId','readonly'],
  mixins: [FixHeight],
  data() {
    return {
      dialogFormVisible: false, // 弹窗
      apiGrantVisible: false,
      editId: '', // 编辑dialog需要使用
      pkKey: 'id', // 主键  如果主键不是pk需要传主键
      title: '',

      loading: true,
      height: document.clientHeight,

      listData: [],
      pagination: {},
      sorts: {},
      listConfig: {
        toolbars:this.readonly ?[]: [
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
        // 表格字段配置
        columns: [
          { prop: 'qiZhiNianYue', label: '起止年月' },
          { prop: 'zhongZhiNianYu', label: '终止年月' },
          { prop: 'danWeiMingCheng', label: '单位名称' },
          { prop: 'congShiHeZhong', label: '从事何种工作' },
          { prop: 'renHeZhiWu', label: '任何职务' }
        ],
        rowHandle: this.readonly ?[]:{
          actions: [
            { key: 'edit' ,label:"编辑"},
            { key: 'remove' ,label:"删除"},
          ],
           effect:'display'
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
     let where ={}
     where =  this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {},
     where['Q^PARENT_ID_^S']= this.userId
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
        case 'search':// 查询
          this.loadData()
          break
        case 'add':// 添加
          this.handleEdit()
          this.title = '添加工作经历'
          break
        case 'edit':// 编辑
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id)
            this.title = '编辑工作经历'
          }).catch(() => { })
          break
        case 'detail':// 明细
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id, true)
            this.title = '工作经历明细'
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
