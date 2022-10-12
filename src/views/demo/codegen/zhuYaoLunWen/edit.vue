<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    append-to-body
    class="dialog"
    @open="getFormData"
    @close="closeDialog"
  >
    <el-form
      ref="form"
      v-loading="dialogLoading"
      :rules="rules"
      :element-loading-text="$t('common.loading')"
      :model="form"
      :label-width="formLabelWidth"
    >
      <el-form-item label="发表或出版时间:" prop="faBiaoHuoChuBa">
        <el-date-picker v-model="form.faBiaoHuoChuBa" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
          placeholder="请选择" style="width:100%" v-if="!readonly" :clearable="true" />
        <span v-else>{{ form.faBiaoHuoChuBa }}</span>
      </el-form-item>
      <el-form-item label="论文、著作:" prop="lunWenZhu">
        <el-input v-if="!readonly" v-model="form.lunWenZhu" />
        <span v-else>{{ form.lunWenZhu }}</span>
        <div class="ibps-help-block" v-html="`或专题 技术分析报告标题`" />
      </el-form-item>
      <el-form-item label="作者及名次:" prop="zuoZheJiMingCi">
        <el-input v-if="!readonly" v-model="form.zuoZheJiMingCi" />
        <span v-else>{{ form.zuoZheJiMingCi }}</span>
      </el-form-item>
      <el-form-item label="刊物名称及刊号:" prop="kanWuMin">
        <el-input v-if="!readonly" v-model="form.kanWuMin" />
        <span v-else>{{ form.kanWuMin }}</span>
      </el-form-item>
      <el-form-item label="刊物主办单位:" prop="kanWuLunWenJ">
        <el-input v-if="!readonly" v-model="form.kanWuLunWenJ" />
        <span v-else>{{ form.kanWuLunWenJ }}</span>
        <div class="ibps-help-block" v-html="`或论文交流`" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="el-dialog--center">
      <ibps-toolbar
        :actions="toolbars"
        @action-event="handleActionEvent"
      />
    </div>
  </el-dialog>
</template>

<script>
import { save, get } from '@/api/demo/codegen/zhuYaoLunWen'
import ActionUtils from '@/utils/action'
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
    userId:String
  },
  data() {
    return {
      formName: 'form',
      formLabelWidth: '140px',
      dialogVisible: this.visible,
      dialogLoading: false,
      defaultForm: {},
      defaulRules: {},
      form: {
        id: '',
        parentId: this.userId,
        tenantId: '',
        ip: '',
        createBy: '',
        createTime: '',
        updateBy: '',
        updateTime: '',
        faBiaoHuoChuBa: '',
        lunWenZhu: '',
        zuoZheJiMingCi: '',
        kanWuMin: '',
        kanWuLunWenJ: ''
      },
      rules: {
        // id: [{ required: true, message: this.$t('validate.required') }, { validator: validateKey, trigger: 'blur' }],
      },
      toolbars: [
        { key: 'save', hidden: () => { return this.readonly } },
        { key: 'cancel' }
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
    handleActionEvent({ key }) {
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
