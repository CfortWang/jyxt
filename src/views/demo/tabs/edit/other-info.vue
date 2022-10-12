<template>
  <el-form
    ref="otherInfoForm"
    :element-loading-text="$t('common.loading')"
    :model="otherInfoForm"
    @submit.native.prevent
  >
    <span>{{ otherInfoForm.otherInfo }}</span>
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
      otherInfoForm: {
        otherInfo: '其他信息......'
      }
    }
  },
  methods: {

  }
}
</script>
