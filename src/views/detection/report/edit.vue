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
      <el-form-item label="是否过审:" prop="shiFouGuoShen">
        <el-input v-if="!readonly" v-model="form.shiFouGuoShen" />
        <span v-else>{{ form.shiFouGuoShen }}</span>
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
      <el-form-item label="委托方:" prop="weiTuoFang">
        <el-input v-if="!readonly" v-model="form.weiTuoFang" />
        <span v-else>{{ form.weiTuoFang }}</span>
      </el-form-item>
      <el-form-item label="详细地址:" prop="xiangXiDiZhi">
        <el-input v-if="!readonly" v-model="form.xiangXiDiZhi" />
        <span v-else>{{ form.xiangXiDiZhi }}</span>
      </el-form-item>
      <el-form-item label="联系部门/联系人:" prop="lianXiBuMenLi">
        <el-input v-if="!readonly" v-model="form.lianXiBuMenLi" />
        <span v-else>{{ form.lianXiBuMenLi }}</span>
      </el-form-item>
      <el-form-item label="电话:" prop="dianHua">
        <el-input v-if="!readonly" v-model="form.dianHua" />
        <span v-else>{{ form.dianHua }}</span>
      </el-form-item>
      <el-form-item label="项目名称:" prop="xiangMuMingChe">
        <el-input v-if="!readonly" v-model="form.xiangMuMingChe" />
        <span v-else>{{ form.xiangMuMingChe }}</span>
      </el-form-item>
      <el-form-item label="项目类别:" prop="xiangMuLeiBie">
        <el-input v-if="!readonly" v-model="form.xiangMuLeiBie" />
        <span v-else>{{ form.xiangMuLeiBie }}</span>
      </el-form-item>
      <el-form-item label="委托内容:" prop="weiTuoNeiRong">
        <el-input v-if="!readonly" v-model="form.weiTuoNeiRong" />
        <span v-else>{{ form.weiTuoNeiRong }}</span>
      </el-form-item>
      <el-form-item label="委托方代表签名:" prop="weiTuoFangDai">
        <el-input v-if="!readonly" v-model="form.weiTuoFangDai" />
        <span v-else>{{ form.weiTuoFangDai }}</span>
      </el-form-item>
      <el-form-item label="收样人签名:" prop="shouYangRenQia">
        <el-input v-if="!readonly" v-model="form.shouYangRenQia" />
        <span v-else>{{ form.shouYangRenQia }}</span>
      </el-form-item>
      <el-form-item label="送样时间:" prop="songYangShiJia">
        <el-input v-if="!readonly" v-model="form.songYangShiJia" />
        <span v-else>{{ form.songYangShiJia }}</span>
      </el-form-item>
      <el-form-item label="要求完成时间:" prop="yaoQiuWanCheng">
        <el-input v-if="!readonly" v-model="form.yaoQiuWanCheng" />
        <span v-else>{{ form.yaoQiuWanCheng }}</span>
      </el-form-item>
      <el-form-item label="报告编号:" prop="baoGaoBianHao">
        <el-input v-if="!readonly" v-model="form.baoGaoBianHao" />
        <span v-else>{{ form.baoGaoBianHao }}</span>
      </el-form-item>
      <el-form-item label="检测员:" prop="jianCeYuan">
        <el-input v-if="!readonly" v-model="form.jianCeYuan" />
        <span v-else>{{ form.jianCeYuan }}</span>
      </el-form-item>
      <el-form-item label="校验员:" prop="xiaoYanYuan">
        <el-input v-if="!readonly" v-model="form.xiaoYanYuan" />
        <span v-else>{{ form.xiaoYanYuan }}</span>
      </el-form-item>
      <el-form-item label="年度:" prop="nianDu">
        <el-input v-if="!readonly" v-model="form.nianDu" />
        <span v-else>{{ form.nianDu }}</span>
      </el-form-item>
      <el-form-item label="检测开始时间:" prop="jianCeKaiShiS">
        <el-input v-if="!readonly" v-model="form.jianCeKaiShiS" />
        <span v-else>{{ form.jianCeKaiShiS }}</span>
      </el-form-item>
      <el-form-item label="检测完成时间:" prop="jianCeWanCheng">
        <el-input v-if="!readonly" v-model="form.jianCeWanCheng" />
        <span v-else>{{ form.jianCeWanCheng }}</span>
      </el-form-item>
      <el-form-item label="受理时间:" prop="shouLiShiJian">
        <el-input v-if="!readonly" v-model="form.shouLiShiJian" />
        <span v-else>{{ form.shouLiShiJian }}</span>
      </el-form-item>
      <el-form-item label="报告份数:" prop="baoGaoFenShu">
        <el-input v-if="!readonly" v-model="form.baoGaoFenShu" />
        <span v-else>{{ form.baoGaoFenShu }}</span>
      </el-form-item>
      <el-form-item label="进度:" prop="jinDu">
        <el-input v-if="!readonly" v-model="form.jinDu" />
        <span v-else>{{ form.jinDu }}</span>
      </el-form-item>
      <el-form-item label="委托单号:" prop="weiTuoDanHao">
        <el-input v-if="!readonly" v-model="form.weiTuoDanHao" />
        <span v-else>{{ form.weiTuoDanHao }}</span>
      </el-form-item>
      <el-form-item label="委托时间:" prop="weiTuoShiJian">
        <el-input v-if="!readonly" v-model="form.weiTuoShiJian" />
        <span v-else>{{ form.weiTuoShiJian }}</span>
      </el-form-item>
      <el-form-item label="驳回原因:" prop="boHuiYuanYin">
        <el-input v-if="!readonly" v-model="form.boHuiYuanYin" />
        <span v-else>{{ form.boHuiYuanYin }}</span>
      </el-form-item>
      <el-form-item label="结果报告送达方式:" prop="jieGuoBaoGaoS">
        <el-input v-if="!readonly" v-model="form.jieGuoBaoGaoS" />
        <span v-else>{{ form.jieGuoBaoGaoS }}</span>
      </el-form-item>
      <el-form-item label="检测报告的信息:" prop="jianCeBaoGaoD">
        <el-input v-if="!readonly" v-model="form.jianCeBaoGaoD" />
        <span v-else>{{ form.jianCeBaoGaoD }}</span>
      </el-form-item>
      <el-form-item label="结论判定:" prop="jieLunPanDing">
        <el-input v-if="!readonly" v-model="form.jieLunPanDing" />
        <span v-else>{{ form.jieLunPanDing }}</span>
      </el-form-item>
      <el-form-item label="判定规则:" prop="panDingGuiZe">
        <el-input v-if="!readonly" v-model="form.panDingGuiZe" />
        <span v-else>{{ form.panDingGuiZe }}</span>
      </el-form-item>
      <el-form-item label="受理部门:" prop="shouLiBuMen">
        <el-input v-if="!readonly" v-model="form.shouLiBuMen" />
        <span v-else>{{ form.shouLiBuMen }}</span>
      </el-form-item>
      <el-form-item label="受理人:" prop="shouLiRen">
        <el-input v-if="!readonly" v-model="form.shouLiRen" />
        <span v-else>{{ form.shouLiRen }}</span>
      </el-form-item>
      <el-form-item label="是否同意分包:" prop="shiFouTongYiF">
        <el-input v-if="!readonly" v-model="form.shiFouTongYiF" />
        <span v-else>{{ form.shiFouTongYiF }}</span>
      </el-form-item>
      <el-form-item label="是否留样:" prop="shiFouLiuYang">
        <el-input v-if="!readonly" v-model="form.shiFouLiuYang" />
        <span v-else>{{ form.shiFouLiuYang }}</span>
      </el-form-item>
      <el-form-item label="是都给出意见和解释:" prop="shiDouGeiChuY">
        <el-input v-if="!readonly" v-model="form.shiDouGeiChuY" />
        <span v-else>{{ form.shiDouGeiChuY }}</span>
      </el-form-item>
      <el-form-item label="是否给出测量不确定度:" prop="shiFouGeiChuC">
        <el-input v-if="!readonly" v-model="form.shiFouGeiChuC" />
        <span v-else>{{ form.shiFouGeiChuC }}</span>
      </el-form-item>
      <el-form-item label="预留字段一:" prop="yuLiuZiDuanYi">
        <el-input v-if="!readonly" v-model="form.yuLiuZiDuanYi" />
        <span v-else>{{ form.yuLiuZiDuanYi }}</span>
      </el-form-item>
      <el-form-item label="预留字段二:" prop="yuLiuZiDuanEr">
        <el-input v-if="!readonly" v-model="form.yuLiuZiDuanEr" />
        <span v-else>{{ form.yuLiuZiDuanEr }}</span>
      </el-form-item>
      <el-form-item label="预留字段三:" prop="yuLiuZiDuanSa">
        <el-input v-if="!readonly" v-model="form.yuLiuZiDuanSa" />
        <span v-else>{{ form.yuLiuZiDuanSa }}</span>
      </el-form-item>
      <el-form-item label="预留字段四:" prop="yuLiuZiDuanSi">
        <el-input v-if="!readonly" v-model="form.yuLiuZiDuanSi" />
        <span v-else>{{ form.yuLiuZiDuanSi }}</span>
      </el-form-item>
      <el-form-item label="预留字段五:" prop="yuLiuZiDuanWu">
        <el-input v-if="!readonly" v-model="form.yuLiuZiDuanWu" />
        <span v-else>{{ form.yuLiuZiDuanWu }}</span>
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
//import { save, get } from '@/api/detection/jcwtd'
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
        shiFouGuoShen: '',
        bianZhiRen: '',
        bianZhiBuMen: '',
        bianZhiShiJian: '',
        weiTuoFang: '',
        xiangXiDiZhi: '',
        lianXiBuMenLi: '',
        dianHua: '',
        xiangMuMingChe: '',
        xiangMuLeiBie: '',
        weiTuoNeiRong: '',
        weiTuoFangDai: '',
        shouYangRenQia: '',
        songYangShiJia: '',
        yaoQiuWanCheng: '',
        baoGaoBianHao: '',
        jianCeYuan: '',
        xiaoYanYuan: '',
        nianDu: '',
        jianCeKaiShiS: '',
        jianCeWanCheng: '',
        shouLiShiJian: '',
        baoGaoFenShu: '',
        jinDu: '',
        weiTuoDanHao: '',
        weiTuoShiJian: '',
        boHuiYuanYin: '',
        jieGuoBaoGaoS: '',
        jianCeBaoGaoD: '',
        jieLunPanDing: '',
        panDingGuiZe: '',
        shouLiBuMen: '',
        shouLiRen: '',
        shiFouTongYiF: '',
        shiFouLiuYang: '',
        shiDouGeiChuY: '',
        shiFouGeiChuC: '',
        yuLiuZiDuanYi: '',
        yuLiuZiDuanEr: '',
        yuLiuZiDuanSa: '',
        yuLiuZiDuanSi: '',
        yuLiuZiDuanWu: ''
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
