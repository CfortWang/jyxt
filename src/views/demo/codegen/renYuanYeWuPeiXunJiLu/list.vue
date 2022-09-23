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
              :value="scope.row.fuJian"
              readonly
              allow-download
              :download="true"
              @callback="data => formId = data.id"
            />
          </template>

    <template slot="bianZhiRenSelector"  slot-scope="scope">
        <ibps-user-selector
            :value="scope.row.jiLuRen"
             type="user"
             :multiple="false"
             :disabled="true"
             readonly-text="text"
             @callback="data => formId = data.id"
         />
       </template>

   </ibps-crud>
    <edit
      :id="editId"
      :title="title"
      :visible="dialogFormVisible"
      :userId ='userId'
      @callback="search"
      @close="visible => dialogFormVisible = visible"
   />
    <ibps-link
      v-show="false"
      ref="printResult"
      text="人员技术档案"
      link="resolve([{event:'afterSubmit',logic:`resolve({openType:'dialog',url:'${options.reportPash}03人员培训和考核程序/SGJS-CX-03-05B 培训记录.rpx&px.id=${options.formData.id}'})` }])"
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
import { queryPageList, remove } from '@/api/demo/codegen/renYuanYeWuPeiXunJiLu'
import ActionUtils from '@/utils/action'
import FixHeight from '@/mixins/height'
import Edit from './edit'
import IbpsLink from '@/components/ibps-link'
import IbpsAttachment from '@/business/platform/file/attachment/selector'
import IbpsUserSelector from '@/business/platform/org/selector'
export default {
  components: {
    Edit,
    'ibps-attachment': IbpsAttachment,
    'ibps-link': IbpsLink,
     'ibps-user-selector': IbpsUserSelector
  },
   props:['userId','readonly'],
  mixins: [FixHeight],
  data() {
    return {
      dialogFormVisible: false, // 弹窗
      apiGrantVisible: false,
      editId: '', // 编辑dialog需要使用
      pkKey: 'id', // 主键  如果主键不是pk需要传主键
      printId:{},
      title: '',

      loading: true,
      height: document.clientHeight,

      listData: [],
      pagination: {},
      sorts: {},
      listConfig: {
        toolbars:  this.readonly ?[]:[
          {
            key: 'add'
          }
        ],
        // 表格字段配置
        columns: [
          { prop: 'shiJian', label: '时间' ,dateFormat: 'yyyy-MM-dd'}
          ,{ prop: 'peiXunZhuYaoNei', label: '培训内容' }
          ,{ prop: 'peiXunDanWei', label: '培训单位' }
          ,{ prop: 'kaoHeQingKuang', label: '考核情况' }
          ,{ prop: 'jiLuRen', label: '登记人' ,fieldType: 'slot',slotName:"bianZhiRenSelector"}
          ,{ prop: 'fuJian', label: '附件' ,slotName:"JiShuFuJian"}

        ],
        rowHandle: {
          actions: [
            { key: 'print',label:"打印" },
             this.readonly ?{}:{ key: 'remove' ,label:"删除"}
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
      where['Q^yi_xuan_ren_yuan_^SL']= this.userId
      where['Q^shi_fou_guo_shen_^S']= "1"

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
     case 'add':// 添加
       this.handleEdit()
       this.title = '添加培训履历'
       break
     case 'edit':// 编辑
       ActionUtils.selectedRecord(selection).then((id) => {
         this.handleEdit(id)
         this.title = '编辑培训履历'
       }).catch(() => { })
       break
     case 'detail':// 明细
       ActionUtils.selectedRecord(selection).then((id) => {
         this.handleEdit(id, true)
         this.title = '培训履历'
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
