<template>
    <edit :visible='visible' >
      <template v-slot:form>
        <div  >
          <div class="ibps-toolbar" >
            <div class="header" style="height: 30px">
              <div class="buttons" style="float: right;margin-right:8%;">
                <el-button
                  :key="0"
                  type="primary"
                  icon="save"
                  @click="handleActionEvent({ key: 'save' })"
                >
                  提交
                </el-button>
                
                   <el-button
                   :key="1"
                   type="danger"
                   icon="cancel"
                   @click="handleActionEvent({ key: 'cancel' })"
                 >
                   关闭
                 </el-button>
              </div>
            </div>
          </div>


        <div class="dynamic-form" :class=" {'jbd-form-cont':!isDialog }">

        <!-- 表头按钮-->

      <div class="dynamic-form">
       <!--表头-->
          <el-form
            ref="form"
            v-loading="!visible"
            :rules="rules"
            :element-loading-text="$t('common.loading')"
            :model="form"
            label-width="200px"
            >
          <div class="form-header">
            <div class="title ibps-tc" style="font-size: 18px;">委托受理
            </div>
          </div>

                  <el-row
                    :gutter="0"
                    justify="start"
                    align="top"
                    class="widget-col"
                    type="flex"
                  >
                  <el-col :span="40">
<iframe style="align-content:center;width:1200px;height:800px" src="https://www.szjyxt.com/demo/reportJsp/pdfReport.jsp?access_token%20=%2069b68ebc2fd7422faa2b61a352455bbc&rpx=%E4%B8%AD%E6%B1%87%E7%91%9E%E5%BE%B7%E6%A3%80%E6%B5%8B%E4%B8%AD%E5%BF%83/39%E6%A0%B7%E5%93%81%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/GDYR-CX11-R01A%20%E6%A3%80%E6%B5%8B%E5%A7%94%E6%89%98%E5%8D%95.rpx&id_=781b933b00d04529b257975df605f08e" id="myiframe"  frameborder="0" scrolling="no" height="100%" width="100%" ></iframe>

                    </el-col>

                    </el-row>


                  <el-row
                    :gutter="0"
                    justify="start"
                    align="top"
                    class="widget-col"
                    type="flex"
                  >
                  <el-col :span="12">
                    <el-form-item
                    label="审核意见" class="el-form--label-left"

                    prop="shenPiYiJian">

                    <el-radio-group
                        v-model="models.shenPiYiJian"
                        :disabled="readonly"
                      >

                        <component
                        :is="'el-radio'"
                        :label="'受理'"
                        class="ibps-pt-5"
                      >
                        受理
                      </component>
                        <component
                        :is="'el-radio'"
                        :label="'不受理'"
                        class="ibps-pt-5"
                      >
                        不受理
                      </component>
                    </el-radio-group>

                    </el-form-item>
                    </el-col>

                    </el-row>
                <el-row
                    :gutter="0"
                    justify="start"
                    align="top"
                    class="widget-col"
                    type="flex"
                  >
                  <el-col :span="12">
                    <el-form-item
                    label="委托方" class="el-form--label-left"

                    prop="weiTuoFangLeiBie">

                    <el-radio-group
                        v-model="models.weiTuoFangLeiBie"
                        :disabled="readonly"
                      >

                        <component
                        :is="'el-radio'"
                        :label="'内部委托'"
                        class="ibps-pt-5"
                      >
                        内部委托
                      </component>
                        <component
                        :is="'el-radio'"
                        :label="'外部委托'"
                        class="ibps-pt-5"
                      >
                        外部委托
                      </component>
                    </el-radio-group>
                    </el-form-item>
                    </el-col>

                    </el-row>
                    <el-row
                        :gutter="0"
                        justify="start"
                        align="top"
                        class="widget-col"
                        type="flex"
                      >
                      <el-col :span="12">
                        <el-form-item
                        label="受理人" class="el-form--label-left"

                        prop="shouLiRen">

                        <el-input
                          v-model="models.shouLiRen"
                          placeholder="请输入"
                          type="text"
                          name="shouLiRen"
                          :autosize="autosize"
                          :rows="3"
                          :readonly="readonly"
                          clearable
                          :style="'max-width:360px'"
                        />
                        </el-form-item>
                        </el-col>

                        </el-row>
                        <el-row
                            :gutter="0"
                            justify="start"
                            align="top"
                            class="widget-col"
                            type="flex"
                          >
                          <el-col :span="12">
                            <el-form-item
                            label="受理时间" class="el-form--label-left"

                            prop="shouLiShiJian">
                            <el-input
                              v-model="models.shouLiShiJian"
                              placeholder="请输入"
                              type="text"
                              name="shouLiShiJian"
                              :autosize="autosize"
                              :rows="3"
                              :readonly="readonly"
                              clearable
                              :style="'max-width:360px'"
                            />
                            </el-form-item>
                            </el-col>

                            </el-row>
              <el-row
                :gutter="0"
                justify="start"
                align="top"
                class="widget-col"
                type="flex"
              >
              <el-col :span="12">
                <el-form-item
                label="备注" class="el-form--label-left"

                prop="shenHeYiJian"><el-input class="el-form--text"
                v-model="models.shenHeYiJian"
                placeholder="请输入"
                type="textarea"
                name="shenHeYiJian"
                :rows="4"
                :readonly="readonly"
                clearable

              />
                </el-form-item>
                </el-col>

                </el-row>
      </el-form>
      <div class="form-header">
          <div style="text-align: center;height:150px;width:1080px">&nbsp;&nbsp;&nbsp;</div>
      </div>
    </div>
  </div>
  <div class="widget-col el-row is-align-top el-row--flex"><div class="el-col el-col-16"><!----><!----><!----></div></div>
  <div class="ibps-watermark__mask"></div>
  </div></div>
      </template>
    </edit>
