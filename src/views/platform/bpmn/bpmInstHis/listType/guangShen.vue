<template>
  <div>
    <ibps-crud
      ref="crud"
      :style="{ marginLeft: width+'px',minHeight:'550px' }"
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

      &nbsp;
      <el-popover
        placement="bottom"
        width="250"
        popper-class="popverClass"
        trigger="click"
        @show="getReportAndFile(scope.row)"
      >
        <!-- 触发事件 --> <!-- @click="handleAction('detail',null,null,scope.row)"-->
        <div class="div_test el-icon-s-order" slot="reference" @click="clickGaiJinXiang(scope.row)">改进项验证材料</div>


        <!-- 弹框内容 不符合项的文件-->
        <div class="div_content">
         <div v-for="(item, i) in options" @click="clickItem(item)">
           <span class="itemStyle" >
            <span class="itemStyle" @click="juTiItem(item.value)">

                      <!-- 第二层 不符合项 前后 -->
                      <el-popover
                        placement="bottom"
                        width="190"
                        popper-class="popverClass"
                        trigger="click"
                        @show="getReportAndFile(scope.row)"
                      >       <!-- 显示不符合项-->
                        <div class="div_test el-icon-s-order" slot="reference" >{{item.label}}</div>


                        <!-- 弹框内容 前后项-->
                        <div class="div_content">
                          <span id="before" class="itemStyle" slot="reference" @click="beforeClick(item)">


