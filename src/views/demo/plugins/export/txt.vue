<template>
  <ibps-container type="card">
    <template slot="header">导出文本</template>
    <el-input
      v-model="text"
      type="textarea"
      :autosize="{minRows: 2, maxRows: 4}"
      placeholder="请输入内容 然后点击保存按钮导出文本文档"
    />
    <div class="ibps-mt">
      <el-button type="primary" @click="exportTxt">
        <ibps-icon name="download" />
        保存为 txt
      </el-button>
    </div>
  </ibps-container>
</template>

<script>
import pluginExport from '@/plugins/export'
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    exportTxt() {
      // 校验是不是空
      if (this.text === '') {
        this.$message('虽然可以为空 但是出于体验不建议这样 还是写点东西吧')
        return
      }
      // 导出
      pluginExport.txt({
        text: this.text,
        title: '文本'
      })
        .then(() => {
          this.$message('导出文本成功')
        })
    }
  }
}
</script>
