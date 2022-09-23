<template>
  <div>
      <el-dropdown>
        <el-button type="primary">
          打印相关文件<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dialog :visible.sync="dialogVisible"
          :close-on-click-modal="false"
          fullscreen
          destroy-on-close append-to-body
          @open="getFormData" close="closeDialog">

          <iframe></iframe>

       </el-dialog>
</div>
</template>

<script>
 //import { getButtonIcon } from '@/utils/button'
 export default {
  props: ['droData'],
   data() {
     return {
       dialogVisible:false,
       }
    },
    methods:{
      droClick(){
        this.droData = "1";
      },
      // 关闭当前窗口
      closeDialog() {
        this.dialogVisible = false
      },
      /**
       * 获取页面数据
       */
      getFormData() {}
    }
  }
</script>

<style>
</style>
