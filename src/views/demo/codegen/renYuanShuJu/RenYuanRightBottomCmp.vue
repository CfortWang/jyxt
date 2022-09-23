<template>
  <div class="ren-yuan-right-bottom-cmp">
     <div class="lc2-header">培训记录</div>
     <dv-conical-column-chart :config="config" class="lc-ren-yuan-chart"/>
  </div>
</template>

<script>
export default {
  name: 'RenYuanRightBottomCmp',
  data () {
    return {
     config: {
        data: [
            {name: '培训时长',value: 55},
            {name: '培训人数',value: 105},
            {name: '培训情况',value: 85},
        ],
      showValue: true
      }
    }
  }
}
</script>

<style lang="less">
.ren-yuan-right-bottom-cmp {
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
  .lc-ren-yuan-chart{
    height: calc(~"100% - 80px");
  }
}
</style>