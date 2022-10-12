<template>
  <div class="ren-yuan-middle-bottom-cmp">
     <div class="lc2-header">考核记录情况</div>
     <dv-scroll-board :config="config" />
  </div>
</template>

<script>
export default {
  name: 'RenYuanMiddleBottomCmp',
  data () {
    return {
      config: {
      header: ['技术职称', '考核类别', '考核形式','考核开始时间','考核结束时间','考核内容','考核结果'],
        data: [
          ['工程师', '设备操作','实操','2020-12-29 00：00：00','','订单','大多数'],
          ['工程师', '设备操作','实操','2020-12-29 00：00：00','','订单','大多数'],
          ['工程师', '设备操作','实操','2020-12-29 00：00：00','','订单','大多数'],
          ['工程师', '设备操作','实操','2020-12-29 00：00：00','','订单','大多数'],
          ['工程师', '设备操作','实操','2020-12-29 00：00：00','','订单','大多数'],
          ['工程师', '设备操作','实操','2020-12-29 00：00：00','','订单','大多数']
        ],
        index: true,
        columnWidth: [60,120,120,110,160,160,110,120],
        align: ['center','center','center','center','center','center','center','center'],
        oddRowBGC: 'rgba(9, 37, 50, 0.1)',
        evenRowBGC: 'rgba(10, 32, 50, 0.1)',

      }
    }
  }
}
</script>

<style lang="less">
.ren-yuan-middle-bottom-cmp {
  width: 100%;
  height:100%;
  display: flex;
  flex-direction: column;
  .lc2-header {
    // text-align: center;
    height: 20px;
    line-height: 20px;
    font-size: 28px;
    text-indent: 20px;
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
