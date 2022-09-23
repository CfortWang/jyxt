<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="bpmn-formrenderer-dialog"
    fullscreen
    destroy-on-close
    append-to-body
    @open="getFormData"
    @close="closeDialog"
  >
   <!--顶部按钮 请根据实际添加-->
       <div class="dynamic-form" style="margin: 10px;">
         <ibps-toolbar
                     :actions="actions"
                     @action-event="handleButtonEvent"
                   />
                    <hr>
          <!--表头-->
          <div class="form-header">
             <div class="title" >[ {{models.sheBeiMingCheng}} ] 详细情况</div>

             <Statis-or-record-table
                :StaOrRec="[{type:'Statis',title:'统计',show:[1,3]}]"
                />

          </div>
       </div>




      <el-form ref="form" :model="models" :rules="rules" :inline="inline" :label-suffix="labelSuffix" :label-width="labelWidth"
        :label-position="labelPosition" :status-icon="statusIcon" :size="size" :hide-required-asterisk="hideRequiredAsterisk"
        @submit.native.prevent>

        <el-row :gutter="0" justify="start" align="top" class="widget-col" type="flex">
          <el-col :span="12">
            <el-form-item label="接收时状态" prop="jieShouZhuangTai">
              {{models.jieShouZhuangTai}}
            </el-form-item>
            <el-form-item label="设备名称" prop="sheBeiMingCheng">
              <el-input v-model="models.sheBeiMingCheng" placeholder="请输入" type="text" name="sheBeiMingCheng"
                :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
            </el-form-item>

            <el-form-item label="设备识别号" prop="sheBeiShiBieH">
              <el-input v-model="models.sheBeiShiBieH" placeholder="请输入" type="text" name="sheBeiShiBieH" :autosize="autosize"
                :rows="3" :readonly="readonly" clearable :style="{width:width}" />
            </el-form-item>

            <el-form-item label="维护方式" prop="weiHuFangShi">
              <el-select v-model="models.weiHuFangShi" placeholder="请选择" name="weiHuFangShi" :disabled="readonly"
                :style="{width:width}" clearable>

                <el-option key="合同维护保养" label="合同维护保养" value="合同维护保养" />
                <el-option key="自行维护保养" label="自行维护保养" value="自行维护保养" />

              </el-select>
            </el-form-item>

            <el-form-item label="初次检定" prop="ccjdsj">
              <el-input v-model="models.ccjdsj" placeholder="初次检定/校准时间" type="text" name="ccjdsj" :autosize="autosize"
                :rows="3" :readonly="readonly" clearable :style="{width:width}" />
              <div class="ibps-help-block" v-html="`（校准时间）`" />

            </el-form-item>

          </el-col>
          <el-col :span="1">

          </el-col>
          <el-col :span="12">

            <el-form-item label="信息编制人" prop="bianZhiRen">
              <ibps-user-selector v-model="models.bianZhiRen" placeholder="请选择" type="user" :multiple="false" store="id"
                :disabled="true" :readonly-text="readonlyText?'text':null" :style="{width:width}" />

            </el-form-item>

            <el-form-item label="出厂编号" prop="chuChangBianHao">
              <el-input v-model="models.chuChangBianHao" placeholder="请输入" type="text" name="chuChangBianHao" :autosize="autosize"
                :rows="3" :readonly="readonly" clearable :style="{width:width}" />
            </el-form-item>

            <el-form-item label="管理人" prop="guanLiRen">
              <ibps-user-selector v-model="models.guanLiRen" placeholder="请选择" type="user" :multiple="true" store="id"
                :disabled="readonly" :readonly-text="readonlyText?'text':null" :style="{width:width}" />

            </el-form-item>

            <el-form-item label="设备类型" prop="sheBeiLeiXing">
              <el-input v-model="models.sheBeiLeiXing" placeholder="请输入" type="text" name="sheBeiLeiXing" :autosize="autosize"
                :rows="3" :readonly="readonly" clearable :style="{width:width}" />
            </el-form-item>

            <el-form-item label="检定周期" prop="jjzq">
              <el-input v-model="models.jjzq" placeholder="检定/校准 周期" type="text" name="jjzq" :autosize="autosize" :rows="3"
                :readonly="readonly" clearable :style="{width:width}" />
              <div class="ibps-help-block" v-html="`（校准周期）`" />
            </el-form-item>


          </el-col>
          <el-col :span="1">

          </el-col>
          <el-col :span="12">

            <el-form-item label="专业部门" prop="zhuanYeBuMen">
              <ibps-user-selector v-model="models.zhuanYeBuMen" placeholder="请选择" type="org" :multiple="false" store="id"
                :disabled="true" :readonly-text="readonlyText?'text':null" :style="{width:width}" />

            </el-form-item>

            <el-form-item label="规格型号" prop="guiGeXingHao">
              <el-input v-model="models.guiGeXingHao" placeholder="请输入" type="text" name="guiGeXingHao" :autosize="autosize"
                :rows="3" :readonly="readonly" clearable :style="{width:width}" />
            </el-form-item>

            <el-form-item label="接收日期" prop="jieShouRiQi">
              <el-date-picker v-model="models.jieShouRiQi" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                placeholder="请选择" :style="{width:width}" :readonly="readonly" :clearable="false" />
            </el-form-item>

            <el-form-item label="校/检/核查" prop="jzfs">
              <el-input v-model="models.jzfs" placeholder="请输入" type="text" name="jzfs" :autosize="autosize" :rows="3"
                :readonly="readonly" clearable :style="{width:width}" />
              <div class="ibps-help-block" v-html="`校准/检定/核查方式`" />
            </el-form-item>


          </el-col>

          <el-col :span="1">

          </el-col>
          <el-col :span="12">

            <el-form-item label="编制时间" prop="bianZhiShiJian">
             {{models.bianZhiShiJian}}
            </el-form-item>
            <el-form-item label="制造厂商" prop="changShang">
              <el-input v-model="models.changShang" placeholder="请输入" type="text" name="changShang" :autosize="autosize"
                :rows="3" :readonly="readonly" clearable :style="{width:width}" />
            </el-form-item>

            <el-form-item label="存放地点" prop="cunFangDiDian">
              <el-input v-model="models.cunFangDiDian" placeholder="请输入" type="text" name="cunFangDiDian" :autosize="autosize"
                :rows="3" :readonly="readonly" clearable :style="{width:width}" />
            </el-form-item>

            <el-form-item label="启用日期" prop="qiYongRiQi">
              <el-date-picker v-model="models.qiYongRiQi" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                placeholder="请选择" :style="{width:width}" :readonly="readonly" :clearable="true" />
            </el-form-item>


          </el-col>

        </el-row>
