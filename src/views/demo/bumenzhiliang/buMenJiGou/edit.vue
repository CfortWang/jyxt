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
            <div class="title" >[ {{models.name}} ]的质量详细情况</div>
      </div>
      </div>

<el-menu :default-active="activeIndex"
                 class="el-menu-demo"
                 mode="horizontal"
                 text-color="#000000"
                 active-text-color="#409EFF"
                 default-active ='1'
                 @select="handleSelect">

        <el-menu-item  index="1">【不符合项报告】</el-menu-item>
        <el-menu-item index="2">【评审报告】</el-menu-item>
        <el-menu-item index="3">【实验室间比对一览】</el-menu-item>
        <el-menu-item index="4" >【能力一览】</el-menu-item>
        <el-menu-item index="5" >【质量控制评审】</el-menu-item>
        <el-menu-item index="6" >【内审检查】</el-menu-item>
        <el-menu-item index="7" >【质量监督实施】</el-menu-item>

  </el-menu>
 <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin:20px;background-color:#f5f5f7;">

          <buFuHeXiangBaoGao v-if="activeIndex == '1' && idOff" :orgId ="models.id"/>
          <geBuMenTiJiaoPingShenBaoGao v-if="activeIndex == '2'&& idOff" :orgId ="models.id"/>
          <shiYanShiJianBiDuiYiLanXiang v-if="activeIndex == '3'&& idOff" :orgId ="models.id"/>
          <nengLiRenZhengYiLanXiang v-if="activeIndex == '4'&& idOff" :orgId ="models.id"/>
          <zhiLiangKongZhiPingShenBiao v-if="activeIndex == '5'&& idOff" :orgId ="models.id"/>
          <neiShenJianCha v-if="activeIndex == '6'&& idOff" :orgId ="models.id"/>
          <zhiLiangJianDuShiShi v-if="activeIndex == '7'&& idOff" :orgId ="models.id"/>
    </div>


  </el-dialog>
</template>
<script>
import { save, get } from '@/api/demo/bumenzhiliang/buMenJiGou'
import ActionUtils from '@/utils/action'
import {validateRequired} from '@/utils/validate'
  //------------------------------------------------------------------------
  import buFuHeXiangBaoGao from '../buFuHeXiangBaoGao/list'
  import geBuMenTiJiaoPingShenBaoGao from '../geBuMenTiJiaoPingShenBaoGao/list'
  import shiYanShiJianBiDuiYiLanXiang from '../shiYanShiJianBiDuiYiLanXiang/list'
  import nengLiRenZhengYiLanXiang from '../nengLiRenZhengYiLanXiang/list'
  import neiShenJianCha from '../neiShenJianCha/list'
  import zhiLiangKongZhiPingShenBiao from '../zhiLiangKongZhiPingShenBiao/list'
  import zhiLiangJianDuShiShi from '../zhiLiangJianDuShiShi/list'
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
   buFuHeXiangBaoGao,
   geBuMenTiJiaoPingShenBaoGao,
   neiShenJianCha,
   nengLiRenZhengYiLanXiang,
   shiYanShiJianBiDuiYiLanXiang,
   zhiLiangJianDuShiShi,
   zhiLiangKongZhiPingShenBiao
 },
   data() {
     return {
       idOff:false,
       formName: 'form',
       dialogVisible: this.visible,
       dialogLoading: false,
       defaultForm: {},
       models: {
               id: '',
               name: '',
               orgAlias: '',
               status: '',
               levelId: '',
               roleIds: '',
               createTime: '',
               updateTime: '',
               tenantId: '',
               managerId: '',
               bieCheng: '',
               orgId: '',
               orgPerms: '',
               userPerms: '',
               elseName: '',
               else2Name: ''
             },
       activeIndex:'1',
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
       actions:[{ key: 'cancel' }],
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
   },
   methods: {
     handleSelect(key, keyPath) {
            this.activeIndex = key
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
        this.models ={
               id: '',
               name: '',
               orgAlias: '',
               status: '',
               levelId: '',
               roleIds: '',
               createTime: '',
               updateTime: '',
               tenantId: '',
               managerId: '',
               bieCheng: '',
               orgId: '',
               orgPerms: '',
               userPerms: '',
               elseName: '',
               else2Name: ''
             }
        this.activeIndex="1"
        this.idOff = false
      },
      /**
       * 获取表单数据
       */
      getFormData() {
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
