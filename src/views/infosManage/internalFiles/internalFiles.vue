<template>
    <ibps-layout ref="layout">
        <!-- 外部 -->
        <div slot="west">
            <div class="box">
                <p class="title">文件类型</p>
                <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                </el-input>
                <div class="treeDiv">
                    <el-tree ref="tree" :data="typeData" :props="defaultProps" @node-click="handleNodeClick"
                        :filter-node-method="filterNode"></el-tree>
                </div>
            </div>
            <ibps-container :margin-left="width + 'px'" class="page">
                <el-alert v-if="!show" :closable="false" title="请选择左边菜单右键进行操作！" type="warning" show-icon
                    style="height:50px;" />
                <template v-else>
                    <ibps-crud key="istree" ref="crud" :data="tableData" :toolbars="listConfig.toolbars"
                        :search-form="listConfig.searchForm" :pk-key="pkKey" :columns="listConfig.columns"
                        :loading="loading" @action-event="handleAction">
                        <template slot="wenjinachayue" slot-scope="scope">
                            <ibps-attachment :value="scope.row.zi_duan_er_" readonly allow-download :download="true" />
                        </template>
                    </ibps-crud>
                </template>
            </ibps-container>

        </div>
    </ibps-layout>
</template>
<script>
import ActionUtils from '@/utils/action'
import { getFileType, getFileByUserId } from '@/api/permission/file'
import IbpsAttachment from '@/business/platform/file/attachment/selector'
export default {
    components: {
        'ibps-attachment': IbpsAttachment
    },
    data() {
        return {
            show: '',
            rightsArr: ['join', 'delete'],
            rowHandle: true,
            width: 230,
            orgId: '',
            oldorgId: '',
            orgName: '',
            loading: false,
            typeData: [
                { id: '0', label: '质量手册' },
                { id: '1', label: '程序文件' },
                { id: '2', label: '程序文件表单' },
                { id: '3', label: '检测方法SOP' },
                { id: '4', label: '设备操作维护SOP' },
                { id: '5', label: '设备设施验证SOP' },
                { id: '6', label: '检测方法验证SOP' },
                { id: '7', label: '管理类SOP' },
                { id: '8', label: '检测方法SOP表单' },
                { id: '9', label: '设备操作维护SOP表单' },
                { id: '10', label: '设备设施验证SOP表单' },
                { id: '11', label: '检测方法验证SOP表单' },
                { id: '12', label: '管理类SOP表单' },
                { id: '13', label: '公司管理制度' },
                { id: '14', label: '非检测方法SOP' },
                { id: '15', label: '检测方法确认SOP' },
                { id: '16', label: '非标确认规定' },
                { id: '17', label: '非检测方法SOP表单' },
                { id: '18', label: '非检测方法确认SOP表单' },
            ],
            filterText: '',
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            pkKey: 'id', // 主键  如果主键不是pk需要传主键
            loading: false,
            tableData: [],
            listTreeData: [],
            listConfig: {
                // 工具栏
                toolbars: [
                    { key: 'search' }
                ],
                // 查询条件
                searchForm: {
                    forms: [
                        { prop: 'fileCode', label: '文件编号' },
                        { prop: 'fileName', label: '文件名称' },
                        { prop: 'deptName', label: '部门' },
                    ]
                },
                // 表格字段配置
                columns: [
                    { prop: 'zi_duan_yi_', label: '部门' },
                    { prop: 'wen_jian_bian_hao', label: '文件编号' },
                    { prop: 'wen_jian_ming_che', label: '文件名称' },
                    { prop: 'ban_ben_hao_', label: '版本号' },
                    { prop: 'fa_bu_ri_qi_', label: '发布日期' },
                    { prop: 'zi_duan_er_', label: '查阅', slotName: "wenjinachayue" }
                ]
            },
            listOptions: {
                border: true,
                stripe: true
            },
            pagination: {},
            sorts: {},
            // testData: [{
            //     zi_duan_yi_: '1',
            //     wen_jian_bian_hao: '2',
            //     wen_jian_ming_che: '3',
            //     ban_ben_hao_: '4',
            //     fa_bu_ri_qi_: '5',
            //     zi_duan_er_: '880481571788816384'
            // }]
        }
    },
    mounted() {
        // this.loadNode()
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        loadNode() {
            this.loading = true
            // getFileType("内部文件").then(res => {
            //     this.loading = false
            //     for (let i in res.variables.data) {
            //         let data = {}
            //         data["id"] = i
            //         data["label"] = res.variables.data[i]
            //         this.typeData.push(data)
            //     }
            // }).catch(res => {
            //     this.loading = false
            // })
        },
        refreshData() {
            this.tableData = []
            getFileByUserId(this.getSearcFormData()).then(res => {
                this.tableData = res.variables.data
            }).catch(res => {
                this.loading = false
                this.tableData = []
            })
        },

        handleNodeClick(data) {
            this.show = 'detail'
            if (this.oldorgId == data.id) {
                return
            } else {
                getFileByUserId({
                    deptName: "",
                    fileCode: "",
                    fileName: "",
                    fileType: data.label,
                    userId: this.$store.getters.userInfo.employee.id
                }).then(res => {
                    this.oldorgId = data.id
                    this.tableData = res.variables.data
                }).catch(res => {
                    this.loading = false
                    this.tableData = []
                })
            }
        },

        /**
         * 获取格式化参数
         */
        getSearcFormData() {
            const params = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}
            params['fileType'] = this.typeData[this.oldorgId].label
            params['userId'] = this.$store.getters.userInfo.employee.id
            return params
        },
        /**
     * 处理按钮事件
     */
        handleAction(command, position, selection, data) {
            switch (command) {
                case 'search':// 查询
                    this.refreshData()
                    break
                default:
                    break
            }
        },

    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
}
</script>
<style lang="less" scoped>
.box {
    width: 230px;
}


.title {
    font-size: 14px;
    margin: 21px 5px 5px;
    padding: 0;
}

.treeDiv {
    height: 800px;
    overflow-y: auto;
}

/deep/ .el-tree-node__content {
    display: block;
}
</style>
  