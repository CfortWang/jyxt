<template>
    <ibps-container
        ref="dashboardContainer"
        v-loading="loading"
        :element-loading-text="$t('common.loading')"
        :scroll-delay="scrollDelay"
        type="full"
        class="ibps-desktop-page"
        @scroll="({ x, y }) => { scrollTop = y }"
    >
        <newHome @handleApprove="handleApprove" @handleUnreadMessage="handleUnreadMessage">
            <template slot="myslot">
                <el-upload
                    style="display: inline-block"
                    class="upload-demo"
                    :action="uloadPath"
                    :headers="headers"
                    :before-upload="beforeUpload"
                    :show-file-list="false"
                    :on-error="fileErr"
                    :on-success="handleSuccess"
                >
                    <el-button size="small" icon="el-icon-s-management" plain type="primary">导入委托单</el-button>
                </el-upload>

                <el-upload
                    style="display: inline-block; margin-left: 10px"
                    class="upload-demo"
                    :action="reportPath"
                    v-if="showRepost"
                    :headers="headers"
                    :before-upload="ReportBeforeUpload"
                    :show-file-list="false"
                    :on-error="fileErr"
                    :on-success="handleSuccess"
                >
                    <el-button size="small" plain icon="el-icon-s-order" type="primary">替换/新增报表</el-button>
                </el-upload>

                <el-button
                    type="primary"
                    plain
                    size="small"
                    style="display: inline-block; margin-left: 10px"
                    icon="el-icon-download"
                    @click="downloadData()"
                >
                    下载桌面应用</el-button
                >
            </template>
        </newHome>
        <ibps-back-to-top
            :visibility-height="150"
            :scroll-top="scrollTop"
            transition-name="fade"
            @scrollToTop="scrollToTop"
        />
        <preview
            :id="id"
            :visible="dialogPreviewVisible"
            title="全屏预览"
            screen
            @close="visible => (dialogPreviewVisible = visible)"
        />
        <bpmn-formrender
            :visible="bpmnFormrenderDialogVisible"
            :def-id="defId"
            :task-id="taskId"
            :instance-id="instanceId"
            @close="visible => (bpmnFormrenderDialogVisible = visible)"
            @callback="handleFlowCallback"
        />

        <ibps-news-dialog
            :id="newsEditId"
            title="公告栏目明细"
            :visible="ibpsNewsDialogVisible"
            :readonly="true"
            @close="visible => (ibpsNewsDialogVisible = visible)"
        />

        <ibps-message-dialog
            :id="messageEditId"
            title="消息明细"
            :readonly="true"
            :visible="ibpsMessageDialogVisible"
            @close="visible => (ibpsMessageDialogVisible = visible)"
        />
    </ibps-container>

    <!-- <template v-if="initLoading">
        <template v-if="localSystem">
            <ibps-grid-layout
                v-if="layout && layout.length >0"
                :layout.sync="layout"
                :col-num="colNum"
                :row-height="rowHeight"
                :is-draggable="isDraggable"
                :is-resizable="isResizable"
                :is-mirrored="isMirrored"
                :vertical-compact="verticalCompact"
                :margin="margin"
                :use-css-transforms="useCssTransforms"
            >
                <ibps-grid-item
                    v-for="(item,index) in layout"
                    :key="item.i"
                    :x="item.x"
                    :y="item.y"
                    :w="item.w"
                    :h="item.h"
                    :i="item.i"
                >
                    <component
                        :is="'ibps-desktop-'+item.alias"
                        v-if="hasComponent(item.alias)"
                        :id="item.i" :ref="item.alias"
                        :alias="item.alias"
                        :height="getHeight(item.h)"
                        @action-event="(command,data)=> handleActionEvent(command,data,index)"
                    />
                </ibps-grid-item>
            </ibps-grid-layout>
            <el-alert
                v-else-if="!loading"
                :closable="false"
                type="warning"
                show-icon
                style="height:50px"
            >
                <span slot="title">未设置个人桌面布局，可以通过“<a href="javascript:void(0)" @click="goMyLayout">个人办公-》个人桌面布局</a>”进行设置</span>
            </el-alert>
        </template>
        <!==不是本地系统==>
        <template v-else>
            <!==iframe方式==>
            <iframe
                v-if="systemUrlType === 'iframe'"
                ref="systemrender"
                class="ibps-container-frame"
                frameborder="0"
            />
            <!==vue组件方式==>
            <component
                v-else
                ref="systemrender"
                :is="systemUrlName"
                :params="systemUrlParams"
            />
        </template>
    </template> -->
