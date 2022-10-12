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
      <el-form-item label="外键:" prop="waiJian">
        <el-input v-if="!readonly" v-model="form.waiJian" />
        <span v-else>{{ form.waiJian }}</span>
      </el-form-item>
      <el-form-item label="物品名称:" prop="wuPinMingCheng">
        <el-input v-if="!readonly" v-model="form.wuPinMingCheng" />
        <span v-else>{{ form.wuPinMingCheng }}</span>
      </el-form-item>
      <el-form-item label="供应商:" prop="gongYingShang">
        <el-input v-if="!readonly" v-model="form.gongYingShang" />
        <span v-else>{{ form.gongYingShang }}</span>
      </el-form-item>
      <el-form-item label="验收人:" prop="yanShouRen">
        <el-input v-if="!readonly" v-model="form.yanShouRen" />
        <span v-else>{{ form.yanShouRen }}</span>
      </el-form-item>
      <el-form-item label="验收日期:" prop="yanShouRiQi">
        <el-input v-if="!readonly" v-model="form.yanShouRiQi" />
        <span v-else>{{ form.yanShouRiQi }}</span>
      </el-form-item>
      <el-form-item label="外观情况:" prop="waiGuanQingKua">
        <el-input v-if="!readonly" v-model="form.waiGuanQingKua" />
        <span v-else>{{ form.waiGuanQingKua }}</span>
      </el-form-item>
      <el-form-item label="规格情况:" prop="guiGeQingKuang">
        <el-input v-if="!readonly" v-model="form.guiGeQingKuang" />
        <span v-else>{{ form.guiGeQingKuang }}</span>
      </el-form-item>
      <el-form-item label="级别情况:" prop="jiBieQingKuang">
        <el-input v-if="!readonly" v-model="form.jiBieQingKuang" />
        <span v-else>{{ form.jiBieQingKuang }}</span>
      </el-form-item>
      <el-form-item label="数量情况:" prop="shuLiangQingKu">
        <el-input v-if="!readonly" v-model="form.shuLiangQingKu" />
        <span v-else>{{ form.shuLiangQingKu }}</span>
      </el-form-item>
      <el-form-item label="验收方法:" prop="yanShouFangFa">
        <el-input v-if="!readonly" v-model="form.yanShouFangFa" />
        <span v-else>{{ form.yanShouFangFa }}</span>
      </el-form-item>
      <el-form-item label="检验结果:" prop="jianYanJieGuo">
        <el-input v-if="!readonly" v-model="form.jianYanJieGuo" />
        <span v-else>{{ form.jianYanJieGuo }}</span>
      </el-form-item>
      <el-form-item label="其他情况:" prop="qiTaQingKuang">
        <el-input v-if="!readonly" v-model="form.qiTaQingKuang" />
        <span v-else>{{ form.qiTaQingKuang }}</span>
      </el-form-item>
      <el-form-item label="外观符合:" prop="waiGuanFuHe">
        <el-input v-if="!readonly" v-model="form.waiGuanFuHe" />
        <span v-else>{{ form.waiGuanFuHe }}</span>
      </el-form-item>
      <el-form-item label="级别符合:" prop="jiBieFuHe">
        <el-input v-if="!readonly" v-model="form.jiBieFuHe" />
        <span v-else>{{ form.jiBieFuHe }}</span>
      </el-form-item>
      <el-form-item label="数量符合:" prop="shuLiangFuHe">
        <el-input v-if="!readonly" v-model="form.shuLiangFuHe" />
        <span v-else>{{ form.shuLiangFuHe }}</span>
      </el-form-item>
      <el-form-item label="质量符合:" prop="zhiLiangFuHe">
        <el-input v-if="!readonly" v-model="form.zhiLiangFuHe" />
        <span v-else>{{ form.zhiLiangFuHe }}</span>
      </el-form-item>
      <el-form-item label="规格符合:" prop="guiGeFuHe">
        <el-input v-if="!readonly" v-model="form.guiGeFuHe" />
        <span v-else>{{ form.guiGeFuHe }}</span>
      </el-form-item>
      <el-form-item label="质量情况:" prop="zhiLiangQingKu">
        <el-input v-if="!readonly" v-model="form.zhiLiangQingKu" />
        <span v-else>{{ form.zhiLiangQingKu }}</span>
      </el-form-item>
      <el-form-item label="是否过审:" prop="shiFouGuoShen">
        <el-input v-if="!readonly" v-model="form.shiFouGuoShen" />
        <span v-else>{{ form.shiFouGuoShen }}</span>
      </el-form-item>
      <el-form-item label="数量状况:" prop="shuLiangZhuang">
        <el-input v-if="!readonly" v-model="form.shuLiangZhuang" />
        <span v-else>{{ form.shuLiangZhuang }}</span>
      </el-form-item>
      <el-form-item label="编制部门:" prop="bianZhiBuMen">
        <el-input v-if="!readonly" v-model="form.bianZhiBuMen" />
        <span v-else>{{ form.bianZhiBuMen }}</span>
      </el-form-item>
      <el-form-item label="编制人:" prop="bianZhiRen">
        <el-input v-if="!readonly" v-model="form.bianZhiRen" />
        <span v-else>{{ form.bianZhiRen }}</span>
      </el-form-item>
      <el-form-item label="编制时间:" prop="bianZhiShiJian">
        <el-input v-if="!readonly" v-model="form.bianZhiShiJian" />
        <span v-else>{{ form.bianZhiShiJian }}</span>
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
import { save, get } from '@/api/demo/wuliao/caiGouYanShou'
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
        jiHuaZongWaiJ: '',
        tenantId: '',
        ip: '',
        createBy: '',
        createTime: '',
        updateBy: '',
        updateTime: '',
        waiJian: '',
        wuPinMingCheng: '',
        gongYingShang: '',
        yanShouRen: '',
        yanShouRiQi: '',
        waiGuanQingKua: '',
        guiGeQingKuang: '',
        jiBieQingKuang: '',
        shuLiangQingKu: '',
        yanShouFangFa: '',
        jianYanJieGuo: '',
        qiTaQingKuang: '',
        waiGuanFuHe: '',
        jiBieFuHe: '',
        shuLiangFuHe: '',
        zhiLiangFuHe: '',
        guiGeFuHe: '',
        zhiLiangQingKu: '',
        shiFouGuoShen: '',
        shuLiangZhuang: '',
        bianZhiBuMen: '',
        bianZhiRen: '',
        bianZhiShiJian: ''
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