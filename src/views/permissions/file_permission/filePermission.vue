<template>
  <ibps-layout ref="layout">
    <div slot="west">
      <ibps-tree ref="tree" :width="width" :height="height" :loading="loading" :options="{
        'default-expand-all': false,
        'expand-on-click-node': false,
        'default-expanded-keys':['0'],
        props: {
          children: 'children',
          label: 'name'
        }
      }" :load="loadNode" lazy title="用户页面权限分配" @action-event="handleTreeAction" @node-click="handleNodeClick"
        @expand-collapse="handleExpandCollapse" />
      <ibps-container :margin-left="width+'px'" class="page">
        <detail v-if="show==='detail'" :id="orgId" />

        <el-alert v-else :closable="false" title="尚未指定一个人员" type="warning" show-icon style="height:50px;" />
      </ibps-container>

    </div>
  </ibps-layout>
</template>
<script>
import { findTreeData, remove } from '@/api/platform/org/org'
import ActionUtils from '@/utils/action'
import TreeUtils from '@/utils/tree'
import FixHeight from '@/mixins/height'
import Detail from '../details/fileEchart.vue'


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

      // 移动节点
      moveNodeVisible: false,
      // 节点排序
      sortData: [],
      nodeSortVisible: false,

      loading: false,

      orgTreeData: []
    }
  },
  // mounted() {
  //   // this.loadTreeData()
  // },
  methods: {
    loadNode(node, resolve) {
      this.loading = true
      findTreeData({
        type: 1,
        orgId: node.level === 0 ? null : node.data.id
      }).then(res => {
        this.loading = false
        resolve(this.toTree(res.data))
      }).catch(res => {
        this.loading = false
        resolve([])
      })
    },
    toTree(data) {
      return TreeUtils.transformToTreeFormat(data, {
        idKey: 'id',
        pIdKey: 'parentId',
        childrenKey: 'children'
      })
    },
    refreshTree() {
      this.parentId = '0'
      this.search()
    },
    // 查询
    search() {
      this.$refs.tree.refreshNode(this.parentId)
    },
    // 返回右明细模块未显示
    successCallback(rtn) {
      if (rtn) {
        this.orgId = ''
        this.show = 'no'
      }
    },
    handleTreeAction(command, position, selection, data) {
      if (position === 'toolbar') {
        if (command === 'refresh') {
          this.refreshTree()
        }
      } else {
        const id = data.id
        this.parentId = data.parentId
        switch (command) {
          // 组织负责人
          case 'add':// 添加
            this.parentId = id
            this.handleEdit('')
            break
          case 'edit':// 编辑
            this.handleEdit(id)
            break
          case 'remove':// 删除
            ActionUtils.removeRecord(id).then((ids) => {
              this.handleRemove(ids)
            }).catch(() => { })
            break
          case 'moveNode':// 移动节点
            this.handleMoveNode(id)
            break
          case 'authEdit':// 设置分级管理员
            this.handleAuthEdit(id, data.name)
            break
          case 'addPosition':// 新增岗位
            this.handleAddPosition(id)
            break
          case 'nodeSort':// 排序
            this.handleNodeSort(data)
            break
          default:
            break
        }
      }
    },
    handleNodeClick(data) {
      if (data.id === 0 || data.id === '0') {
        this.show = 'empty'
        return
      }
      this.orgId = data.id
      this.orgName = data.name
      this.show = 'detail'
    },
    handleExpandCollapse(isExpand) {
      this.width = isExpand ? 230 : 30
    },

  }
}
</script>
<style lang="scss" >
// .org-tree-move-node-dialog{
//   .el-dialog__body{
//      height:  calc(50vh - 95px) !important;
//   }
// }
</style>
  