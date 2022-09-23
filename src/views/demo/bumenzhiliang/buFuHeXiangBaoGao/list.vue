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

    <ibps-link
      v-show="false"
      ref="printResult1"
      text="不符合项报告"
      link="resolve([{event:'afterSubmit',logic:`resolve({openType:'dialog',url:'${options.reportPash}30不符合工作控制程序/SGJS-CX-30-01B不符合项报告.rpx&t_bfhxbg_id=${options.formData.id}'})` }])"
      show-type="button"
      text-type="fixed"
      link-type="javascript"
      text-javascript=""
      :form-data="printId"
      type="info"
      preview-entrance
      icon="ibps-icon-clipboard"
    />
    <ibps-link
      v-show="false"
      ref="printResult2"
      text="纠正措施"
      link="resolve([{event:'afterSubmit',logic:`resolve({openType:'dialog',url:'${options.reportPash}35纠正措施程序/SGJS-CX-35-01B 纠正措施记录表.rpx&yqgm.id=${options.formData.id}'})` }])"
      show-type="button"
      text-type="fixed"
      link-type="javascript"
      text-javascript=""
      :form-data="printId"
      type="info"
      preview-entrance
      icon="ibps-icon-clipboard"
    />


  </div>
</template>

<script>
import { queryPageList, remove } from '@/api/demo/bumenzhiliang/buFuHeXiangBaoGao'
import ActionUtils from '@/utils/action'
import FixHeight from '@/mixins/height'
import Edit from './edit'
import IbpsLink from '@/components/ibps-link'

export default {
  components: {
    Edit,
    'ibps-link': IbpsLink
  },
  mixins: [FixHeight],
  props:['orgId'],
  data() {
    return {
      dialogFormVisible: false, // 弹窗
      apiGrantVisible: false,
      editId: '', // 编辑dialog需要使用
      readonly: false, // 是否只读
      pkKey: 'id', // 主键  如果主键不是pk需要传主键
      printId:{},
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
          }
        ],
        searchForm: {
          forms: [
            { prop: 'Q^FA_XIAN_SHI_JIAN_^DG', label: '发现时间' }
          ]
        },
        // 表格字段配置
        columns: [
          { prop: 'shenHeYiJuWen', label: '审核依据文件' }
          ,{ prop: 'buFuHe', label: '不符合事实陈述' }
          ,{ prop: 'buFuHeGuiDing', label: '不符合规定' }
          ,{ prop: 'faXianShiJian', label: '发现时间' }
          ,{ prop: 'yanZhongXingPi', label: '严重性评价',fieldType: 'select', options: [{value: '1',label: '严重不符合'},{value: '2',label: '一般不符合'},{value: '3',label: '轻微不符合'}] }
        ,{ prop: 'createTime', label: '创建时间', sortable: 'custom' }
        ],
        rowHandle: {
          actions: [
             { key: 'print',label:"不符合" },
             { key: 'print2',label:"纠正" }
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
      where['Q^bei_shen_he_bu_me^SL']= this.orgId
      where['Q^shi_fou_guo_shen_^SL']= "1"
      
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
          this.printId['id'] = data.id
           this.$refs.printResult1.click()
          break
          case 'print2':// 打印
            this.printId['id'] = data.id
             this.$refs.printResult2.click()
            break
        case 'search':// 查询
          this.loadData()
          break
        case 'add':// 添加
          this.handleEdit()
          this.title = '添加t_bfhxbg'
          break
        case 'edit':// 编辑
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id)
            this.title = '编辑t_bfhxbg'
          }).catch(() => { })
          break
        case 'detail':// 明细
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id, true)
            this.title = 't_bfhxbg明细'
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
