<template>
    <div>
        <div style="text-align: center">
            <!--表头-->
            <div class="form-header">
                <div class="title ibps-tc">用户查阅文件授权</div>
            </div>
            <el-transfer style="text-align: left; display: inline-block" v-model="permissionFiles" filterable
                :render-content="renderFunc" :titles="['受限文件', '可查阅文件']" :button-texts="['受限', '可查阅']" :format="{
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'
                }" @change="handleChange" :data="noPermissionFiles">
            </el-transfer>
        </div>
    </div>
</template>




<script>
import { getLmitedFile, getUserByFile, saveUserByFile } from '@/api/permission/file'

export default {
    props: {
        id: {
            type: [String, Number]
        }
    },
    data() {
        return {
            idT: '',
            allFilesDatas: [],// 所有受控文件,与个人无关
            noPermissionFiles: [],
            permissionFiles: [],
            renderFunc(h, option) {
                return <span>{option.label}</span>;
            }
        };
    },

    methods: {
        handleChange(value, direction, movedKeys) {
            let paramsDatas = []

            for (let i of value) {
                let paramsData = {}
                let filterDatas = this.allFilesDatas.filter(item => item.wenJianId == i)

                console.log("filter:", filterDatas[0].wenJianId)
                paramsData["yongHuId"] = this.idT
                paramsData["wenJianId"] = filterDatas[0].wenJianId
                paramsData["wenJianMingChe"] = filterDatas[0].wenJianMingChe
                paramsDatas.push(paramsData)
            }
            saveUserByFile({ fileData: paramsDatas }).then(res => {
            }).catch(res => {
            })
        },
        getFormData(id) {
            getLmitedFile({ userId: id }).then(res => {
                for (let i of res.variables.data) {
                    this.allFilesDatas.push(i)
                    let fileData = {}
                    fileData["key"] = i.wenJianId
                    fileData["label"] = i.wenJianMingChe
                    fileData["yongHuId"] = id
                    this.noPermissionFiles.push(fileData)
                }
            }).catch(res => {
            })
            getUserByFile({ userId: id }).then(res => {
                for (let i of res.variables.data) {
                    this.allFilesDatas.push(i)
                    let filterFile = {}
                    filterFile["key"] = i.wenJianId
                    filterFile["label"] = i.wenJianMingChe
                    filterFile["yongHuId"] = id
                    this.permissionFiles.push(filterFile)
                }
            }).catch(res => {
            })
        },
    },
    watch: {
        id: {
            immediate: true,
            handler: function (val, oldVal) {
                this.allFilesDatas = []
                this.permissionFiles = []
                this.noPermissionFiles = []
                this.idT = val
                this.getFormData(val)
            },
        }
    }
};
</script>
  

<style  scoped lang="less">
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

.transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
}

/deep/.el-transfer {
    width: 100%;
}

/deep/ .el-transfer-panel {
    width: 40%;
}

/deep/ .el-transfer__buttons {
    width: 10%;
    padding: 0 10px;
}

/deep/ .el-transfer-panel__body {
    height: auto;
}

/deep/.el-transfer-panel__list {
    height: 650px;
}

/deep/ .el-button {
    width: 100%;
}
</style>