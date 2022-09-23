<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
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
      <el-form-item label="租户ID:" prop="tenantId">
        <el-input v-if="!readonly" v-model="form.tenantId" />
        <span v-else>{{ form.tenantId }}</span>
      </el-form-item>
      <el-form-item label="IP地址:" prop="ip">
        <el-input v-if="!readonly" v-model="form.ip" />
        <span v-else>{{ form.ip }}</span>
      </el-form-item>
      <el-form-item label="创建人:" prop="createBy">
        <el-input v-if="!readonly" v-model="form.createBy" />
        <span v-else>{{ form.createBy }}</span>
      </el-form-item>
      <el-form-item label="创建时间:" prop="createTime">
        <el-input v-if="!readonly" v-model="form.createTime" />
        <span v-else>{{ form.createTime }}</span>
      </el-form-item>
      <el-form-item label="更新人:" prop="updateBy">
        <el-input v-if="!readonly" v-model="form.updateBy" />
        <span v-else>{{ form.updateBy }}</span>
      </el-form-item>
      <el-form-item label="更新时间:" prop="updateTime">
        <el-input v-if="!readonly" v-model="form.updateTime" />
        <span v-else>{{ form.updateTime }}</span>
      </el-form-item>
      <el-form-item label="姓名:" prop="xingMing">
        <el-input v-if="!readonly" v-model="form.xingMing" />
        <span v-else>{{ form.xingMing }}</span>
      </el-form-item>
      <el-form-item label="部门:" prop="buMen">
        <el-input v-if="!readonly" v-model="form.buMen" />
        <span v-else>{{ form.buMen }}</span>
      </el-form-item>
      <el-form-item label="技术职称:" prop="jiShuZhiCheng">
        <el-input v-if="!readonly" v-model="form.jiShuZhiCheng" />
        <span v-else>{{ form.jiShuZhiCheng }}</span>
      </el-form-item>
      <el-form-item label="考核类别:" prop="kaoHeLeiBie">
        <el-input v-if="!readonly" v-model="form.kaoHeLeiBie" />
        <span v-else>{{ form.kaoHeLeiBie }}</span>
      </el-form-item>
      <el-form-item label="考核形式:" prop="kaoHeXingShi">
        <el-input v-if="!readonly" v-model="form.kaoHeXingShi" />
        <span v-else>{{ form.kaoHeXingShi }}</span>
      </el-form-item>
      <el-form-item label="考核开始时间:" prop="kaoHeKaiShiSh">
        <el-input v-if="!readonly" v-model="form.kaoHeKaiShiSh" />
        <span v-else>{{ form.kaoHeKaiShiSh }}</span>
      </el-form-item>
      <el-form-item label="考核结束时间:" prop="kaoHeJieShuSh">
        <el-input v-if="!readonly" v-model="form.kaoHeJieShuSh" />
        <span v-else>{{ form.kaoHeJieShuSh }}</span>
      </el-form-item>
      <el-form-item label="考核内容:" prop="kaoHeNeiRong">
        <el-input v-if="!readonly" v-model="form.kaoHeNeiRong" />
        <span v-else>{{ form.kaoHeNeiRong }}</span>
      </el-form-item>
      <el-form-item label="考核结果:" prop="kaoHeJieGuo">
        <el-input v-if="!readonly" v-model="form.kaoHeJieGuo" />
        <span v-else>{{ form.kaoHeJieGuo }}</span>
      </el-form-item>
      <el-form-item label="考核意见:" prop="kaoHeYiJian">
        <el-input v-if="!readonly" v-model="form.kaoHeYiJian" />
        <span v-else>{{ form.kaoHeYiJian }}</span>
      </el-form-item>
      <el-form-item label="备注:" prop="beiZhu">
        <el-input v-if="!readonly" v-model="form.beiZhu" />
        <span v-else>{{ form.beiZhu }}</span>
      </el-form-item>
      <el-form-item label="是否过审:" prop="shiFouGuoShen">
        <el-input v-if="!readonly" v-model="form.shiFouGuoShen" />
        <span v-else>{{ form.shiFouGuoShen }}</span>
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
import { save, get } from '@/api/demo/codegen/yeWuKaoHeJiLu'
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
    title: String
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
        tenantId: '',
        ip: '',
        createBy: '',
        createTime: '',
        updateBy: '',
        updateTime: '',
        xingMing: '',
        buMen: '',
        jiShuZhiCheng: '',
        kaoHeLeiBie: '',
        kaoHeXingShi: '',
        kaoHeKaiShiSh: '',
        kaoHeJieShuSh: '',
        kaoHeNeiRong: '',
        kaoHeJieGuo: '',
        kaoHeYiJian: '',
        beiZhu: '',
        shiFouGuoShen: ''
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