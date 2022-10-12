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
      <el-form-item label="参加项目名称:" prop="canJiaXiangMu">
        <el-input v-if="!readonly" v-model="form.canJiaXiangMu" />
        <span v-else>{{ form.canJiaXiangMu }}</span>
      </el-form-item>
      <el-form-item label="组织方:" prop="zuZhiFang">
        <el-input v-if="!readonly" v-model="form.zuZhiFang" />
        <span v-else>{{ form.zuZhiFang }}</span>
      </el-form-item>
      <el-form-item label="参加实验室:" prop="canJiaShiYanS">
        <el-input v-if="!readonly" v-model="form.canJiaShiYanS" />
        <span v-else>{{ form.canJiaShiYanS }}</span>
      </el-form-item>
      <el-form-item label="参加日期:" prop="canJiaRiQi">
        <el-input v-if="!readonly" v-model="form.canJiaRiQi" />
        <span v-else>{{ form.canJiaRiQi }}</span>
      </el-form-item>
      <el-form-item label="结果:" prop="jieGuo">
        <el-input v-if="!readonly" v-model="form.jieGuo" />
        <span v-else>{{ form.jieGuo }}</span>
      </el-form-item>
      <el-form-item label="备注:" prop="beiZhu">
        <el-input v-if="!readonly" v-model="form.beiZhu" />
        <span v-else>{{ form.beiZhu }}</span>
      </el-form-item>
      <el-form-item label="编制人:" prop="bianZhiRen">
        <el-input v-if="!readonly" v-model="form.bianZhiRen" />
        <span v-else>{{ form.bianZhiRen }}</span>
      </el-form-item>
      <el-form-item label="编制日期:" prop="bianZhiRiQi">
        <el-input v-if="!readonly" v-model="form.bianZhiRiQi" />
        <span v-else>{{ form.bianZhiRiQi }}</span>
      </el-form-item>
      <el-form-item label="编制编号:" prop="bianZhiBianHao">
        <el-input v-if="!readonly" v-model="form.bianZhiBianHao" />
        <span v-else>{{ form.bianZhiBianHao }}</span>
      </el-form-item>
      <el-form-item label="部门:" prop="buMen">
        <el-input v-if="!readonly" v-model="form.buMen" />
        <span v-else>{{ form.buMen }}</span>
      </el-form-item>
      <el-form-item label="是否过审:" prop="shiFouGuoShen">
        <el-input v-if="!readonly" v-model="form.shiFouGuoShen" />
        <span v-else>{{ form.shiFouGuoShen }}</span>
      </el-form-item>
      <el-form-item label="试验间比对文件:" prop="shiYanJianBiD">
        <el-input v-if="!readonly" v-model="form.shiYanJianBiD" />
        <span v-else>{{ form.shiYanJianBiD }}</span>
      </el-form-item>
      <el-form-item label="对应实验室比对计划:" prop="duiYingShiYan">
        <el-input v-if="!readonly" v-model="form.duiYingShiYan" />
        <span v-else>{{ form.duiYingShiYan }}</span>
      </el-form-item>
      <el-form-item label="选择实验室比对计划:" prop="xuanZeShiYanS">
        <el-input v-if="!readonly" v-model="form.xuanZeShiYanS" />
        <span v-else>{{ form.xuanZeShiYanS }}</span>
      </el-form-item>
      <el-form-item label="选择计划项:" prop="xuanZeJiHuaXi">
        <el-input v-if="!readonly" v-model="form.xuanZeJiHuaXi" />
        <span v-else>{{ form.xuanZeJiHuaXi }}</span>
      </el-form-item>
      <el-form-item label="一览汇总外键:" prop="yiLanHuiZongW">
        <el-input v-if="!readonly" v-model="form.yiLanHuiZongW" />
        <span v-else>{{ form.yiLanHuiZongW }}</span>
      </el-form-item>
      <el-form-item label="选择一览:" prop="xuanZeYiLan">
        <el-input v-if="!readonly" v-model="form.xuanZeYiLan" />
        <span v-else>{{ form.xuanZeYiLan }}</span>
      </el-form-item>
      <el-form-item label="是否汇总:" prop="shiFouHuiZong">
        <el-input v-if="!readonly" v-model="form.shiFouHuiZong" />
        <span v-else>{{ form.shiFouHuiZong }}</span>
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
import { save, get } from '@/api/demo/bumenzhiliang/shiYanShiJianBiDuiYiLanXiang'
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
        tenantId: '',
        ip: '',
        createBy: '',
        createTime: '',
        updateBy: '',
        updateTime: '',
        canJiaXiangMu: '',
        zuZhiFang: '',
        canJiaShiYanS: '',
        canJiaRiQi: '',
        jieGuo: '',
        beiZhu: '',
        bianZhiRen: '',
        bianZhiRiQi: '',
        bianZhiBianHao: '',
        buMen: '',
        shiFouGuoShen: '',
        shiYanJianBiD: '',
        duiYingShiYan: '',
        xuanZeShiYanS: '',
        xuanZeJiHuaXi: '',
        yiLanHuiZongW: '',
        xuanZeYiLan: '',
        shiFouHuiZong: ''
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