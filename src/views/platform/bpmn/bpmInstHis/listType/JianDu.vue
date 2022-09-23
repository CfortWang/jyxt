<template>
  <div>
    <ibps-crud
      ref="crud"
      :style="{ marginLeft: width+'px',minHeight:'500px' }"
      :height="height"
      :data="listData"
      :toolbars="listConfig.toolbars"
      :search-form="listConfig.searchForm"
      :pk-key="pkKey"
      :displayField = "tableTitle"
      :columns="listConfig.columns"
      :row-handle="listConfig.rowHandle"
      :pagination="pagination"
      :loading="loading"
      :index-row="false"
      :selection-row="selection"
      @action-event="handleAction"
      @sort-change="handleSortChange"
      @column-link-click="handleLinkClick"
      @pagination-change="handlePaginationChange"
    >

    <template slot="selectCont" slot-scope="scope">
      <el-popover
        :ref="'popover2-' + scope.row.id"
        placement="bottom"
        width="250"
        popper-class="popverClass"
        trigger="click"
        @show="getReportAndFile(scope.row)"
      >
        <!-- 触发事件 --> <!-- @click="handleAction('detail',null,null,scope.row)"-->
        <div class="div_test el-icon-s-order" slot="reference" >查阅记录</div>
        <!-- 弹框内容 -->
        <div class="div_content">
          <!-- 获取所有输出报告-->
          <div class="content_butts" v-if="currReportCont.report.length>0" v-for="(item, i) in currReportCont.report">
            <span style="cursor: pointer;" @click="clickCont(currReportCont,i)">
             <i class="el-icon-tickets" style="font-size: 18px;"/>
            {{item.split('/')[1].split('.')[0].split(' ')[1]}}
            </span>
            <br>
          </div>

          <div class="content_butts" v-if="currReportCont.file">
           <ibps-attachment v-model="fileId" placeholder="请选择" :download="true" :readonly="true"
             accept="*" :multiple="true" upload-type="attachment" store="id" media-type=""
             media="" style="width:100%;" />
          </div>


        </div>
      </el-popover>
    </template>

    <template slot="bianZhiRenSelector"  slot-scope="scope">
          <ibps-user-selector
             :value="scope.row.bei_jian_du_ren_"
             type="user"
             :multiple="false"
             :disabled="true"
             readonly-text="text"
             @callback="data => formId = data.id"
         />
       </template>


    </ibps-crud>

    <bpmn-formrender
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
  </div>
</template>

