<template>
  <div>
    <ibps-crud
      ref="crud"
      :height="height"
      :data="listData"
      :toolbars="listConfig.toolbars"
      :search-form="listConfig.searchForm"
      :pk-key="pkKey"
      :columns="listConfig.columns"
      :row-handle="listConfig.rowHandle"
      :pagination="pagination"
      :loading="loading"
      :index-row="false"
      @action-event="handleAction"
      @sort-change="handleSortChange"
      @column-link-click="handleLinkClick"
      @pagination-change="handlePaginationChange"
    >
      <template slot="searchFormCreator">
        <ibps-employee-selector
          v-model="searchFormCreator"
          style="width:200px;"
        />
      </template>
      <template v-slot:ownerName="{value}">
        <el-popover trigger="hover" placement="top" width="250">
          {{ value }}
          <div slot="reference" class="ibps-ellipsis">
            {{ value }}
          </div>
        </el-popover>
      </template>
    </ibps-crud>
    <bpmn-formrender
      :visible="dialogFormVisible"
      :task-id="taskId"
      @callback="search"
      @close="visible => dialogFormVisible = visible"
    />
    <!-- 转办 -->
    <delegate
      :task-id="taskId"
      :title="title"
      :visible="delegateVisible"
      @callback="search"
      @close="visible => delegateVisible = visible"
    />
    <!-- 批量审批 -->
    <approve-dialog
      :visible="approveDialogVisible"
      :title="title"
      :task-id="taskId"
      :action="action"
      @callback="search"
      @close="visible => approveDialogVisible = visible"
    />
    </div>
</template>
<script>
import { pending } from '@/api/platform/office/bpmReceived'
import { batchSuspendProcess, batchRecoverProcess } from '@/api/platform/bpmn/bpmTask'
import ActionUtils from '@/utils/action'
import FixHeight from '@/mixins/height'
import { taskTypeOptions } from '@/business/platform/bpmn/constants'
import IbpsTypeTree from '@/business/platform/cat/type/tree'
import IbpsEmployeeSelector from '@/business/platform/org/employee/selector'
import BpmnFormrender from '@/business/platform/bpmn/form/dialog'
import Delegate from '@/business/platform/bpmn/task-change/edit'
import ApproveDialog from '@/business/platform/bpmn/form-ext/approve'