<el-row>
   <el-col :span="12">
        <el-form-item label="设备状态" prop="sheBeiZhuangTa">
          <el-radio-group v-model="models.sheBeiZhuangTa" :disabled="readonly">

            <component :is="'el-radio'" :label="'正常使用'" class="ibps-pt-5">
               <span style="color:#000FFF">正常使用</span>
            </component>
            <component :is="'el-radio'" :label="'限制使用'" class="ibps-pt-5">
             <span style="color:#D3A60C;">限制使用</span>
            </component>
            <component :is="'el-radio'" :label="'禁止使用'" class="ibps-pt-5">
             <span style="color:red"> 禁止使用</span>
            </component>
            <component :is="'el-radio'" :label="'已报废'" class="ibps-pt-5">
              已报废
            </component>
          </el-radio-group>
        </el-form-item>



            <el-form-item label="外观照片" prop="yqzp">
              <ibps-attachment v-model="models.yqzp" placeholder="请选择" :download="true" :readonly="readonly" accept="*"
                :multiple="true" upload-type="attachment" store="id" media-type="" media="" :style="{width:width}" />

            </el-form-item>
        </el-col>
        <el-row :gutter="0" justify="start" align="top" class="widget-col" type="flex">
          <el-col :span="10">

            <el-row :gutter="0" justify="start" align="top" class="widget-col" type="flex">
              <el-col :span="9">

                <el-form-item
                      label="打印">
                      <ibps-link
                        text="登记信息"
                        link="resolve([{event:'afterSubmit',logic:`resolve({openType:'dialog',url:'${options.reportPash}08仪器设备的使用、维护和管理程序/SGJS-CX-08-03B 仪器设备登记表.rpx&yqgm.id=${options.formData.id}'})` }])"
                        show-type="button"
                        text-type="fixed"
                        link-type="javascript"
                        text-javascript=""
                        :form-data="models"
                        type="info"
                        preview-entrance
                        icon="ibps-icon-clipboard"
                      />
                </el-form-item>


              </el-col>
              <el-col :span="9">



                <el-form-item>
                      <ibps-link
                        text="二维码"
                        link="resolve([{event:'afterSubmit',logic:`resolve({openType:'dialog',url:'${options.reportPash}08仪器设备的使用、维护和管理程序/设备二维码.rpx&id_=${options.formData.id}'})` }])"
                        show-type="button"
                        text-type="fixed"
                        link-type="javascript"
                        text-javascript=""
                        :form-data="models"
                        type="info"
                        preview-entrance
                        icon="ibps-icon-clipboard"
                      />
                 </el-form-item>

              </el-col>
              <el-col :span="9">

                <el-form-item>
                      <ibps-link
                        text="简介说明"
                        link="resolve([{event:'afterSubmit',logic:`resolve({openType:'dialog',url:'${options.reportPash}08仪器设备的使用、维护和管理程序/简介说明.rpx&id_=${options.formData.id}'})` }])"
                        show-type="button"
                        text-type="fixed"
                        link-type="javascript"
                        text-javascript=""
                        :form-data="models"
                        type="info"
                        preview-entrance
                        icon="ibps-icon-clipboard"
                      />
                 </el-form-item>
              </el-col>

              <el-col :span="9">

                <el-form-item>
                      <ibps-link
                        text="使用记录"
                        link="resolve([{event:'afterSubmit',logic:`resolve({openType:'dialog',url:'${options.reportPash}08仪器设备的使用、维护和管理程序/SGJS-CX-08-07B 仪器设备使用记录.rpx&id_=${options.formData.id}'})` }])"
                        show-type="button"
                        text-type="fixed"
                        link-type="javascript"
                        text-javascript=""
                        :form-data="models"
                        type="info"
                        preview-entrance
                        icon="ibps-icon-clipboard"
                      />
                 </el-form-item>
              </el-col>
              <el-col :span="9">

                <el-form-item>
                      <ibps-link
                        text="维护记录"
                        link="resolve([{event:'afterSubmit',logic:`resolve({openType:'dialog',url:'${options.reportPash}08仪器设备的使用、维护和管理程序/SGJS-CX-08-06B 仪器设备维护保养记录.rpx&id_=${options.formData.id}'})` }])"
                        show-type="button"
                        text-type="fixed"
                        link-type="javascript"
                        text-javascript=""
                        :form-data="models"
                        type="info"
                        preview-entrance
                        icon="ibps-icon-clipboard"
                      />
                 </el-form-item>
              </el-col>

            </el-row>
          <el-row>
            <el-col :span="9">

              <el-form-item>
                    <ibps-link
                      text="设备档案"
                      link="resolve([{event:'afterSubmit',logic:`resolve({openType:'dialog',url:'${options.reportPash}08仪器设备的使用、维护和管理程序/仪器设备封面.rpx&yqgm.id=${options.formData.id}'})` }])"
                      show-type="button"
                      text-type="fixed"
                      link-type="javascript"
                      text-javascript=""
                      :form-data="models"
                      type="info"
                      preview-entrance
                      icon="ibps-icon-clipboard"
                    />
               </el-form-item>

            </el-col>
           </el-row>
          </el-col>
     </el-row>
 </el-row>
      </el-form>

 </br>
 <el-alert
     title="以下是当前设备相关数据"
     type="success">
   </el-alert>
