<template>
  <div class="main-container">
    <ibps-crud
      ref="crud"
      :style="{ marginLeft: width+'px',minHeight:'550px' }"
      :height="height"
      :data="listData"
      :toolbars="listConfig.toolbars"
      :search-form="listConfig.searchForm"
      :pk-key="pkKey"
      :displayField="Title"
      :columns="listConfig.columns"
      :row-handle="listConfig.rowHandle"
      :pagination="pagination"
      :loading="loading"
      :index-row="false"
      @action-event="handleAction"
      @sort-change="handleSortChange"
      @pagination-change="handlePaginationChange"
    >
    <template slot="selectCont" slot-scope="scope">
      <div class="el-icon-refresh" style="color:#67C23A" @click="jiLu(scope.row)" >记录</div>
    </template>
    </ibps-crud>

    <hjkzcc
        v-if="dialogFormVisible_chiCun"
        :id="editId"
        :title="title"
        :visible="dialogFormVisible_chiCun"
        :readonly="readonly"
        :openType="openType"
        @callback="search"
        @close="visible => dialogFormVisible_chiCun = visible"
      />

      <hjkzgp
        v-if="dialogFormVisible_guangPu"
        :id="editId"
        :title="title"
        :visible="dialogFormVisible_guangPu"
        :readonly="readonly"
        :openType="openType"
        @callback="search"
        @close="visible => dialogFormVisible_guangPu = visible"
      />


  </div>
</template>

<script>
import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
import {validateRequired} from '@/utils/validate' //参数校验
import IbpsUserSelector from '@/business/platform/org/selector' //用户 /组织 / 岗位选择框
import IbpsAttachment from '@/business/platform/file/attachment/selector' //文件选择框
import relevanceTable from '@/business/platform/form/formrender/dynamic-form/mixins/relevanceTable' //表头懒加载
import getDbCol from '@/business/platform/form/utils/custom/getDbCol.js' //字段映射
import { formatDate } from "@/utils/date.js"; //转换日期格式
// import Edit from './jchjkzjlEdit.vue'
import hjkzgp from './hjkzgpEdit.vue' // 光谱页面
import hjkzcc from './hjkzccEdit.vue'
import { searchOptions,jianCeWeiZhiOptions} from './index'


import { query,remove,removeMulti } from '@/api/detection/universalCRUD.js' // 封装的通用CRUD文件
import common from '@/constants/common.js'

export default{
  components: {
     hjkzcc,
     hjkzgp
   },
  data(){
    return {
      dialogFormVisible_chiCun: false, // 弹窗
      dialogFormVisible_guangPu: false,
      apiGrantVisible: false,
      editId: '', // 编辑dialog需要使用
      readonly: false, // 是否只读
      pkKey: 'id', // 主键  如果主键不是pk需要传主键
      Title: '检测环境控制记录列表',
      srcUrl:'',
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
             {
               prop: 'jianKongShiJian',
               label: '监控时间',
               fieldType: 'date',
               labelWidth:-50,
              },
             {
                  prop: 'buMen',
                  label: '部门',
                  fieldType: 'select',
                  options: searchOptions,
                  labelWidth:-5
              },
              {
                  prop: 'jianCeWeiZhi',
                  label: '检测位置',
                  fieldType: 'select',
                  options: jianCeWeiZhiOptions,
                  labelWidth:-5
              }
          ]
        },
        // 表格字段配置
        columns: [
          {prop: 'id',label:'主键',hidden:'false'},
           { prop: 'shouLiBuMen', label: '部门', width:'120px'}
          ,{ prop: 'weiTuoDanHao', label: '委托单号' , width:'160px'}
          ,{ prop: 'jianCeYuan', label: '监控人', width:'120px' }
          ,{ prop: 'jinDu', label: '委托状态', width:'90px' }
          ,{ prop: 'jianCeLeiBie', label: '检测项目' }
        ],
        rowHandle: {
          actions: [],
          effect:'display',
          columnHeader:'环境监控',
           width:'100'//固定按钮
        }
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
      jiLu(value){
        console.log(value)

        if(value.xiangMuLeiBie == '尺寸和形位公差测量'){
            this.openType='edit'  // 备注作用
            this.editId = value.id
            // this.readonly = true
            this.dialogFormVisible_chiCun = true
            this.title = '环境控制（尺寸）'
        }else if(value.xiangMuLeiBie == '元素成分测定'){
            this.openType='edit'  // 备注作用
            this.editId = value.id
            // this.readonly = true
            this.dialogFormVisible_guangPu = true
            this.title = '环境控制（光谱）'
        }

      },
      formatParams(params, page) {
        const results = {}
        if (params) {
          console.log(params)
          let time = params['jianKongShiJian']
          var date = new Date(time)
          console.log(formatDate(date, "yyyy-MM-dd HH:mm:ss"))
          // return formatDate(date, "yyyy-MM-dd")
          // console.log(a)
            let data={
               userId:this.$store.getters.userInfo.user.id,
               userName:this.$store.getters.userInfo.user.name,
               entity:
                      {
                        huanJingJianCeShi:params['jianKongShiJian'] == null ? params['jianKongShiJian'] : formatDate(date, "yyyy-MM-dd"),
                        // huanJingJianCeShi:params['jianKongShiJian'],
                        shouLiBuMen:params['buMen'],
                        jianCeWeiZhi:params['jianCeWeiZhi'],
                        jinDu:'待环境检测',
                      },
               
               pageNo:page.page,
               pageSize:page.limit,
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
          if (Utils.isNotEmpty(page.totalCount)) { // mock 数据时候要传
            results.requestPage['totalCount'] = page.totalCount
          }
        }
        return results
      },


    // 加载数据
    loadData() {
     let this_ = this;
     const params = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}
               query('sysjcwtdb','selects',this.formatParams(params,this.pagination)).then(response => {
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

    /**
     * 获取格式化参数
     */
    getSearcFormData() {
      return ActionUtils.formatParams(
        this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {},
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
          this.title = '添加t_sysjcwtdb'
          break
        case 'edit':// 编辑
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id)
            this.title = '编辑t_sysjcwtdb'
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
      remove('数据库表名',{ ids: ids }).then(response => {
        ActionUtils.removeSuccessMessage()
        this.search()
      }).catch(() => {})
    },
    handleDeal(ids) {
      // 办理
      remove('数据库表名',{ ids: ids }).then(response => {
        ActionUtils.removeSuccessMessage()
        this.search()
      }).catch(() => {})
    }
  }
}
</script>
