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
      <el-form-item label="申购部门:" prop="shenGouBuMen">
        <el-input v-if="!readonly" v-model="form.shenGouBuMen" />
        <span v-else>{{ form.shenGouBuMen }}</span>
      </el-form-item>
      <el-form-item label="联系人:" prop="lianXiRen">
        <el-input v-if="!readonly" v-model="form.lianXiRen" />
        <span v-else>{{ form.lianXiRen }}</span>
      </el-form-item>
      <el-form-item label="联系电话:" prop="lianXiDianHua">
        <el-input v-if="!readonly" v-model="form.lianXiDianHua" />
        <span v-else>{{ form.lianXiDianHua }}</span>
      </el-form-item>
      <el-form-item label="设备名称:" prop="sheBeiMingCheng">
        <el-input v-if="!readonly" v-model="form.sheBeiMingCheng" />
        <span v-else>{{ form.sheBeiMingCheng }}</span>
      </el-form-item>
      <el-form-item label="厂牌型号:" prop="changPaiXingHao">
        <el-input v-if="!readonly" v-model="form.changPaiXingHao" />
        <span v-else>{{ form.changPaiXingHao }}</span>
      </el-form-item>
      <el-form-item label="技术指标:" prop="jiShuZhiBiao">
        <el-input v-if="!readonly" v-model="form.jiShuZhiBiao" />
        <span v-else>{{ form.jiShuZhiBiao }}</span>
      </el-form-item>
      <el-form-item label="数量:" prop="shuLiang">
        <el-input v-if="!readonly" v-model="form.shuLiang" />
        <span v-else>{{ form.shuLiang }}</span>
      </el-form-item>
      <el-form-item label="计划购买时间:" prop="jiHuaGouMaiSh">
        <el-input v-if="!readonly" v-model="form.jiHuaGouMaiSh" />
        <span v-else>{{ form.jiHuaGouMaiSh }}</span>
      </el-form-item>
      <el-form-item label="仪器供应商:" prop="gongYingShang">
        <el-input v-if="!readonly" v-model="form.gongYingShang" />
        <span v-else>{{ form.gongYingShang }}</span>
      </el-form-item>
      <el-form-item label="预算金额:" prop="yuSuanJinE">
        <el-input v-if="!readonly" v-model="form.yuSuanJinE" />
        <span v-else>{{ form.yuSuanJinE }}</span>
      </el-form-item>
      <el-form-item label="资金来源:" prop="ziJinLaiYuan">
        <el-input v-if="!readonly" v-model="form.ziJinLaiYuan" />
        <span v-else>{{ form.ziJinLaiYuan }}</span>
      </el-form-item>
      <el-form-item label="单设备金额:" prop="danSheBeiJinE">
        <el-input v-if="!readonly" v-model="form.danSheBeiJinE" />
        <span v-else>{{ form.danSheBeiJinE }}</span>
      </el-form-item>
      <el-form-item label="总预算金额:" prop="sheBeiZongJin">
        <el-input v-if="!readonly" v-model="form.sheBeiZongJin" />
        <span v-else>{{ form.sheBeiZongJin }}</span>
      </el-form-item>
      <el-form-item label="总计划外键:" prop="zongJiHuaWaiJ">
        <el-input v-if="!readonly" v-model="form.zongJiHuaWaiJ" />
        <span v-else>{{ form.zongJiHuaWaiJ }}</span>
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
      <el-form-item label="是否过审:" prop="shiFouGuoShen">
        <el-input v-if="!readonly" v-model="form.shiFouGuoShen" />
        <span v-else>{{ form.shiFouGuoShen }}</span>
      </el-form-item>
      <el-form-item label="外键:" prop="waiJian">
        <el-input v-if="!readonly" v-model="form.waiJian" />
        <span v-else>{{ form.waiJian }}</span>
      </el-form-item>
      <el-form-item label="表单编号:" prop="biaoDanBianHao">
        <el-input v-if="!readonly" v-model="form.biaoDanBianHao" />
        <span v-else>{{ form.biaoDanBianHao }}</span>
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
import { save, get } from '@/api/demo/shebei/sheBeiGouMaiShenQing'
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
        shenGouBuMen: '',
        lianXiRen: '',
        lianXiDianHua: '',
        sheBeiMingCheng: '',
        changPaiXingHao: '',
        jiShuZhiBiao: '',
        shuLiang: '',
        jiHuaGouMaiSh: '',
        gongYingShang: '',
        yuSuanJinE: '',
        ziJinLaiYuan: '',
        danSheBeiJinE: '',
        sheBeiZongJin: '',
        zongJiHuaWaiJ: '',
        bianZhiRen: '',
        bianZhiBuMen: '',
        bianZhiShiJian: '',
        shiFouGuoShen: '',
        waiJian: '',
        biaoDanBianHao: ''
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