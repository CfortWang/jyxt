<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :readonly="readonly"
    append-to-body
    width="70%"
    height="100%"
    top="10vh"
    @open="loadFormData"
  >
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane label="基本信息" name="first">
        <basic-info
          ref="basicInfo"
          :readonly="readonly"
          :data="formData"
          @input="data => formData = data"
        />
      </el-tab-pane>
      <el-tab-pane label="详细信息" name="second">
        <ext-attr
          ref="attrInfo"
          :readonly="readonly"
          :data="attrItemList"
          :paren-id="editId"
          @input="data => attrItemList = data"
        />
      </el-tab-pane>
      <el-tab-pane label="其他信息" name="third">
        <other-info
          ref="otherInfo"
          :readonly="readonly"
          :data="otherInfo"
          @input="data => otherInfo = data"
        />
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="el-dialog--center">
      <ibps-toolbar
        :actions="toolbars"
        @action-event="handleActionEvent"
      />
    </div>
  </el-dialog>
</template>

<script>
import { getFormData } from '@/api/platform/form/formDef'
import { saveFormData } from '@/api/platform/data/dataTemplate'
import ActionUtils from '@/utils/action'
import BasicInfo from './basic-info'
import ExtAttr from './ext-attr'
import OtherInfo from './other-info'
export default {
  components: {
    BasicInfo,
    ExtAttr,
    OtherInfo
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
    title: {
      type: String
    },
    editId: {
      type: String
    },
    formKey: {
      type: String
    },
    rightsScope: {
      type: String,
      default: 'data'
    },
    templateKey: {
      type: String
    }
  },
  data() {
    return {
      dialogVisible: this.visible,
      dialogLoading: false,
      activeName: 'first',
      defaultForm: {},
      attrItemList: [],
      otherInfo: {},
      boCode: '',
      version: 0,
      formDef: null,
      formData: {},
      toolbars: [
        { key: 'save', label: '保存', hidden: () => { return this.readonly } },
        { key: 'cancel' }
      ]
    }
  },
  computed: {
    formId() {
      return this.editId
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

  methods: {
    loadFormData() {
      this.dialogLoading = true
      getFormData({
        templateKey: this.templateKey || '',
        formKey: this.formKey,
        pk: this.editId,
        rightsScope: this.rightsScope
      }).then(response => {
        const data = response.data
        if (!this.$utils.isEmpty(this.formId)) {
          this.formData = this.$utils.parseJSON(data.boData)
        }
        // 从后台获取表单定义数据
        this.formDef = this.$utils.parseData(data.form) || {}
        this.boCode = this.formDef.code
        // 版本号
        this.version = data.version
        this.dialogLoading = false
      }).catch(() => {
        this.dialogLoading = false
      })
    },

    handleActionEvent({ key }) {
      switch (key) {
        case 'save':
          this.saveData()
          break
        case 'cancel':
          this.closeDialog()
          break
        default:
          break
      }
    },
    // 保存数据
    saveData() {
      // 表单数据
      const jsonData = {
        boCode: this.boCode,
        version: this.version,
        formKey: this.formKey,
        pk: this.editId,
        data: JSON.stringify(this.form)
      }
      const loading = this.$loading({
        lock: true,
        text: this.$t('common.saving')
      })
      saveFormData(jsonData).then(response => {
        this.$emit('callback', this)
        ActionUtils.saveSuccessMessage(response.message, (rtn) => {
          if (this.$utils.isEmpty(this.formId)) {
            this.$refs[this.formName].resetFields()
          }
          if (rtn) {
            this.closeDialog()
          }
        })
      }).catch(() => {
        loading.close()
      })
    },
    callback() {
      this.closeDialog()
      this.$emit('callback', true)
    },
    // 关闭当前窗口
    closeDialog() {
      this.formDef = null
      this.$emit('close', false)
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
    handleClick(tab, event) {

    }
  }

}
</script>
