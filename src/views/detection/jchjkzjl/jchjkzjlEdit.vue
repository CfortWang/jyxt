<template>
   <div>
        <!--顶部按钮 请根据实际添加-->
       <div class="dynamic-form">

          <!--表头-->
          <div class="form-header">
             <div class="title" >环境控制（光谱）或者 尺寸类检测 待考虑实现</div><!--class="ibps-tc"-->
       </div>
         <el-form
           ref="form"
           :model="models"
           :rules="rules"
           :inline="inline"
           :label-suffix="labelSuffix"
           :label-width="labelWidth"
           :label-position="labelPosition"
           :status-icon="statusIcon"
           :size="size"
           :hide-required-asterisk="hideRequiredAsterisk"
           @submit.native.prevent
         >

         <el-form-item
         label=""
         label-width="0"
         prop="hjsbtjjlnr">
       <div class="dynamic-form-table">

         <div class="dynamic-form-table__block panel panel-info">
           <div class="panel-heading ibps-clearfix">
             <!--块模式：工具栏-->
             <div class="ibps-fl dynamic-form-table__label">

             </div>

         </div>
           <!--块模式：表单-->
           <div class="panel-body">

         <el-form-item
         label="参数要求　　　　"

         prop="huanJingTiaoJian"><el-input
         v-model="models.huanJingTiaoJian"
         placeholder="请输入"
         type="text"
         name="huanJingTiaoJian"
         :autosize="autosize"
         :rows="3"
         :readonly="readonly"
         clearable
         :style="{width:width}"
       />
         </el-form-item>

         <el-row
           :gutter="0"
           justify="start"
           align="top"
           class="widget-col"
           type="flex"
         >
         <el-col :span="12">

         <el-form-item
         label="部门　　　　　　"

         prop="jiLuWeiZhi">
         <ibps-user-selector
           v-model="models.jiLuWeiZhi"
           placeholder="请选择"
           type="org"

           :multiple="false"
           store="id"
           :disabled="true"
           :readonly-text="readonlyText?'text':null"
           :style="{width:width}"
         />

         </el-form-item>

         <el-form-item
         label="监控日期　　　　"

         prop="huanJingRiQi"><el-date-picker
           v-model="models.huanJingRiQi"
           type="date"
           value-format="yyyy-MM-dd"
           format="yyyy-MM-dd"
           placeholder="请选择"
           :style="{width:width}"
           :readonly="readonly"
           :clearable="true"
         />
         </el-form-item>

         <el-form-item
         label="检测位置　　　　"

         prop="jianCeWeiZhi"><el-input
         v-model="models.jianCeWeiZhi"
         placeholder="请输入"
         type="text"
         name="jianCeWeiZhi"
         :autosize="autosize"
         :rows="3"
         :readonly="readonly"
         clearable
         :style="{width:width}"
       />
         </el-form-item>

         <el-form-item
         label="检测前室内温度℃"

         prop="jianCeQianWenDu"><el-input
         v-model="models.jianCeQianWenDu"
         placeholder="请输入"
         type="text"
         name="jianCeQianWenDu"
         :autosize="autosize"
         :rows="3"
         :readonly="readonly"
         clearable
         :style="{width:width}"
       />
         </el-form-item>

         <el-form-item
         label="检测后室内温度℃"

         prop="jianCeHouWenDu"><el-input
         v-model="models.jianCeHouWenDu"
         placeholder="请输入"
         type="text"
         name="jianCeHouWenDu"
         :autosize="autosize"
         :rows="3"
         :readonly="readonly"
         clearable
         :style="{width:width}"
       />
         </el-form-item>

         <el-form-item
         label="开始时间　　　　"

         prop="kaiShiShiJian"><el-date-picker
           v-model="models.kaiShiShiJian"
           type="datetime"
           value-format="yyyy-MM-dd HH:mm:ss"
           format="yyyy-MM-dd HH:mm:ss"
           placeholder="请选择"
           :style="{width:width}"
           :readonly="readonly"
           :clearable="true"
         />
         </el-form-item>

           </el-col>
           <el-col :span="12">

         <el-form-item
         label="委托单号"

         prop="weiTuoDanHao"><el-input
         v-model="models.weiTuoDanHao"
         placeholder="请输入"
         type="text"
         name="weiTuoDanHao"
         :autosize="autosize"
         :rows="3"
         :readonly="readonly"
         clearable
         :style="{width:width}"
       />
         </el-form-item>

         <el-form-item
         label="检测项目"

         prop="jianCeXiangMu">
         <ibps-link-data
           v-model="models.jianCeXiangMu"
           template-key="jclxzlyx"
           placeholder="请选择"
           :disabled="readonly"
           :readonly="readonly"
           :readonly-text="readonlyText?'text':'original'"
           :style="{width:width}"
         />

         </el-form-item>

         <el-form-item
         label="监控时间"

         prop="jianKongShiJian">
           <el-time-picker
             v-model="models.jianKongShiJian"
             value-format="HH:mm"
             format="HH:mm"
             placeholder="请选择"
             :style="{width:width}"
             :readonly="readonly"
             :clearable="true"
           />
         </el-form-item>

         <el-form-item
         label="监控人　"

         prop="jiLuRen">
         <ibps-user-selector
           v-model="models.jiLuRen"
           placeholder="请选择"
           type="user"

           :multiple="false"
           store="id"
           :disabled="readonly"
           :readonly-text="readonlyText?'text':null"
           :style="{width:width}"
         />

         </el-form-item>

         <el-form-item
         label="湿度%RH"

         prop="shiDu"><el-input
         v-model="models.shiDu"
         placeholder="请输入"
         type="text"
         name="shiDu"
         :autosize="autosize"
         :rows="3"
         :readonly="readonly"
         clearable
         :style="{width:width}"
       />
         </el-form-item>

         <el-form-item
         label="结束时间"

         prop="jieShuShiJian"><el-date-picker
           v-model="models.jieShuShiJian"
           type="datetime"
           value-format="yyyy-MM-dd HH:mm:ss"
           format="yyyy-MM-dd HH:mm:ss"
           placeholder="请选择"
           :style="{width:width}"
           :readonly="readonly"
           :clearable="true"
         />
         </el-form-item>

           </el-col>
           <el-col :span="8">

           </el-col>

         </el-row>

                   </div>
                     </div>
                   </div>
         </el-form-item>

         <el-form-item
         label="　查阅　　　　　　"

         prop="hyperlink_0gr5l12">
         <ibps-link
           text="环境记录"
           link="resolve([{
    event:"afterSubmit",
    logic:`resolve({openType:'dialog',
       url:"${options.reportPash.replace("show","pdf")}05设施和环境条件控制程序/SGJS-CX-05-02A 环境设备条件记录表.rpx&id_=${options.formData.models.hjsbtjjlnr[0].huanJingRiQi.substring(0,7)}&id2_=${options.formData.models.hjsbtjjlnr[0].jianCeWeiZhi}"});`
   }])"
           show-type="button"
           text-type="fixed"
           link-type="javascript"
           text-javascript=""
           type="primary"
           :form-data="dynamicForm"
           preview-entrance
           icon=""
         />

         </el-form-item>

         <el-row
           :gutter="0"
           justify="start"
           align="top"
           class="widget-col"
           type="flex"
         >
         <el-col :span="18">

         <el-form-item
         label="　备注　　　　　　"

         prop="approval_opinion_11e2b5k">
         </el-form-item>

         <el-form-item
         label="　数据校验　　　　"

         prop="approval_opinion_0808gb1">
         </el-form-item>

         <el-form-item
         label="　报告审核　　　　"

         prop="approval_opinion_0aowye2">
         </el-form-item>

         <el-form-item
         label="　报告审批　　　　"

         prop="approval_opinion_1jc26ei">
         </el-form-item>

           </el-col>

         </el-row>


           <el-form-item>
             <ibps-toolbar
               ref="toolbar"
               :actions="actions"
               @action-event="handleButtonEvent"
             />
           </el-form-item>

         </el-form>
       </div>
     </div>