</template>
<script>

import IbpsLinkData from '@/business/platform/data/templaterender/link-data'
import IbpsSignature from '@/business/platform/form/formrender/dynamic-form/components/signature'
import { getNextIdByAlias } from '@/api/platform/system/identity'
import edit from '@/components/jbd-edit'
import { wtsl,rejected } from '@/api/detection/htps.js'

export default{
  components:{
    'ibps-link-data': IbpsLinkData,
    'ibps-signature': IbpsSignature,
     getNextIdByAlias,
     edit
  },
    props:{
      id:String,
      title:String,
      readonly:Boolean,
      openType:String,
      visible:Boolean
    },
    data() {
      return {
        width:'260px',
        widthOneCol:'1030px',
        readonlyText:true,
        autosize:'',
        models:{
           shenHeYiJian:'同意',
           weiTuoFang:'内部委托',
           shouLiRen:'张维敏',
           shouLiShiJian:'2022-01-04',
        },
        formName: 'form',
        defaultForm: {},
        defaulRules: {},

        toolbars: [
          { key: 'save', hidden: () => { return this.readonly } },
        ],
        rules: { //参数验证
          // id: [{ required: true, message: this.$t('validate.required') }, { validator: validateKey, trigger: 'blur' }],
        },
      }
    },
    created() {
      this.toolbars.push( { key: 'cancel' })
    },
    methods:{
      saveMe(){

        if(this.models.shenPiYiJian=='受理'){
          let biaoShi="next"
          if(this.models.weiTuoFangLeiBie=="外部委托"){
            biaoShi="one"
          }
          let data={userId:this.$store.getters.userInfo.user.id,userName:this.$store.getters.userInfo.user.name,biaoShi:biaoShi,entity:{id:this.id}}
          wtsl(JSON.stringify(data)).then(response => {
               this.$message("受理成功！")
               this.$emit('loadData')
          })
         }else if(this.models.shenPiYiJian=='不受理'){
          let data={userId:this.$store.getters.userInfo.user.id,userName:this.$store.getters.userInfo.user.name,entity:{id:this.id,boHuiYuanYin:this.models.shenHeYiJian}}
          rejected(JSON.stringify(data)).then(response => {
               this.$message("操作成功！")
               this.$emit('loadData')
          })
        }

      },
      /* 按钮事件回调*/
      handleActionEvent({ key }) {
        switch (key) {
          case 'save':
            this.saveMe();
            break
            case 'add':
                      this.models.yangPing.push({
                        yangPinMingChe:'',
                        guiGeXingHao:'',
                        shuLiang:'',
                        shengChanRiQi:''
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
    text-align: left;
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
        text-align: left;
        padding: 8px 10px 10px;
        margin: 0;
      }
    }
.el-form--label-left .el-form-item__label{
  padding-left:82px;
  text-align: left;
}
.el-form--text{
   min-height:88px;
   height:88px;
   width:668px

}

</style>
