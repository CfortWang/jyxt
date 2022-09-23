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
    <template slot="JiShuFuJian" slot-scope="scope">
             <ibps-attachment
               :value="scope.row.wenJian"
               readonly
               allow-download
               :download="true"
               @callback="data => formId = data.id"
             />
           </template>
    </ibps-crud>

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
      ref="printResult"
      text="打印一览表"
      link="resolve([{event:'afterSubmit',logic:`resolve({openType:'dialog',url:'${options.reportPash}27实验室间对比和能力验证程序/SGJS-CX-27-02B 能力验证一览表.rpx&id_=${options.formData.id}'})` }])"
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
import { queryPageList, remove } from '@/api/demo/bumenzhiliang/nengLiRenZhengYiLanXiang'
import ActionUtils from '@/utils/action'
import FixHeight from '@/mixins/height'
import Edit from './edit'
import IbpsAttachment from '@/business/platform/file/attachment/selector'
import IbpsLink from '@/components/ibps-link'

export default {
  components: {
    Edit,
    'ibps-link': IbpsLink,
    'ibps-attachment': IbpsAttachment
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

      title: '',
       printId:{},
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
            { prop: 'Q^CAN_JIA_RI_QI_^SL', label: '参加日期' }
            ,{ prop: 'Q^ZU_ZHI_FANG_^SL', label: '组织方' }
            ,{ prop: 'Q^CANG_JIA_^SL', label: '参加项目名称' }
            ,{ prop: 'Q^JIE_GUO_^SL', label: '结果' }
          ]
        },
        // 表格字段配置
        columns: [
          { prop: 'jiHuaBiaoHao', label: '计划编号' }
          ,{ prop: 'canJiaRiQi', label: '参加日期' }
          ,{ prop: 'zuZhiFang', label: '组织方' }
          ,{ prop: 'cangJia', label: '参加项目名称' }
          ,{ prop: 'jieGuo', label: '结果' }
          ,{ prop: 'jieGuoChuLiQi', label: '结果处理情况' }
          ,{ prop: 'beiZhu', label: '备注' }
          ,{ prop: 'wenJian', label: '能力验证文件' ,slotName:"JiShuFuJian" }
          ,{ prop: 'createTime', label: '创建时间', sortable: 'custom' }
        ],
        rowHandle: {
         actions: [
          { key: 'print',label:"打印对应一览" },
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
      where['Q^bu_men_^SL']= this.orgId

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
          this.printId['id'] = data.waiJian
           this.$refs.printResult.click()
          break
        case 'search':// 查询
          this.loadData()
          break
        case 'add':// 添加
          this.handleEdit()
          this.title = '添加t_nlrzylb'
          break
        case 'edit':// 编辑
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id)
            this.title = '编辑t_nlrzylb'
          }).catch(() => { })
          break
        case 'detail':// 明细
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id, true)
            this.title = 't_nlrzylb明细'
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
