<template>
	<div class="app-container">

		<el-row>

			<el-col :span="12" class="firstcol">
				<div class="vue-grid-item cssTransforms">
					<div class="el-card ibps-desktop-dashboard is-always-shadow jbd-home-card" alias="paddingApprove">
						<div class="el-card__header">
							<div class="clearfix">
								<span class="jbd-font-style"><i class="el-icon-edit"></i> 待办事宜</span>
							</div>
						</div>
						<el-table v-loading="waitLoading" :data="pendingData" style="color:#000;" align="center"
							size="mini" border class="jbd-home-task" @row-click="handleLinkClick"
							:row-class-name="tableRowClassName">
							<el-table-column show-overflow-tooltip label="年份" width="60">
								<template slot-scope="scope">
									{{getParenthesesStr(scope.row.subject)[0]}}

								</template>
							</el-table-column>
							<el-table-column prop="subject" label="事务名称" show-overflow-tooltip>
								<template slot-scope="scope">
									{{scope.row.subject.split("(")[0]}}
								</template>
							</el-table-column>

							<el-table-column show-overflow-tooltip width="100" label="状态">
								<template slot-scope="scope">
									{{ '待'+scope.row.name}}
								</template>
							</el-table-column>


							<el-table-column prop="startDept" show-overflow-tooltip width="80" label="发起部门" />

							<el-table-column prop="forwardBy" show-overflow-tooltip width="100" label="任务提交人" />

							<el-table-column show-overflow-tooltip width="145" label="时间">
								<template slot-scope="scope">
									{{scope.row.createTime.slice(0,16)}}
								</template>
							</el-table-column>


						</el-table>
						<div>
							<el-pagination @current-change="handleCurrentChange" :current-page.sync="pendingPage.page"
								:page-size="pendingPage.limit" layout="total, prev, pager, next"
								:total="pendingPage.totalCount">
							</el-pagination>
						</div>
					</div>
				</div>

				<bpmn-formrender :visible="dialogFormVisible" :task-id="taskId" :waiJian="waiJian" :title="FlowName"
					@callback="getWait()" @close="visible => dialogFormVisible = visible" />
			</el-col>



			<el-col :span="12" class="firstcol">
				<!-- 展开工作栏-->

				<div class="jbd-control-cont" v-if="!drawer" style="background-color: #DDFFF1;">
					<el-button type="success" icon="el-icon-caret-right" style="width: 100%;height: 100%;" plain circle
						@mouseover.native="handleClose()" @mouseleave.native="handleClose()" />

					<p style="color: #000000; font-size: 14px;">公</p>
					<p style="color: #000000; font-size: 14px;">告</p>
				</div>
				<div class="vue-grid-item cssTransforms">
					<div class="el-card ibps-desktop-dashboard is-always-shadow jbd-home-card" alias="paddingApprove"
						style=" width: 100%;">
						<div class="el-card__header">
							<div class="clearfix">
								<span class="jbd-font-style"><i class="el-icon-document-remove" /> 已办事宜</span>
							</div>
						</div>
						<el-table v-loading="orverLoading" :data="handledData" align="center" style="color:#000;"
							class="jbd-home-task" :row-class-name="tableRowClassName" border size="mini"
							@row-click="handleLinkClickOrver">
							<el-table-column show-overflow-tooltip label="年份" width="60">
								<template slot-scope="scope">
									{{getParenthesesStr(scope.row.subject)[0]}}

								</template>
							</el-table-column>

							<el-table-column prop="subject" label="事务名称" show-overflow-tooltip>
								<template slot-scope="scope">
									{{scope.row.subject.split("(")[0]}}
								</template>
							</el-table-column>

							<el-table-column show-overflow-tooltip label="状态" width="100">
								<template slot-scope="scope">
									{{scope.row.curNode ?
									scope.row.status == "running" ? '已发起' : '已'+scope.row.curNode
									 : contOfValue(scope.row.status )}}
								</template>
							</el-table-column>

							<el-table-column show-overflow-tooltip label="发起部门" width="80">
								<template slot-scope="scope">
									{{getParenthesesStr(scope.row.subject)[1]}}

								</template>
							</el-table-column>


							<el-table-column show-overflow-tooltip label="任务提交人" width="100">
								<template slot-scope="scope">
									{{getParenthesesStr(scope.row.subject)[2]}}
								</template>
							</el-table-column>


							<el-table-column show-overflow-tooltip width="145" label="办理时间">
								<template slot-scope="scope">
									{{scope.row.createTime.slice(0,16)}}
								</template>
							</el-table-column>

						</el-table>
						<div>
							<el-pagination @current-change="orverCurrentChange" :current-page.sync="orverPage.page"
								:page-size="orverPage.limit" layout="total, prev, pager, next"
								:total="orverPage.totalCount">
							</el-pagination>
						</div>
						<!-- <div class="el-card__body">
                 <div class="el-scrollbar" style="height: 100%;width: 100%;">
                   <div class="ibps-scrollbar-wrapper el-scrollbar__wrap" style="margin-bottom: -8px; margin-right: -8px;">
                     <div class="el-scrollbar__view">
                        <div class="pending-Tabs el-tabs el-tabs--top">
                          <div class="el-tabs__content">
                             <div class="el-tab-pane">
                               <div class="ibps-pr-10 ibps-list ibps-list-default ibps-list-horizontal ibps-list-split">
                                 <div class="ibps-list-container">
                                    <ul class="ibps-list-items" v-for='(item0,index1) in handledData' :key='index1'>
                                      <li class="ibps-list-item"  style="cursor: pointer;"  @click="handleLinkClickOrver(item0.id)">
                                        <div class="ibps-list-item-meta">
                                          <div class="ibps-list-item-meta-avatar">
                                            <span class="el-avatar el-avatar--icon el-avatar--circle" style="background:#CC7832;">
                                              <i class="el-icon-document-copy"></i>
                                            </span>
                                          </div>
                                          <div class="ibps-list-item-meta-content">
                                            <div class="ibps-list-item-meta-title" style="margin-bottom: 0px;">
                                              <el-link type="primary" :underline="false">
                                                 <span class="el-link--inner" style="color: #909399;">{{item0.subject}}</span>
                                              </el-link>
                                            </div>
                                          <div class="ibps-list-item-meta-description">{{ item0.createTime }}</div>
                                          </div>
                                        </div>
                                        <div class="ibps-list-item-extra">
                                        </div>
                                      </li>
                                    </uL>
                                 </div>
                               </div>
                             </div>
                          </div>
                        </div>
                     </div>
                    </div>
                  </div>
               </div> -->
					</div>
				</div>
				<bpmn-formrender :visible="orverDialogFormVisible" :instance-id="instanceId" @callback="getOrver()"
					@close="visible => orverDialogFormVisible = visible" />

			</el-col>
		</el-row>
		<el-drawer title="" style="overflow: auto;" :visible.sync="drawer" :direction="direction" :before-close="handleClose
  ">

			<el-row>
				<el-col :span="24">
					<div class="vue-grid-item cssTransforms" style="margin-bottom: 10px;">
						<div class="el-card box-card is-always-shadow jbd-home-card" alias="userInfo"
							style=" display: none;">
							<div class="el-card__body">
								<div class="ibps-list-item-meta">
									<div class="ibps-list-item-meta-avatar">
										<span class="el-avatar el-avatar--icon el-avatar--circle"
											style="height: 50px; width: 50px; line-height:  50px; font-size:  50px; color: rgb(192, 196, 204); background: rgb(255, 255, 255);">
											<i class="ibps-icon-user-circle"></i>
										</span>
									</div>
									<div class="ibps-list-item-meta-content">
										<div class="ibps-list-item-meta-title">
											<div class="ibps-item-content">
												<!-- <span class="ibps-item-content-title">您好！
                                   <span>{{ orgName }}</span>
                                    <label>{{ name }}</label>
                                  </span><br><br> -->
												<div slot="label" class="ibps-item-content-label"
													style="display: none;">
													<span style="color: #000000;">所属部门<div class="home-text-border">
															{{ orgName }}
														</div></span>
													<span style="color: #000000;">所处岗位<div class="home-text-border">
															{{posName}}
														</div></span>
													<span style="color: #000000;">拥有角色<div class="home-text-border">
															{{roleName}}
														</div></span>

													<!--  <span>邮箱：<span> {{ email }}</span><br><br></span>
                                    <span>当前日期：<span> {{ getDate }}</span><br><br></span> -->
												</div>

											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- <div style="margin-left:3%;"> <slot name="myslot"></slot></div> -->
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24" style="margin-top: 5px; font-size: 14px;margin-bottom: 10px;">
					<div class="vue-grid-item cssTransforms">
						<div class="el-card ibps-desktop-dashboard is-always-shadow jbd-home-card"
							alias="paddingApprove" style="width: 100%;">
							<div class="el-card__header">
								<div class="clearfix">
									<span class="jbd-font-style" style="font-family: KaiTi;">公告栏目</span>
								</div>
							</div>
							<div class="el-card__body">
								<div class="el-scrollbar" style="height: 100%;width: 100%;">
									<div class="ibps-scrollbar-wrapper el-scrollbar__wrap"
										style="margin-bottom: -8px; margin-right: -8px;">
										<div class="el-scrollbar__view">
											<div class="pending-Tabs el-tabs el-tabs--top">
												<div class="el-tabs__content">
													<div class="el-tab-pane">
														<div
															class="ibps-pr-10 ibps-list ibps-list-default ibps-list-horizontal ibps-list-split">
															<div class="ibps-list-container">
																<ul class="ibps-list-items">
																	<!--
                                              <li  class="ibps-list-item" style="cursor: pointer;" v-for='(item,index0) in newsData' :key='index0' @click="handelInteriorClick(item.id)" >
                                                <div  class="ibps-list-item-meta">
                                                  <div class="ibps-list-item-meta-content">
                                                    <div class="ibps-list-item-meta-title">
                                                      <a class="el-link el-link--primary">
                                                        <span class="el-link--inner jbd-font-style" style="font-size: 14px;font-family: KaiTi;">{{ item.title }}</span>
                                                      </a>
                                                      </div>
                                                    </div>
                                                </div>
                                                <div class="ibps-list-item-extra">
                                                    <div>
                                                    <i  class="ibps-icon ibps-icon-dot-circle-o" style="color: rgb(54, 198, 211);"></i>
                                                    {{ item.userName }} |
                                                    {{item.publicDate.substring(0,7)}}
                                                    </div>
                                                </div>
                                              </li>
