、<template>
  <div class="main-container">
    <ibps-crud
      ref="crud"
      :style="{ marginLeft: width+'px',minHeight:'550px' }"
      :height="height"
      :data="listData"
      :toolbars="listConfig.toolbars"
      :search-form="listConfig.searchForm"
      :pk-key="pkKey"
      :displayField = "title"
      :index-row="false"
      :columns="listConfig.columns"
      :row-handle="listConfig.rowHandle"
      :pagination="pagination"
      :loading="loading"
      @action-event="handleAction"
      @sort-change="handleSortChange"
      @pagination-change="handlePaginationChange"
    >
    <template slot="selectCont" slot-scope="scope">
      <div class="el-icon-refresh" style="color:#67C23A" @click="demo(scope.row)" >校验</div>
    </template>
    </ibps-crud>
    <jiaoYan
          v-if="dialogFormVisible"
          :id="editId"
          :title="title"
          :visible="dialogFormVisible"
          :readonly="readonly"
          :openType="openType"
          @callback="search"
          @close="visible => dialogFormVisible = visible"
        />

   <!-- <bpmn-formrender
      :visible="dialogFormVisible"
      :instance-id="instanceId"
      @close="visible => dialogFormVisible = visible"
    />
        <el-dialog
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :top="'3vh'"
          :width="'90%'"
          class="js-custom-dialog"
          append-to-body
          :fullscreen="false"
          :visible.sync="visible"
        >
            <iframe
              :src="srcUrl"
              :height="'100%'"
              :width="'100%'"
              frameborder="0"
              scrolling="no"
            />
        </el-dialog>
   <jiaoYan
    v-if="demoValue"
    :demo ="demoValue"
    title = "校验"
    @close="val => demoValue = val"/> -->


  </div>
</template>

<script>
import { queryPageList, remove } from '@/api/detection/jcwtd'
import {validateRequired} from '@/utils/validate' //参数校验
import IbpsUserSelector from '@/business/platform/org/selector' //用户 /组织 / 岗位选择框
import IbpsAttachment from '@/business/platform/file/attachment/selector' //文件选择框
import relevanceTable from '@/business/platform/form/formrender/dynamic-form/mixins/relevanceTable' //表头懒加载
import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
import getDbCol from '@/business/platform/form/utils/custom/getDbCol.js'

import {query,selectById} from '@/api/detection/universalCRUD.js'
import jiaoYan from './cjshEdit.vue'
import { searchOptions} from '@/views/detection/jchjkzjl/index.js'
export default{
  components: {
    jiaoYan
   },
  data(){
    return {
      dialogFormVisible: false, // 弹窗
      apiGrantVisible: false,
      editId: '', // 编辑dialog需要使用
      readonly: false, // 是否只读
      pkKey: 'id', // 主键  如果主键不是pk需要传主键
      title: '数据校验列表',
      //openType:'',
      srcUrl:'',
     // demoValue: false,
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
        ],
        searchForm: {
          forms: [
             { prop: 'shouLiBuMen', label: '部门', fieldType: 'select',options: searchOptions, }
             ,{ prop: 'weiTuoDanHao', label: '委托单号' }
          ]
        },
        // 表格字段配置
        columns: [
          { prop : 'id',hidden:'false'}
          ,{ prop: 'shouLiBuMen', label: '部门' }
          ,{ prop: 'weiTuoDanHao', label: '委托单号' }
           ,{ prop: 'jinDu', label: '进度', width:'100px' }
          ,{ prop: 'xiangMuMingChe', label: '项目名称' }
          ,{ prop: 'jianCeYuan', label: '检测员' }
          ,{ prop: 'xiaoYanYuan', label: '校验员' }
          ,{ prop: 'jianCeKaiShiS', label: '检测开始时间' }
          ,{ prop: 'jianCeWanCheng', label: '检测完成时间' }
        ],
        rowHandle: {
           actions: [
           ],
          effect:'display',
          columnHeader:'检测数据',
          width:'100'
        }
      }
    }
  },
  created() {
    this.loadData()
  },

  methods: {
    // demo(row){
    //  // this.demoValue = !this.demoValue
    //  // this.template.addDataCont=row
    //          this.openType='edit'
    //          this.editId=row.id//weiTuoDanHao
    //          this.dialogFormVisible=true
    //          //alert(this.demoValue)
    //        },
           demo(value){
              let data = {id:value.id}
              let p = "{data:'"+JSON.stringify(data)+"'}"
              console.log(p)
              selectById('sysjcwtdb','selectById',p).then(response => {
                  console.log('555')
                console.log(response)
              })
              // console.log(value)
              // this.demoValue = !this.demoValue
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
                              weiTuoDanHao:params['weiTuoDanHao'],
                              shouLiBuMen:params['shouLiBuMen'],
                               jinDu:'待数据审核',
                              //jinDu:'在检',   记得还原
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

    // 加载数据
    // loadData() {
    //   this.loading = true
    //   // queryPageList(this.getSearcFormData()).then(response => {
    //   //   ActionUtils.handleListData(this, response.data)
    //   //   this.loading = false
    //   // }).catch(() => {
    //   //   this.loading = false
    //   // })
    //   let re = getDbCol('932932131464675328',this.listConfig.columns);
    //   let this_ = this
    //   re.then((r) => {
    //     let sql = "select "+r+" from t_sysjcwtdb"
    //     curdPost('sql',sql).then(response => {
    //        this_.listData=[]
    //        let dbData = response.variables.data
    //        dbData.forEach(function(e){
    //        this_.listData.push(e)
    //      })
    //      this_.loading = false
    //    })
    //   })
    // },
    // /**
    //  * 获取格式化参数
    //  */
    // getSearcFormData() {
    //   return ActionUtils.formatParams(
    //     this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {},
    //     this.pagination,
    //     this.sorts)
    // },
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
          this.title = '添加t_sysjcwtdb'
          break
        case 'edit':// 编辑
        this.openType='edit'
        this.editId = data[0].id
        this.readonly = false
        this.dialogFormVisible = true



          // ActionUtils.selectedRecord(selection).then((id) => {
          //   this.handleEdit(id)
          //   this.title = '编辑t_sysjcwtdb'
          // }).catch(() => { })
          break
        case 'print':// 办理
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleDeal(id, true)
            this.title = '办理'
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
      // this.editId = id
      // this.readonly = readonly
      // this.dialogFormVisible = true
      this.openType='edit'
      this.editId = data[0].id
      this.readonly = false
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
    },
    handleDeal (ids) {
      // 办理
      remove({ ids: ids }).then(response => {
        ActionUtils.removeSuccessMessage()
        this.search()
      }).catch(() => {})
    }
  }
}
</script>
