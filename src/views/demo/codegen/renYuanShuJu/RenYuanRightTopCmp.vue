<template>
  <div class="ren-yuan-right-top-cmp">
     <div class="lc2-header">技术档案目录</div>
     <dv-capsule-chart :config="config" class="ren-yuan-chart"/>
  </div>
</template>

<script>
export default {
  name: 'RenYuanRightTopCmp',
  data () {
    return {
     config: {
        data: [
          {name: '内容',value: 167},
          {name: '附件',value: 123},
          {name: '管理',value: 98},
          {name: '备注',value: 66}
        ],
      colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9'],
      unit: '件',
      showValue: true
      }
    }
  }
}
</script>

<style lang="less">
.ren-yuan-right-top-cmp {
  width: 100%;
  height:50%;
  display: flex;
  flex-direction: column;
  .lc2-header {
    text-align: center;
    height: 20px;
    line-height: 20px;
    font-size: 28px;
    // text-indent: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .lc2-details {
   height: 50px;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-indent: 20px;
    span {
      color: #096dd9;
      font-weight: bold;
      font-size: 35px;
      margin-left: 20px;
    }
  }
  .ren-yuan-chart{
    height: calc(~"100% - 80px");
  }
}
</style>