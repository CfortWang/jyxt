<template>
    <div>
        <!--顶部按钮 请根据实际添加-->
        <div class="dynamic-form">

            <!--表头-->
            <div class="form-header">
                <div class="title ibps-tc">用户页面权限信息表</div>
            </div>
            <el-form ref="form" :model="models" :rules="rules" :inline="inline" :label-suffix="labelSuffix"
                :label-width="labelWidth" :label-position="labelPosition" :status-icon="statusIcon" :size="size"
                :hide-required-asterisk="hideRequiredAsterisk" @submit.native.prevent>

                <el-form-item label="" label-width="0" prop="sbhc">

                    <div class="dynamic-form-table">

                        <div class="dynamic-form-table__inner panel panel-info">
                            <!-- <div class="panel-heading ibps-clearfix">
                                <div class="ibps-fl dynamic-form-table__label">设备核查项目及参数</div>

                                <div class="ibps-fr hidden-print">
                                    <el-button-group>

                                        <el-button :key="0" type="primary" icon="add" @click="handleActionEvent('add')">
                                            添加
                                        </el-button>
                                        <el-button :key="1" type="danger" icon="remove"
                                            @click="handleActionEvent('remove')">
                                            删除
                                        </el-button>
                                        <el-button :key="2" type="primary" icon="edit"
                                            @click="handleActionEvent('edit')">
                                            修改
                                        </el-button>
                                        <el-button :key="3" type="primary" icon="import"
                                            @click="handleActionEvent('import')">
                                            导入数据
                                        </el-button>
                                        <el-button :key="4" type="primary" icon="export"
                                            @click="handleActionEvent('export')">
                                            导出模板
                                        </el-button>
                                    </el-button-group>
                                </div>

                            </div> -->
                            <div class="panel-body">
                                <el-table ref="elTable" :data="models.sbhc" border stripe>
                                    <el-table-column type="selection" width="50" />

                                    <el-table-column :key="2" prop="heChaXiangMu">
                                        <template slot="header">
                                            页面路径
                                        </template>
                                        <template>

                                            <el-form-item prop="heChaXiangMu" label-width=" 0px" :class="{
                                              'dynamic-form-table-item__readonly':readonly
                                            }">
                                                <el-input v-model="models.heChaXiangMu" placeholder="请输入" type="text"
                                                    name="heChaXiangMu" :autosize="autosize" :rows="3"
                                                    :readonly="readonly" clearable :style="{width:width}" />
                                            </el-form-item>

                                        </template>
                                    </el-table-column>

                                    <el-table-column :key="3" prop="biaoZhunCanShu">
                                        <template slot="header">
                                            页面名称

                                        </template>
                                        <template>

                                            <el-form-item prop="biaoZhunCanShu" label-width=" 0px" :class="{
                                              'dynamic-form-table-item__readonly':readonly
                                            }">
                                                <el-input v-model="models.biaoZhunCanShu" placeholder="请输入" type="text"
                                                    name="biaoZhunCanShu" :autosize="autosize" :rows="3"
                                                    :readonly="readonly" clearable :style="{width:width}" />
                                            </el-form-item>

                                        </template>
                                    </el-table-column>

                                    <el-table-column :key="5" prop="danXiangHeChaJieG" width="120px">
                                        <template slot="header">
                                            新增

                                        </template>
                                        <template>

                                            <el-form-item prop="danXiangHeChaJieG" label-width=" 0px" :class="{
                                              'dynamic-form-table-item__readonly':readonly
                                            }">
                                                <el-radio-group v-model="models.danXiangHeChaJieG" :disabled="readonly">
                                                    <component :is="'el-radio'" :label="'有'" class="ibps-pt-5">
                                                        有
                                                    </component>
                                                    <component :is="'el-radio'" :label="'无'" class="ibps-pt-5">
                                                        无
                                                    </component>
                                                </el-radio-group>
                                            </el-form-item>

                                        </template>
                                    </el-table-column>

                                    <el-table-column :key="5" prop="danXiangHeChaJieG" width="120px">
                                        <template slot="header">
                                            删除

                                        </template>
                                        <template>

                                            <el-form-item prop="danXiangHeChaJieG" label-width=" 0px" :class="{
                                              'dynamic-form-table-item__readonly':readonly
                                            }">
                                                <el-radio-group v-model="models.danXiangHeChaJieG" :disabled="readonly">

                                                    <component :is="'el-radio'" :label="'有'" class="ibps-pt-5">
                                                        有
                                                    </component>
                                                    <component :is="'el-radio'" :label="'无'" class="ibps-pt-5">
                                                        无
                                                    </component>
                                                </el-radio-group>
                                            </el-form-item>

                                        </template>
                                    </el-table-column>
                                    <el-table-column :key="5" prop="danXiangHeChaJieG" width="120px">
                                        <template slot="header">
                                            修改

                                        </template>
                                        <template>

                                            <el-form-item prop="danXiangHeChaJieG" label-width=" 0px" :class="{
                                              'dynamic-form-table-item__readonly':readonly
                                            }">
                                                <el-radio-group v-model="models.danXiangHeChaJieG" :disabled="readonly">

                                                    <component :is="'el-radio'" :label="'有'" class="ibps-pt-5">
                                                        有
                                                    </component>
                                                    <component :is="'el-radio'" :label="'无'" class="ibps-pt-5">
                                                        无
                                                    </component>
                                                </el-radio-group>
                                            </el-form-item>

                                        </template>
                                    </el-table-column>
                                    <el-table-column :key="5" prop="danXiangHeChaJieG" width="120px">
                                        <template slot="header">
                                            查阅

                                        </template>
                                        <template>

                                            <el-form-item prop="danXiangHeChaJieG" label-width=" 0px" :class="{
                                              'dynamic-form-table-item__readonly':readonly
                                            }">
                                                <el-radio-group v-model="models.danXiangHeChaJieG" :disabled="readonly">

                                                    <component :is="'el-radio'" :label="'有'" class="ibps-pt-5">
                                                        有
                                                    </component>
                                                    <component :is="'el-radio'" :label="'无'" class="ibps-pt-5">
                                                        无
                                                    </component>
                                                </el-radio-group>
                                            </el-form-item>

                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>

                    </div>
                </el-form-item>
                <el-form-item>
                    <ibps-toolbar ref="toolbar" :actions="actions" @action-event="handleButtonEvent" />
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>
<script>
import { validateRequired } from '@/utils/validate'

