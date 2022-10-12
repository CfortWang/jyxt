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
      <el-form-item label="所属部门专业:" prop="suoShuBuMen">
        <el-input v-if="!readonly" v-model="form.suoShuBuMen" />
        <span v-else>{{ form.suoShuBuMen }}</span>
      </el-form-item>
      <el-form-item label="仪器id:" prop="yiQiId">
        <el-input v-if="!readonly" v-model="form.yiQiId" />
        <span v-else>{{ form.yiQiId }}</span>
      </el-form-item>
      <el-form-item label="使用开始时间:" prop="shiYongKai">
        <el-input v-if="!readonly" v-model="form.shiYongKai" />
        <span v-else>{{ form.shiYongKai }}</span>
      </el-form-item>
      <el-form-item label="使用结束时间:" prop="shiYongJieShu">
        <el-input v-if="!readonly" v-model="form.shiYongJieShu" />
        <span v-else>{{ form.shiYongJieShu }}</span>
      </el-form-item>
      <el-form-item label="委托书id:" prop="weiTuoShuId">
        <el-input v-if="!readonly" v-model="form.weiTuoShuId" />
        <span v-else>{{ form.weiTuoShuId }}</span>
      </el-form-item>
      <el-form-item label="设备状况:" prop="sheBeiZhuang">
        <el-input v-if="!readonly" v-model="form.sheBeiZhuang" />
        <span v-else>{{ form.sheBeiZhuang }}</span>
      </el-form-item>
      <el-form-item label="使用人:" prop="shiYongRen">
        <el-input v-if="!readonly" v-model="form.shiYongRen" />
        <span v-else>{{ form.shiYongRen }}</span>
      </el-form-item>
      <el-form-item label="备注:" prop="beiZhu">
        <el-input v-if="!readonly" v-model="form.beiZhu" />
        <span v-else>{{ form.beiZhu }}</span>
      </el-form-item>
      <el-form-item label="外键:" prop="waiJian">
        <el-input v-if="!readonly" v-model="form.waiJian" />
        <span v-else>{{ form.waiJian }}</span>
      </el-form-item>
      <el-form-item label="编制人:" prop="bianZhiRen">
        <el-input v-if="!readonly" v-model="form.bianZhiRen" />
        <span v-else>{{ form.bianZhiRen }}</span>
      </el-form-item>
      <el-form-item label="编制部门:" prop="bianZhiBuMen">
        <el-input v-if="!readonly" v-model="form.bianZhiBuMen" />
        <span v-else>{{ form.bianZhiBuMen }}</span>
      </el-form-item>
      <el-form-item label="编制时间:" prop="bianZhiShiJian">
        <el-input v-if="!readonly" v-model="form.bianZhiShiJian" />
        <span v-else>{{ form.bianZhiShiJian }}</span>
      </el-form-item>
      <el-form-item label="案件受理编号:" prop="shoulibh">
        <el-input v-if="!readonly" v-model="form.shoulibh" />
        <span v-else>{{ form.shoulibh }}</span>
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
import { save, get } from '@/api/demo/shebei/sheBeiShiYong'
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
        suoShuBuMen: '',
        yiQiId: '',
        shiYongKai: '',
        shiYongJieShu: '',
        weiTuoShuId: '',
        sheBeiZhuang: '',
        shiYongRen: '',
        beiZhu: '',
        waiJian: '',
        bianZhiRen: '',
        bianZhiBuMen: '',
        bianZhiShiJian: '',
        shoulibh: ''
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