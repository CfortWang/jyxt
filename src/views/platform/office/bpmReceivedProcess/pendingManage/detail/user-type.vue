<template>
	<div :style="{height:(height-50)+'px'}">
		<ibps-crud ref="crud" :height="height" :data="listData" :displayField="title" :toolbars="listConfig.toolbars"
			:search-form="listConfig.searchForm" :pk-key="pkKey" :columns="listConfig.columns" :pagination="pagination"
			:loading="loading" :index-row="false" :selection-row="false" @action-event="handleAction"
			@sort-change="handleSortChange" @pagination-change="handlePaginationChange"
			@column-link-click="handleLinkClick" :contorlLength="true">
			<template slot="procDefIdSelect">
				<bpm-definition-selector v-model="procDefIdSelect" style="width:200px;display:block;" value-key="defKey"
					is-super :multiple="false" @input="getProcDefId" @callback="data => formId= data.id" />
			</template>
			<!--  <template slot="subject" slot-scope="scope">
        <el-badge v-if="scope.row.remindTimes>0" :value="scope.row.remindTimes" class="item">
          <el-link type="primary" :underline="false" @click="handleLinkClick(scope.row)">
            {{ scope.row.subject }}
          </el-link>
        </el-badge>
        <el-link v-else type="primary" :underline="false" @click="handleLinkClick(scope.row)">
          {{ scope.row.subject }}
        </el-link>
      </template> -->
		</ibps-crud>
		<bpmn-formrender :visible="dialogFormVisible" :task-id="taskId" @callback="search" :title="flowName"
			@close="visible => dialogFormVisible = visible" />
		<delegate :task-id="taskId" :title="title" :visible="delegateVisible" @callback="search"
			@close="visible => delegateVisible = visible" />
		<approve-dialog :visible="approveDialogVisible" :title="title" :task-id="taskId" :action="action"
			@callback="search" @close="visible => approveDialogVisible = visible" />
	</div>
	<!--  <div :style="{height:height+'px'}"  class="pendingManage-module">
    <ibps-card-list
      ref="crud"
      :title="title"
      :height="height"
      :data="listData"
      :pagination="pagination"
      :pk-key="pkKey"
      :toolbars="listConfig.toolbars"
      :search-form="listConfig.searchForm"
      :columns="listConfig.columns"
      :loading="loading"
      :index-row="false"
      @action-event="handleAction"
      @sort-change="handleSortChange"
      @pagination-change="handlePaginationChange"
    >
      <template slot="procDefIdSelect">
        <bpm-definition-selector
          v-model="procDefIdSelect"
          style="width:200px;display:block;"
          value-key="defKey"
          is-super
          :multiple="false"
          @input="getProcDefId"
          @callback="data => formId= data.id"
        />
      </template>
      <template slot="item-symbol">
        <p style="width:60px;height:60px;border: 2px solid #409eff;border-radius: 100%;font-size: 48px;color:#409eff;font-size:30px;line-height: 60px;">??????</p>
      </template>

      <template slot="item-detail-name">
          <span></span>
      </template>
      <template slot="item-detail-partyTypeName">
        <span></span>
      </template>


      <template slot="item-detail-createTime">
        <span></span>
      </template>
      <template slot="item-detail-taskName">
        <span></span>
      </template>
      <template slot="item-detail-completeTime">
        <span></span>
      </template>
      <template slot="item-detail-curNode">
        <span></span>
      </template>
      <template slot="item-detail-status">
        <span></span>
      </template>

    </ibps-card-list>
    <bpmn-formrender
      :visible="dialogFormVisible"
      :task-id="taskId"
      @callback="search"
      @close="visible => dialogFormVisible = visible"
    />
    <delegate
      :task-id="taskId"
      :title="title"
      :visible="delegateVisible"
      @callback="search"
      @close="visible => delegateVisible = visible"
    />
    <approve-dialog
      :visible="approveDialogVisible"
      :title="title"
      :task-id="taskId"
      :action="action"
      @callback="search"
      @close="visible => approveDialogVisible = visible"
    />
  </div>
  -->
