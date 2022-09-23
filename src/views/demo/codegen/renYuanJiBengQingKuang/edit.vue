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
      <el-form-item label="出生年月:" prop="chuShengNianYue">
        <el-input v-if="!readonly" v-model="form.chuShengNianYue" />
        <span v-else>{{ form.chuShengNianYue }}</span>
      </el-form-item>
      <el-form-item label="身份证号码:" prop="shenFenZhengHao">
        <el-input v-if="!readonly" v-model="form.shenFenZhengHao" />
        <span v-else>{{ form.shenFenZhengHao }}</span>
      </el-form-item>
      <el-form-item label="籍贯:" prop="jiGuan">
        <el-input v-if="!readonly" v-model="form.jiGuan" />
        <span v-else>{{ form.jiGuan }}</span>
      </el-form-item>
      <el-form-item label="民族:" prop="minZu">
        <el-input v-if="!readonly" v-model="form.minZu" />
        <span v-else>{{ form.minZu }}</span>
      </el-form-item>
      <el-form-item label="工作部门:" prop="gongZuoBuMen">
        <el-input v-if="!readonly" v-model="form.gongZuoBuMen" />
        <span v-else>{{ form.gongZuoBuMen }}</span>
      </el-form-item>
      <el-form-item label="参加工作时间:" prop="canJiaGongZuo">
        <el-input v-if="!readonly" v-model="form.canJiaGongZuo" />
        <span v-else>{{ form.canJiaGongZuo }}</span>
      </el-form-item>
      <el-form-item label="参加公安时间:" prop="canJiaGongAn">
        <el-input v-if="!readonly" v-model="form.canJiaGongAn" />
        <span v-else>{{ form.canJiaGongAn }}</span>
      </el-form-item>
      <el-form-item label="政治面貌:" prop="zhengZhiMianMao">
        <el-input v-if="!readonly" v-model="form.zhengZhiMianMao" />
        <span v-else>{{ form.zhengZhiMianMao }}</span>
      </el-form-item>
      <el-form-item label="入党团时间:" prop="ruDangTuanShi">
        <el-input v-if="!readonly" v-model="form.ruDangTuanShi" />
        <span v-else>{{ form.ruDangTuanShi }}</span>
      </el-form-item>
      <el-form-item label="行政职务:" prop="xingZhengZhiWu">
        <el-input v-if="!readonly" v-model="form.xingZhengZhiWu" />
        <span v-else>{{ form.xingZhengZhiWu }}</span>
      </el-form-item>
      <el-form-item label="任职时间:" prop="renZhiShiJian">
        <el-input v-if="!readonly" v-model="form.renZhiShiJian" />
        <span v-else>{{ form.renZhiShiJian }}</span>
      </el-form-item>
      <el-form-item label="现从事专业:" prop="xianCongShiZhua">
        <el-input v-if="!readonly" v-model="form.xianCongShiZhua" />
        <span v-else>{{ form.xianCongShiZhua }}</span>
      </el-form-item>
      <el-form-item label="本专业工作年限:" prop="benZhuanYeGong">
        <el-input v-if="!readonly" v-model="form.benZhuanYeGong" />
        <span v-else>{{ form.benZhuanYeGong }}</span>
      </el-form-item>
      <el-form-item label="现专业技术职务:" prop="xianZhuanYeJiSh">
        <el-input v-if="!readonly" v-model="form.xianZhuanYeJiSh" />
        <span v-else>{{ form.xianZhuanYeJiSh }}</span>
      </el-form-item>
      <el-form-item label="取得资格时间:" prop="quDeZiGeShiJ">
        <el-input v-if="!readonly" v-model="form.quDeZiGeShiJ" />
        <span v-else>{{ form.quDeZiGeShiJ }}</span>
      </el-form-item>
      <el-form-item label="警衔:" prop="jingXian">
        <el-input v-if="!readonly" v-model="form.jingXian" />
        <span v-else>{{ form.jingXian }}</span>
      </el-form-item>
      <el-form-item label="警号:" prop="jingHao">
        <el-input v-if="!readonly" v-model="form.jingHao" />
        <span v-else>{{ form.jingHao }}</span>
      </el-form-item>
      <el-form-item label="原学历:" prop="yuanXueLi">
        <el-input v-if="!readonly" v-model="form.yuanXueLi" />
        <span v-else>{{ form.yuanXueLi }}</span>
      </el-form-item>
      <el-form-item label="原学位:" prop="yuanXueWei">
        <el-input v-if="!readonly" v-model="form.yuanXueWei" />
        <span v-else>{{ form.yuanXueWei }}</span>
      </el-form-item>
      <el-form-item label="原毕业院校:" prop="yuanBiYeYuanXi">
        <el-input v-if="!readonly" v-model="form.yuanBiYeYuanXi" />
        <span v-else>{{ form.yuanBiYeYuanXi }}</span>
      </el-form-item>
      <el-form-item label="原毕业时间:" prop="yuanBiYeShiJi">
        <el-input v-if="!readonly" v-model="form.yuanBiYeShiJi" />
        <span v-else>{{ form.yuanBiYeShiJi }}</span>
      </el-form-item>
      <el-form-item label="原专业:" prop="yuanZhuanYe">
        <el-input v-if="!readonly" v-model="form.yuanZhuanYe" />
        <span v-else>{{ form.yuanZhuanYe }}</span>
      </el-form-item>
      <el-form-item label="原毕业证书:" prop="yuanBiYeZheng">
        <el-input v-if="!readonly" v-model="form.yuanBiYeZheng" />
        <span v-else>{{ form.yuanBiYeZheng }}</span>
      </el-form-item>
      <el-form-item label="原学位证书:" prop="yuanXueWeiZhen">
        <el-input v-if="!readonly" v-model="form.yuanXueWeiZhen" />
        <span v-else>{{ form.yuanXueWeiZhen }}</span>
      </el-form-item>
      <el-form-item label="在职学历:" prop="zaiZhiXueLi">
        <el-input v-if="!readonly" v-model="form.zaiZhiXueLi" />
        <span v-else>{{ form.zaiZhiXueLi }}</span>
      </el-form-item>
      <el-form-item label="在职学位:" prop="zaiZhiXueWei">
        <el-input v-if="!readonly" v-model="form.zaiZhiXueWei" />
        <span v-else>{{ form.zaiZhiXueWei }}</span>
      </el-form-item>
      <el-form-item label="在职毕业院校:" prop="zaiZhiBiYe">
        <el-input v-if="!readonly" v-model="form.zaiZhiBiYe" />
        <span v-else>{{ form.zaiZhiBiYe }}</span>
      </el-form-item>
      <el-form-item label="在职毕业时间:" prop="zaiZhiBiYeSh">
        <el-input v-if="!readonly" v-model="form.zaiZhiBiYeSh" />
        <span v-else>{{ form.zaiZhiBiYeSh }}</span>
      </el-form-item>
      <el-form-item label="在职专业:" prop="zaiZhiZhuanYe">
        <el-input v-if="!readonly" v-model="form.zaiZhiZhuanYe" />
        <span v-else>{{ form.zaiZhiZhuanYe }}</span>
      </el-form-item>
      <el-form-item label="在职毕业证书:" prop="zaiZhiBiYeZheng">
        <el-input v-if="!readonly" v-model="form.zaiZhiBiYeZheng" />
        <span v-else>{{ form.zaiZhiBiYeZheng }}</span>
      </el-form-item>
      <el-form-item label="在职学位证书:" prop="zaiZhiXueWeiZhe">
        <el-input v-if="!readonly" v-model="form.zaiZhiXueWeiZhe" />
        <span v-else>{{ form.zaiZhiXueWeiZhe }}</span>
      </el-form-item>
      <el-form-item label="掌握何种外语，程度如何:" prop="zhangWoHeZHe">
        <el-input v-if="!readonly" v-model="form.zhangWoHeZHe" />
        <span v-else>{{ form.zhangWoHeZHe }}</span>
      </el-form-item>
      <el-form-item label="参加何种学术团体、 任何职、有无社会其他兼职:" prop="cashuUianZhi">
        <el-input v-if="!readonly" v-model="form.cashuUianZhi" />
        <span v-else>{{ form.cashuUianZhi }}</span>
      </el-form-item>
      <el-form-item label="技能职称:" prop="jiNengZhiCheng">
        <el-input v-if="!readonly" v-model="form.jiNengZhiCheng" />
        <span v-else>{{ form.jiNengZhiCheng }}</span>
      </el-form-item>
      <el-form-item label="检定资格证书编号:" prop="jianDingZiGeZ">
        <el-input v-if="!readonly" v-model="form.jianDingZiGeZ" />
        <span v-else>{{ form.jianDingZiGeZ }}</span>
      </el-form-item>
      <el-form-item label="签字图文:" prop="qianZiTuWen">
        
      <ibps-attachment v-model="form.qianZiTuWen" placeholder="请选择" :download="true" v-if="!readonly"
        :limit="1" accept="*" :multiple="true" upload-type="attachment" store="id" media-type=""
        media="" style="width:100%;" />
        
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
import { save, get } from '@/api/demo/codegen/renYuanJiBengQingKuang'
import ActionUtils from '@/utils/action'
import IbpsAttachment from '@/business/platform/file/attachment/selector'
// import { validateKey } from '@/utils/validate'

