<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :width="width+'px'"
    append-to-body
    top="5vh"
    class="resources-move-node-dialog"
    @open="onOpen"
  >
    <ibps-tree
      ref="elTree"
      v-loading.body="dialogLoading"
      :element-loading-text="$t('common.loading')"
      :width="width-30"
      :height="height"
      :data="treeData"
      :options="treeOptions"
    />
    <div slot="footer" class="el-dialog--center">
      <ibps-toolbar
        :actions="toolbars"
        @action-event="handleActionEvent"
      />
    </div>
  </el-dialog>
</template>
<script>
import { saveMove,treeSave } from '@/api/platform/auth/resources'
import ActionUtils from '@/utils/action'

export default {
  props: {
    visible: Boolean,
    id: [String, Number],
    systemId: [String, Number],
    data: Array
  },
  data() {
    return {
      // tree 配置
      width: 650,
      height: document.clientHeight,
      dialogVisible: this.visible,
      treeOptions: {},
      treeData: [],

      options: [],
      // 弹窗配置
      title: '移动节点',
      dialogLoading: false,
      editForm: {
        name: '',
        account: '',
        wcAccount: '',
        orgName: '',
        gender: '',
        createTime: ''
      },
      toolbars: [
        { key: 'save' },
        { key: 'cancel' }
      ]

    }
  },
  watch: {
    visible: {
      handler: function(val, oldVal) {
        //参数id, 树形结构id
        this.dialogVisible = this.visible
      },
      immediate: true
    }
  },
  methods: {
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
    onOpen() {
      this.treeData = JSON.parse(JSON.stringify(this.data))
      this.$nextTick(() => {
        this.$refs.elTree.remove(this.id)
      })
    },
    // 保存数据
    saveData() {
      const destinationId = this.$refs.elTree.getCurrentKey()
      if (this.$utils.isEmpty(destinationId)) {
        this.$message({
          message: '请选择节点',
          type: 'warn'
        })
        return
      }
      this.dialogLoading = true
          saveMove({
            resourceId: this.id,
            systemId: this.systemId,
            destinationId: destinationId
          })
            .then(response => {
              this.dialogLoading = false
              this.$emit('callback', this)
              ActionUtils.saveSuccessMessage(response.message, r => {
                if (r) {
                  this.closeDialog()
                }
              })
            })
            .catch(() => {
              this.$emit('callback', this)
              this.dialogLoading = false
            })
    },
    // 关闭当前窗口
    closeDialog() {
      this.$emit('close', false)
      this.editForm = {}
    }
  }
}
</script>

<style lang="scss">
.resources-move-node-dialog{
  .el-dialog__body{
    padding: 10px;
    height:  calc(80vh - 120px) !important;
  }
}
</style>
