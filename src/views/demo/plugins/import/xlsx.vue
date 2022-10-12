<template>
  <ibps-container type="card">
    <template slot="header">导入 xlsx</template>
    <div class="ibps-mb">
      <el-button @click="download">
        <ibps-icon name="download" />
        下载演示 .xlsx 表格
      </el-button>
    </div>
    <div class="ibps-mb">
      <el-upload :before-upload="handleUpload" action="default">
        <el-button type="success">
          <ibps-icon name="file-o" />
          选择要导入的 .xlsx 表格
        </el-button>
      </el-upload>
    </div>
    <el-table v-bind="table">
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
import IbpsImport from '@/plugins/import'

export default {
  data() {
    return {
      table: {
        columns: [],
        data: [],
        size: 'mini',
        stripe: true,
        border: true
      }
    }
  },
  methods: {
    handleUpload(file) {
      IbpsImport.xlsx(file)
        .then(({ header, results }) => {
          this.table.columns = header.map(e => {
            return {
              label: e,
              prop: e
            }
          })
          this.table.data = results
        })
      return false
    },
    download() {
      window.location.href = 'http://fairyever.qiniudn.com/ibps-admin-import-xlsx-demo.xlsx'
    }
  }
}
</script>