export default {
  components: {
    IbpsTypeTree,
    IbpsEmployeeSelector,
    Delegate,
    ApproveDialog,
    BpmnFormrender
  },
  mixins: [FixHeight],
  data() {
    return {
      width: 200,
      height: document.clientHeight,
      dialogFormVisible: false, // 弹窗
      approveDialogVisible: false, // 批量审批
      delegateVisible: false,
      action: '',
      taskId: '', // 编辑dialog需要使用
      title: '',
      pkKey: 'id', // 主键  如果主键不是pk需要传主键
      typeId: '',
      loading: false,
      listData: [],
      listConfig: {
        // 工具栏
        toolbars: [
          { key: 'search' },
          {
            key: 'agree',
            label: '同意',
            icon: 'ibps-icon-check-square-o'
          },
          {
            key: 'stop',
            label: '终止',
            icon: 'ibps-icon-ioxhost'
          },
          {
            key: 'suspend',
            label: '挂起',
            icon: 'ibps-icon-ioxhost '
          },
          {
            key: 'recover',
            label: '恢复',
            icon: 'ibps-icon-ioxhost '
          }
        ],
        // 查询条件
        searchForm: {
          forms: [
            { prop: 'Q^subject_^SL', name: 'Q^temp.subject_^SL', label: '标题关键字', link: 'dialog', labelWidth: 82, itemWidth: 200 },
            {
              prop: ['Q^create_time_^DL', 'Q^create_time_^DG'],
              name: ['Q^temp.create_time_^DL', 'Q^temp.create_time_^DG'],
              label: '时间',
              fieldType: 'daterange',
              labelWidth: 80,
              itemWidth: 200
            }
          ]
        },
        // 表格字段配置
        columns: [
          { prop: 'subject', label: '任务标题', link: 'dialog' },
          { prop: 'name', label: '任务节点', width: 150 },
          { prop: 'createTime', label: '开始时间', width: 150 },
          { prop: 'ownerName', label: '所属人', width: 200 },
        ],
        // 管理列
      /*  rowHandle: {
          effect: 'display',
          width: '100px',
          actions: [
            {
              key: 'delegate',
              label: '转办',
              icon: 'ibps-icon-mail-forward',
              hidden: (row, index) => {
                if (row.allowShfit === 'Y') return false
                return true
              }

            }
          ]
        } */
      },
      pagination: {},
      sorts: {},
      searchFormCreator: ''

    }
  },
  created() {
    this.loadData()
  },
  methods: {
    /**
     * 加载数据
     */
    loadData() {
      this.loading = true
      pending(this.getFormatParams()).then(response => {
        ActionUtils.handleListData(this, response.data)
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    /**
     * 获取格式化参数
     */
    getFormatParams() {
      const params = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}
      if (this.$utils.isNotEmpty(this.typeId)) {
        params['Q^temp.TYPE_ID_^S'] = this.typeId
      }
     params['Q^NODE_ID_^SL'] = 'Activity_0cyqefn'

      return ActionUtils.formatParams(
        params,
        this.pagination,
        this.sorts)
    },
    /**
     * 处理分页事件
     */
    handlePaginationChange(page) {
      ActionUtils.setPagination(this.pagination, page)
      this.loadData()
    },
    /**
     * 处理排序
     */
    handleSortChange(sort) {
      ActionUtils.setSorts(this.sorts, sort)
      this.loadData()
    },
    search() {
      this.loadData()
    },
    /**
     * 重置查询条件
     */
    reset() {
      this.$refs['crud'].handleReset()
    },
    /**
     * 点击表格
     */
    handleLinkClick(data, columns) {
      this.taskId = data.taskId || ''
      this.dialogFormVisible = true
    },
    /**
     * 处理按钮事件
     */
    handleAction(command, position, selection, data) {
      switch (command) {
        case 'search':// 查询
          ActionUtils.setFirstPagination(this.pagination)
          this.search()
          break
        case 'stop': // 终止
          ActionUtils.selectedMultiRecord(selection).then((ids) => {
            this.handleBatchApprove(ids, 'stop')
            this.title = '批量终止流程'
          }).catch(() => { })
          break
        case 'agree': // 同意
          ActionUtils.selectedMultiRecord(selection).then((ids) => {
            this.handleBatchApprove(ids, 'agree')
            this.title = '批量同意审批'
          }).catch(() => { })
          break
        case 'suspend': // 挂起
          ActionUtils.selectedMultiRecord(selection).then((ids) => {
            this.handleSuspend(ids)
          }).catch(() => { })
          break
        case 'recover': // 恢复
          ActionUtils.selectedMultiRecord(selection).then((ids) => {
            this.handleRecover(ids)
          }).catch(() => { })
          break
        case 'delegate': // 转办
          ActionUtils.selectedRecord(selection).then((id) => {
            this.title = '任务转办'
            this.handleDelegate(id)
          }).catch(() => { })
          break
        default:
          break
      }
    },
    handleNodeClick(typeId) {
      this.typeId = typeId
      this.loadData()
    },
    /**
     * 处理批量审批
     */
    handleBatchApprove(id = '', action = 'agree') {
      this.taskId = id
      this.action = action
      this.approveDialogVisible = true
    },
    /**
     * 批量挂起任务
     */
    handleSuspend(ids) {
      this.$confirm('确认批量挂起流程任务？', '信息').then(() => {
        batchSuspendProcess({ taskIds: ids }).then(() => {
          ActionUtils.successMessage('挂起流程任务成功')
          this.search()
        }).catch(err => {
          console.error(err)
        })
      })
    },
    /**
     * 批量挂起任务
     */
    handleRecover(ids) {
      this.$confirm('确认批量恢复流程任务？', '信息').then(() => {
        batchRecoverProcess({ taskIds: ids }).then(() => {
          ActionUtils.successMessage('恢复流程任务成功')
          this.search()
        }).catch(err => {
          console.error(err)
        })
      })
    },
    handleDelegate(id) {
      this.taskId = id
      this.delegateVisible = true
    },
    handleExpandCollapse(isExpand) {
      this.width = isExpand ? 230 : 30
    }
  }
}
</script>
