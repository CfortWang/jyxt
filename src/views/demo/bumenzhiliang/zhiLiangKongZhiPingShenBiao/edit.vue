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
      <el-form-item label="外键:" prop="parentId">
        <el-input v-if="!readonly" v-model="form.parentId" />
        <span v-else>{{ form.parentId }}</span>
      </el-form-item>
      <el-form-item label="总计划外键:" prop="zongJiHuaWaiJ">
        <el-input v-if="!readonly" v-model="form.zongJiHuaWaiJ" />
        <span v-else>{{ form.zongJiHuaWaiJ }}</span>
      </el-form-item>
      <el-form-item label="控制外键:" prop="kongZhiWaiJian">
        <el-input v-if="!readonly" v-model="form.kongZhiWaiJian" />
        <span v-else>{{ form.kongZhiWaiJian }}</span>
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
      <el-form-item label="监控项目:" prop="jianKongXiangM">
        <el-input v-if="!readonly" v-model="form.jianKongXiangM" />
        <span v-else>{{ form.jianKongXiangM }}</span>
      </el-form-item>
      <el-form-item label="评审人员:" prop="pingShenRenYua">
        <el-input v-if="!readonly" v-model="form.pingShenRenYua" />
        <span v-else>{{ form.pingShenRenYua }}</span>
      </el-form-item>
      <el-form-item label="评审日期:" prop="pingShenRiQi">
        <el-input v-if="!readonly" v-model="form.pingShenRiQi" />
        <span v-else>{{ form.pingShenRiQi }}</span>
      </el-form-item>
      <el-form-item label="是否采取纠正措施:" prop="shiFouCaiQuJi">
        <el-input v-if="!readonly" v-model="form.shiFouCaiQuJi" />
        <span v-else>{{ form.shiFouCaiQuJi }}</span>
      </el-form-item>
      <el-form-item label="部门组织:" prop="buMenZuZhi">
        <el-input v-if="!readonly" v-model="form.buMenZuZhi" />
        <span v-else>{{ form.buMenZuZhi }}</span>
      </el-form-item>
      <el-form-item label="是否过审:" prop="shiFouGuoShen">
        <el-input v-if="!readonly" v-model="form.shiFouGuoShen" />
        <span v-else>{{ form.shiFouGuoShen }}</span>
      </el-form-item>
      <el-form-item label="评审编号:" prop="pingShenBianHa">
        <el-input v-if="!readonly" v-model="form.pingShenBianHa" />
        <span v-else>{{ form.pingShenBianHa }}</span>
      </el-form-item>
      <el-form-item label="选择对应计划:" prop="xuanZeDuiYing">
        <el-input v-if="!readonly" v-model="form.xuanZeDuiYing" />
        <span v-else>{{ form.xuanZeDuiYing }}</span>
      </el-form-item>
      <el-form-item label="监控计划实施情况:" prop="jianKongJiHua">
        <el-input v-if="!readonly" v-model="form.jianKongJiHua" />
        <span v-else>{{ form.jianKongJiHua }}</span>
      </el-form-item>
      <el-form-item label="内部外部:" prop="neiBuWaiBu">
        <el-input v-if="!readonly" v-model="form.neiBuWaiBu" />
        <span v-else>{{ form.neiBuWaiBu }}</span>
      </el-form-item>
      <el-form-item label="选择能力一览:" prop="xuanZeNengLiY">
        <el-input v-if="!readonly" v-model="form.xuanZeNengLiY" />
        <span v-else>{{ form.xuanZeNengLiY }}</span>
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
import { save, get } from '@/api/demo/bumenzhiliang/zhiLiangKongZhiPingShenBiao'
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
        parentId: '',
        zongJiHuaWaiJ: '',
        kongZhiWaiJian: '',
        tenantId: '',
        ip: '',
        createBy: '',
        createTime: '',
        updateBy: '',
        updateTime: '',
        jianKongXiangM: '',
        pingShenRenYua: '',
        pingShenRiQi: '',
        shiFouCaiQuJi: '',
        buMenZuZhi: '',
        shiFouGuoShen: '',
        pingShenBianHa: '',
        xuanZeDuiYing: '',
        jianKongJiHua: '',
        neiBuWaiBu: '',
        xuanZeNengLiY: ''
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