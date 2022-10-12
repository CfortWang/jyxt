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
    <template slot="shiYongRenSelect1"  slot-scope="scope">
          <ibps-user-selector
             :value="scope.row.bshbmfzr"
             type="user"
             :multiple="true"
             :disabled="!readonly"
             readonly-text="text"
             @callback="data => formId = data.id"
         />
       </template>

       <template slot="shiYongRenSelect2"  slot-scope="scope">
             <ibps-user-selector
                :value="scope.row.peiTongRen"
                type="user"
                :multiple="true"
                :disabled="!readonly"
                readonly-text="text"
                @callback="data => formId = data.id"
            />
          </template>

          <template slot="shiYongRenSelect3"  slot-scope="scope">
                <ibps-user-selector
                   :value="scope.row.neiShenYuan"
                   type="user"
                   :multiple="true"
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
      @callback="search"
      @close="visible => dialogFormVisible = visible"
    />

    <ibps-link
      v-show="false"
      ref="printResult"
      text="打印一览表"
      link="resolve([{event:'afterSubmit',logic:`resolve({openType:'dialog',url:'${options.reportPash}36内部审核程序/SGJS-CX-36-03B 内审检查表.rpx&id_=${options.formData.id}'})` }])"
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
import { queryPageList, remove } from '@/api/demo/bumenzhiliang/neiShenJianCha'
import ActionUtils from '@/utils/action'
import FixHeight from '@/mixins/height'
import Edit from './edit'
import IbpsLink from '@/components/ibps-link'
import IbpsUserSelector from '@/business/platform/org/selector'
export default {
  components: {
    Edit,
     'ibps-link': IbpsLink,
     'ibps-user-selector': IbpsUserSelector
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
            { prop: ['Q^CREATE_TIME_^DL', 'Q^CREATE_TIME_^DG'], label: '创建时间', fieldType: 'daterange' }
          ]
        },
        // 表格字段配置
        columns: [
          { prop: 'beiShenHeBuMe', label: '被审核部门' }
          ,{ prop: 'shenHeRiQi', label: '审核日期' }
          ,{ prop: 'bshbmfzr', label: '被审核部门负责人',fieldType: 'slot',slotName:"shiYongRenSelect1" }
          ,{ prop: 'peiTongRen', label: '陪同人',fieldType: 'slot',slotName:"shiYongRenSelect2" }
          ,{ prop: 'neiShenYuan', label: '内审员' ,fieldType: 'slot',slotName:"shiYongRenSelect3"}
         ,{ prop: 'createTime', label: '创建时间', sortable: 'custom' }
        ],
        rowHandle: {
         actions: [
           { key: 'print',label:"打印内审检查" },
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
      where['Q^bian_zhi_ren_bu_m^SL']= this.orgId
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
          this.printId['id'] = data.waiJian
           this.$refs.printResult.click()
          break
        case 'search':// 查询
          this.loadData()
          break
        case 'add':// 添加
          this.handleEdit()
          this.title = '添加t_nsjc'
          break
        case 'edit':// 编辑
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id)
            this.title = '编辑t_nsjc'
          }).catch(() => { })
          break
        case 'detail':// 明细
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id, true)
            this.title = 't_nsjc明细'
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
