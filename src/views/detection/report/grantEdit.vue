<template>
  <edit :visible='visible'>
    <template v-slot:form>
      <!-- 表头按钮-->
      <div class="form-toolbar hidden-print">
        <div class="ibps-toolbar">
          <div class="header" style="height: 30px;">
            <div class="buttons" style="float: right;margin-right:8%;">
              <el-button type="primary" icon="ibps-icon-lastfm" @click="sendBack()">退回</el-button>
            <el-button type="primary" icon="ibps-icon-send" @click="confirmSubmit()">提 交</el-button>
     <!--         <ibps-toolbar ref="toolbar" :actions="toolbars" @action-event="handleActionEvent" /> -->
          <el-button icon="el-icon-circle-close" type="danger" @click="closeDialog()">取 消</el-button>

            </div>
          </div>
        </div>
      </div>
         <!-- 标题 -->
 <div class="form-header">
        <div class="title ibps-tc">尺寸检测报告发放
        </div>
      </div>
      <div class="dynamic-form">

        <!--表头-->
        <el-form ref="form" v-loading="!visible" :rules="rules" :element-loading-text="$t('common.loading')"
          :model="form" label-width="180px">



      <el-row
        :gutter="0"
        justify="start"
        align="top"
        class="widget-col"
        type="flex"
      >
      <el-col :span="8">

      <el-form-item
      label="报告编号："

      prop="baoGaoBianHao"><el-input
      v-model="models.baoGaoBianHao"
      placeholder="请输入"
      type="text"
      name="baoGaoBianHao"
      :autosize="autosize"
      :rows="3"
      :readonly="readonly"
      clearable
      :style="{width:width}"
    />
      </el-form-item>

  <!--    <el-form-item
      label="委托单号："

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
      </el-form-item> -->

        </el-col>
        <el-col :span="8">

      <el-form-item
      label="委托部门"

      prop="weiTuoBuMen">
    <el-select
      v-model="models.weiTuoBuMen"
      placeholder="请选择"
      name="weiTuoBuMen"
      :style="{width:width}"
      clearable
    >

        <el-option
          key="1"
          label="选项一"
          value="1"
        />
        <el-option
          key="2"
          label="选项二"
          value="2"
        />

    </el-select>
      </el-form-item>

        </el-col>
        <el-col :span="8">

        </el-col>

      </el-row>


















          <el-form-item
            label="主键"
            prop="id"><el-input
            v-model="models.id"
            placeholder="请输入"
            type="text"
            name="id"
            :autosize="autosize"
            :rows="3"
            :readonly="readonly"
            clearable
            :style="{width:width}"
          />
            </el-form-item>



           <!-- <el-form-item
            label="委托id"
            prop="weiTuoId"><el-input
            v-model="models.jcwt.id"
            placeholder="请输入"
            type="text"
            name="weiTuoId"
            :autosize="autosize"
            :rows="3"
            :readonly="readonly"
            clearable
            :style="{width:width}"
          />
            </el-form-item> -->







          <el-form-item label="">
            报告下载打印：
            <div style="height: 800px">
              <iframe
                   :src="getImgUrl(rqBaobiao)"
                :height="'100%'" :width="'90%'" frameborder="0" scrolling="no" />
            </div>
          </el-form-item>

            <el-form-item
                 label="快照开关"

                 prop="kuaiZhaoKaiGuan">
                   <el-switch
                     v-model="models.kuaiZhaoKaiGuan"
                     :width="width"
                     active-value="Y"
                     inactive-value="N"
                     active-text="盖章"
                     inactive-text="不盖章"
                     active-color=""
                     inactive-color=""

                   />
                 </el-form-item>

                 <el-form-item
                 label="发放盖章报告电子版上传"

                 prop="fuJian">
                 <ibps-attachment
                   v-model="models.fuJian"
                   placeholder="请选择"
                   :download="true"



                   accept="*"
                   :multiple="true"
                   upload-type="attachment"
                   store="id"
                   media-type=""
                   media=""
                   :style="{width:width}"
                 />

                 </el-form-item>




                <el-form-item
                label="取报告人签名"

                prop="quBaoGaoRenQianMi">
                <ibps-signature
                  v-model="models.quBaoGaoRenQianMi"
                  placeholder="请在这里输入您的签名"

                  :style="{width:width}"
                />

                </el-form-item>

          <el-form-item
            label="报告发放备注"
              prop="boHuiYuanYin">
              <el-input
            v-model="models.boHuiYuanYin"
            placeholder="请输入"
            type="textarea"
            name="kaoHeYiJian"
            :autosize="autosize"
            :rows="3"
            clearable
            :style="{width:width}"
          />
            </el-form-item>


        <el-form-item>
          <ibps-toolbar
            ref="toolbar"
            :actions="actions"
            @action-event="handleButtonEvent"
          />
        </el-form-item>


        </el-form>
        <div class="form-header">
          <div style="text-align: center;height:150px;width:1080px">&nbsp;&nbsp;&nbsp;</div>
        </div>
      </div>
      </div>

    </template>
  </edit>
</template>

