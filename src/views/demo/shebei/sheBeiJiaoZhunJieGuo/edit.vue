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
      <el-form-item label="设备编号:" prop="sheBeiBianHao">
        <el-input v-if="!readonly" v-model="form.sheBeiBianHao" />
        <span v-else>{{ form.sheBeiBianHao }}</span>
      </el-form-item>
      <el-form-item label="设备名称:" prop="sheBeiMingChen">
        <el-input v-if="!readonly" v-model="form.sheBeiMingChen" />
        <span v-else>{{ form.sheBeiMingChen }}</span>
      </el-form-item>
      <el-form-item label="设备型号:" prop="sheBeiXingHao">
        <el-input v-if="!readonly" v-model="form.sheBeiXingHao" />
        <span v-else>{{ form.sheBeiXingHao }}</span>
      </el-form-item>
      <el-form-item label="出厂编号:" prop="chuChangBianHa">
        <el-input v-if="!readonly" v-model="form.chuChangBianHa" />
        <span v-else>{{ form.chuChangBianHa }}</span>
      </el-form-item>
      <el-form-item label="计量单位:" prop="jiLiangDanWei">
        <el-input v-if="!readonly" v-model="form.jiLiangDanWei" />
        <span v-else>{{ form.jiLiangDanWei }}</span>
      </el-form-item>
      <el-form-item label="计量证书编号:" prop="jiLiangZhengSh">
        <el-input v-if="!readonly" v-model="form.jiLiangZhengSh" />
        <span v-else>{{ form.jiLiangZhengSh }}</span>
      </el-form-item>
      <el-form-item label="设备技术指标:" prop="sheBeiJiShuZh">
        <el-input v-if="!readonly" v-model="form.sheBeiJiShuZh" />
        <span v-else>{{ form.sheBeiJiShuZh }}</span>
      </el-form-item>
      <el-form-item label="计量校准/检定结果（数据）:" prop="jiLiangXiaoZhu">
        <el-input v-if="!readonly" v-model="form.jiLiangXiaoZhu" />
        <span v-else>{{ form.jiLiangXiaoZhu }}</span>
      </el-form-item>
      <el-form-item label="确认依据的检测标准及技术要求:" prop="queRenYiJuDe">
        <el-input v-if="!readonly" v-model="form.queRenYiJuDe" />
        <span v-else>{{ form.queRenYiJuDe }}</span>
      </el-form-item>
      <el-form-item label="确认结果:" prop="queRenJieGuo">
        <el-input v-if="!readonly" v-model="form.queRenJieGuo" />
        <span v-else>{{ form.queRenJieGuo }}</span>
      </el-form-item>
      <el-form-item label="备 注:" prop="beiZhu">
        <el-input v-if="!readonly" v-model="form.beiZhu" />
        <span v-else>{{ form.beiZhu }}</span>
      </el-form-item>
      <el-form-item label="组织:" prop="zuZhi">
        <el-input v-if="!readonly" v-model="form.zuZhi" />
        <span v-else>{{ form.zuZhi }}</span>
      </el-form-item>
      <el-form-item label="年度计划:" prop="nianDuJiHua">
        <el-input v-if="!readonly" v-model="form.nianDuJiHua" />
        <span v-else>{{ form.nianDuJiHua }}</span>
      </el-form-item>
      <el-form-item label="年度计划流程:" prop="nianDuJiHuaLc">
        <el-input v-if="!readonly" v-model="form.nianDuJiHuaLc" />
        <span v-else>{{ form.nianDuJiHuaLc }}</span>
      </el-form-item>
      <el-form-item label="计划总外键:" prop="jiHuaZongWaiJ">
        <el-input v-if="!readonly" v-model="form.jiHuaZongWaiJ" />
        <span v-else>{{ form.jiHuaZongWaiJ }}</span>
      </el-form-item>
      <el-form-item label="外键:" prop="waiJian">
        <el-input v-if="!readonly" v-model="form.waiJian" />
        <span v-else>{{ form.waiJian }}</span>
      </el-form-item>
      <el-form-item label="编制时间:" prop="bianZhiShiJian">
        <el-input v-if="!readonly" v-model="form.bianZhiShiJian" />
        <span v-else>{{ form.bianZhiShiJian }}</span>
      </el-form-item>
      <el-form-item label="编制人:" prop="bianZhiRen">
        <el-input v-if="!readonly" v-model="form.bianZhiRen" />
        <span v-else>{{ form.bianZhiRen }}</span>
      </el-form-item>
      <el-form-item label="编制部门:" prop="bianZhiBuMen">
        <el-input v-if="!readonly" v-model="form.bianZhiBuMen" />
        <span v-else>{{ form.bianZhiBuMen }}</span>
      </el-form-item>
      <el-form-item label="设备管理员:" prop="sheBeiGuanLiY">
        <el-input v-if="!readonly" v-model="form.sheBeiGuanLiY" />
        <span v-else>{{ form.sheBeiGuanLiY }}</span>
      </el-form-item>
      <el-form-item label="对应文件:" prop="duiYingWenJian">
        <el-input v-if="!readonly" v-model="form.duiYingWenJian" />
        <span v-else>{{ form.duiYingWenJian }}</span>
      </el-form-item>
      <el-form-item label="是否过审:" prop="shiFouGuoShen">
        <el-input v-if="!readonly" v-model="form.shiFouGuoShen" />
        <span v-else>{{ form.shiFouGuoShen }}</span>
      </el-form-item>
      <el-form-item label="检定周期:" prop="jianDingZhouQi">
        <el-input v-if="!readonly" v-model="form.jianDingZhouQi" />
        <span v-else>{{ form.jianDingZhouQi }}</span>
      </el-form-item>
      <el-form-item label="检定日期:" prop="jianDingRiQi">
        <el-input v-if="!readonly" v-model="form.jianDingRiQi" />
        <span v-else>{{ form.jianDingRiQi }}</span>
      </el-form-item>
      <el-form-item label="最大允差不确定度精度等级:" prop="zuiDaYunChaBu">
        <el-input v-if="!readonly" v-model="form.zuiDaYunChaBu" />
        <span v-else>{{ form.zuiDaYunChaBu }}</span>
      </el-form-item>
      <el-form-item label="量程:" prop="liangCheng">
        <el-input v-if="!readonly" v-model="form.liangCheng" />
        <span v-else>{{ form.liangCheng }}</span>
      </el-form-item>
      <el-form-item label="对应计划:" prop="duiYingJiHua">
        <el-input v-if="!readonly" v-model="form.duiYingJiHua" />
        <span v-else>{{ form.duiYingJiHua }}</span>
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
import { save, get } from '@/api/demo/shebei/sheBeiJiaoZhunJieGuo'
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
        sheBeiBianHao: '',
        sheBeiMingChen: '',
        sheBeiXingHao: '',
        chuChangBianHa: '',
        jiLiangDanWei: '',
        jiLiangZhengSh: '',
        sheBeiJiShuZh: '',
        jiLiangXiaoZhu: '',
        queRenYiJuDe: '',
        queRenJieGuo: '',
        beiZhu: '',
        zuZhi: '',
        nianDuJiHua: '',
        nianDuJiHuaLc: '',
        jiHuaZongWaiJ: '',
        waiJian: '',
        bianZhiShiJian: '',
        bianZhiRen: '',
        bianZhiBuMen: '',
        sheBeiGuanLiY: '',
        duiYingWenJian: '',
        shiFouGuoShen: '',
        jianDingZhouQi: '',
        jianDingRiQi: '',
        zuiDaYunChaBu: '',
        liangCheng: '',
        duiYingJiHua: ''
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