<template>
  <div :style="{height:height+'px'}">
    <ibps-crud
      v-if="visible"
      ref="crud"
      :data="listData"
      :height="tableHeight"
      :toolbars="listConfig.toolbars"
      :search-form="listConfig.searchForm"
      :pk-key="pkKey"
      :columns="listConfig.columns"
      :row-handle="listConfig.rowHandle"
      :pagination="pagination"
      :loading="loading"
      @action-event="handleAction"
      @sort-change="handleSortChange"
      @pagination-change="handlePaginationChange"
    >
      <template slot="orgPerms" slot-scope="scope">
        <el-tag
          v-for="(item,index ) in dataConvert(scope.row.orgPerms)"
          :key="index"
        >
          {{ item|optionsFilter(permsOptions) }}
        </el-tag>
      </template>
      <template slot="userPerms" slot-scope="scope">
        <el-tag
          v-for="(item,index ) in dataConvert(scope.row.userPerms)"
          :key="index"
        >
          {{ item|optionsFilter(permsOptions) }}
        </el-tag>
      </template>
    </ibps-crud>
    <edit
      :id="editId"
      :visible="dialogFormVisible"
      :org-id="orgId"
      :org-name="orgName"
      @callback="search"
      @close="visible => dialogFormVisible = false"
    />
  </div>
</template>
<script>
import { queryPageList, remove } from '@/api/platform/org/auth'
import { permsOptions } from './constants'
import ActionUtils from '@/utils/action'
import Edit from './edit'

export default {
  components: {
    Edit
  },
  props: {
    orgId: [String, Number],
    rightsArr: {
      type: Array,
      default: () => []
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    orgName: String,
    height: Number,
    visible: Boolean
  },
  data() {
    return {
      dialogFormVisible: false,
      pkKey: 'id',
      editId: '',
      loading: false,
      permsOptions: permsOptions,

      listData: [],
      pagination: {},
      sorts: {},
      listConfig: {
        toolbars: [
          {
            key: 'search'
          },
          {
            key: 'add',
            hidden: () => {
              if (this.rightsArr.includes('add')) return false
              if (this.rightsArr.includes('join')) return false
              return true
            }
          },
          {
            key: 'edit',
            hidden: () => {
              if (this.isEdit) return false
              if (this.rightsArr.includes('edit')) return false
              return true
            }
          },
          {
            key: 'remove',
            label: '??????',
            icon: 'el-icon-delete',
            hidden: () => {
              if (this.rightsArr.includes('remove')) return false
              if (this.rightsArr.includes('delete')) return false
              return true
            }
          }
        ],
        searchForm: {
          inline: true,
          forms: [
            { prop: 'Q^MANAGER_NAME_^SL', label: '????????????:' }
          ]
        },
        // ??????????????????
        columns: [
          { prop: 'managerName', label: '????????????' },
          { prop: 'orgName', label: '????????????' },
          { prop: 'orgPerms', label: '??????????????????', slotName: 'orgPerms' },
          { prop: 'userPerms', label: '?????????????????????', slotName: 'userPerms' },
          { prop: 'createTime', label: '????????????' }
        ],
        rowHandle: {
          actions: [
            {
              key: 'edit',
              hidden: () => {
                if (this.rightsArr.includes('edit')) return false
                if (this.rightsArr.includes('join')) return false
                return true
              }
            },
            {
              key: 'remove',
              hidden: () => {
                if (this.rightsArr.includes('remove')) return false
                if (this.rightsArr.includes('join')) return false
                return true
              }
            }
          ]
        }
      }
    }
  },
  computed: {
    tableHeight() {
      return this.height
    }
  },
  watch: {
    visible() {
      if (this.visible) {
        this.loadListData()
      }
    }
  },
  methods: {
    dataConvert(data) {
      if (this.$utils.isEmpty(data)) return []
      return data.split(',')
    },
    // ???????????????
    loadListData() {
      this.loading = true
      queryPageList(this.getSearcFormData()).then(response => {
        ActionUtils.handleListData(this, response.data)
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // ??????
    getSearcFormData() {
      const formParams = this.$refs['crud'] ? this.$refs['crud'].getSearcFormData() : {}

      formParams['Q^ORG_ID_^S:'] = this.orgId
      // ?????????????????????
      return ActionUtils.formatParams(formParams, this.pagination, this.sorts)
    },
    /**
     * ??????????????????
     */
    handlePaginationChange(page) {
      ActionUtils.setPagination(this.pagination, page)
      this.loadListData()
    },
    /**
     * ????????????
     */
    handleSortChange(sort) {
      ActionUtils.setSorts(this.sorts, sort)
      this.loadListData()
    },

    search() {
      this.loadListData()
    },
    handleAction(buttonKey, position, selection, data) {
      switch (buttonKey) {
        // ???????????????
        case 'search':// ??????
          ActionUtils.setFirstPagination(this.pagination)
          this.search()
          break
        case 'add':// ??????
          this.handleEdit()
          this.title = '?????????????????????'
          break
        case 'edit':// ??????
          ActionUtils.selectedRecord(selection).then((id) => {
            this.handleEdit(id)
            this.title = '?????????????????????'
          }).catch(() => { })
          break
        case 'remove':// ??????
          ActionUtils.removeRecord(selection).then((ids) => {
            this.handleRemove(ids)
          }).catch(() => { })
          break
        default:
          break
      }
    },
    /**
     * ????????????
     */
    handleEdit(id = '', readonly = false) {
      this.editId = id
      this.readonly = readonly
      this.dialogFormVisible = true
    },
    handleRemove(ids) {
      remove({ orgAuthIds: ids }).then(response => {
        ActionUtils.removeSuccessMessage()
        this.search()
      })
    }
  }
}
</script>