<el-menu :default-active="activeIndex"
                 class="el-menu-demo"
                 mode="horizontal"
                 text-color="#000000"
                 active-text-color="#409EFF"
                 default-active ='1'
                 @select="handleSelect"
                 @click.native="clickCont($event)"
                 >

       <el-menu-item  index="1">【使用记录】</el-menu-item>
        <el-menu-item index="2" >【设备保养】</el-menu-item>
        <el-menu-item index="3">【校准结果】</el-menu-item>
        <el-menu-item index="4" >【设备维修】</el-menu-item>
        <el-menu-item index="5" >【设备核查】</el-menu-item>
        <el-menu-item index="6" >【档案目录】</el-menu-item>
        <el-menu-item index="7" >【硬件信息】</el-menu-item>
        <el-menu-item index="8" >【对应文件】</el-menu-item>
        <el-menu-item index="9" >【报废申请表】</el-menu-item>
        <el-menu-item index="10" >【购置申请】</el-menu-item>
        <el-menu-item index="11" >【设备验收】</el-menu-item>
  </el-menu>

   <el-divider >{{clickName}}</el-divider>

      <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin:20px;background-color:#f5f5f7;">

          <ShiYong v-if="activeIndex == '1' && idOff" :deviceId ="models.id"/>
          <WeiHu v-if="activeIndex == '2'&& idOff" :deviceId ="models.id"/>
          <JiaoZhun v-if="activeIndex == '3'&& idOff" :deviceId ="models.id"/>
          <WeiXiu v-if="activeIndex == '4'&& idOff" :deviceId ="models.id"/>
          <HeCha v-if="activeIndex == '5'&& idOff" :deviceId ="models.id"/>
          <DangAn v-if="activeIndex == '6'&& idOff" :deviceId ="models.id"/>
          <YingJian v-if="activeIndex == '7'&& idOff" :deviceId ="models.id"/>
          <WenJian v-if="activeIndex == '8'&& idOff" :deviceId ="models.id"/>
          <BaoFei v-if="activeIndex == '9'&& idOff" :deviceId ="models.id"/>
          <gouMai v-if="activeIndex == '10'&& idOff" :deviceId ="models.parentId" :devNumber="models.guiGeXingHao" :selectDev="models.xuanZeSheBei"/>          <yanShou v-if="activeIndex == '11'&& idOff" :deviceId ="models.parentId" :devNumber="models.guiGeXingHao" :selectDev="models.xuanZeSheBei"/>
    </div>
  </el-dialog>
