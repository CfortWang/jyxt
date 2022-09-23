<template>
  <div class="dynamic-form-table">
    <div class="dynamic-form-table__inner panel panel-info">
      <div class="panel-heading ibps-clearfix">
        <div class="ibps-fl dynamic-form-table__label"><template v-if="$utils.isNotEmpty(rowData)">[{{ rowData.wuZiMingCheng }}]</template>供应商明细</div>
        <div class="ibps-fr hidden-print">
          <el-button-group v-if="!readonly">
            <el-button
              v-for="(button,index) in toolbarButtons"
              :key="index"
              :type="button.type"
              :icon="button.icon"
              @click="handleActionEvent(button,index)"
            >
              {{ button.label }}
            </el-button>
          </el-button-group>
        </div>
      </div>
      <div class="panel-body">
        <el-table
          :data="supplierData"
          :row-class-name="tableRowClassName"
          border
          stripe
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            v-if="!readonly"
            type="selection"
            width="50"
          />
          <el-table-column
            type="index"
            label="序号"
            width="50"
          />
          <el-table-column label="供应商名称">
            <template slot-scope="scope">
              <el-input v-if="!readonly" v-model="supplierData[scope.$index].mingCheng" />
              <template v-else>
                {{ supplierData[scope.$index].mingCheng }}
              </template>
            </template>

          </el-table-column>

          <el-table-column label="联系人">
            <template slot-scope="scope">
              <el-input v-if="!readonly" v-model="supplierData[scope.$index].lianXiRen" />
              <template v-else>
                {{ supplierData[scope.$index].lianXiRen }}
              </template>
            </template>

          </el-table-column>
          <el-table-column label="联系电话">
            <template slot-scope="scope">
              <el-input v-if="!readonly" v-model="supplierData[scope.$index].lianXiDianHua" />
              <template v-else>
                {{ supplierData[scope.$index].lianXiDianHua }}
              </template>
            </template>
          </el-table-column>

          <el-table-column label="备注">
            <template slot-scope="scope">
              <el-input v-if="!readonly" v-model="supplierData[scope.$index].beiZhu" type="textarea" />
              <template v-else>
                {{ supplierData[scope.$index].beiZhu }}
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import ActionUtils from '@/utils/action'
export default {
  props: {
    field: Object,
    formData: Object,
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rowData: {},
      supplierData: [],
      defaultData: {
        id: '',
        parentId: '',
        mingCheng: '',
        lianXiRen: '',
        lianXiDianHua: '',
        beiZhu: ''
      },
      multipleSelection: '',
      toolbarButtons: [{
        label: '添加',
        key: 'add',
        icon: 'ibps-icon-add',
        type: 'primary',
        position: 'toolbar'
      },
      {
        label: '删除',
        key: 'remove',
        icon: 'ibps-icon-remove',
        type: 'danger',
        position: 'toolbar'
      }]
    }
  },
  watch: {
    supplierData: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          const row = this.rowData['$index']
          this.rowData['ghsmxxx'] = val
          // cgsqmx 是[采购申请明细]2级的子表的code
          this.formData['cgsqmx'].splice(row, 1, this.rowData)
        }
      },
      deep: true
    }
  },
  methods: {
    // 设置选择的数据
    setRow(rowData) {
      // ghsmxxx 是[供货商明细信息]3级的子表的code
      const data = rowData['ghsmxxx'] || []
      this.rowData = rowData
      this.supplierData = JSON.parse(JSON.stringify(data))
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.$index = rowIndex
    },
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    },
    getFormData() {
      return new Promise((resolve, reject) => {
        resolve(this.supplierData)
      })
    },
    handleActionEvent(button, index) {
      // const actionCode = button.key
      // const actionPosition = button.position
      switch (button.key) {
        case 'add':
          this.handleAdd()
          break
        case 'remove':
          this.hanleRemove(button, index)
          break
        default:
          break
      }
    },
    handleAdd() {
      // 判断当前
      if (this.$utils.isEmpty(this.rowData)) {
        ActionUtils.warning('请选择采购明细表')
        return
      }

      const data = JSON.parse(JSON.stringify(this.defaultData))
      this.supplierData.push(data)
    },
    hanleRemove(button, index) {
      const position = button.position
      const selection = this.getSelection(position, index)
      ActionUtils.removeRecord(selection, '确定删除？', true).then((ids) => {
        for (let i = this.supplierData.length - 1; i >= 0; i--) {
          if (ids.indexOf(i) > -1) {
            this.supplierData.splice(i, 1)
          }
        }
      }).catch(() => {})
    },
    /**
     * 获取选择的记录
     */
    getSelection(position, index) {
      const selection = []
      if (position === 'toolbar') {
        if (this.multipleSelection && this.multipleSelection.length > 0) {
          this.multipleSelection.forEach(row => {
            selection.push(row.$index)
          })
        }
      } else {
        selection.push(index)
      }
      return selection
    }
  }

}
</script>