<script>
  import {
    validateRequired
  } from '@/utils/validate' //参数校验
  import IbpsUserSelector from '@/business/platform/org/selector' //用户 /组织 / 岗位选择框
  import IbpsAttachment from '@/business/platform/file/attachment/selector' //文件选择框
  import edit from '@/components/jbd-edit' //编辑对话框
  import relevanceTable from '@/business/platform/form/formrender/dynamic-form/mixins/relevanceTable' //表头懒加载
  import StatisOrRecordTable from '@/business/platform/form/formrender/dynamic-form/mixins/StatisOrRecordTable.vue' //表头统计 / 记录盒子页
  import IbpsLinkData from '@/business/platform/data/templaterender/link-data'
  import IbpsSignature from '@/business/platform/form/formrender/dynamic-form/components/signature'
  import IbpsAutoNumber from '@/business/platform/system/identity/auto-number'
  import IbpsLink from '@/components/ibps-link'

  import { selectById,saveFf,rejectedFf } from '@/api/detection/universalCRUD.js'

  export default {
    components: {
       'ibps-attachment': IbpsAttachment,
      'ibps-auto-number': IbpsAutoNumber,
      'ibps-link-data': IbpsLinkData,
      'ibps-user-selector': IbpsUserSelector,
      'ibps-signature': IbpsSignature,
      'ibps-link': IbpsLink,
      edit
    },
    props: {
      visible: Boolean,
      title: String,
      id: String,
      readonly: Boolean,
        openType: String,
    },
    data() {
      return {
        width: '380px',
        widthOneCol: '1030px',
        readonlyText: false,
        autosize: '',
        models: {
          id:"781b933b00d04529b257975df605f08e",
          //jcwt:{
           // "id": "",
            //"weiTuoId": "",
            //"baoGaoBianHao": "",
           boHuiYuanYin:"",
        //  },

        },
        formName: 'form',
        defaultForm: {},
        defaulRules: {},
        form: {
          id: ''
        },
        toolbars: [{
          key: 'save',
          hidden: () => {
            return this.readonly
          }
        }, ],
        rules: { //参数验证
          // id: [{ required: true, message: this.$t('validate.required') }, { validator: validateKey, trigger: 'blur' }],
        },
      }
    },
    created() {
      if(this.openType=='edit'){
       let data={id:this.id}
       let    a="{data:'"+JSON.stringify(data)+"'}"
        selectById('sysjcwtdb','selectById',a).then(response => {
            let dbData = response.variables.data
            Object.assign(this.models,dbData)
        })
        this.toolbars.push( { key: 'cancel' })
      }

      // this.toolbars.push({
      //   key: 'cancel'
      // })
      // this.defaultForm = JSON.parse(JSON.stringify(this.form)) //初始化加载默认表单
      // this.defaulRules = JSON.parse(JSON.stringify(this.rules)) //初始化加载默认参数验证
    },
    methods: {
          // //退回
          sendBack(){
          let data={
             userId:this.$store.getters.userInfo.user.id,
             userName:this.$store.getters.userInfo.user.name,
             entity:
                  {
                    id:this.id,
                    boHuiYuanYin:this.models.boHuiYuanYin
                  }
             }
            let paramss = "{data:'"+JSON.stringify(data)+"'}"
            console.log("pass8888",paramss)
            rejectedFf('sysbggl','rejectedff',paramss).then(response => {
                    this.$emit('close', false)
                      this.$message("已退回！")
                      this.$emit('loadData')
             })
          },
     // 提交
      confirmSubmit(){
        let data={
           userId:this.$store.getters.userInfo.user.id,
           userName:this.$store.getters.userInfo.user.name,
           entity:
                {
                  id:this.id,
                  boHuiYuanYin:this.models.boHuiYuanYin
                }
           }
          let params = "{data:'"+JSON.stringify(data)+"'}"
          console.log("pas",params)
         saveFf('sysbggl','saveff',params).then(response => {
                 this.$emit('close', false)
                   this.$message("提交成功！")
                   this.$emit('loadData')
         })

      },
      //查阅报表
      getImgUrl(rqBaobiao){
              let data=this.id
           return `http://www.szjyxt.com:8080/demo/reportJsp/pdfReport.jsp?access_token = 78dce0880f8f4810b817793057f489cf&rpx=测试/39样品管理系统/广东云润汽车 检测报告.rpx&id_=${data}`
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
      // handleActionEvent({
      //   key
      // }) {
      //   console.log("key",key);
      //   switch (key) {
      //       case 'edit':
      //          console.info('修改')
      //          break
      //        case 'remove':
      //        console.info('删除')
      //        break
      //     case 'cancel':
      //       this.closeDialog()
      //       break
      //       // case 'custom':
      //       //   // 新增自定义对话框按钮
      //       //   break
      //     default:
      //       break
      //   }
      // },
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

<style lang="scss">
  .jbd-title-cont {
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
      font-size: 22px;
      font-family: SimHei;
      color: #222;
      text-align: center;
      padding: 8px 10px 10px;
      margin: 0;
    }
  }

  .dynamic-form {
    .el-input {
      width: 100%;
    }

    .el-select {
      width: 100%;
    }

    .el-collapse-item__header.is-active {
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

    .dynamic-form-table-item__readonly {
      margin-bottom: 0;
    }

    //===================border-form====================
    .ibps-border-form {
      border: 1px solid #cfd7e5;

      .el-form-item {
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
        bottom: -20px;
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

      .el-table {
        .el-form-item {
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

  .dynamic-form-table {
    .panel-heading {
      border-bottom: 0;
      border-left: 1px solid #dde7ee;
      border-right: 1px solid #dde7ee;
    }

    .dynamic-form-table__inner {
      .panel-body {
        padding: 0;
      }
    }

    .dynamic-form-table__block {
      padding-bottom: 10px;

      .panel-body {
        border: 0px;
      }
    }

    .el-rate {
      position: relative;
      display: inline-block;
    }
  }

  .is-error {
    .dynamic-form-table {
      border: 1px solid #F56C6C;
    }
  }

  .is-required:not(.is-no-asterisk) {
    .dynamic-form-table__label:before {
      content: '*';
      color: #F56C6C;
      margin-right: 4px;
    }
  }
</style>
