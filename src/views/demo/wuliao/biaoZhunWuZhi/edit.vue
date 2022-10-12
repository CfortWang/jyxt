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
      <el-form-item label="外键:" prop="waiJian">
        <el-input v-if="!readonly" v-model="form.waiJian" />
        <span v-else>{{ form.waiJian }}</span>
      </el-form-item>
      <el-form-item label="计划总外键:" prop="jiHuaZongWaiJ">
        <el-input v-if="!readonly" v-model="form.jiHuaZongWaiJ" />
        <span v-else>{{ form.jiHuaZongWaiJ }}</span>
      </el-form-item>
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
      <el-form-item label="标准物质名称:" prop="biaoZhunWuZhi">
        <el-input v-if="!readonly" v-model="form.biaoZhunWuZhi" />
        <span v-else>{{ form.biaoZhunWuZhi }}</span>
      </el-form-item>
      <el-form-item label="标准物质性状:" prop="wuZhiXingZhuan">
        <el-input v-if="!readonly" v-model="form.wuZhiXingZhuan" />
        <span v-else>{{ form.wuZhiXingZhuan }}</span>
      </el-form-item>
      <el-form-item label="验收方法及结论:" prop="yanShouFangFa">
        <el-input v-if="!readonly" v-model="form.yanShouFangFa" />
        <span v-else>{{ form.yanShouFangFa }}</span>
      </el-form-item>
      <el-form-item label="验收人:" prop="yanShouRen">
        <el-input v-if="!readonly" v-model="form.yanShouRen" />
        <span v-else>{{ form.yanShouRen }}</span>
      </el-form-item>
      <el-form-item label="验收部门:" prop="yanShouBuMen">
        <el-input v-if="!readonly" v-model="form.yanShouBuMen" />
        <span v-else>{{ form.yanShouBuMen }}</span>
      </el-form-item>
      <el-form-item label="编制时间:" prop="bianZhiShiJian">
        <el-input v-if="!readonly" v-model="form.bianZhiShiJian" />
        <span v-else>{{ form.bianZhiShiJian }}</span>
      </el-form-item>
      <el-form-item label="是否过审:" prop="shiFouGuoShen">
        <el-input v-if="!readonly" v-model="form.shiFouGuoShen" />
        <span v-else>{{ form.shiFouGuoShen }}</span>
      </el-form-item>
      <el-form-item label="数量情况:" prop="shuLiangQingKu">
        <el-input v-if="!readonly" v-model="form.shuLiangQingKu" />
        <span v-else>{{ form.shuLiangQingKu }}</span>
      </el-form-item>
      <el-form-item label="物质编号:" prop="wuZhiBianHao">
        <el-input v-if="!readonly" v-model="form.wuZhiBianHao" />
        <span v-else>{{ form.wuZhiBianHao }}</span>
      </el-form-item>
      <el-form-item label="过期时间:" prop="guoQiShiJian">
        <el-input v-if="!readonly" v-model="form.guoQiShiJian" />
        <span v-else>{{ form.guoQiShiJian }}</span>
      </el-form-item>
      <el-form-item label="标准品批次:" prop="biaoZhunPinPi">
        <el-input v-if="!readonly" v-model="form.biaoZhunPinPi" />
        <span v-else>{{ form.biaoZhunPinPi }}</span>
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
import { save, get } from '@/api/demo/wuliao/biaoZhunWuZhi'
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
        waiJian: '',
        jiHuaZongWaiJ: '',
        tenantId: '',
        ip: '',
        createBy: '',
        createTime: '',
        updateBy: '',
        updateTime: '',
        biaoZhunWuZhi: '',
        wuZhiXingZhuan: '',
        yanShouFangFa: '',
        yanShouRen: '',
        yanShouBuMen: '',
        bianZhiShiJian: '',
        shiFouGuoShen: '',
        shuLiangQingKu: '',
        wuZhiBianHao: '',
        guoQiShiJian: '',
        biaoZhunPinPi: ''
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