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
      <el-form-item label="实验室:" prop="shiYanShi">
        <el-input v-if="!readonly" v-model="form.shiYanShi" />
        <span v-else>{{ form.shiYanShi }}</span>
      </el-form-item>
      <el-form-item label="质量监督项目:" prop="zhiLiangJianDu">
        <el-input v-if="!readonly" v-model="form.zhiLiangJianDu" />
        <span v-else>{{ form.zhiLiangJianDu }}</span>
      </el-form-item>
      <el-form-item label="案件编号:" prop="anJianBianHao">
        <el-input v-if="!readonly" v-model="form.anJianBianHao" />
        <span v-else>{{ form.anJianBianHao }}</span>
      </el-form-item>
      <el-form-item label="被监督人:" prop="beiJianDuRen">
        <el-input v-if="!readonly" v-model="form.beiJianDuRen" />
        <span v-else>{{ form.beiJianDuRen }}</span>
      </el-form-item>
      <el-form-item label="监督员:" prop="jianDuYuan">
        <el-input v-if="!readonly" v-model="form.jianDuYuan" />
        <span v-else>{{ form.jianDuYuan }}</span>
      </el-form-item>
      <el-form-item label="是否过审:" prop="shiFouGuoShen">
        <el-input v-if="!readonly" v-model="form.shiFouGuoShen" />
        <span v-else>{{ form.shiFouGuoShen }}</span>
      </el-form-item>
      <el-form-item label="对应监督计划内容:" prop="duiYingJianDu">
        <el-input v-if="!readonly" v-model="form.duiYingJianDu" />
        <span v-else>{{ form.duiYingJianDu }}</span>
      </el-form-item>
      <el-form-item label="对应监督计划时间:" prop="jianDuShiJian">
        <el-input v-if="!readonly" v-model="form.jianDuShiJian" />
        <span v-else>{{ form.jianDuShiJian }}</span>
      </el-form-item>
      <el-form-item label="对应监督计划项目:" prop="jianDuJiHuaXia">
        <el-input v-if="!readonly" v-model="form.jianDuJiHuaXia" />
        <span v-else>{{ form.jianDuJiHuaXia }}</span>
      </el-form-item>
      <el-form-item label="超额项目完成:" prop="chaoEXiangMuWa">
        <el-input v-if="!readonly" v-model="form.chaoEXiangMuWa" />
        <span v-else>{{ form.chaoEXiangMuWa }}</span>
      </el-form-item>
      <el-form-item label="不符合项:" prop="buFuHeXiang">
        <el-input v-if="!readonly" v-model="form.buFuHeXiang" />
        <span v-else>{{ form.buFuHeXiang }}</span>
      </el-form-item>
      <el-form-item label="对应监督计划频次:" prop="jianDuJiHuaPi">
        <el-input v-if="!readonly" v-model="form.jianDuJiHuaPi" />
        <span v-else>{{ form.jianDuJiHuaPi }}</span>
      </el-form-item>
      <el-form-item label="对应监督计划备注:" prop="jianDuJiHuaBe">
        <el-input v-if="!readonly" v-model="form.jianDuJiHuaBe" />
        <span v-else>{{ form.jianDuJiHuaBe }}</span>
      </el-form-item>
      <el-form-item label="选择监督计划:" prop="xuanZeJianDuJ">
        <el-input v-if="!readonly" v-model="form.xuanZeJianDuJ" />
        <span v-else>{{ form.xuanZeJianDuJ }}</span>
      </el-form-item>
      <el-form-item label="外键:" prop="waiJian">
        <el-input v-if="!readonly" v-model="form.waiJian" />
        <span v-else>{{ form.waiJian }}</span>
      </el-form-item>
      <el-form-item label="总计划外键:" prop="zongJiHuaWaiJ">
        <el-input v-if="!readonly" v-model="form.zongJiHuaWaiJ" />
        <span v-else>{{ form.zongJiHuaWaiJ }}</span>
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
import { save, get } from '@/api/demo/bumenzhiliang/zhiLiangJianDuShiShi'
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
        shiYanShi: '',
        zhiLiangJianDu: '',
        anJianBianHao: '',
        beiJianDuRen: '',
        jianDuYuan: '',
        shiFouGuoShen: '',
        duiYingJianDu: '',
        jianDuShiJian: '',
        jianDuJiHuaXia: '',
        chaoEXiangMuWa: '',
        buFuHeXiang: '',
        jianDuJiHuaPi: '',
        jianDuJiHuaBe: '',
        xuanZeJianDuJ: '',
        waiJian: '',
        zongJiHuaWaiJ: ''
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