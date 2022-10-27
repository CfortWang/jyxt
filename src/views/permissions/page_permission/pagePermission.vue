<template>
    <ibps-layout ref="layout">
        <div slot="west">
            <div class="box">
                <p class="title">用户信息</p>
                <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                </el-input>
                <div class="treeDiv">
                    <el-tree ref="tree" :data="peopleData" :props="defaultProps" @node-click="handleNodeClick"
                        :filter-node-method="filterNode"></el-tree>
                </div>
            </div>
            <ibps-container :margin-left="205 + 'px'" class="page">
                <detail v-if="show === 'detail'" :id="orgId" :row-handle="rowHandle" :rights-arr="rightsArr"
                    :show-tree="false" :is-edit="true" />

                <el-alert v-else :closable="false" title="尚未指定一个人员" type="warning" show-icon style="height:50px;" />
            </ibps-container>

        </div>
    </ibps-layout>
</template>
<script>
import { getAllUserInfor } from '@/api/permission/page'
import FixHeight from '@/mixins/height'
import Detail from '../details/pageDetail.vue'

export default {
    components: {
        Detail,
    },
    mixins: [FixHeight],
    data() {
        return {
            show: '',
            rightsArr: ['join', 'delete'],
            rowHandle: true,
            width: 230,
            height: document.clientHeight,
            orgId: '',
            orgName: '',
            loading: false,
            peopleData: [],
            filterText: '',
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            // tableData: [],
            // firsthTableData: []
        }
    },
    mounted() {
        this.loadNode()
    },
    methods: {
        loadNode() {
            this.loading = true
            getAllUserInfor().then(res => {
                this.loading = false
                for (let i of res.variables.data) {
                    let data = {}
                    data["id"] = i.id_
                    data["label"] = i.name_
                    this.peopleData.push(data)
                }
            }).catch(res => {
                this.loading = false
            })
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleNodeClick(data) {
            if (data.id === 0 || data.id === '0') {
                this.show = 'empty'
                return
            }
            this.orgId = data.id
            this.orgName = data.label
            this.show = 'detail'
            getAllIncludeUserStaticPage({ userId: data.id }).then(res => {
                this.tableData = res.variables.data
                this.firsthTableData = res.variables.data
            }).catch(res => {
                this.loading = false
                this.tableData = []
                this.firsthTableData = []
            })
        },
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
}
</script>
<style lang="scss" >
.box {
    width: 210px;
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
</style>
  