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
      <el-form-item label="被审核部门:" prop="beiShenHeBuMe">
        <el-input v-if="!readonly" v-model="form.beiShenHeBuMe" />
        <span v-else>{{ form.beiShenHeBuMe }}</span>
      </el-form-item>
      <el-form-item label="陪同人:" prop="peiTongRen">
        <el-input v-if="!readonly" v-model="form.peiTongRen" />
        <span v-else>{{ form.peiTongRen }}</span>
      </el-form-item>
      <el-form-item label="审核依据文件:" prop="shenHeYiJuWen">
        <el-input v-if="!readonly" v-model="form.shenHeYiJuWen" />
        <span v-else>{{ form.shenHeYiJuWen }}</span>
      </el-form-item>
      <el-form-item label="不符合事实陈述:" prop="buFuHe">
        <el-input v-if="!readonly" v-model="form.buFuHe" />
        <span v-else>{{ form.buFuHe }}</span>
      </el-form-item>
      <el-form-item label="不符合规定:" prop="buFuHeGuiDing">
        <el-input v-if="!readonly" v-model="form.buFuHeGuiDing" />
        <span v-else>{{ form.buFuHeGuiDing }}</span>
      </el-form-item>
      <el-form-item label="发现人:" prop="faXianRen">
        <el-input v-if="!readonly" v-model="form.faXianRen" />
        <span v-else>{{ form.faXianRen }}</span>
      </el-form-item>
      <el-form-item label="发现时间:" prop="faXianShiJian">
        <el-input v-if="!readonly" v-model="form.faXianShiJian" />
        <span v-else>{{ form.faXianShiJian }}</span>
      </el-form-item>
      <el-form-item label="严重性评价:" prop="yanZhongXingPi">
        <el-input v-if="!readonly" v-model="form.yanZhongXingPi" />
        <span v-else>{{ form.yanZhongXingPi }}</span>
      </el-form-item>
      <el-form-item label="验证人:" prop="yanZhengRen">
        <el-input v-if="!readonly" v-model="form.yanZhengRen" />
        <span v-else>{{ form.yanZhengRen }}</span>
      </el-form-item>
      <el-form-item label="部门:" prop="buMen">
        <el-input v-if="!readonly" v-model="form.buMen" />
        <span v-else>{{ form.buMen }}</span>
      </el-form-item>
      <el-form-item label="是否过审:" prop="shiFouGuoShen">
        <el-input v-if="!readonly" v-model="form.shiFouGuoShen" />
        <span v-else>{{ form.shiFouGuoShen }}</span>
      </el-form-item>
      <el-form-item label="外键:" prop="waiJian">
        <el-input v-if="!readonly" v-model="form.waiJian" />
        <span v-else>{{ form.waiJian }}</span>
      </el-form-item>
      <el-form-item label="开启原因:" prop="kaiQiYuanYin">
        <el-input v-if="!readonly" v-model="form.kaiQiYuanYin" />
        <span v-else>{{ form.kaiQiYuanYin }}</span>
      </el-form-item>
      <el-form-item label="总计划外键:" prop="jiHuaWaiJian">
        <el-input v-if="!readonly" v-model="form.jiHuaWaiJian" />
        <span v-else>{{ form.jiHuaWaiJian }}</span>
      </el-form-item>
      <el-form-item label="总实施外键:" prop="zongShiShiWai">
        <el-input v-if="!readonly" v-model="form.zongShiShiWai" />
        <span v-else>{{ form.zongShiShiWai }}</span>
      </el-form-item>
      <el-form-item label="上传附件:" prop="shangChuanFuJi">
        <el-input v-if="!readonly" v-model="form.shangChuanFuJi" />
        <span v-else>{{ form.shangChuanFuJi }}</span>
      </el-form-item>
      <el-form-item label="培训记录:" prop="peiXunJiLu">
        <el-input v-if="!readonly" v-model="form.peiXunJiLu" />
        <span v-else>{{ form.peiXunJiLu }}</span>
      </el-form-item>
      <el-form-item label="文件修改:" prop="wenJianXiuGai">
        <el-input v-if="!readonly" v-model="form.wenJianXiuGai" />
        <span v-else>{{ form.wenJianXiuGai }}</span>
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
import { save, get } from '@/api/demo/bumenzhiliang/buFuHeXiangBaoGao'
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
        beiShenHeBuMe: '',
        peiTongRen: '',
        shenHeYiJuWen: '',
        buFuHe: '',
        buFuHeGuiDing: '',
        faXianRen: '',
        faXianShiJian: '',
        yanZhongXingPi: '',
        yanZhengRen: '',
        buMen: '',
        shiFouGuoShen: '',
        waiJian: '',
        kaiQiYuanYin: '',
        jiHuaWaiJian: '',
        zongShiShiWai: '',
        shangChuanFuJi: '',
        peiXunJiLu: '',
        wenJianXiuGai: ''
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