</template>

<script>

import IbpsLinkData from '@/business/platform/data/templaterender/link-data'
import IbpsSignature from '@/business/platform/form/formrender/dynamic-form/components/signature'
import { getNextIdByAlias } from '@/api/platform/system/identity'
import edit from '@/components/jbd-edit'
// import { saveData,updateData,get } from '@/api/detection/jcwtd.js'

export default{
  components:{
    'ibps-link-data': IbpsLinkData,
    'ibps-signature': IbpsSignature,
     getNextIdByAlias,
     edit
  },
    props:{
      visible:Boolean,
      title:String,
      id:String,
      readonly:Boolean,
      openType:String
    },
    data() {
      return {
        width:'380px',
        widthOneCol:'1030px',
        readonlyText:true,
        autosize:'',
        models:{ccljl:[{id:'',xuHao:''}],
          id:"",
          weiTuoFang:"",
          xiangXiDiZhi:"",
          lianXiBuMenLi:"",
          dianHua:"",
          xiangMuMingChe:"",
          xiangMuLeiBie:"",
          weiTuoNeiRong:"",
          yaoQiuWanCheng:"",
          jianCeYuan:"",
          xiaoYanYuan:"",
          shiFouLiuYang:"",
          shiFouTongYiF:"",
          yangPinBianHao:"",
          yangPinMingCheng:"",
          guiGeXingHao:"",
          shuLiang:"",
          shengChanRiQiPiHa:"",
          shiFouGuoShen:""
        },
        formName: 'form',
        defaultForm: {},
        defaulRules: {},
        form: {
          id: ''
        },
        toolbars: [
          { key: 'save', hidden: () => { return this.readonly } },
        ],
        rules: { //参数验证
          // id: [{ required: true, message: this.$t('validate.required') }, { validator: validateKey, trigger: 'blur' }],
        },
      }
    },
    created() {
      if(this.openType=='add'){
        this.init()
        this.toolbars.push( { key: 'cancel' })
      }else if(this.openType=='edit'){
        this.models.id=this.id
        get({id:this.id}).then(response => {
            let dbData = response.data
            Object.assign(this.models,dbData)
            this.models.id=dbData.weiTuoDanHao
        })
        this.toolbars.push( { key: 'cancel' })
      }
    },
    methods:{
      saveMe(){
        if(this.openType=='add'){
          saveData(this.models)
          this.$message("新增成功！")
        }else if(this.openType=='edit'){
          updateData(this.models)
          this.$message("修改成功！")
        }
      },
      init(){
        getNextIdByAlias({
          alias:"gzyrwtbh"
        }).then(response => {
          let result = response.data
          this.models.id=result
        }).catch((e) => {console.log(e)})
      },
      /* 按钮事件回调*/
      handleActionEvent({ key }) {
        switch (key) {
          case 'save':
            this.saveMe();
            break
            case 'add':
                      console.info('新增')
                      // 为表格增加数据
                      if(!(this.models.ccljl && Array.isArray(this.models.ccljl))){
                        this.models.ccljl = []
                      }
                      this.models.ccljl.push({
                        id:'',
                        xuHao:'',
                        jianCeXiangMu:'',
                        danWei:'',
                        jianCeJieGuo:''
                      })
                    break
          case 'cancel':
            this.closeDialog()
            break
          default:
            break
        }
      },
      // 取消按钮 , 调用父组件关闭当前对话框，同时刷新当前表单页
      closeDialog() {
        this.$emit('close', false)
        this.$refs[this.formName].resetFields()
      },
      /**
       * 获取表单数据
       */
      getFormData() {
        // 1、权限校验， 如必填  等
        if (this.readonly) {
          this.rules = {}
        } else {
          this.rules = this.defaulRules
        }
        // 2、是否清空表单原内容
        if (this.$utils.isEmpty(this.formId)) {
          // 重置表单
          this.form = JSON.parse(JSON.stringify(this.defaultForm))
          this.formValidate()
          return
        }

        //3、获取传入的表单

      },
      /**
       * 表单验证
       */
      formValidate() {
        if (this.readonly) return
        this.$nextTick(() => {
          this.$refs[this.formName].validate(() => {})
        })
      }

    }

  }

