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
      <el-form-item label="方法名称:" prop="fangFaMingChen">
        <el-input v-if="!readonly" v-model="form.fangFaMingChen" />
        <span v-else>{{ form.fangFaMingChen }}</span>
      </el-form-item>
      <el-form-item label="申报部门:" prop="shenBaoBuMen">
        <el-input v-if="!readonly" v-model="form.shenBaoBuMen" />
        <span v-else>{{ form.shenBaoBuMen }}</span>
      </el-form-item>
      <el-form-item label="技术负责人:" prop="jiShuFuZeRen">
        <el-input v-if="!readonly" v-model="form.jiShuFuZeRen" />
        <span v-else>{{ form.jiShuFuZeRen }}</span>
      </el-form-item>
      <el-form-item label="内容及应用条件:" prop="neiRongJiYing">
        <el-input v-if="!readonly" v-model="form.neiRongJiYing" />
        <span v-else>{{ form.neiRongJiYing }}</span>
      </el-form-item>
      <el-form-item label="专家评审意见:" prop="zhuanJiaPingSh">
        <el-input v-if="!readonly" v-model="form.zhuanJiaPingSh" />
        <span v-else>{{ form.zhuanJiaPingSh }}</span>
      </el-form-item>
      <el-form-item label="方法启用日期:" prop="fangFaQiYongR">
        <el-input v-if="!readonly" v-model="form.fangFaQiYongR" />
        <span v-else>{{ form.fangFaQiYongR }}</span>
      </el-form-item>
      <el-form-item label="审批通过:" prop="shenPiTongGuo">
        <el-input v-if="!readonly" v-model="form.shenPiTongGuo" />
        <span v-else>{{ form.shenPiTongGuo }}</span>
      </el-form-item>
      <el-form-item label="鉴定方法类型:" prop="jianDingFangFa">
        <el-input v-if="!readonly" v-model="form.jianDingFangFa" />
        <span v-else>{{ form.jianDingFangFa }}</span>
      </el-form-item>
      <el-form-item label="备用一:" prop="beiYongYi">
        <el-input v-if="!readonly" v-model="form.beiYongYi" />
        <span v-else>{{ form.beiYongYi }}</span>
      </el-form-item>
      <el-form-item label="备用二:" prop="beiYongEr">
        <el-input v-if="!readonly" v-model="form.beiYongEr" />
        <span v-else>{{ form.beiYongEr }}</span>
      </el-form-item>
      <el-form-item label="备用三:" prop="beiYongSan">
        <el-input v-if="!readonly" v-model="form.beiYongSan" />
        <span v-else>{{ form.beiYongSan }}</span>
      </el-form-item>
      <el-form-item label="我是测试字段:" prop="woShiCeShiZi">
        <el-input v-if="!readonly" v-model="form.woShiCeShiZi" />
        <span v-else>{{ form.woShiCeShiZi }}</span>
      </el-form-item>
      <el-form-item label="标准方法编号:" prop="biaoZhunFangFa">
        <el-input v-if="!readonly" v-model="form.biaoZhunFangFa" />
        <span v-else>{{ form.biaoZhunFangFa }}</span>
      </el-form-item>
      <el-form-item label="申请时间:" prop="shenQingShiJia">
        <el-input v-if="!readonly" v-model="form.shenQingShiJia" />
        <span v-else>{{ form.shenQingShiJia }}</span>
      </el-form-item>
      <el-form-item label="申请人:" prop="shenQingRen">
        <el-input v-if="!readonly" v-model="form.shenQingRen" />
        <span v-else>{{ form.shenQingRen }}</span>
      </el-form-item>
      <el-form-item label="申请人员:" prop="shenQingRenYua">
        <el-input v-if="!readonly" v-model="form.shenQingRenYua" />
        <span v-else>{{ form.shenQingRenYua }}</span>
      </el-form-item>
      <el-form-item label="适用设备:" prop="shiYongSheBei">
        <el-input v-if="!readonly" v-model="form.shiYongSheBei" />
        <span v-else>{{ form.shiYongSheBei }}</span>
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
import { save, get } from '@/api/demo/fangfa/fangFaGuanLi'
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
        fangFaMingChen: '',
        shenBaoBuMen: '',
        jiShuFuZeRen: '',
        neiRongJiYing: '',
        zhuanJiaPingSh: '',
        fangFaQiYongR: '',
        shenPiTongGuo: '',
        jianDingFangFa: '',
        beiYongYi: '',
        beiYongEr: '',
        beiYongSan: '',
        woShiCeShiZi: '',
        biaoZhunFangFa: '',
        shenQingShiJia: '',
        shenQingRen: '',
        shenQingRenYua: '',
        shiYongSheBei: ''
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