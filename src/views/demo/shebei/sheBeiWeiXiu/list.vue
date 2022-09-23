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

  <template slot="gongYingShang"  slot-scope="scope">
    <ibps-custom-dialog
          :value="scope.row.fuWuShang"
           template-key="gysdhk"
          :disabled="!readonly"
          readonly-text="text"
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
      text="设备维修"
      link="resolve([{event:'afterSubmit',logic:`resolve({openType:'dialog',url:'${options.reportPash}08仪器设备的使用、维护和管理程序/SGJS-CX-08-11B 仪器设备检定校准维修情况登记表.rpx&id_=${options.formData.id}'})` }])"
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
import { queryPageList, remove } from '@/api/demo/shebei/sheBeiWeiXiu'
import ActionUtils from '@/utils/action'
import FixHeight from '@/mixins/height'
import Edit from './edit'
import IbpsLink from '@/components/ibps-link'
import IbpsCustomDialog from '@/business/platform/data/templaterender/custom-dialog'

export default {
  components: {
    Edit,
    'ibps-link': IbpsLink,
    'ibps-custom-dialog': IbpsCustomDialog
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
            { prop: 'Q^BIAN_ZHI_SHI_JIAN^SL', label: '编制时间' }
          ]
        },
        // 表格字段配置
        columns: [
          { prop: 'fuWuShang', label: '服务商' ,fieldType: 'slot',slotName:"gongYingShang"}
          ,{ prop: 'weiYiBianHao', label: '唯一编号' }
          ,{ prop: 'xiangMu', label: '项目' }
          ,{ prop: 'shiYongJingFei', label: '使用经费' }
          ,{ prop: 'qingKuangShuoM', label: '情况说明' }
           ,{ prop: 'bianZhiShiJian', label: '编制时间' }
        ],
        rowHandle: {
         actions: [
           { key: 'print',label:"打印" }
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
      where['Q^she_bei_ming_chen^SL']= this.deviceId
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
      case 'search':// 查询
        this.loadData()
        break
      case 'add':// 添加
        this.handleEdit()
        this.title = '添加t_sbhc'
        break
      case 'edit':// 编辑
        ActionUtils.selectedRecord(selection).then((id) => {
          this.handleEdit(id)
          this.title = '编辑t_sbhc'
        }).catch(() => { })
        break
      case 'detail':// 明细
        ActionUtils.selectedRecord(selection).then((id) => {
          this.handleEdit(id, true)
          this.title = 't_sbhc明细'
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
