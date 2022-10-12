<template>
  <div class="dynamic-form-table">
    <div class="dynamic-form-table__inner panel panel-info">
      <div class="panel-heading ibps-clearfix">
        <div class="ibps-fl dynamic-form-table__label">供应商明细</div>
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
    data: Array,
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
    data: {
      handler() {
        this.supplierData = JSON.parse(JSON.stringify(this.data))
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
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
      const data = JSON.parse(JSON.stringify(this.defaultData))
      this.supplierData.push(data)
    },
    hanleRemove(button, index) {
      const position = button.position
      const selection = this.getSelection(position, index)
      ActionUtils.removeRecord(selection, '确定删除？', true).then((ids) => {
        for (let i = this.dataModel.length - 1; i >= 0; i--) {
          if (ids.indexOf(i) > -1) {
            this.dataModel.splice(i, 1)
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

