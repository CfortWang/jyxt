<template>
  <ibps-container type="card">
    <template slot="header">导出表格</template>
    <div class="ibps-mb">
      <el-button type="primary" @click="exportCsv">
        <ibps-icon name="download" />
        导出 CSV
      </el-button>
      <el-button type="primary" @click="exportExcel">
        <ibps-icon name="download" />
        导出 Excel
      </el-button>
    </div>
    <el-table v-bind="table" style="width: 100%">
      <el-table-column
        v-for="(item, index) in table.columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      />
    </el-table>
  </ibps-container>
</template>

<script>
import IbpsExport from '@/plugins/export'
import table from './data'

export default {
  data() {
    return {
      table: {
        columns: table.columns,
        data: table.data,
        size: 'mini',
        stripe: true,
        border: true
      }
    }
  },
  methods: {
    exportCsv(params = {}) {
      IbpsExport.csv({
        columns: this.table.columns,
        data: this.table.data
      }).then(() => {
        this.$message('导出CSV成功')
      })
    },
    exportExcel() {
      IbpsExport.excel({
        columns: this.table.columns,
        data: this.table.data
        // header: '导出 Excel',
        // merges: ['A1', 'E1']
      })
        .then(() => {
          this.$message('导出表格成功')
        })
    }
  }
}
</script>
