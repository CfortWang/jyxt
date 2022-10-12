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
    <el-row>

      <el-col :span="12">
        <el-form-item label="编制人:" prop="bianZhiRen">

           <ibps-user-selector
                  v-model="form.bianZhiRen"
                  placeholder="请选择"
                  type="user"
                  :multiple="false"
                  store="id"
                  :disabled="true"
                  :readonly-text="readonly?'text':null"
                  style="width:100%"
                />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="编制部门:" prop="bianZhiBuMen">

           <ibps-user-selector
                  v-model="form.bianZhiBuMen"
                  placeholder="请选择"
                  type="org"
                  :multiple="false"
                  store="id"
                  :disabled="true"
                  :readonly-text="readonly?'text':null"
                  style="width:100%"
                />
        </el-form-item>
      </el-col>
    </el-row>
      <el-form-item label="维护日期:" prop="weiHuRiQi">

        <el-date-picker
                v-model="form.weiHuRiQi"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="请选择"
                style="width:100%"
                v-if="!readonly"
                :clearable="true"
              />
        <span v-else>{{ form.weiHuRiQi }}</span>
      </el-form-item>
      <el-form-item label="维护内容:" prop="weiHuNeiRong">
        <el-input v-if="!readonly"  :rows="3" type="textarea" v-model="form.weiHuNeiRong" />
        <span v-else>{{ form.weiHuNeiRong }}</span>
      </el-form-item>
      <el-form-item label="备注:" prop="beiZhu">
        <el-input v-if="!readonly"  :rows="3" type="textarea" v-model="form.beiZhu" />
        <span v-else>{{ form.beiZhu }}</span>
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
import { save, get } from '@/api/demo/shebei/sheBeiWeiHu'
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
    devId:String,
  },
   components: {
        'ibps-user-selector': IbpsUserSelector
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
        waiJian:this.devId,
        tenantId: '',
        ip: '',
        createBy: '',
        createTime: '',
        updateBy: '',
        updateTime: '',
        bianZhiRen: this.$store.getters.userInfo.user.id,
        bianZhiBuMen: this.$store.getters.userInfo.org.id,
        weiHuRiQi: '',
        weiHuNeiRong: '',
        beiZhu: ''
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
      console.info(this.form)
      save(this.form).then(response => {
        this.$emit('callback', this)
        ActionUtils.saveSuccessMessage(response.message, (rtn) => {
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