<script>
import { queryPageList } from '@/api/platform/bpmn/bpmInstHis'
import ActionUtils from '@/utils/action'
import IbpsTypeTree from '@/business/platform/cat/type/tree'
import FixHeight from '@/mixins/height'
import { searchOptions, resultTypeOptions, statusOptions } from './../constants'
import BpmnFormrender from '@/business/platform/bpmn/form/dialog'
import curdPost from '@/business/platform/form/utils/custom/joinCURD.js' //增删改查规则
import IbpsAttachment from '@/business/platform/file/attachment/selector'
import IbpsUserSelector from '@/business/platform/org/selector'
import GetReport from '../corresponding/getReport.js'
import getCont from '../corresponding/getDataCont.js'
export default {
  components: {
    IbpsTypeTree,
    BpmnFormrender,
    IbpsUserSelector,
   'ibps-attachment': IbpsAttachment
  },
  props:{
    reportAll:Array,
    tableTitle:String,
    typeId:String
  },
  mixins: [FixHeight,getCont,GetReport],
  data() {
    return {
      width: 200,
      dialogFormVisible: false, // 弹窗
      instanceId: '', // 编辑dialog需要使用
      pkKey: 'id', // 主键  如果主键不是pk需要传主键
      srcUrl:'', //报表字段
      fileId:'',//文件字段
      isDisable:false, //判断多次点击
      forClick:'',//判断是否重复点击
      visible:false,
      currReportCont:{},
      title: '',
      loading: true,
      height: document.clientHeight,
      listData: [],
      pagination: {},
      sorts: {},
      jianDu:[],
      listConfig: {
        toolbars: [
          { key: 'search' },
          // { key: 'resetSearch' }
        ],
        searchForm: {
          forms: [
          { prop: 'Q^subject_^SL', label: '关键字:' , width: 125 },
         /*  { prop: 'Q^proc_def_name_^SL', label: '任务名称' }, */
            // {
            //   prop: ['Q^create_Time_^DL', 'Q^create_Time_^DG'],
            //   label: '完成年度:',
            //   fieldType: 'daterange',
            // },
          /*  {
              prop: 'Q^status_^S',
              label: '任务状态',
              fieldType: 'select',
              options: searchOptions
            } */
          ]
        },
        // 表格字段配置
        columns: [
         /* { prop: 'subject', label: '任务标题', link: 'dialog', width: 250 }, */
          { prop: 'tYear', label: '年份', width: 58  },
          { prop: 'tDept', label: '编制部门' , width: 120},
          { prop: 'procDefName', label: '表单名称' },
          { prop: 'bei_jian_du_ren_', label: '实施被监督人' , width: 120,fieldType: 'slot',slotName:"bianZhiRenSelector" },
          { prop: 'tUser', label: '编制人' , width: 80},
          { prop: 'endTime', label: '完成时间', sortable: 'custom', dateFormat: 'yyyy-MM-dd', width:150 },
        ],
        rowHandle: {
          actions: [/* {
            key: 'detail',label:"内容及附件"
          } */],
           effect:'display',
            width:'100'//固定按钮
        }
      }
    }
  },
  created() {
    this.loadData()
    let roleArr = this.$store.getters.userInfo.role
     // console.log(roleArr)
     // for(let i = 0 ; i < roleArr.length; i++){
     //   if(roleArr[i].alias ="xtgljs"){
     //     this.listConfig.toolbars.push({key:'remove'})
     //     return;
     //   }
     // }
  },
  methods: {
      /* 封装表名与条件*/
      packNameWhere(name,where){
        let cont = {}
        cont['tableName'] = name
        cont['paramWhere'] =where
        return cont
      },
     getConfigId(values,cont){
       let wheres =[]
       for(let i in values){
        wheres.push({id_:values[i].bizKey})
       }
       curdPost('selects',this.packNameWhere('t_zljdss',wheres)).then(response => {
         let data = response.variables.data
                 for(let i in data){
                   for(let j in this.jianDu){
                     if(this.jianDu[j].bizKey == data[i].id_) this.jianDu[j].bei_jian_du_ren_ = data[i].bei_jian_du_ren_
                   }
                 }
                 ActionUtils.handleListData(this, cont)
                 this.loading = false
                })
       },
    // 加载数据
    loadData() {
      this.loading = true
      queryPageList(this.getSearcFormData()).then(response => {
       let data = response.data.dataResult

       // console.log('csnz\n',data,'\n')
          for(let i in data){
           let dept,user,tName,tYear
           let arr = this.getParenthesesStr( data[i].subject)
              if(arr.length ==4){ //如果是年度计划， 标题编辑中取年份， 去除默认给与的年份
                data[i]['tYear'] = arr[0]
                data[i]['tDept'] = arr[2]
                data[i]['tUser'] = arr[3]
              }else if(arr.length>1){
                 data[i]['tYear'] = arr[0]
                 data[i]['tDept'] = arr[1]
                 data[i]['tUser'] = arr[2]
               }
               /* 增加表单归类判断 --  监控实施表单*/
               if(data[i].formKey =='jksszbd'){
                    this.jianDu.push(data[i])
               }
          }
          /* 新增*/
          if(this.jianDu.length>0) this.getConfigId(this.jianDu,response.data)
          // else{
          //   ActionUtils.handleListData(this, response.data)
          //   this.loading = false}

          /* -0---------------*/
      }).catch(() => {
        this.loading = false
      })
    },
   getParenthesesStr(text) {
        let result = ''
        if (!text) return result
        let regex = /\((.+?)\)/g;
        let options = text.match(regex)
        if (options) {
            let option = options[0]
            if (option) {
                result = option.substring(1, option.length - 1)
            }
            if(options[1]){
              let yersOption = options[1]
              if (yersOption) {
                  result =result +'/'+ yersOption.substring(1, yersOption.length - 1)
              }
            }
        }
        return result.split('/')
    },
    /**
     * 获取格式化参数
     */
    getSearcFormData() {
        const params = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}

        if (this.$utils.isNotEmpty(this.typeId)) {
          params['Q^TYPE_ID_^S'] = this.typeId
        }
        params['Q^status_^S'] ="end"
       let cont = ActionUtils.formatParams(
          params,
          this.pagination,
          this.sorts)

          cont.parameters.push({
                            "parameters": [
                                {
                                    "parameters": [
                                        {
                                            "key": "Q^proc_Def_Key_^NE",
                                            "value": "Process_08hbmhs",
                                            "param": "name"
                                        }
                                    ]
                                },
                                {
                                    "parameters": [
                                        {
                                            "key": "Q^proc_Def_Key_^NE",
                                            "value": "Process_0xlaidt",
                                            "param": "name1"
                                        }
                                    ]
                                },
                                {
                                    "parameters": [
                                        {
                                            "key": "Q^proc_Def_Key_^NE",
                                            "value": "Process_0ocg0f1",
                                            "param": "name2"
                                        }
                                    ]
                                }
                            ]
                        })
           return cont

    },
    /**
     * 处理分页事件
     */
    handlePaginationChange(page) {
      ActionUtils.setPagination(this.pagination, page)
      this.loadData()
    },
    /**
     * 处理排序
     */
    handleSortChange(sort) {
      ActionUtils.setSorts(this.sorts, sort)
      this.loadData()
    },
    handleLinkClick(data, columns) {
      this.handleEdit(data.id)
    },
    /**
     * 查询
     */
    search() {
      this.loadData()
    },
    /* 防止多次快速查询*/
    numbersClick(){
      this.isDisable = true
          setTimeout(() => {
           this.isDisable = false
          }, 600)
    },
    /**
     * 处理按钮事件
     */
    handleAction(command, position, selection, data) {
      switch (command) {
        case 'search':// 查询
          ActionUtils.setFirstPagination(this.pagination)
          this.search()
          break
        // case 'resetSearch':
        //   this.typeId = ''
        //   this.tableTitle = ''
        //   this.search()
        //   break

        case 'remove':
          let str = ""
           selection.forEach((item,index)=>{
             if(index==0){
               str+=item
             }else{
               str+=","+item
             }
           })
           let data={}
           data['tableName']="ibps_bpm_inst_his"
           data['paramWhere']="{id_:'"+str+"'}"
           let this_ = this
           curdPost('batchDelete',data).then( response => {
               this_.$message({
               message: '删除成功！',
               type: 'warning'
             })
             this.search()
           })
         
             break
       
        case 'detail':// 明细
         ActionUtils.selectedRecord(selection).then((id) => {
          this.handleEdit(id)
            this.title = '信息'
          }).catch(() => { })
          break
        default:
          break
      }
    },

    handleNodeClick(typeId,typeName) {
      this.tableTitle = typeName.name
      this.typeId = typeId
      this.loadData()
    },
    handleExpandCollapse(isExpand) {
      this.width = isExpand ? 230 : 30
    },
    /**
     * 处理编辑
     */
    handleEdit(id = '') {
      this.instanceId = id
      this.dialogFormVisible = true
    }
  }
}
</script>
<style lang="scss" >
.js-custom-dialog{
  .el-dialog__body{
      height:  calc(100vh) !important;
      margin: -9px !important;
      padding: 0px !important;
	  overflow: hidden;
  }
  .el-dialog__header{
    padding: 0px;
  }
  .el-dialog__headerbtn i {
   font-size: 28px;
   font-weight: bold;
   background-color: #FFFFFF;
   border-radius: 8px;
   margin-top: -8px;
  }
}
</style>
<style>
   .main-container .div_test{
     cursor: pointer;
   }
   .main-container .el-popover.popverClass {
     .div_content {
       .content_checkbox {
         .el-checkbox-group {
           display: flex;
           flex-direction: column;
           z-index: 999;
         }
         z-index: 999;
       }
        .content_butts {
          z-index: 999;
             margin-top: 20px;
             display: flex;
             justify-content: flex-end;
             .el-button {
               padding: 7px 14px;
              }
            }
          }

       }
</style>
