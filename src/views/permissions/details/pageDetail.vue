<template>
    <div>
        <!--顶部按钮 请根据实际添加-->
        <div class="dynamic-form">

            <!--表头-->
            <div class="form-header">
                <div class="title ibps-tc">用户页面权限信息表</div>
            </div>
            <el-table class="tb-edit" :data="tableData" v-model="tableData" style="width: 100%" highlight-current-row
                border>
                <el-table-column prop="yeMianBianMa" label="页面编码">
                    <template slot-scope="yeMianBianMa">
                        <span>{{ yeMianBianMa.row.yeMianBianMa }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="yeMianBiaoTi" label="页面标题">
                    <template slot-scope="yeMianBiaoTi">
                        <span>{{ yeMianBiaoTi.row.yeMianBiaoTi }}</span>
                    </template>
                </el-table-column>
                <!-- <div v-for="(item, index) in columnConfig" :key="index">
                    <el-table-column :prop="item.prop" :label="item.label">
                        <template slot-scope="scope">
                            <el-checkbox :v-model="item.vModel"></el-checkbox>
                        </template>
                    </el-table-column>
                </div> -->
                <el-table-column prop="zengJia" label="新增">
                    <template slot-scope="zengJia">
                        <el-checkbox v-model="zengJia.row.zengJia"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column prop="shanChu" label="删除">
                    <template slot-scope="shanChu">
                        <el-checkbox v-model="shanChu.row.shanChu"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column prop="xiuGai" label="修改">
                    <template slot-scope="xiuGai">
                        <el-checkbox v-model="xiuGai.row.xiuGai"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column prop="chaXun" label="查阅">
                    <template slot-scope="chaXun">
                        <el-checkbox v-model="chaXun.row.chaXun"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column prop="shenHe" label="审核">
                    <template slot-scope="shenHe">
                        <el-checkbox v-model="shenHe.row.shenHe"></el-checkbox>
                    </template>
                </el-table-column>
            </el-table>
            <div class="toolbar">
                <el-button type="primary" @click="submitTable" :loading="butLoading" :disabled="subStatus">提交
                </el-button>
                <el-button type="danger" @click="resetTable" :disabled="subStatus">重置</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { getAllIncludeUserStaticPage, saveStaticPage } from '@/api/permission/page'

export default {
    props: {
        id: {
            type: [String, Number]
        },
    },
    data() {
        return {
            size: '',
            width: '',
            columnConfig: [
                //     { prop: "zengJia", label: "新增", vModel: scope.row.zengJia },
                //     { prop: "shanChu", label: "删除", vModel: scope.row.shanChu },
                //     { prop: "xiuGai", label: "修改", vModel: scope.row.xiuGai },
                //     { prop: "chaXun", label: "查阅", vModel: scope.row.chaXun },
                //     { prop: "shenHe", label: "审核", vModel: scope.row.shenHe }
            ],
            tableData: [
                // { id: '111', yeMianBiaoTi: '', xinZeng: null, shanChu: null, xiuGai: null, chaXun: null, shenHe: null }
            ],
            firsthTableData: [],
            butLoading: false,
            submitdatas: [],
            subStatus: false
        }
    },
    methods: {
        getFormData(id) {
            getAllIncludeUserStaticPage(id).then(res => {
                let datas = []
                for (let i of res.variables.data) {
                    let data = {}
                    data["id"] = i.id
                    data["yeMianBianMa"] = i.yeMianBianMa
                    data["yeMianBiaoTi"] = i.yeMianBiaoTi
                    data["yongHuZhangHao"] = this.$store.getters.userInfo.employee.account
                    data["zengJia"] = Boolean(JSON.parse(i.zengJia))
                    data["shanChu"] = Boolean(JSON.parse(i.shanChu))
                    data["xiuGai"] = Boolean(JSON.parse(i.xiuGai))
                    data["chaXun"] = Boolean(JSON.parse(i.chaXun))
                    data["shenHe"] = Boolean(JSON.parse(i.shenHe))
                    datas.push(data)
                }
                this.tableData = JSON.parse(JSON.stringify(datas))
                this.firsthTableData = JSON.parse(JSON.stringify(datas))
            }).catch(res => {
                this.tableData = []
                this.firsthTableData = []
            })
        },
        submitTable() {
            this.butLoading = true
            for (let i of this.tableData) {
                let submitdata = {}
                submitdata["id"] = i.id
                submitdata["yeMianBiaoTi"] = i.yeMianBiaoTi
                submitdata["yongHuId"] = this.$store.getters.userInfo.employee.id
                submitdata["yeMianBianMa"] = i.yeMianBianMa
                submitdata["yongHuZhangHao"] = this.$store.getters.userInfo.employee.account
                submitdata["zengJia"] = Boolean(JSON.parse(i.zengJia))
                submitdata["shanChu"] = Boolean(JSON.parse(i.shanChu))
                submitdata["xiuGai"] = Boolean(JSON.parse(i.xiuGai))
                submitdata["chaXun"] = Boolean(JSON.parse(i.chaXun))
                submitdata["shenHe"] = Boolean(JSON.parse(i.shenHe))
                if (Boolean(i.zengJia) || Boolean(i.shanChu) || Boolean(i.xiuGai) || Boolean(i.chaXun) || Boolean(i.shenHe)) {
                    this.submitdatas.push(submitdata)
                }
            }
            saveStaticPage(this.submitdatas).then(res => {
                this.butLoading = false
                this.subStatus = true
                console.log("保存成功")
                alert("提交成功")
                this.firsthTableData = JSON.parse(JSON.stringify(this.tableData))

            }).catch(res => {
                this.butLoading = false
                this.subStatus = true
                console.log("保存失败")
            })
        },
        resetTable() {
            this.tableData = JSON.parse(JSON.stringify(this.firsthTableData))
        }
    },

    watch: {
        id: {
            immediate: true,
            handler: function (val, oldVal) {
                this.getFormData(val)
                this.tableData = []
                this.firsthTableData = []
            },
        },
        tableData: {
            immediate: true,
            handler: function (val, oldVal) {
                if (JSON.stringify(val) === JSON.stringify(this.firsthTableData)) {
                    this.subStatus = true
                } else {
                    this.subStatus = false
                }
            },
            deep: true,
        }
    }
}
</script>
<style scoped lang="less">
.dynamic-form {
    .el-input {
        width: 100%;
    }

    .el-select {
        width: 100%;
    }

    .el-collapse-item__header.is-active {
        border-bottom: 1px solid #EBEEF5;
        margin-bottom: 5px;
    }

    .form-header {
        border-bottom: 1px solid #2b34410d;
        margin-bottom: 5px;

        .title {
            font-size: 16px;
            font-weight: bold;
            color: #222;
            text-align: left;
            padding: 8px 10px 10px;
            margin: 0;
        }

        .desc {
            word-wrap: break-word;
            word-break: normal;
            text-indent: 0;
            line-height: 1.6;
            margin: 0 0 11px;
            padding: 3px 30px 8px;
        }
    }

    .dynamic-form-table-item__readonly {
        margin-bottom: 0;
    }

    //===================border-form====================
    .ibps-border-form {
        border: 1px solid #cfd7e5;

        .el-form-item {
            border-top: 1px solid #cfd7e5;
        }

        .el-form-item__content:before {
            width: 1px;
            background: #cfd7e5;
            display: block;
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            bottom: -20px;
        }

        .el-form-item__content .el-form-item__error {
            left: 5px
        }

        .el-form--label-top .el-form-item__content:before,
        .no-label-form-item .el-form-item__content:before {
            background: transparent
        }

        .el-row+.el-row {
            border-top: 1px solid #cfd7e5
        }

        .el-col+.el-col {
            border-left: 1px solid #cfd7e5
        }

        .el-col {
            overflow: hidden
        }

        .el-form-item__content {
            padding: 5px;
            padding-bottom: 0
        }

        .el-form-item__label {
            padding: 5px
        }

        .el-table {
            .el-form-item {
                border-top: 0;
            }

            .el-form-item__content:before {
                width: 0;
            }

            .el-form-item__content {
                padding: 0;
            }

        }

    }

}

.dynamic-form-table {
    .panel-heading {
        border-bottom: 0;
        border-left: 1px solid #dde7ee;
        border-right: 1px solid #dde7ee;
    }

    .dynamic-form-table__inner {
        .panel-body {
            padding: 0;
        }
    }

    .dynamic-form-table__block {
        padding-bottom: 10px;

        .panel-body {
            border: 0px;
        }
    }

    .el-rate {
        position: relative;
        display: inline-block;
    }
}

.is-error {
    .dynamic-form-table {
        border: 1px solid #F56C6C;
    }
}

.is-required:not(.is-no-asterisk) {
    .dynamic-form-table__label:before {
        content: '*';
        color: #F56C6C;
        margin-right: 4px;
    }
}

/deep/ .el-form-item__content {
    margin-left: 0;
    text-align: center;
}

.toolbar {
    text-align: center;
    margin-top: 20px;
}
</style>
