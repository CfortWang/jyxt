<template>
  <div class="main-container">
    <ibps-crud
      ref="crud"
      :height="height"
      :data="listData"
      :toolbars="listConfig.toolbars"
      :search-form="listConfig.searchForm"
      :pk-key="pkKey"
      :displayField="title"
      :columns="listConfig.columns"
      :row-handle="listConfig.rowHandle"
      :pagination="pagination"
      :loading="loading"
      @action-event="handleAction"
      @sort-change="handleSortChange"
      @pagination-change="handlePaginationChange"
    >
   <template slot="selectCont" slot-scope="scope">
      <div class="el-icon-refresh" style="color:#67C23A" @click="editMe(scope.row)">办理</div>
    </template>
    </ibps-crud>

    <edit
      v-if="dialogFormVisible"
      :id="editId"
      :title="title"
      :visible="dialogFormVisible"
      :readonly="readonly"
      :openType="openType"
      @callback="search"
      @close="visible => dialogFormVisible = visible"
    />

  </div>
</template>

<script>
import { queryPageList, remove } from '@/api/detection/jcwtd'
import ActionUtils from '@/utils/action'
import FixHeight from '@/mixins/height'
import Edit from './auditEdit'
import curdPost from '@/business/platform/form/utils/custom/joinCURD.js' //增删改查规则
import getDbCol from '@/business/platform/form/utils/custom/getDbCol.js' //字段映射
import {query,removeMulti,selectById } from '@/api/detection/universalCRUD.js'

export default {
  components: {
    Edit
  },
  mixins: [FixHeight],
  data() {
    return {
      dialogFormVisible: false, // 弹窗
      apiGrantVisible: false,
        openType: '',
      editId: '', // 编辑dialog需要使用
      readonly: false, // 是否只读
      pkKey: 'id', // 主键  如果主键不是pk需要传主键
      title: '检测报告审核列表',
      src:'',
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
          // {                隐藏列表顶部增删改查
          //   key: 'edit'
          // },
          // {
          //   key: 'remove'
          // }
        ],
        searchForm: {
          forms: [
            { prop: 'shouLiBuMen', label: '部门' }
            ,{ prop: 'baoGaoBianHao', label: '报告编号' }
            ,{ prop: 'jianCeYuan', label: '检测员' }
          ]
        },
        // 表格字段配置
        columns: [
          { prop: 'id', label: 'ID',hidden:'true'},
          { prop: 'shouLiBuMen', label: '受理部门' },
          { prop: 'baoGaoBianHao', label: '报告编号' },
          { prop: 'xiangMuLeiBie', label: '项目类别' },
          { prop: 'xiangMuMingChe', label: '项目名称' },
          { prop: 'jianCeYuan', label: '检测员' },
          { prop: 'xiaoYanYuan', label: '校验员' },
          { prop: 'shouLiShiJian', label: '受理时间' },
          { prop: 'jianCeKaiShiS', label: '检测开始时间' },
          { prop: 'jianCeWanCheng', label: '检测完成时间' },
        ],
             rowHandle: {
                  actions: [],
                  effect:'display',
                  columnHeader:'检测数据',
                   width:'100'//固定按钮
                }
       //rowHandle: {"effect": "display","actions": [{"$index": 2,"key": "edit","button_type": "custom","code": "pintTask","label": "编辑","icon": "ibps-icon-file","type": "primary","deflow": null,"disabled": false,"hidden": false,"position": "manage"}],"columnHeader": "查阅"}
      }
    }
  },

  created() {
    this.loadData()
  },
  methods: {
    editMe(value){
         let data = {id:value.id}
         let p = "{data:'"+JSON.stringify(data)+"'}"
         console.log(p)
         selectById('sysjcwtdb','selectById',p).then(response => {
         })
         console.log("111")
         this.openType='edit'
         this.editId = value.id
         this.readonly = true
         this.dialogFormVisible = true
       },
     // 加载数据
    loadData() {
      let this_ = this;
      const params = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}
                query('sysjcwtdb','selects',this.formatParams(params ,this.pagination)).then(response => {
                   this_.listData=[]
                   let dbData = response.variables.data
                   let rp = response.variables.page
                    dbData.forEach(function(e){
                      console.log(e)
                      this_.listData.push(e)
                    })
                    this_.pagination = {}
                    this_.pagination['totalCount']=rp.totalCount
                    this_.pagination['page']=rp.page
                    this_.pagination['limit']=rp.limit
                 })
          this.loading = false

    },
    formatParams(params, page) {
      const results = {}
      if (params) {
          let data={
             userId:this.$store.getters.userInfo.user.id,
             userName:this.$store.getters.userInfo.user.name,
             entity:
                    {
                      baoGaoBianHao:params['baoGaoBianHao'],
                      shouLiBuMen:params['shouLiBuMen'],
                      jianCeYuan:params['jianCeYuan'],
                      //jinDu:'待环境检测',    暂时显示
                    },
             pageNo:"1",
             pageSize:"10",
             }


           console.log("{data:"+JSON.stringify(data)+"}")
           return "{data:'"+JSON.stringify(data)+"'}"
      }
      if(page) {
        results.requestPage = {
          'pageNo': page.page || common.PAGE,
          'limit': page.limit || common.LIMIT,
          'offset':parseInt(page.limit)*(parseInt(page.page)-1) || 0
        }
        if (Utils.isNotEmpty(page.totalCount)) {
          results.requestPage['totalCount'] = page.totalCount
        }
      }
      return results
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
      console.log("89",command)
      switch (command) {
        case 'editMe':
        this.dialogFormVisible = !this.dialogFormVisible
        break
        case 'search':// 查询
          this.loadData()
          break
        case 'edit':// 编辑
        this.openType='edit'
        console.log("da",data)
        this.editId = data[0].id
          console.log("88")
        this.readonly = false
        this.dialogFormVisible = true

          break
        case 'remove':// 删除
          // ActionUtils.removeRecord(selection).then((ids) => {
          //   this.handleRemove(ids)
          // }).catch(() => { })
          let data = {}
          let paramWhere = {}
          paramWhere.id_ = selection
          data.tableName = "t_sysjcwtdb"
          data.paramWhere = paramWhere
          let this_ = this
          this_.loading = true
          curdPost('delete',data).then(response => {
             this_.listData=[]
             this.loadData()
             this_.loading = false
          })
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