-->
																	<li class="ibps-list-item" style="cursor: pointer;"
																		v-for='(item,index0) in newsDataCms'
																		:key='index0'
																		@click="handelInteriorClick(item.sendtime_)">
																		<div class="ibps-list-item-meta">
																			<div class="ibps-list-item-meta-content">
																				<div class="ibps-list-item-meta-title">
																					<a class="el-link el-link--primary">
																						<span
																							class="el-link--inner jbd-font-style"
																							style="font-size: 14px;font-family: KaiTi;">

																							<div>

																								<span>{{ item.templatename_ }}</span>
																							</div>


																						</span>
																					</a>
																				</div>
																			</div>
																		</div>
																		<div class="ibps-list-item-extra">
																			<div>
																				<i class="ibps-icon ibps-icon-dot-circle-o"
																					style="color: rgb(54, 198, 211);"></i>
																				{{ item.NAME_ }} |
																				{{item.bian_zhi_shi_jian}}
																			</div>
																		</div>
																	</li>


																</ul>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>

			<!--  <el-row>
          <el-col :span="24" style="margin-top: 5px;">
              <div  class="vue-grid-item cssTransforms">
                <div  class="el-card ibps-desktop-dashboard is-always-shadow"  alias="paddingApprove" style="height:434px; width: 100%;">
                  <div class="el-card__body">
                     <homeCalendar></homeCalendar>
                  </div>
                </div>
              </div>

            </el-col>
         </el-row>

