<template>
  <div class="ren-yuan-right-cmp">
     <Ren-Yuan-Right-Top-Cmp />
     <Ren-Yuan-Right-Bottom-Cmp />
  </div>
</template>

<script>
import RenYuanRightTopCmp from './RenYuanRightTopCmp'
import RenYuanRightBottomCmp from './RenYuanRightBottomCmp'
export default {
  name: 'RenYuanRightCmp',
  components: {
    RenYuanRightTopCmp,
    RenYuanRightBottomCmp
  },
  data () {
    return {
   
    }
  }
}
</script>

<style lang="less">
.ren-yuan-right-cmp {
  width: 100%;
  height:100%;
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
  .lc2-chart {
    height: calc(~"100% - 80px");
  }
}
</style>