</template>
<script>
  import { save, get } from '@/api/demo/shebei/sheBei'
  import ActionUtils from '@/utils/action'
  import {
    validateRequired
  } from '@/utils/validate'
  import IbpsUserSelector from '@/business/platform/org/selector'
  import IbpsAttachment from '@/business/platform/file/attachment/selector'
  import IbpsLink from '@/components/ibps-link'
  import IbpsCustomDialog from '@/business/platform/data/templaterender/custom-dialog'

  //------------------------------------------------------------------------
  import ShiYong from '../sheBeiShiYong/list'
  import BaoFei from '../guDingZiChanBaoFei/list'
  import DangAn from '../sheBeiDangAn/list'
  import HeCha from '../sheBeiHeCha/list'
  import JiaoZhun from '../sheBeiJiaoZhunJieGuo/list'
  import WeiHu from '../sheBeiWeiHu/list'
  import WeiXiu from '../sheBeiWeiXiu/list'
  import WenJian from '../sheBeiWenJian/list'
  import YingJian from '../sheBeiYingJian/list'
  import gouMai from '../sheBeiGouMaiShenQing/list'
  import yanShou from '../sheBeiYanShou/list'
  import StatisOrRecordTable from '@/business/platform/form/formrender/dynamic-form/mixins/StatisOrRecordTable'

  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      id: String,
      title: String
    },
    components: {
      'ibps-user-selector': IbpsUserSelector,
      'ibps-attachment': IbpsAttachment,
      'ibps-link': IbpsLink,
      'ibps-custom-dialog': IbpsCustomDialog,
      BaoFei,
      DangAn,
      HeCha,
      JiaoZhun,
      ShiYong,
      WeiHu,
      WeiXiu,
      WenJian,
      YingJian,
      gouMai,
      yanShou,
      StatisOrRecordTable
    },
    data() {
      return {
        idOff:false,
        clickName:'【使用记录】',
        formName: 'form',
        dialogVisible: this.visible,
        dialogLoading: false,
        defaultForm: {},
        defaulRules: {},
        models: {
          "id": "",
          "parentId":"",
          "xuanZeSheBei":'',
          "sheBeiMingCheng": "",
          "sheBeiZhuangTa": "",
          "sheBeiShiBieH": "",
          "weiHuFangShi": "",
          "ccjdsj": "",
          "bianZhiRen": "",
          "changShang": "",
          "chuChangBianHao": "",
          "guanLiRen": "",
          "jjzq": "",
          "zhuanYeBuMen": "",
          "guiGeXingHao": "",
          "jieShouRiQi": "",
          "sheBeiLeiXing": "",
          "jzfs": "",
          "bianZhiShiJian": "",
          "jieShouZhuangTai": "",
          "cunFangDiDian": "",
          "qiYongRiQi": "",
        },
        activeIndex:'1',
        isSubmi:true,
        inline: false,
        labelSuffix: ':',
        labelWidth: '100px',
        labelPosition: 'right',
        statusIcon: false,
        size: '',
        hideRequiredAsterisk: false,
        readonlyText: 'text',
        multiple: false,
        autosize: '',
        width: '100%',
        actions:[
          {
            key: 'submit',
            label: '确认/保存',
            type: 'primary',
          },
           { key: 'cancel' }
                ],

        rules: {
          sheBeiMingCheng: [{
            "required": true,
            "message": "必填"
          }, {
            "validator": validateRequired,
            "message": "必填"
          }],
          sheBeiZhuangTa: [{
            "required": true,
            "message": "必填"
          }, {
            "validator": validateRequired,
            "message": "必填"
          }],
          changShang: [{
            "required": true,
            "message": "必填"
          }, {
            "validator": validateRequired,
            "message": "必填"
          }]
        }
      }
    },
    watch: {
      visible: {
        handler: function(val, oldVal) {
          this.dialogVisible = this.visible
        },
        immediate: true
      }
    },
    computed: {
      formId() {
        return this.id
      }
    },
    created() {
      this.activeIndex = "1"
      this.defaultForm = JSON.parse(JSON.stringify(this.models))
      this.defaulRules = JSON.parse(JSON.stringify(this.rules))
    },
    methods: {
    clickCont(data){
      this.clickName = data.target.innerText
    },
      handleSelect(key, keyPath) {
             this.activeIndex = key
           },
       submitForm(formName) {
         if(this.isSubmi){
           this.isSubmi = false
           this.$refs[formName].validate((valid) => {
             if (valid) {
               this.saveData()
             } else {
               return false;
             }
           })
         }
       },
       handleClick(tab, event) {

       },
       handleButtonEvent(button, data) {
         switch (button.key) {
           case 'submit':
             this.submitForm('form')
             break
           case 'cancel':
             this.closeDialog()
             break
           default:
             break
         }
       },
       // 关闭当前窗口
       closeDialog() {
         this.$emit('close', false)
         this.$refs[this.formName].resetFields()
         this.activeIndex="1"
         this.idOff = false
       },
       // 提交保存数据
       saveData() {
         save(this.models).then(response => {
           this.isSubmi = true
           this.$emit('callback', this)
           ActionUtils.saveSuccessMessage("保存成功", (rtn) => {
             if (this.$utils.isEmpty(this.formId)) {
               this.$refs[this.formName].resetFields()
             }
             if (rtn) {
               this.closeDialog()
             }
           })
         }).catch((err) => {
           this.isSubmi = true
         })
       },
       /**
        * 获取表单数据
        */
       getFormData() {
         if (this.readonly) {
           this.rules = {}
         } else {
           this.rules = this.defaulRules
         }
         if (this.$utils.isEmpty(this.formId)) {
           // 重置表单
           this.models = JSON.parse(JSON.stringify(this.defaultForm))
           this.formValidate()
           return
         }
         this.dialogLoading = true
         get({
           id: this.formId
         }).then(response => {
           this.models = response.data
           this.dialogLoading = false
           this.idOff =true
         }).catch(() => {
           this.dialogLoading = false
         })
       },

    }
  }
</script>
<style lang="scss">
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
