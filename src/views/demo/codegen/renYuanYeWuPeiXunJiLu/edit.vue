<template>
  <el-dialog :title="title" :visible.sync="dialogVisible"  append-to-body :close-on-click-modal="false" class="dialog" @open="getFormData"
    @close="closeDialog">
    <el-form ref="form" v-loading="dialogLoading" :rules="rules" :element-loading-text="$t('common.loading')" :model="form"
      :label-width="formLabelWidth">

      <el-form-item label="培训时间:" prop="shiJian">
        <el-date-picker v-model="form.shiJian" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
          placeholder="请选择" style="width:100%" v-if="!readonly" :clearable="true" />
        <span v-else>{{ form.shiJian }}</span>
      </el-form-item>


      <el-form-item label="培训单位:" prop="peiXunDanWei">
        <el-input v-if="!readonly" v-model="form.peiXunDanWei" />
        <span v-else>{{ form.peiXunDanWei }}</span>
      </el-form-item>
      <el-form-item label="考核情况:" prop="kaoHeQingKuang">
        <el-input v-if="!readonly" v-model="form.kaoHeQingKuang" />
        <span v-else>{{ form.kaoHeQingKuang }}</span>
      </el-form-item>
      <el-form-item label="培训原因:" prop="peiXunYuanYin">
        <el-input v-if="!readonly" v-model="form.peiXunYuanYin" />
        <span v-else>{{ form.peiXunYuanYin }}</span>
      </el-form-item>
      <el-form-item label="登记人:" prop="jiLuRen">
        <ibps-user-selector v-model="form.jiLuRen" placeholder="请选择" type="user" :multiple="true" store="id"
          :disabled="readonly" readonly-text="text" style="width:100%" />
      </el-form-item>
      <el-form-item label="培训主要内容:" prop="peiXunZhuYaoNei">
        <el-input v-if="!readonly" type="textarea"  :rows="2" v-model="form.peiXunZhuYaoNei" />
        <span v-else>{{ form.peiXunZhuYaoNei }}</span>
      </el-form-item>
      <el-form-item label="附件:" prop="fuJian">
        <ibps-attachment v-model="form.fuJian" placeholder="请选择" :download="true" :readonly="readonly" accept="*"
          :multiple="true" upload-type="default" store="id" media-type="" media="" style="width:100%" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="el-dialog--center">
      <ibps-toolbar :actions="toolbars" @action-event="handleActionEvent" />
    </div>
  </el-dialog>
</template>

<script>
  import {
    save,
    get
  } from '@/api/demo/codegen/renYuanYeWuPeiXunJiLu'
   import IbpsAttachment from '@/business/platform/file/attachment/selector'
  import ActionUtils from '@/utils/action'
   import IbpsUserSelector from '@/business/platform/org/selector'
  // import { validateKey } from '@/utils/validate'

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
      title: String,
      userId:String,
    },
    components: {
      'ibps-user-selector': IbpsUserSelector,
      'ibps-attachment': IbpsAttachment,
      },
    data() {
      return {
        formName: 'form',
        formLabelWidth: '120px',
        dialogVisible: this.visible,
        dialogLoading: false,
        defaultForm: {},
        defaulRules: {},
        form: {
          id: '',
          parentId: '',
          tenantId: '',
          ip: '',
          createBy: '',
          createTime: '',
          updateBy: '',
          updateTime: '',
          buMen: '',
          jiLuBianHao: '',
          peiXunZhuTi: '',
          keShi: '',
          peiXunDuiXiang: '',
          renShu: '',
          peiXunDiDian: '',
          shiJian: '',
          shouKeLaoShi: '',
          jiLuRen: '',
          peiXunDanWei:'',
          peiXunZhuYaoNei: '',
          kaoHeQingKuang: '',
          xiaoGuoPingGu: '',
          yiXuanRenYuan:'' ,
          peiXunYuanYin: '',
          xuanZeXiaoGuo: '',
          jiHuaRenShu: '',
          jiHuaFuZeRen: '',
          peiXunFangShi: '',
          jiHuaShiJian: '',
          jiHuaPeiXunNei: '',
          jiHuaPeiXu: '',
          xuanZeJiHua: '',
          shiFouGuoShen: '',
          shiFouGuiHua: '',
          jiHuaZongWaiJ: '',
          fuJian: ''
        },
        rules: {
          // id: [{ required: true, message: this.$t('validate.required') }, { validator: validateKey, trigger: 'blur' }],
        },
        toolbars: [{
            key: 'save',
            hidden: () => {
              return this.readonly
            }
          },
          {
            key: 'cancel'
          }
        ]
      }
    },
    computed: {
      formId() {
        return this.id
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
    created() {
      this.defaultForm = JSON.parse(JSON.stringify(this.form))
      this.defaulRules = JSON.parse(JSON.stringify(this.rules))
    },
    methods: {
      handleActionEvent({
        key
      }) {
        switch (key) {
          case 'save':
            this.handleSave()
            break
          case 'cancel':
            this.closeDialog()
            break
          default:
            break
        }
      },
      /**
       * 表单验证
       */
      formValidate() {
        if (this.readonly) return
        this.$nextTick(() => {
          this.$refs[this.formName].validate(() => {})
        })
      },
      // 保存数据
      handleSave() {
        this.$refs[this.formName].validate(valid => {
          if (valid) {
            this.saveData()
          } else {
            ActionUtils.saveErrorMessage()
          }
        })
      },
      // 提交保存数据
      saveData() {
        save(this.form).then(response => {
          this.$emit('callback', this)
          ActionUtils.saveSuccessMessage('保存成功', (rtn) => {
            if (this.$utils.isEmpty(this.formId)) {
              this.$refs[this.formName].resetFields()
            }
            if (rtn) {
              this.closeDialog()
            }
          })
        }).catch((err) => {
          console.info(err)
        })
      },
      // 关闭当前窗口
      closeDialog() {
        this.$emit('close', false)
        this.$refs[this.formName].resetFields()
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
          this.form = JSON.parse(JSON.stringify(this.defaultForm))
          this.formValidate()
          this.form.yiXuanRenYuan = this.userId
          this.form.jiLuRen = this.userId
          this.form.buMen = this.$store.getters.userInfo.org.id
           this.form.shiFouGuoShen = '1'
          return
        }
        this.dialogLoading = true
        get({
          id: this.formId
        }).then(response => {
          this.form = response.data
          this.dialogLoading = false
        }).catch(() => {
          this.dialogLoading = false
        })
      }
    }

  }
</script>