-->




		</el-drawer>


	</div>
</template>


<script>
	import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
	import {
		getAccountInfo,
		findBpm,
		getNews,
		unreadMessage,
		getCmsNews
	} from '@/api/demo/newHomeApi'
	import homeCalendar from './home-calendar';
	import {
		pending,
		handledTask
	} from '@/api/platform/office/bpmReceived'
	import BpmnFormrender from '@/business/platform/bpmn/form/dialog'
	import ActionUtils from '@/utils/action'

	export default {
		components: {
			BpmnFormrender,
			homeCalendar
		},
		name: "calendar",
		data() {
			return {
				taskId: '', // 编辑dialog需要使用
				waiJian: '', // 编辑dialog需要使用
				waitLoading: false,
				drawer: false,
				bpmData: [],
				newsData: [],
				newsDataCms: [],
				pendingData: [],
				pendingPage: {},
				orverPage: {},
				handledData: [],
				unreadMessageData: [],
				instanceId: '',
				orverDialogFormVisible: false,
				dialogFormVisible: false,
				orverLoading: false,
				direction: 'rtl',
				orgName: "",
				roleName: '',
				name: "",
				email: "",
				title: "",
				userName: "",
				selectName: "one",
				FlowName: '',
				activeName: "first",
				getDate: '',
				posName: '',
				pagination: {
					page: 1,
					limit: 10
				},
				orverPagination: {
					page: 1,
					limit: 10
				},
				sorts: {},
			}
		},
		mounted: function() {
			this.loadData();
		},
		methods: {
			loadData() {
				let user = this.$store.getters.userInfo
				let pos, role
				this.orgName = user.employee.orgName
				for (let i in user.positions) {
					if (i == 0) pos = user.positions[0].name
					else pos = pos + ',' + user.positions[i].name
				}

				let contRole = this.unique(user.role) //去重
				for (let i in contRole) {
					if (i == 0) role = contRole[0].name
					else role = role + ',' + contRole[i].name
				}
				this.posName = pos
				this.roleName = role
				/* 用户消息 */

				this.getMessage() /* 获取公告 */
				this.getWait() /* 待办任务*/
				this.getOrver() /* 已办任务*/
			},
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (rowIndex % 2 === 1) return "warning-row"
				return 'success-row'
			},
			/* 数组去重*/
			unique(arr) {
				const res = new Map();
				return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
			},
			/* 待办分页*/
			handleCurrentChange(val) {
				this.pagination.page = val
				this.getWait()
			},
			/* 将状态码遍历成结果*/
			contOfValue(cont) {
				if (cont == "running") {
					return '已发起'
				} else if (cont == "end") {
					return '已结束'
				} else if (cont == "manualend") {
					return '已结束'
				} else {
					return '暂停'
				}
			},

			/* 待办任务*/
			getWait() {
				this.waitLoading = true
				pending(this.getFormatParams(null, this.pagination)).then(response => {
					if (response.data.dataResult) {
						this.pendingData = response.data.dataResult;
						this.pendingPage = response.data.pageResult
					}
					this.waitLoading = false
				}).catch(() => {
					this.waitLoading = false
				}) /* 获取待办任务 */
			},
			/* 已办分页*/
			orverCurrentChange(val) {
				this.orverPagination.page = val
				this.getOrver()
			},
			/* 已办任务 status*/
			getOrver() {
				this.orverLoading = true
				handledTask(this.getFormatParams(1, this.orverPagination)).then(response => {
					if (response.data.dataResult.length > 0) {
						this.handledData = response.data.dataResult;
						this.orverPage = response.data.pageResult
					}
					this.orverLoading = false
				}).catch(() => {
					this.orverLoading = false
				}) /*获取已办任务  */
			},
			getMessage() {

				/*  console.log("当前用户id",this.$store.getters.userId)
				  console.log(this.$store)*/

				console.log("当前用户信息", this.$store.getters.userInfo.employee)
				/*   getNews().then(response => {
				    this.newsData = response.data;
				    this.loading = false
				  }).catch(() => {
				    this.loading = false
				  })公告 */

				//新公告
				/**
				let params = {
					parameters: [{
							"key": "response_data",
							"value": "{\"template_id\":\"961299238640156672\",\"template_type\":\"\",\"attrs\":{\"init_query\":\"Y\",\"need_page\":\"Y\",\"page_size\":20},\"query_columns\":[{\"label\":\"接收人\",\"name\":\"received_\",\"rights\":[{\"type\":\"all\"}],\"common\":\"Y\",\"same\":\"Y\",\"field_type\":\"text\",\"field_options\":{},\"data_type\":\"varchar\"},{\"label\":\"编制部门\",\"name\":\"bian_zhi_bu_men_\",\"field_type\":\"selector\",\"field_options\":{\"default_value_type\":\"present\",\"placeholder\":\"请选择\",\"selector_type\":\"org\",\"store\":\"id\",\"multiple\":false,\"filter\":[],\"required\":false,\"hide_rights\":false,\"read_rights\":false,\"hide_label\":false,\"is_width\":false,\"width\":100,\"width_unit\":\"%\",\"is_label_width\":false,\"label_width\":100,\"label_width_unit\":\"px\",\"mobile\":true,\"display\":true,\"clearable\":true},\"data_type\":\"varchar\"}],\"display_columns\":[{\"label\":\"方式\",\"name\":\"fa_song_fang_shi_\",\"rights\":[{\"type\":\"all\"}],\"noRightStyle\":\"\",\"align\":\"left\",\"sortable\":true,\"width\":\"80\",\"same\":\"Y\",\"field_type\":\"radio\",\"field_options\":{\"required\":false,\"hide_rights\":false,\"read_rights\":false,\"hide_label\":false,\"is_label_width\":false,\"label_width\":100,\"label_width_unit\":\"px\",\"mobile\":true,\"arrangement\":\"horizontal\",\"default_value_type\":\"fixed\",\"datasource\":\"custom\",\"options\":[{\"val\":\"公告\",\"label\":\"系统内\",\"checked\":true},{\"val\":\"短信\",\"label\":\"短信\",\"checked\":false},{\"val\":\"短信和公告\",\"label\":\"短信和系统内\",\"disabled\":false,\"checked\":false}],\"display\":true,\"clearable\":true,\"custom_class\":\"font-weight:bolder\"},\"data_type\":\"varchar\"},{\"label\":\"类型\",\"name\":\"templatename_\",\"rights\":[{\"type\":\"all\"}],\"noRightStyle\":\"\",\"align\":\"left\",\"sortable\":true,\"width\":\"80\",\"same\":\"Y\",\"field_type\":\"text\",\"field_options\":{\"default_value_type\":\"fixed\",\"placeholder\":\"请输入\",\"required\":false,\"is_min_length\":false,\"is_max_length\":false,\"hide_rights\":true,\"read_rights\":false,\"hide_label\":false,\"is_width\":false,\"width\":100,\"width_unit\":\"%\",\"is_label_width\":false,\"label_width\":100,\"label_width_unit\":\"px\",\"clearable\":true,\"mobile\":true,\"display\":true},\"data_type\":\"varchar\"},{\"label\":\"通知内容\",\"name\":\"content_\",\"rights\":[{\"type\":\"all\"}],\"noRightStyle\":\"\",\"align\":\"left\",\"sortable\":true,\"width\":\"\",\"same\":\"Y\",\"field_type\":\"textarea\",\"field_options\":{\"default_value_type\":\"fixed\",\"placeholder\":\"\",\"required\":false,\"is_min_length\":false,\"is_max_length\":false,\"hide_rights\":true,\"read_rights\":false,\"hide_label\":false,\"is_width\":false,\"width\":100,\"width_unit\":\"%\",\"is_label_width\":false,\"label_width\":100,\"label_width_unit\":\"px\",\"clearable\":true,\"mobile\":true,\"display\":true,\"default_value\":\"\"},\"data_type\":\"varchar\"},{\"label\":\"状态\",\"name\":\"state_\",\"rights\":[{\"type\":\"all\"}],\"noRightStyle\":\"\",\"align\":\"left\",\"sortable\":true,\"width\":\"80\",\"same\":\"Y\",\"field_type\":\"text\",\"field_options\":{},\"data_type\":\"varchar\"},{\"label\":\"接收人\",\"name\":\"received_\",\"rights\":[{\"type\":\"all\"}],\"noRightStyle\":\"\",\"align\":\"left\",\"sortable\":true,\"width\":\"240\",\"same\":\"Y\",\"field_type\":\"text\",\"field_options\":{},\"data_type\":\"varchar\"},{\"label\":\"发送时间\",\"name\":\"sendtime_\",\"rights\":[{\"type\":\"all\"}],\"noRightStyle\":\"\",\"align\":\"left\",\"sortable\":true,\"width\":\"150\",\"same\":\"Y\",\"field_type\":\"datePicker\",\"field_options\":{\"default_value_type\":\"today\",\"placeholder\":\"请选择\",\"datefmt_type\":\"datetime\",\"datefmt\":\"yyyy-MM-dd HH:mm:ss\",\"required\":false,\"is_start_date\":false,\"is_end_date\":false,\"hide_rights\":true,\"read_rights\":false,\"hide_label\":false,\"is_width\":false,\"width\":100,\"width_unit\":\"%\",\"is_label_width\":false,\"label_width\":100,\"label_width_unit\":\"px\",\"clearable\":true,\"mobile\":true,\"display\":true},\"data_type\":\"varchar\"},{\"label\":\"部门\",\"name\":\"bian_zhi_bu_men_\",\"rights\":[{\"type\":\"all\"}],\"noRightStyle\":\"\",\"align\":\"left\",\"sortable\":true,\"width\":\"80\",\"same\":\"Y\",\"field_type\":\"selector\",\"field_options\":{\"default_value_type\":\"present\",\"placeholder\":\"请选择\",\"selector_type\":\"org\",\"store\":\"id\",\"multiple\":false,\"filter\":[],\"required\":false,\"hide_rights\":false,\"read_rights\":false,\"hide_label\":false,\"is_width\":false,\"width\":100,\"width_unit\":\"%\",\"is_label_width\":false,\"label_width\":100,\"label_width_unit\":\"px\",\"mobile\":true,\"display\":true,\"clearable\":true},\"data_type\":\"varchar\"},{\"label\":\"通知人\",\"name\":\"bian_zhi_ren_\",\"rights\":[{\"type\":\"all\"}],\"noRightStyle\":\"\",\"align\":\"left\",\"sortable\":true,\"width\":\"120\",\"same\":\"Y\",\"field_type\":\"selector\",\"field_options\":{\"default_value_type\":\"present\",\"placeholder\":\"请选择\",\"selector_type\":\"user\",\"store\":\"id\",\"multiple\":false,\"filter\":[],\"required\":false,\"hide_rights\":false,\"read_rights\":false,\"hide_label\":false,\"is_width\":false,\"width\":100,\"width_unit\":\"%\",\"is_label_width\":false,\"label_width\":100,\"label_width_unit\":\"px\",\"mobile\":true,\"display\":true,\"clearable\":true},\"data_type\":\"varchar\"},{\"label\":\"通知人\",\"name\":\"tong_zhi_ren_\",\"field_type\":\"text\",\"field_options\":{\"default_value_type\":\"fixed\",\"placeholder\":\"请输入\",\"required\":false,\"is_min_length\":false,\"is_max_length\":false,\"hide_rights\":true,\"read_rights\":true,\"hide_label\":false,\"is_width\":false,\"width\":100,\"width_unit\":\"%\",\"is_label_width\":false,\"label_width\":100,\"label_width_unit\":\"px\",\"clearable\":true,\"mobile\":true,\"display\":true},\"data_type\":\"varchar\"}],\"orig_display_columns\":\"\",\"filter_conditions\":[{\"label\":\"默认条件\",\"key\":\"ffc246c0-5132-4c64-a31c-e46e240f4574\",\"type\":\"condition\",\"rights\":[{\"type\":\"all\"}],\"filter\":{\"condition\":\"OR\",\"rules\":[{\"id\":\"fa_song_fang_shi_\",\"field\":\"fa_song_fang_shi_\",\"label\":\"发送方式\",\"type\":\"string\",\"input\":\"text\",\"operator\":\"equal\",\"source\":\"fixed\",\"value\":\"公告\"},{\"id\":\"fa_song_fang_shi_\",\"field\":\"fa_song_fang_shi_\",\"label\":\"发送方式\",\"type\":\"string\",\"input\":\"text\",\"operator\":\"equal\",\"source\":\"fixed\",\"value\":\"短信和公告\"}]}}],\"result_columns\":[{\"label\":\"主键\",\"name\":\"id_\"},{\"label\":\"租户ID\",\"name\":\"tenant_id_\"},{\"label\":\"IP地址\",\"name\":\"ip_\"},{\"label\":\"创建人\",\"name\":\"create_by_\"},{\"label\":\"发送时间\",\"name\":\"create_time_\",\"rights\":[{\"type\":\"all\"}],\"same\":\"Y\",\"field_type\":\"orig\",\"field_options\":{\"datefmt_type\":\"date\",\"datefmt\":\"yyyy-MM-dd\",\"selector_type\":\"user\",\"options\":[{\"val\":\"\",\"label\":\"\"}],\"store\":\"id\",\"dictionary\":\"\",\"dictionary_name\":\"\"}},{\"label\":\"更新时间\",\"name\":\"update_time_\"},{\"label\":\"更新人\",\"name\":\"update_by_\"},{\"label\":\"是否过审\",\"name\":\"shi_fou_guo_shen_\"},{\"label\":\"编制人\",\"name\":\"bian_zhi_ren_\"},{\"label\":\"编制部门\",\"name\":\"bian_zhi_bu_men_\"},{\"label\":\"编制时间\",\"name\":\"bian_zhi_shi_jian\"},{\"label\":\"sendTime\",\"name\":\"sendtime_\"},{\"label\":\"state\",\"name\":\"state_\"},{\"label\":\"templateCode\",\"name\":\"templatecode_\"},{\"label\":\"receive\",\"name\":\"received_\"},{\"label\":\"content\",\"name\":\"content_\"},{\"label\":\"phone\",\"name\":\"phone_\"},{\"label\":\"templateName\",\"name\":\"templatename_\"},{\"label\":\"字段一\",\"name\":\"zi_duan_yi_\"},{\"label\":\"字段二\",\"name\":\"zi_duan_er_\"},{\"label\":\"字段三\",\"name\":\"zi_duan_san_\"},{\"label\":\"通知部门\",\"name\":\"tong_zhi_bu_men_\"},{\"label\":\"发送方式\",\"name\":\"fa_song_fang_shi_\"},{\"label\":\"通知人\",\"name\":\"tong_zhi_ren_\"}],\"sort_columns\":[{\"label\":\"创建时间\",\"name\":\"create_time_\",\"direction\":\"desc\"}],\"buttons\":{\"function_buttons\":[{\"button_type\":\"search\",\"label\":\"查询\",\"position\":\"toolbar\"},{\"label\":\"添加\",\"button_type\":\"custom\",\"rights\":[{\"type\":\"all\"}],\"position\":\"toolbar\",\"code\":\"openTask\",\"style\":\"success\"},{\"label\":\"删除\",\"button_type\":\"remove\",\"rights\":[{\"type\":\"all\"}],\"position\":\"toolbar\"}],\"edit_buttons\":[{\"button_type\":\"close\",\"label\":\"关闭\"},{\"button_type\":\"save\",\"label\":\"保存\"}]},\"export_columns\":\"\",\"ext_columns\":\"\",\"datasetKey\":\"dxtz\",\"unique\":\"id_\",\"dynamic_params\":{}}"
						},
						{
							"key": "filter_condition_key",
							"value": ""
						}
					],
					requestPage: {
						"pageNo": 1,
						"limit": 20

					},
					sorts: []
				};

				getCmsNews(params).then(response => {
					console.log(response.data.dataResult)
					this.newsDataCms = response.data;
				}).catch(() => {
					this.loading = false
				})
				**/

				let sql =
					"select td.*,ie.NAME_ from t_dxtz td,ibps_party_employee ie  where td.bian_zhi_ren_ = ie.id_ and  td.fa_song_fang_shi_ like  '%公告%' ORDER BY create_time_ desc"

				curdPost('sql', sql).then(res => {
					console.log(res)
					if (res.state == 200) {
						let dbData = res.variables.data
						this.newsDataCms = dbData
						// console.log('555', dbData)
					}

				})



			},
			getFormatParams(v, pagination) {
				const params = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}
				return ActionUtils.formatParams(
					params,
					pagination,
					this.sorts)
			},

			/**
			 * 处理排序
			 */
			handleSortChange(sort) {
				ActionUtils.setSorts(this.sorts, sort)
				this.loadData()
			},

			handelundeMes(id) {
				this.newsEditId = id
				this.$emit("handleUnreadMessage", id);
				unreadMessage().then(response => {

					this.$nextTick(() => {
						this.unreadMessageData = response.data.system;
						this.loading = false
					})

				}).catch(() => {
					this.loading = false
				})
			},

			handelInteriorClick(id) {
				this.messageEditId = id

				this.$emit("handleApprove", id);
				console.log("id是:" + id)
			},
			/**
			 * 点击待办表格
			 */
			handleLinkClick(cont) {
				this.taskId = cont.id || ''
				this.waiJian = cont.waiJian || ''
				this.FlowName = cont.name
				this.dialogFormVisible = true
			},
			/**
			 * 点击已办表格
			 */
			handleLinkClickOrver(cont) {
				this.instanceId = cont.id || ''
				this.orverDialogFormVisible = true
			},
			/* 开关右侧栏抽屉*/
			handleClose() {
				this.drawer = !this.drawer
			},
			/* 文字替换*/
			getParenthesesStr(text) {
				let result = ''
				if (!text) return result
				let regex = /\((.+?)\)/g;
				let options = text.match(regex)
				if (options) {
					let option = options[0]
					if (option) {
						result = option.substring(1, option.length - 1)
					}
					if (options[1]) {
						let yersOption = options[1]
						if (yersOption) {
							result = result + '/' + yersOption.substring(1, yersOption.length - 1)
						}
					}
				}
				return result.split('/')
			},

		},
	}
