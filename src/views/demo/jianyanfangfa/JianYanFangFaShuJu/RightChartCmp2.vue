<template>
  <div class="right-chart-Cmp-2">
     <div class="lc1-header">方法偏离管理</div>
       <dv-capsule-chart class="lc1-chart" :config="config" />
      <!-- <dv-decoration-2 style="height:10px;" /> -->
  </div>
</template>


<script>
export default {
  name: 'RightChartCmp2',
  data () {
    return {
      config: {
        data: [
          {
            name: '编制提交',
            value: 167
          },
          {
            name: '开启分支',
            value: 67
          },
          {
            name: '同意',
            value: 123
          }
        ],
        colors: ['#00baff', '#3de7c9', '#96bfff'],
        unit: '件',
        showValue: true
      }
    }
  }
}
</script>

<style lang="less">
.right-chart-Cmp-2 {
 width: 100%;
  height: 50%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  // border-top: 2px solid rgba(1,153,209,.5);
  margin-top:2%;
  .lc1-header {
    text-align: center;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    margin-top: 10px;
  }
  .lc1-details {
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
  .lc1-chart {
    flex: 1;
  }

  
}
</style>