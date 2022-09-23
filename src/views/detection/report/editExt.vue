<template>
  <edit :visible='visible'>

    <template v-slot:form>
      <!-- 表头按钮-->
      <div class="form-toolbar hidden-print">
        <div class="ibps-toolbar">
          <div class="header" style="height: 30px;">
            <div class="buttons" style="float: right;margin-right:8%;">
              <ibps-toolbar ref="toolbar" :actions="toolbars" @action-event="handleActionEvent" />
            </div>
          </div>
        </div>
      </div>


      <div class="dynamic-form">
        <!--表头-->
        <el-form ref="form" v-loading="!visible" :rules="rules" :element-loading-text="$t('common.loading')"
          :model="form" label-width="180px">
          <el-row class="row-bg">
            <el-col :span="41">
              <div class="form-header">
                <div class="title" style="text-align: center;width:1080px">检测委托单</div>
              </div>
            </el-col>
          </el-row>

      <el-form-item
      label="预览："

      prop="">
      <ibps-link
        text="委托单"
        link="resolve([{
    event:'afterSubmit',
    logic:`resolve({openType:'dialog',
    url:'${options.reportPash.replace('show','pdf')}39样品管理系统/GDYR-CX11-R01A 检测委托单.rpx&id_=${options.formData.id}'});` }])  "
        show-type="button"
        text-type="fixed"
        link-type="javascript"
        text-javascript=""
        type="primary"
        form-data=""
        preview-entrance
        icon=""
      /></el-form-item>






          <el-row :gutter="25">
            <el-col :span="8">
              <el-form-item label="校验人　　　　　　　" prop="weiTuoFang">
                <ibps-user-selector v-model="models.weiTuoFang" placeholder="请选择" type="user" :multiple="true"
                  store="id" :disabled="readonly" :readonly-text="readonlyText?'text':null" :style="{width:width}" />
              </el-form-item>
              <el-form-item label="检测项目/参数　　　　" prop="weiTuoFang">
                <ibps-link-data v-model="models.weiTuoFang" template-key="jclxzlyx" placeholder="请选择"
                  :disabled="readonly" :readonly="readonly" :readonly-text="readonlyText?'text':'original'"
                  :style="{width:width}" />
              </el-form-item>

              <!-- <el-form-item
                label="委托方"

                prop="weiTuoFang"><el-input
                v-model="models.weiTuoFang"
                placeholder="请输入"
                type="text"
                name="weiTuoFang"
                :autosize="autosize"
                :rows="3"
                :readonly="readonly"
                clearable
                :style="{width:width}"
              />
                </el-form-item> -->
            </el-col>
            <el-col :span="8">
              <el-form-item label="详细地址" prop="xiangXiDiZhi">
                <el-input v-model="models.xiangXiDiZhi" placeholder="请输入" type="text" name="xiangXiDiZhi"
                  :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="25">
            <el-col :span="8">
              <el-form-item label="联系部门/联系人" prop="lianXiBuMenLi">
                <el-input v-model="models.lianXiBuMenLi" placeholder="请输入" type="text" name="lianXiBuMenLi"
                  :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话" prop="dianHua">
                <el-input v-model="models.dianHua" placeholder="请输入" type="text" name="dianHua" :autosize="autosize"
                  :rows="3" :readonly="readonly" clearable :style="{width:width}" />
              </el-form-item>
            </el-col>
          </el-row>


          <el-row :gutter="25">
            <el-col :span="8">
              <el-form-item label="项目名称" prop="xiangMuMingChe">
                <el-input v-model="models.xiangMuMingChe" placeholder="请输入" type="text" name="xiangMuMingChe"
                  :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目类别" prop="xiangMuLeiBie">
                <el-input v-model="models.xiangMuLeiBie" placeholder="请输入" type="text" name="xiangMuLeiBie"
                  :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
              </el-form-item>
            </el-col>
          </el-row>


          <el-row :gutter="25">
            <el-col :span="8">
              <el-form-item label="委托内容" prop="weiTuoNeiRong">
                <el-input v-model="models.weiTuoNeiRong" placeholder="请输入" type="text" name="weiTuoNeiRong"
                  :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!--add-->
              <el-form-item label="样品名称" prop="yangPingMingChen">
                <el-input v-model="models.yangPingMingChen" placeholder="请输入" type="text" name="yangPingMingChen"
                  :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="25">
            <!--add-->
            <el-col :span="8">
              <el-form-item label="数量" prop="shuLiang">
                <el-input v-model="models.shuLiang" placeholder="请输入" type="text" name="shuLiang" :autosize="autosize"
                  :rows="3" :readonly="readonly" clearable :style="{width:width}" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!--add-->
              <el-form-item label="型号规格" prop="xingHaoGuiGe">
                <el-input v-model="models.xingHaoGuiGe" placeholder="请输入" type="text" name="xingHaoGuiGe"
                  :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="25">
            <!--add-->
            <el-col :span="8">
              <el-form-item label="样品状态" prop="yangPingZhuangTai">
                <el-input v-model="models.yangPingZhuangTai" placeholder="请输入" type="text" name="yangPingZhuangTai"
                  :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="留样" prop="shiFouLiuYang">
                <el-input v-model="models.shiFouLiuYang" placeholder="请输入" type="text" name="shiFouLiuYang"
                  :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="">
            <div style="height: 800px">
              <iframe
                src="https://www.szjyxt.com/demo/reportJsp/pdfReport.jsp?access_token%20=%200084bd4987734008933b6134947e4b59&rpx=%E4%B8%AD%E6%B1%87%E7%91%9E%E5%BE%B7%E6%A3%80%E6%B5%8B%E4%B8%AD%E5%BF%83/08%E4%BB%AA%E5%99%A8%E8%AE%BE%E5%A4%87%E7%9A%84%E4%BD%BF%E7%94%A8%E3%80%81%E7%BB%B4%E6%8A%A4%E5%92%8C%E7%AE%A1%E7%90%86%E7%A8%8B%E5%BA%8F/GDYR-CX06-R06A%20%20%E4%BB%AA%E5%99%A8%E8%AE%BE%E5%A4%87%E7%BB%B4%E6%8A%A4%E4%BF%9D%E5%85%BB%E8%AE%B0%E5%BD%95%E8%A1%A8(%E6%97%A5).rpx&she_bei_bian_hao_=GDYR-JC-YQ-010&yue_fen_s_=2022-01"
                :height="'100%'" :width="'90%'" frameborder="0" scrolling="no" />
            </div>
          </el-form-item>

          <el-row :gutter="25">
            <!--add-->
            <el-col :span="8">
              <el-form-item label="检测后样品处理" prop="jianCeHouYangP">
                <el-input v-model="models.jianCeHouYangP" placeholder="请输入" type="text" name="jianCeHouYangP"
                  :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否同意分包" prop="shiFouTongYiF">
                <el-input v-model="models.shiFouTongYiF" placeholder="请输入" type="text" name="shiFouTongYiF"
                  :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="25">
            <!--add-->
            <el-col :span="8">
              <el-form-item label="送样时间" prop="songYangShiJia">
                <el-input v-model="models.songYangShiJia" placeholder="请输入" type="text" name="songYangShiJia"
                  :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="要求完成时间" prop="yaoQiuWanCheng">
                <el-input v-model="models.yaoQiuWanCheng" placeholder="请输入" type="text" name="yaoQiuWanCheng"
                  :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">


              <el-form-item label="" label-width="0" prop="ccljl">
                <div class="dynamic-form-table">

                  <div class="dynamic-form-table__inner panel panel-info">
                    <div class="panel-heading ibps-clearfix">
                      <div class="ibps-fl dynamic-form-table__label">尺寸类记录</div>

                      <div class="ibps-fr hidden-print">
                        <el-button-group>

                          <el-button :key="0" type="primary" icon="add" @click="handleActionEvent('add')">
                            添加
                          </el-button>
                          <el-button :key="1" type="danger" icon="remove" @click="handleActionEvent('remove')">
                            删除
                          </el-button>
                        </el-button-group>
                      </div>

                    </div>
                    <div class="panel-body">
                      <el-table ref="elTable" :data="models.ccljl" border stripe>
                        <el-table-column type="selection" width="50" />

                        <el-table-column :key="1" prop="xuHao" width="100px">
                          <template slot="header">
                            序号

                          </template>
                          <template>

                            <el-form-item prop="xuHao" label-width="0px" :class="{
                  'dynamic-form-table-item__readonly':readonly
                }">
                              <el-input v-model="models.xuHao" placeholder="请输入" type="text" name="xuHao"
                                :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                            </el-form-item>

                          </template>
                        </el-table-column>

                        <el-table-column :key="2" prop="jianCeXiangMu" width="100px">
                          <template slot="header">
                            检测项目

                          </template>
                          <template>

                            <el-form-item prop="jianCeXiangMu" label-width="0px" :class="{
                  'dynamic-form-table-item__readonly':readonly
                }">
                              <el-input v-model="models.jianCeXiangMu" placeholder="请输入" type="text"
                                name="jianCeXiangMu" :autosize="autosize" :rows="3" :readonly="readonly" clearable
                                :style="{width:width}" />
                            </el-form-item>

                          </template>
                        </el-table-column>

                        <el-table-column :key="3" prop="danWei" width="100px">
                          <template slot="header">
                            单位

                          </template>
                          <template>

                            <el-form-item prop="danWei" label-width="0px" :class="{
                  'dynamic-form-table-item__readonly':readonly
                }">
                              <el-input v-model="models.danWei" placeholder="请输入" type="text" name="danWei"
                                :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                            </el-form-item>

                          </template>
                        </el-table-column>

                        <el-table-column :key="4" prop="jianCeJieGuo" width="100px">
                          <template slot="header">
                            检测结果

                          </template>
                          <template>

                            <el-form-item prop="jianCeJieGuo" label-width="0px" :class="{
                  'dynamic-form-table-item__readonly':readonly
                }">
                              <el-input v-model="models.jianCeJieGuo" placeholder="请输入" type="text" name="jianCeJieGuo"
                                :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                            </el-form-item>

                          </template>
                        </el-table-column>

                        <el-table-column :width="manageButtonWidth" align="center" fixed="right"
                          class-name="hidden-print" label="操作" />

                        <el-link :key="0" type="add">
                          添加
                        </el-link>
                        <el-divider :key="0" direction="vertical" />

                        <el-link :key="1" type="remove">
                          删除
                        </el-link>


                      </el-table>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>



          <el-row>
            <el-col :span="24">
              <el-form-item label="结果报告送达方式" prop="jieGuoBaoGaoS">
                <el-input v-model="models.jieGuoBaoGaoS" placeholder="请输入" type="text" name="jieGuoBaoGaoS"
                  :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:widthOneCol}" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="结论判定" prop="jieLunPanDing">
                <el-input v-model="models.jieLunPanDing" placeholder="请输入" type="text" name="jieLunPanDing"
                  :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:widthOneCol}" />
              </el-form-item>
            </el-col>
          </el-row>


          <el-row :gutter="25">
            <!--add-->
            <el-col :span="8">
              <el-form-item label="委托方代表签名" prop="weiTuoFangDai">
                <el-input v-model="models.weiTuoFangDai" placeholder="请输入" type="text" name="weiTuoFangDai"
                  :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
              </el-form-item>
            </el-col>

            <!--
            <el-col :span="8">
            <el-form-item
              label="收样人签名"

              prop="shouYangRenQia"><el-input
              v-model="models.shouYangRenQia"
              placeholder="请输入"
              type="text"
              name="shouYangRenQia"
              :autosize="autosize"
              :rows="3"
              :readonly="readonly"
              clearable
              :style="{width:width}"
            />
              </el-form-item>
       -->
            <el-col :span="8">
              <el-form-item label="在线签名" prop="shouYangRenQia">
                <ibps-signature v-model="models.shouYangRenQia" placeholder="请在这里输入您的签名" :disabled="readonly"
                  :style="{width:width}" />
              </el-form-item>
            </el-col>
          </el-row>

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
  export default {
    components: {
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
    },
    data() {
      return {
        width: '380px',
        widthOneCol: '1030px',
        readonlyText: false,
        autosize: '',
        models: {
          "id": "",
          "weiTuoFang": "",
          "xiangXiDiZhi": "",
          "lianXiBuMenLi": "",
          "dianHua": ""
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
      this.toolbars.push({
        key: 'cancel'
      })
      this.defaultForm = JSON.parse(JSON.stringify(this.form)) //初始化加载默认表单
      this.defaulRules = JSON.parse(JSON.stringify(this.rules)) //初始化加载默认参数验证
    },
    methods: {
      /* 按钮事件回调*/
      handleActionEvent({
        key
      }) {
        switch (key) {
          case 'save':
            this.open();
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
