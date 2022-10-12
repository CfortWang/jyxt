<template>
  <div class="ren-yuan-middle-top-cmp">
     <div class="lc2-header">培训记录情况</div>
     <dv-scroll-board :config="config" />
  </div>
</template>

<script>
export default {
  name: 'RenYuanMiddleTopCmp',
  data () {
    return {
     config: {
      header: ['起止年月', '终止年月', '单位名称','从事何种工作','任何职务'],
        data: [
          ['2021-03-04 00:00:00', '2021-03-05 00:00:00','','',''],
          ['2021-03-04 00:00:00', '2021-03-05 00:00:00','','',''],
          ['2021-03-04 00:00:00', '2021-03-05 00:00:00','','',''],
          ['2021-03-04 00:00:00', '2021-03-05 00:00:00','','',''],
          ['2021-03-04 00:00:00', '2021-03-05 00:00:00','','',''],
          ['2021-03-04 00:00:00', '2021-03-05 00:00:00','','','']
        ],
        index: true,
        columnWidth: [60,160,160,200,200,200],
        oddRowBGC: 'rgba(9, 37, 50, 0.1)',
        evenRowBGC: 'rgba(10, 32, 50, 0.1)',
        align: ['center','center','center','center','center'],
      }
    }
  }
}
</script>

<style lang="less">
.ren-yuan-middle-top-cmp {
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
