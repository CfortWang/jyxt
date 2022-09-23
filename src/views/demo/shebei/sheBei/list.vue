<template>
  <div>
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
       :indexRow="false"
      @action-event="handleAction"
      @sort-change="handleSortChange"
      @pagination-change="handlePaginationChange"
      >

    <template slot="bianZhiRenSelector"  slot-scope="scope">
        <ibps-user-selector
            :value="scope.row.guanLiRen"
             type="user"
             :multiple="false"
             :disabled="!readonly"
             readonly-text="text"
             @callback="data => formId = data.id"
         />
       </template>

       <template slot="bianZhiBuMenSelector"  slot-scope="scope">
             <ibps-user-selector
                :value="scope.row.zhuanYeBuMen"
                type="org"
                :multiple="false"
                :disabled="!readonly"
                readonly-text="text"
                @callback="data => formId = data.id"
            />
          </template>

       <!-- 查询部门 -->
       <template slot="textOrg" slot-scope="scope">
           <ibps-org-selector
                :multiple="false"
                @input="getAppKey"
            />
          </template>

    </ibps-crud>

      <edit
       :id="editId"
       :visible="dialogFormVisible"
       :readonly="readonly"
       @callback="search"
       @close="visible => dialogFormVisible = visible"
      />

      <bpmn-formrender
        :visible="npmDialogFormVisible"
        :def-id="defId"
        @callback=""
        @close="visible => npmDialogFormVisible = visible"
      />

  </div>
</template>

<script>
import { queryPageList, remove } from '@/api/demo/shebei/sheBei'
import ActionUtils from '@/utils/action'
import FixHeight from '@/mixins/height'
import Edit from './sbgl'
import IbpsUserSelector from '@/business/platform/org/selector'
import IbpsOrgSelector from '@/business/platform/org/org/selector'
export default {
  components: {
    Edit,
    'ibps-user-selector': IbpsUserSelector,
    'ibps-org-selector':IbpsOrgSelector
  },
  mixins: [FixHeight],
  data() {
    return {
      npmDialogFormVisible: false, // 弹窗
      defId: '', // 编辑dialog需要使用

      visible:false,
      dialogFormVisible: false, // 弹窗
      apiGrantVisible: false,
      editId: '', // 编辑dialog需要使用
      readonly: false, // 是否只读
      pkKey: 'id', // 主键  如果主键不是pk需要传主键
      title: '',
      textOrg:"",
      loading: true,
      height: document.clientHeight,
      orgShow:true,
      listData: [],
      pagination: {},
      sorts: {},
      listConfig: {
        toolbars: [
          {key: 'search'},
          {key:'weiXiu',label:"维修申请",icon:"el-icon-thumb", "type":"success"},
          {key:'gouMai',label:"购买申请",icon:"el-icon-thumb", "type":"success"},
          {key:'gouZhi',label:"购置计划",icon:"el-icon-thumb", "type":"success"},
          {key:'jiaoZhun',label:"校准计划",icon:"el-icon-thumb", "type":"success"},
          {key:'heCha',label:"核查计划",icon:"el-icon-thumb", "type":"success"},
          {key:'jieYong',label:"借用外部设备",icon:"el-icon-thumb", "type":"success"},
          {key:'baoFei',label:"报废申请",icon:"el-icon-thumb", "type":"success"}
        ],
        searchForm: {
          forms: [
          /* { prop: 'Q^zhuan_Ye_Bu_Men_^S', label: '专业',fieldType: 'slot',slotName:"textOrg" }, */
            { prop: 'Q^SHE_BEI_MING_CHENG_^SL', label: '设备名称' }
            ,{ prop: 'Q^SHE_BEI_SHI_BIE_H^SL', label: '识别号' }
            ,{ prop: 'Q^SHE_BEI_ZHUANG_TA^SL', label: '设备状态' ,fieldType: 'select', options: [{value: '正常使用',label: '正常使用'},{value: '限制使用',label: '限制使用'},{value: '暂停使用',label: '暂停使用'},{value: '已报废',label: '已报废'}]}
          ]
        },
        // 表格字段配置
        columns: [
          { prop: 'sheBeiMingCheng', label: '仪器设备名称' }
          ,{ prop: 'sheBeiShiBieH', label: '设备识别号' }
          ,{ prop: 'sheBeiZhuangTa', label: '设备状态' ,tags:[{value: '正常使用',label: '正常使用'},{value: '限制使用',label: '限制使用',type:'warning'},{value: '暂停使用',label: '暂停使用',type:'danger'},{value: '已报废',label: '已报废',type:"info"}]}
          ,{ prop: 'guanLiRen', label: '设备管理人' ,fieldType: 'slot',slotName:"bianZhiRenSelector" }
          ,{ prop: 'zhuanYeBuMen', label: '专业部门',fieldType: 'slot',slotName:"bianZhiBuMenSelector" }
          ,{ prop: 'bianZhiShiJian', label: '编制时间' }

        ],
        rowHandle: {
          actions: [
            { key: 'edit' ,label:"编辑"},
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
    getAppKey(getValue) {
      this.textOrg = getValue
      if("isMaster" !== localStorage.getItem('statistic')){
        this.$message("当前角色无法进行部门过滤")
      }
    },
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
      const params = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}
      params['Q^zhuan_Ye_Bu_Men_^S'] = this.textOrg || ''
     if("isCharger" == localStorage.getItem('statistic') && this.$store.getters.userInfo.org.id){
       params['Q^zhuan_Ye_Bu_Men_^S'] =  this.$store.getters.userInfo.org.id || ''
      }
      if("isNormal" == localStorage.getItem('statistic') ){
        params['Q^GUAN_LI_REN_^S'] =  this.$store.getters.userInfo.user.id|| ''
      }
      return ActionUtils.formatParams(
        params,
        this.pagination,
        this.sorts)
    },

    openTask(id){
      this.npmDialogFormVisible = true
      this.defId =id
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
        case 'weiXiu':// 开启流程
          this.openTask("742741420116279296")
        break
        case 'gouMai':// 开启流程
            this.openTask("702120093349314560")
        break
        case 'gouZhi':// 开启流程
            this.openTask("735796219074314240")
        break
        case 'jiaoZhun':// 开启流程
            this.openTask("737700453608849408")
        break
        case 'heCha':// 开启流程
            this.openTask("743210182879739904")
        break
        case 'jieYong':// 开启流程
            this.openTask("735876434785992704")
        break
        case 'baoFei':// 开启流程
            this.openTask("735898342625640448")
        break
        case 'edit':// 编辑
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id)
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