</template>

<script>
    import { getMyDesktop } from '@/api/platform/desktop/myLayout'
    import { initColumn, isInit, getComponents } from './components'
    import { BASE_API, BUSINESS_BASE_URL } from '@/api/baseUrl' //引用导出地址
    //  网格布局组件
    import { GridLayout, GridItem } from 'vue-grid-layout'
    import IbpsBackToTop from '@/components/ibps-back-to-top'
    import Preview from '@/views/platform/desktop/column/preview'
    import BpmnFormrender from '@/business/platform/bpmn/form/dialog'

    import IbpsNewsDialog from '@/views/platform/system/news/cms'
    import IbpsMessageDialog from '@/views/platform/message/inner/detail/dialog'
    import { StatisticsData } from '@/api/platform/system/jbdHome'
    import { StatisticsSign } from '@/api/platform/system/jbdHome'
    import { getToken } from '@/utils/auth'

    import newHome from './components/new-home'

    import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'

    const _import = require('@/utils/util.import.' + process.env.NODE_ENV)

    export default {
        components: {
            'ibps-news-dialog': IbpsNewsDialog,
            'ibps-message-dialog': IbpsMessageDialog,
            IbpsBackToTop,
            Preview,
            newHome,
            BpmnFormrender,
            'ibps-grid-layout': GridLayout,
            'ibps-grid-item': GridItem
        },
        data() {
            return {
                infoMessage: [],
                uloadPath: BASE_API() + BUSINESS_BASE_URL() + '/ck/task/importExcel',
                reportPath: BASE_API() + BUSINESS_BASE_URL() + '/sys/SysDataContext/replaceReportFile',
                layout: null,
                colNum: 24,
                rowHeight: 30,
                isDraggable: false,
                isResizable: false,
                isMirrored: false,
                verticalCompact: true,
                margin: [15, 15],
                useCssTransforms: true,
                taskId: '',
                ibpsNewsDialogVisible: false,
                newsEditId: '',
                showRepost: true,

                ibpsMessageDialogVisible: false,
                messageEditId: '',

                scrollDelay: 0,
                scrollTop: 0,
                initLoading: false,
                loading: false,
                id: '',
                dialogPreviewVisible: false, // 预览
                defaultData: [],

                bpmnFormrenderDialogVisible: false, // 流程
                defId: '',
                taskId: '',
                instanceId: '',
                layoutIndex: '',
                initInterval: null,

                systemUrlType: 'iframe',
                systemUrlName: '',
                systemUrlParams: {},
                alias: '',
                headers: {
                    'X-Authorization-access_token': getToken()
                }
            }
        },
        computed: {
            system() {
                return this.$store.getters.system ? this.$store.getters.system : null
            },
            systemAlias() {
                return this.$store.getters.system ? this.$store.getters.system.alias : ''
            },
            localSystem() {
                return this.system.isLocal
            }
        },
        mounted() {
            if ('isNormal' == localStorage.getItem('statistic')) this.showRepost = false
            this.initLoading = false
            this.initData()
        },
        created() {
            this.getTestingData()
            StatisticsData().then(data => {
                //将参数替换成对应参数
                if (data.state === 200 && data.variables.data.length > 0) {
                    let h = this.$createElement,
                        cont = data.variables.data
                    for (let i = 0; i < cont.length; i++) {
                        window.setTimeout(() => {
                            this.infoMessage[i] = this.$notify.info({
                                title: '定时任务:' + cont[i].ren_wu_biao_ti_,
                                message: h('p', null, [
                                    h('span', null, '任务时间: ' + cont[i].ren_wu_shi_jian_),
                                    h('br'),
                                    h('span', null, '任务内容: '),
                                    h('span', { style: 'color: #FF8C00;font-size:12px;' }, cont[i].ding_shi_ren_wu_n),
                                    h('br'),
                                    h('el-button',{
                                        attrs: {
                                            size: 'mini',
                                            plain: true
                                        },
                                        on: {
                                            click: () => {
                                                this.infoMessage[i].close()
                                            } // 路由加载之后，调用关闭消息弹窗的方法
                                        }
                                    }, '忽略关闭')
                                ]),
                                duration: 0
                            })
                        }, 0)
                    }
                }
            })
        },
        beforeDestroy() {
            for (let i = 0; i < this.infoMessage.length; i++) {
                this.infoMessage[i].close()
            }
        },
        methods: {
            cancelInfo(cronId, title, num, processData, taskId) {
                /* 调用流程*/
                if (taskId) {
                    this.$router.push({
                        name: 'pendingItems'
                    })
                } else if (processData) {
                    this.defId = processData
                    this.bpmnFormrenderDialogVisible = true
                }
                this.infoMessage[num].close()
            },
            downloadData() {
                window.location.href = BASE_API() + BUSINESS_BASE_URL() + '/sys/SysDataContext/downloadData'
            },
            scrollToTop() {
                this.$refs.dashboardContainer.scrollToTop()
            },
            initData() {
                this.initInterval = setInterval(() => {
                    if (this.$utils.isNotEmpty(this.systemAlias)) {
                        this.initLoading = true
                        if (this.localSystem) {
                            // this.fetchData()
                        } else {
                            this.initSystemUrl(this.system.homePage)
                        }
                        clearInterval(this.initInterval)
                    }
                }, 100)
            },
            // 抓取数据
            // fetchData() {
            //   initColumn(this.systemAlias)
            //   this.loading = true
            //    const interval = setInterval(() => {
            //    if (isInit()) {
            //   //     getMyDesktop({
            //   //       systemAlias: this.systemAlias
            //   //     }).then(response => {
            //   //       try {
            //   //         this.layout = this.$utils.parseData(response.data)
            //   //         this.defaultData = this.$utils.parseData(response.data)
            //   //       } catch (error) {
            //   //         this.layout = []
            //   //         this.defaultData = []
            //   //       }
            //   //       this.loading = false
            //   //     }).catch(() => {
            //   //       this.loading = false
            //   //     })
            //       clearInterval(interval)
            //    }
            //    }, 100)
            // },
            getHeight(h) {
                return (h - 1) * (this.rowHeight + this.margin[1]) + this.margin[1]
            },
            hasComponent(alias) {
                const name = 'ibps-desktop-' + alias
                const components = getComponents()
                if (components) {
                    return components.includes(name)
                } else {
                    return false
                }
            },
            resizedHandler(i, newH, newW, newHPx, newWPx) {
                if (!this.layout) return
                this.layout.layout.find(n => {
                    if (i === n.i) {
                        n.widthPx = this.getWidth(n.w)
                        n.heightPx = this.getHeight(n.h)
                    }
                })
            },
            goMyLayout() {
                this.$router.push({ path: '/officeDesk/grzlsw/desktopMyLayout' })
            },
            handleActionEvent(command, params, index) {
                this.layoutIndex = index
                this.alias = params.$alias
                switch (command) {
                    case 'fullscreen':
                        this.handleFullscreen(params.id)
                        break
                    case 'collapse':
                    case 'expansion':
                        this.handleCollapseExpansion(index, command === 'collapse')
                        break
                    case 'flow':
                        this.handleFlow(params)
                        break
                    case 'approve':
                        this.handleApprove(params)
                        break
                    case 'unRead':
                        this.handleUnreadMessage(params)
                        break

                    default:
                        break
                }
            },
            /**
             * 全屏展示切换
             */
            handleFullscreen(id) {
                this.dialogPreviewVisible = true
                this.id = id
            },
            // 处理收缩/展开
            handleCollapseExpansion(index, isCollapse) {
                this.layout[index].h = isCollapse ? 2 : this.defaultData[index].h
                this.layout.push({ i: '0' })
                const deleteIndex = this.layout.findIndex(item => item.i === '0')
                this.layout.splice(deleteIndex, 1)
            },

            handleApprove(id) {
                this.ibpsNewsDialogVisible = true
                this.newsEditId = id
            },

            handleUnreadMessage(id) {
                this.ibpsMessageDialogVisible = true
                this.messageEditId = id
            },
            fileErr(err, file, fileList) {
                this.$message.error('文件上传失败，请检查格式！')
            },
            handleFlow(params) {
                this.defId = params.defId || null
                this.taskId = params.taskId || null
                this.instanceId = params.instanceId || null

                this.instanceId = params.instanceId || null
                this.instanceId = params.instanceId || null

                this.bpmnFormrenderDialogVisible = true
            },
            handleFlowCallback() {
                this.$refs[this.alias] ? this.$refs[this.alias][0].refreshData() : null
            },

            //
            initSystemUrl(url) {
                if (url.startsWith('http')) {
                    this.systemUrlType = 'iframe'
                    this.$nextTick(() => {
                        this.$refs.systemrender.src = url
                        // 传递消息
                        // this.$refs.systemrender.contentWindow.postMessage({ data: this.attributes }, '*')
                    })
                } else {
                    const component = url.split('?')[0]
                    this.systemUrlParams.attrs = this.urlParse(url)
                    this.systemUrlType = 'inner'
                    const systemUrlName = 'IbpsBpmnSystemUrl'
                    this.$options.components[systemUrlName] = _import(component)
                    this.systemUrlName = systemUrlName
                }
            },
            urlParse(str) {
                const obj = {}
                if (str.indexOf('?') !== -1) {
                    const str1 = str.split('?')[1].split('&')
                    for (let i = 0; i < str1.length; i++) {
                        const params = str1[i].split('=')
                        obj[params[0]] = params[1]
                    }
                }
                return obj
            },
            /* 文件类型*/
            beforeUpload(file) {
                var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
                const extension = testmsg === 'xls'
                const extension2 = testmsg === 'xlsx'
                if (!extension && !extension2) {
                    this.$message({
                        message: '上传文件只能是excel格式!',
                        type: 'warning'
                    })
                    return false
                }
                return extension || extension2
            },
            /* 文件类型*/
            ReportBeforeUpload(file) {
                var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
                const extension = testmsg === 'rpx'
                if (!extension) {
                    this.$message({
                        message: '上传文件只能是rpx格式!',
                        type: 'warning'
                    })
                    return false
                }
                return extension
            },

            handleSuccess(res, file, fileList) {
                if (res.state === 200) {
                    this.$message({
                        message: '上传数据成功！',
                        type: 'success'
                    })
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                }
            },
            // 获取检测流程数据，存储到store中
            getTestingData() {
                let testingList = this.$store.getters.testingList
                if (testingList.length) {
                    return
                } else {
                    // let sql = 'select xiang_mu_ming_ as name, liu_cheng_bian_ha as processKey from t_jcxmlcpzb'
                    let sql = 'select jian_ce_xiang_mu_ as name, defkey_ as processKey from t_mjjcnlfw where length(defkey_) > 0 order by xiang_mu_bian_hao + 0 asc'
                    curdPost('sql', sql).then(res => {
                        const { data } = res.variables
                        this.$store.dispatch('ibps/param/setTestingList', data)
                    }).catch(error => {
                        this.$message.error('获取检测流程数据失败！')
                        console.log(error)
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/styles/public.scss';
    .ibps-desktop-page {
        .ibps-container-frame {
            position: absolute;
            top: 0px;
            left: 0px;
            height: 100%;
            width: 100%;
        }

        .ibps-grid-item, .el-card {
            height: 100%;
        }
        .vue-grid-layout {
            border-radius: 4px;
            // margin: -10px;
            .page_card {
                height: 100%;
                @extend %unable-select;
            }
            .vue-resizable-handle {
                opacity: 0.3;
                &:hover {
                    opacity: 1;
                }
            }
        }
    }
</style>

<style lang="scss">
    .ibps-desktop-dashboard {
        .item {
            position: relative;
            margin: 12px;
            padding: 12px;
            height: 90px;
            border-radius: 4px;
            box-sizing: border-box;
            overflow: hidden;
            color: #fff;
        }
        .item-header {
            position: relative;
            & > p {
                margin: 0px;
                font-size: 14px;
            }
            & > span {
                position: absolute;
                right: 0px;
                top: 0px;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 12px;
                background: rgba(255, 255, 255, 0.3);
            }
        }
        .item-body {
            & > h2 {
                margin: 0;
                font-size: 32px;
                line-height: 60px;
            }
        }
        .item-tip {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            width: 80px;
            height: 80px;
            bottom: -35px;
            right: 50px;
            border: 2px solid #fff;
            border-radius: 100%;
            font-size: 48px;
            transform: rotate(-40deg);
            opacity: 0.1;
        }
    }
</style>
