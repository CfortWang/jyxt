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
      <el-form-item label="仪器名称:" prop="yiQiMingCheng">
        <el-input v-if="!readonly" v-model="form.yiQiMingCheng" />
        <span v-else>{{ form.yiQiMingCheng }}</span>
      </el-form-item>
      <el-form-item label="型号规格:" prop="xingHaoGuiGe">
        <el-input v-if="!readonly" v-model="form.xingHaoGuiGe" />
        <span v-else>{{ form.xingHaoGuiGe }}</span>
      </el-form-item>
      <el-form-item label="生产厂商:" prop="changShang">
        <el-input v-if="!readonly" v-model="form.changShang" />
        <span v-else>{{ form.changShang }}</span>
      </el-form-item>
      <el-form-item label="出厂编号:" prop="chuChangBianHao">
        <el-input v-if="!readonly" v-model="form.chuChangBianHao" />
        <span v-else>{{ form.chuChangBianHao }}</span>
      </el-form-item>
      <el-form-item label="精度等级:" prop="jingDuDengJi">
        <el-input v-if="!readonly" v-model="form.jingDuDengJi" />
        <span v-else>{{ form.jingDuDengJi }}</span>
      </el-form-item>
      <el-form-item label="出厂日期:" prop="chuChangRiQi">
        <el-input v-if="!readonly" v-model="form.chuChangRiQi" />
        <span v-else>{{ form.chuChangRiQi }}</span>
      </el-form-item>
      <el-form-item label="测量范围:" prop="ceLiangFanWei">
        <el-input v-if="!readonly" v-model="form.ceLiangFanWei" />
        <span v-else>{{ form.ceLiangFanWei }}</span>
      </el-form-item>
      <el-form-item label="验收日期:" prop="yanShouRiQi">
        <el-input v-if="!readonly" v-model="form.yanShouRiQi" />
        <span v-else>{{ form.yanShouRiQi }}</span>
      </el-form-item>
      <el-form-item label="主机状态:" prop="zhuJiZhuangTai">
        <el-input v-if="!readonly" v-model="form.zhuJiZhuangTai" />
        <span v-else>{{ form.zhuJiZhuangTai }}</span>
      </el-form-item>
      <el-form-item label="随机附件状况 (包括各种文件):" prop="fujian">
        <el-input v-if="!readonly" v-model="form.fujian" />
        <span v-else>{{ form.fujian }}</span>
      </el-form-item>
      <el-form-item label="验收结果:" prop="yanShouJieGuo">
        <el-input v-if="!readonly" v-model="form.yanShouJieGuo" />
        <span v-else>{{ form.yanShouJieGuo }}</span>
      </el-form-item>
      <el-form-item label="参加验收人员签名:" prop="cjryqm">
        <el-input v-if="!readonly" v-model="form.cjryqm" />
        <span v-else>{{ form.cjryqm }}</span>
      </el-form-item>
      <el-form-item label="备注:" prop="beiZhu">
        <el-input v-if="!readonly" v-model="form.beiZhu" />
        <span v-else>{{ form.beiZhu }}</span>
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
      <el-form-item label="验收人:" prop="yanShouRen">
        <el-input v-if="!readonly" v-model="form.yanShouRen" />
        <span v-else>{{ form.yanShouRen }}</span>
      </el-form-item>
      <el-form-item label="验收备注:" prop="yanShouBeiZhu">
        <el-input v-if="!readonly" v-model="form.yanShouBeiZhu" />
        <span v-else>{{ form.yanShouBeiZhu }}</span>
      </el-form-item>
      <el-form-item label="选择设备:" prop="xuanZeSheBei">
        <el-input v-if="!readonly" v-model="form.xuanZeSheBei" />
        <span v-else>{{ form.xuanZeSheBei }}</span>
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
import { save, get } from '@/api/demo/shebei/sheBeiYanShou'
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
        tenantId: '',
        ip: '',
        createBy: '',
        createTime: '',
        updateBy: '',
        updateTime: '',
        yiQiMingCheng: '',
        xingHaoGuiGe: '',
        changShang: '',
        chuChangBianHao: '',
        jingDuDengJi: '',
        chuChangRiQi: '',
        ceLiangFanWei: '',
        yanShouRiQi: '',
        zhuJiZhuangTai: '',
        fujian: '',
        yanShouJieGuo: '',
        cjryqm: '',
        beiZhu: '',
        zongJiHuaWaiJ: '',
        bianZhiRen: '',
        bianZhiBuMen: '',
        bianZhiShiJian: '',
        shiFouGuoShen: '',
        yanShouRen: '',
        yanShouBeiZhu: '',
        xuanZeSheBei: ''
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