export default {
  components: {
    'ibps-attachment': IbpsAttachment
    },
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
        chuShengNianYue: '',
        shenFenZhengHao: '',
        jiGuan: '',
        minZu: '',
        gongZuoBuMen: '',
        canJiaGongZuo: '',
        canJiaGongAn: '',
        zhengZhiMianMao: '',
        ruDangTuanShi: '',
        xingZhengZhiWu: '',
        renZhiShiJian: '',
        xianCongShiZhua: '',
        benZhuanYeGong: '',
        xianZhuanYeJiSh: '',
        quDeZiGeShiJ: '',
        jingXian: '',
        jingHao: '',
        yuanXueLi: '',
        yuanXueWei: '',
        yuanBiYeYuanXi: '',
        yuanBiYeShiJi: '',
        yuanZhuanYe: '',
        yuanBiYeZheng: '',
        yuanXueWeiZhen: '',
        zaiZhiXueLi: '',
        zaiZhiXueWei: '',
        zaiZhiBiYe: '',
        zaiZhiBiYeSh: '',
        zaiZhiZhuanYe: '',
        zaiZhiBiYeZheng: '',
        zaiZhiXueWeiZhe: '',
        zhangWoHeZHe: '',
        cashuUianZhi: '',
        jiNengZhiCheng: '',
        jianDingZiGeZ: '',
        qianZiTuWen: ''
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