<div class="div_test el-icon-s-order" slot="reference" @click="clickConts_GuanLiPingShen(currentGenZongYanZhengXiangId)"> 管理评审改进跟踪验证表</div>


                            <!-- 第三层 不符合项整改前材料 -->
                           <el-popover
                              placement="bottom"
                              width="190"
                              popper-class="popverClass"
                              trigger="click"
                              @show="getReportAndFile(scope.row)"
                            >
                              <div class="div_test el-icon-s-order" slot="reference" >
                                改进前附件
                              </div>

                              <!-- 弹框内容 整改前-->
                              <div class="content_butts" v-if="item.children" >
                                <ibps-attachment v-model="fileId" placeholder="请选择" :download="true" :readonly="true"
                                  accept="*" :multiple="true" upload-type="attachment" store="id" media-type=""
                                  media="" style="width:100%;" />
                               </div>

                            </el-popover>
                            </span>



                          <br>
                          <span id="after" class="itemStyle" @click="afterClick(item)">

                            <!-- 第三层 不符合项整改后材料 -->
                            <el-popover
                              placement="bottom"
                              width="190"
                              popper-class="popverClass"
                              trigger="click"
                              @show="getReportAndFile(scope.row)"
                            >
                              <div class="div_test el-icon-s-order" slot="reference" @click="clickItem(item)">改进后附件</div>
                              <!-- 弹框内容 整改前-->
                             <div class="content_butts" v-if="item.children">
                               <ibps-attachment v-model="fileId" placeholder="请选择" :download="true" :readonly="true"
                                 accept="*" :multiple="true" upload-type="attachment" store="id" media-type=""
                                 media="" style="width:100%;" />
                              </div>
                            </el-popover>


                          </span>
                        </div>
                      </el-popover>
            </span>
          </span>
         </div>
        </div>

      </el-popover>

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
import IbpsCustomDialog from '@/business/platform/data/templaterender/custom-dialog'
import getCont from '../corresponding/getDataCont.js'
import GetReport from '../corresponding/getReport.js'
export default {
  components: {
    IbpsTypeTree,
    BpmnFormrender,
    IbpsCustomDialog,
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
      currentGenZongYanZhengXiangId:'',
      title: '',
      loading: true,
      height: document.clientHeight,
      listData: [],
      pagination: {},
      sorts: {},
      internalAudit:[],
      gaiJinXiang:[],
      responseData:"",
      dataConfig:{
        gshyjybfjps : {t_gshyjyb:[] }  ,            //附加管审测试
        Gglps       : {t_Gglpsjhx:[] } ,            //管理评审、年度管理评审计划表、年度管理评审计划

      },
      listConfig: {
        toolbars: [
          { key: 'search' },
        ],
        searchForm: {
          forms: [
           { prop: 'Q^subject_^SL', label: '关键字:' , width: 125 },
          ]
        },
        // 表格字段配置
        columns: [
         /* { prop: 'subject', label: '任务标题', link: 'dialog', width: 250 }, */
          { prop: 'tYear', label: '年份', width: 58  },
          { prop: 'tDept', label: '部门' , width: 80},
          { prop: 'procDefName', label: '表单名称' ,width:150},
          // { prop: 'name', label: '编制人' , width: 120 },
          { prop: 'tUser', label: '编制人' , width: 80},
          { prop: 'endTime', label: '管理评审日期', sortable: 'custom', dateFormat: 'yyyy-MM-dd', width:150 },
        ],
        rowHandle: {
          actions: [/* {
            key: 'detail',label:"内容及附件"
          } */],
           effect:'display',
            width:'300'//固定按钮
        }
      },
      // 不符合项内容
      options: []
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
       let data = response.data.dataResult
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
               /* 增加表单归类判断 -- */
               let reData = this.dataConfig[data[i].formKey]
               if(reData){
                  reData[Object.keys(reData)[0]].push({id_:data[i].bizKey})
               }
          }
          /* 新增*/
        this.getConfigId(this.dataConfig,response.data)
          /* -0---------------*/
      }).catch(() => {
        this.loading = false
      })
    },
    clickGaiJinXiang(value){
      if(value.formKey =='gshyjybfjps'){       // 附加管审测试、管审评审（附件评审）      //根据 id找到所有的不符合项   并存储  在列表页面循环渲染
        this.getGaiJinXiangById('t_glpsjhb',value.bizKey)
      }else{  //管理评审、年度管理评审计划表、年度管理评审计划
          this.getGaiJinXiangById('t_glpsjhb',value.bizKey)
       }
    },
    clickItem(item){
      // console.log(item)
    },
    // 点击 改进前附件 进行查询
    beforeClick(item){
      this.fileId = ''
      var ItemId = item.children[0].value
      let sql = `select gai_jin_qian_jian from t_glpsjhb where id_ = ` +`'` +ItemId +`'`+` and shi_fou_guo_shen_ = 1`
      //let sql = `select gai_jin_qian_jian from t_glpsjhb where zong_wai_jian_ = ` +`'` +ItemId +`'`+` and shi_fou_guo_shen_ = 1`
      curdPost('sql',sql).then( response => {
        if(response.variables.data[0] != null){
         var qianId = response.variables.data[0].gai_jin_qian_jian
         var qianIdList = qianId.split(',')
         for(var i = 0; i < this.options.length; i++){
          if(ItemId == this.options[i].value){
            this.options[i].children[0].children = []
              this.fileId = qianId
            for(var j = 0; j < qianIdList.length; j++){
              this.options[i].children[0].children.push({
                value: qianIdList[j],
                label: '改进前材料 ^ '+qianIdList[j]
              })

            }
          }
        }
        }
      })
        // console.log('点击 改进前附件 进行查询',item ,'文件id为：',this.fileId)
    },
    afterClick(item){
      this.fileId = ''
      var ItemId = item.children[1].value
      let sql = `select fu_jian_ from t_glpsjhb where id_ = `+`'` + ItemId +`'`+ ` and shi_fou_guo_shen_ = 1`
      curdPost('sql',sql).then( response => {
        if(response.variables.data[0] != null){
         var qianId = response.variables.data[0].fu_jian_
         var qianIdList = qianId.split(',')
         for(var i = 0; i < this.options.length; i++){
           if(ItemId == this.options[i].value){
             this.options[i].children[1].children = []
              this.fileId = qianId
             for(var j = 0; j < qianIdList.length; j++){
               this.options[i].children[1].children.push({
                 value: qianIdList[j],
                 label: '改进后附件 ^ '+qianIdList[j]
               })

             }
           }
        }
        }
      })
        // console.log(item)
    },
    /*点击具体的哪个 不符合项 显示 修改前后标签*/
    juTiItem(value){
      // console.log(value)
      this.currentGenZongYanZhengXiangId = value
      for(var i = 0; i < this.options.length; i++){
        if(value == this.options[i].value){
          this.options[i].children = [
								{
                  value: value,
                  label: '改进前附件'
                },
								{
                  value: value,
                  label: '改进后附件'
                }
							]
        }
      }
    },

    // 获取 指定id 表单的 改进项
    getGaiJinXiangById(databaseName,id){
       this.options = []
      // console.log(databaseName,id)
       let sql = `select * from `+databaseName+` where zong_wai_jian_ =`+`'`+id +`'`+ `and shi_fou_guo_shen_ = 1`
       // console.log(sql)
       curdPost('sql',sql).then( response => {
          this.gaiJinXiang = response.variables.data
          // console.log(this.gaiJinXiang)
          // 拿 编号 拼接 '改进项' 作为结果封装进列表对象
          for(var i = 0; i < this.gaiJinXiang.length; i++){
            this.options.push({'value':this.gaiJinXiang[i].id_,label:' 改进项 ' + this.gaiJinXiang[i].bian_hao_})
         // console.log(response.variables.data)
          }
          // console.log(this.options)
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
    /* 投诉人*/
    gshyjybfjps(cont,data){
      // console.log(cont)
       // for(let i in data){
       //  if(data[i].bizKey ==cont.id_) data[i]["name"] = cont.complainants_
       // }
     },
     Gglps(cont,data){
       // console.log(cont)
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
