<template>
  <el-form
    ref="baseInfoForm"
    :element-loading-text="$t('common.loading')"
    :model="baseInfoForm"
    :label-width="formLabelWidth"
    @submit.native.prevent
  >
    <el-row>
      <el-col :span="8">
        <el-form-item label="编号:">
          <el-input v-if="!readonly" v-model="baseInfoForm.orderNo" />
          <span v-else>{{ baseInfoForm.orderNo }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="名称:">
          <el-input v-if="!readonly" v-model="baseInfoForm.name" />
          <span v-else>{{ baseInfoForm.name }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="日期:">
          <el-date-picker v-if="!readonly" v-model="baseInfoForm.createTime" type="date" placeholder="请选择日期" />
          <span v-else>{{ baseInfoForm.createDate }}</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="创建人:">
          <el-input v-if="!readonly" v-model="baseInfoForm.createBy" />
          <span v-else>{{ baseInfoForm.createBy }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="部门:">
          <el-input v-if="!readonly" v-model="baseInfoForm.deptId" />
          <span v-else>{{ baseInfoForm.deptId }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="批准人:">
          <el-input v-if="!readonly" v-model="baseInfoForm.examineUser" />
          <span v-else>{{ baseInfoForm.examineUser }}</span>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  props: {
    data: Object,
    readonly: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      formName: 'baseInfoForm',
      formLabelWidth: '120px',
      baseInfoForm: {}
    }
  },
  computed: {

  },
  watch: {
    data() {
      this.baseInfoForm = this.data
    }
  },
  mounted() {

  },
  created() {

  },
  methods: {
    /**
     * 重置字段
     */
    resetFields() {
      this.$refs[this.formName].resetFields()
    },
    handleEmitEvent() {
      this.$emit('input', this.baseInfoForm)
    }
  }
}
</script>