</script>

<style  lang="scss">
  .jbd-title-cont{
    text-align: center;
    font-weight: bold;
    background-color: #FFFFFF !important;
    width: 100;
    font-size: 18px;
    }
    .form-header {
      border-bottom: 1px solid #2b34410d;
      margin-bottom: 5px;
      .title {
        font-weight: bold;
        font-size:22px;
        font-family: SimHei;
        color: #222;
        text-align: center;
        padding: 8px 10px 10px;
        margin: 0;
      }
    }

    .dynamic-form {
      .el-input{
        width: 100%;
      }
      .el-select{
        width: 100%;
      }

      .el-collapse-item__header.is-active{
        border-bottom: 1px solid #EBEEF5;
        margin-bottom: 5px;
      }
      .form-header {
        border-bottom: 1px solid #2b34410d;
        margin-bottom: 5px;
        .title {
          font-size: 16px;
          font-weight: bold;
          color: #222;
          text-align: left;
          padding: 8px 10px 10px;
          margin: 0;
        }
        .desc {
          word-wrap: break-word;
          word-break: normal;
          text-indent: 0;
          line-height: 1.6;
          margin: 0 0 11px;
          padding: 3px 30px 8px;
        }
      }
      .dynamic-form-table-item__readonly{
        margin-bottom: 0;
      }

    //===================border-form====================
      .ibps-border-form {
        border: 1px solid #cfd7e5;

        .el-form-item{
          border-top: 1px solid #cfd7e5;
        }

        .el-form-item__content:before {
          width: 1px;
          background: #cfd7e5;
          display: block;
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom:-20px;
        }

        .el-form-item__content .el-form-item__error {
          left: 5px
        }

        .el-form--label-top .el-form-item__content:before,
        .no-label-form-item .el-form-item__content:before {
          background: transparent
        }

        .el-row+.el-row {
          border-top: 1px solid #cfd7e5
        }

        .el-col+.el-col {
          border-left: 1px solid #cfd7e5
        }

        .el-col {
          overflow: hidden
        }

        .el-form-item__content {
          padding: 5px;
          padding-bottom: 0
        }

        .el-form-item__label {
          padding: 5px
        }

        .el-table{
          .el-form-item{
              border-top: 0;
          }
          .el-form-item__content:before {
            width: 0;
          }
          .el-form-item__content {
            padding: 0;
          }

        }

      }

    }

      .dynamic-form-table{
        .panel-heading{
          border-bottom:0;
          border-left: 1px solid #dde7ee;
          border-right: 1px solid #dde7ee;
        }
        .dynamic-form-table__inner{
          .panel-body{
            padding: 0;
          }
        }
        .dynamic-form-table__block{
          padding-bottom:10px;
          .panel-body{
             border: 0px;
          }
        }
        .el-rate{
          position: relative;
          display: inline-block;
        }
      }
      .is-error{
        .dynamic-form-table{
          border: 1px solid #F56C6C;
        }
      }

      .is-required:not(.is-no-asterisk){
        .dynamic-form-table__label:before {
          content: '*';
          color: #F56C6C;
          margin-right: 4px;
        }
      }

</style>