</script>
<style lang="scss" scoped>
	.el-completing {
		background: #409EFF !important;
	}

	.el-col {
		min-height: 1px;

	}

	.firstcol {
		padding-right: 10px;
	}

	.el-nothing {
		font-size: 13px;
	}

	.calendar-day {
		text-align: center;
		color: #202535;
		line-height: 30px;
		font-size: 12px;
	}

	.is-selected {
		color: #F8A535;
		font-size: 10px;
		margin-top: 5px;
	}

	#calendar .el-button-group>.el-button:not(:first-child):not(:last-child):after {
		content: '当月';
	}

	#calendar .item {
		position: relative;
		margin: 0;
		padding: 0;
		height: auto;
		border-radius: 4px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		overflow: hidden;
		color: #F8A535;
	}

	.ibps-list-split .ibps-list-item {
		border-bottom: 1px solid #dcdfe6;
		padding: 6px 0;
	}

	.jbd-font-style {
		font-weight: bold;
	}

	.home-text-border {
		color: #999999;
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1),
			0 0 0 0 rgba(0, 0, 0, 0.1),
			0 0 0 0 rgba(0, 0, 0, 0.1),
			0 1px 0px 0 rgba(0, 0, 0, 0.1);
		min-height: 20px;
		font-size: 14px;
		margin-left: 60px;
		margin-bottom: 5px;
	}

	.jbd-home-card {
		overflow: auto;
	}

	.jbd-home-task {
		width: 100%;
		padding: 10px;
		cursor: pointer;
		font-size: 12px;
		margin-bottom: 35px;
	}

	.jbd-home-card::-webkit-scrollbar {
		display: none;
	}

	.jbd-control-cont {
		text-align: center;
		position: absolute;
		z-index: 10;
		right: 0px;
		top: 50%;
	}
</style>
<style>
	.app-container .el-drawer.rtl {
		overflow: scroll;
	}

	.app-container .el-table th {
		background-color: #A7D6F8 !important;
		font-size: 14px;
		font-weight: bold;
		color: #000000;
		border: 0px;
	}

	.app-container .el-table td {
		padding: 4px;
	}

	.app-container .el-table .warning-row {
		background: #D3EBFC;
		color: #000000;
	}

	.app-container .el-table .success-row {
		background: #F9FFFF;
		color: #000000;

	}
</style>