</template>
<script>
	import {
		pending
	} from '@/api/platform/office/bpmReceived'
	import {
		pending4User
	} from '@/api/platform/office/bpmReceived'
	import {
		batchSuspendProcess,
		batchRecoverProcess
	} from '@/api/platform/bpmn/bpmTask'
	import ActionUtils from '@/utils/action'
	import BpmDefinitionSelector from '@/business/platform/bpmn/definition/selector'
	import BpmnFormrender from '@/business/platform/bpmn/form/dialog'
	import Delegate from '@/business/platform/bpmn/task-change/edit'
	import ApproveDialog from '@/business/platform/bpmn/form-ext/approve'

	export default {
		components: {
			BpmDefinitionSelector,
			Delegate,
			ApproveDialog,
			BpmnFormrender,
			/* 'ibps-type-tree': () => import('@/business/platform/cat/type/tree'),
			 'ibps-card-list': () => import('@/components/ibps-card-list/list'),
			 'form-rights': () => import('@/business/platform/form/form-rights'),
			 'form-builder': () => import('@/business/platform/form/formbuilder/dialog'),
			 'formrender-preview': () => import('@/business/platform/form/formrender/preview/index') */
		},
		props: {
			id: String,
			height: Number,
		},
		data() {
			return {
				width: 220,
				title: '????????????',
				createText: '????????????',
				query: '',
				copyDialogFormVisible: false,
				rightsDialogFormVisible: false,
				formbuilderDialogVisible: false,
				formrenderDialogVisible: false,
				importFormVisible: false,
				formPrintDialogVisible: false,
				defId: '', // ??????dialog????????????
				statusOptions: [],
				editId: '',
				formKey: '',
				searchField: '',
				searchName: 'Q^subject_^SL',
				dialogFormVisible: false, // ??????
				flowName: '',
				taskId: '', // ??????dialog????????????
				stautusOptions: [],
				pkKey: 'id', // ??????  ??????????????????pk???????????????
				typeId: '',
				loading: false,
				listData: [],
				approveDialogVisible: false, // ????????????
				delegateVisible: false,
				action: '',
				listConfig: {
					// ?????????
					toolbars: [{
							key: 'search'
						},
						/* {
						  key: 'agree',
						  label: '??????/??????',
						  icon: 'ibps-icon-check-square-o'
						},
						{
						  key: 'stop',
						  label: '??????',
						  icon: 'ibps-icon-ioxhost'
						},
						{
						  key: 'suspend',
						  label: '??????',
						  icon: 'ibps-icon-ioxhost '
						},
						{
						  key: 'recover',
						  label: '??????',
						  icon: 'ibps-icon-ioxhost '
						} */
					],
					// ????????????
					searchForm: {
						forms: [{
								prop: 'Q^subject_^SL',
								name: 'Q^temp.subject_^SL',
								label: '????????????',
								link: 'dialog',
								labelWidth: 80,
								itemWidth: 150
							},
							{
								prop: ['Q^create_time_^DL', 'Q^create_time_^DG'],
								name: ['Q^temp.create_time_^DL', 'Q^temp.create_time_^DG'],
								label: '????????????',
								fieldType: 'daterange',
								labelWidth: 80
							}
						]
					},
					/*   { prop: 'subject', label: '????????????', link: 'dialog' , width: 450},
					  { prop: 'taskName', label: '??????', width: 100 },
					  { prop: 'status', label: '?????? / ??????', tags: actionOptions, width: 100 },
					  { prop: 'createTime', label: '????????????', dateFormat: 'yyyy-MM-dd HH:mm:ss', width: 140 },
					  { prop: 'completeTime', label: '????????????', dateFormat: 'yyyy-MM-dd HH:mm:ss', width: 140 },
					  { prop: 'forwardBy', label: '???????????????', width:95 },
					  { prop: 'startDept', label: '????????????' }*/
					// ??????????????????
					columns: [
						//   { prop: 'subject', label: '????????????', slotName: 'subject',width:400 },
						{
							prop: 'subject',
							label: '????????????',
							link: 'dialog',
							width: 450
						},
						{
							prop: 'procDefName',
							label: '????????????',
							width: 150
						},
						{
							prop: 'name',
							label: '??????',
							width: 150
						},
						{
							prop: 'createTime',
							label: '????????????',
							width: 140
						},
						{
							prop: 'forwardBy',
							label: '???????????????',
							width: 100
						},
						{
							prop: 'startDept',
							label: '????????????',
							width: 100
						},
						{
							prop: 'ownerName',
							label: '?????????'
						}
					]
				},
				pagination: {},
				sorts: {},
				procDefIdSelect: ''

			}
		},
		methods: {
			getProcDefId(data) {
				this.procDefIdSelect = data
			},
			/**
			 * ????????????
			 */
			// loadData(id) {
			//   this.loading = true
			//   pending(this.getFormatParams(id)).then(response => {
			//     ActionUtils.handleListData(this, response.data)
			//     this.loading = false
			//   }).catch(() => {
			//     this.loading = false
			//   })"814095456912015360"
			// },
			loadData(id) {
				this.loading = true
				pending(this.getFormatParams(id)).then(response => {
					ActionUtils.handleListData(this, response.data)
					this.loading = false
				}).catch(() => {
					this.loading = false
				})
			},
			/**
			 * ?????????????????????
			 */
			getFormatParams(id) {
				const params = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}
				if (this.$utils.isNotEmpty(this.procDefIdSelect)) {
					params['Q^temp.proc_def_key_^S'] = this.procDefIdSelect
				}
				if (this.$utils.isNotEmpty(id)) {
					params['Q^temp.TYPE_ID_^S'] = id
				}
				return ActionUtils.formatParams(
					params,
					this.pagination,
					this.sorts)
			},
			/**
			 * ??????????????????
			 */
			handlePaginationChange(page) {
				ActionUtils.setPagination(this.pagination, page)
				this.loadData()
			},
			/**
			 * ????????????
			 */
			handleSortChange(sort) {
				ActionUtils.setSorts(this.sorts, sort)
				this.loadData()
			},
			search() {
				this.loadData()
			},
			/**
			 * ??????????????????
			 */
			reset() {
				this.$refs['crud'].handleReset()
			},
			/**
			 * ????????????
			 */
			handleLinkClick(data, columns) {
				this.taskId = data.taskId || ''
				this.flowName = data.name
				this.dialogFormVisible = true
			},
			/**
			 * ??????????????????
			 */
			handleAction(command, position, selection, data) {
				switch (command) {
					case 'search': // ??????
						ActionUtils.setFirstPagination(this.pagination)
						this.search()
						break
					case 'add': // ??????
						this.handleEdit()
						break
					case 'edit': // ??????
						this.handleEdit(selection, data)
						break
					case 'stop': // ??????
						ActionUtils.selectedMultiRecord(selection).then((ids) => {
							this.handleBatchApprove(ids, 'stop')
							this.title = '??????????????????'
						}).catch(() => {})
						break
					case 'agree': // ??????
						ActionUtils.selectedMultiRecord(selection).then((ids) => {
							this.handleBatchApprove(ids, 'agree')
							this.title = '??????????????????'
						}).catch(() => {})
						break
					case 'suspend': // ??????
						ActionUtils.selectedMultiRecord(selection).then((ids) => {
							this.handleSuspend(ids)
						}).catch(() => {})
						break
					case 'recover': // ??????
						ActionUtils.selectedMultiRecord(selection).then((ids) => {
							this.handleRecover(ids)
						}).catch(() => {})
						break
					case 'delegate': // ??????
						ActionUtils.selectedRecord(selection).then((id) => {
							this.title = '????????????'
							this.handleDelegate(id)
						}).catch(() => {})
						break
					default:
						break
				}
			},
			/**
			 * ??????
			 */
			handleEdit(id, data) {
				this.taskId = id
				this.flowName = data.name
				this.dialogFormVisible = true
			},
			/**
			 * ??????????????????
			 */
			handleBatchApprove(id = '', action = 'agree') {
				this.taskId = id
				this.action = action
				this.approveDialogVisible = true
			},
			/**
			 * ??????????????????
			 */
			handleSuspend(ids) {
				this.$confirm('?????????????????????????????????', '??????').then(() => {
					batchSuspendProcess({
						taskIds: ids
					}).then(() => {
						ActionUtils.successMessage('????????????????????????')
						this.search()
					}).catch(err => {
						console.error(err)
					})
				})
			},
			/**
			 * ??????????????????
			 */
			handleRecover(ids) {
				this.$confirm('?????????????????????????????????', '??????').then(() => {
					batchRecoverProcess({
						taskIds: ids
					}).then(() => {
						ActionUtils.successMessage('????????????????????????')
						this.search()
					}).catch(err => {
						console.error(err)
					})
				})
			},
			handleDelegate(id) {
				this.taskId = id
				this.delegateVisible = true
			}
		}
	}
</script>
<style lang="scss">
	.pendingManage-module {
		.cell {
			overflow: initial !important;
		}

		.el-badge {
			margin: 10px 0 0 10px;
		}

		.el-badge__content.is-fixed {
			top: 0;
			left: -40px;
			right: auto;
		}
	}
</style>
<style scoped>
	.ibps-layout>>>.container-component {
		position: absolute;
		top: 0px;
		right: 0;
		bottom: 0px;
		left: 220px !important;
	}

	.ibps-card-list-container>>>.ibps-card-list--picture-card {
		display: block;
	}

	.ibps-card-list-container>>>.ibps-card-list {
		padding-top: 10px !important;
	}
</style>