export default {

    data() {
        return {
            models: { "sbhc": [] },
            inline: false,
            labelSuffix: ':',
            labelWidth: '100px',
            labelPosition: 'left',
            statusIcon: false,
            size: '',
            hideRequiredAsterisk: false,

            readonly: false,
            readonlyText: 'text',
            multiple: false,
            autosize: '',
            width: '',
            actions: [
                {
                    key: 'submit',
                    label: '提交',
                    type: 'primary',
                },
                {
                    key: 'reset',
                    label: '重置'
                }
            ],

            rules: {
                sbhc: [{ "required": true, "message": "必填" }, { "validator": validateRequired, "message": "必填" }],
                danXiangHeChaJieG: [{ "required": true, "message": "必填" }, { "validator": validateRequired, "message": "必填" }]
            }
        }
    },
    methods: {
        handleSave() {
            console.info(this.models)
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleButtonEvent(button, data) {

            console.log(button, data)
            switch (button.key) {
                case 'submit':
                    this.submitForm('form')
                    break
                case 'reset':
                    this.resetForm('form')
                    break
                default:
                    break
            }
        },
        handleActionEvent(type) {
            switch (type) {
                case 'add':
                    console.info('新增')
                    // 为表格增加数据
                    if (!(this.models.sbhc && Array.isArray(this.models.sbhc))) {
                        this.models.sbhc = []
                    }
                    this.models.sbhc.push({
                        id: '',
                        parentId: '',
                        heChaXiangMu: '',
                        biaoZhunCanShu: '',
                        heChaCanShu: '',
                        danXiangHeChaJieG: ''
                    })

                    break
                case 'edit':
                    console.info('修改')
                    break
                case 'remove':
                    console.info('删除')
                    break
                case 'import':
                    console.info('导入')
                    break
                case 'export':
                    console.info('导出')
                    break
                case 'custom':
                    // 新增自定义对话框按钮
                    break
                default:
                    break
            }
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
</style>
