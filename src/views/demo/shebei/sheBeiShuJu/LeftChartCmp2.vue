<template>
  <div class="left-chart-Cmp-2">
       <div class="lc1-header">设备核查</div>
       <dv-capsule-chart class="lc1-chart" :config="config" />
      <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>
export default {
  name: 'LeftChartCmp2',
  data () {
    return {
       config: {
        data: [
          {
            name: '使用量',
            value: 167
          },
          {
            name: '核查量',
            value: 67
          },
          {
            name: '剩余数量',
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
.left-chart-Cmp-2 {
  width: 100%;
  height: 45%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  .lc1-header {
    text-align: center;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    margin-bottom: 10px;
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