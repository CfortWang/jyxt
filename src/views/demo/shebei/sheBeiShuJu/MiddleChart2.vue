<template>
  <div class="middle-chart-2">
     <!-- <div class="lc2-header">使用记录</div> -->
     <dv-scroll-board :config="config" />
  </div>
</template>

<script>
export default {
  name: 'MiddleChart2',
  data () {
    return {
      config: {
      header: ['使用开始时间', '使用结束时间', '委托书编号','设备状况','设备编号'],
        data: [
          ['2021-02-17', '2021-03-04','W（深圳百宝囊）委字[2021]83号','正常使用','szcc-5542'],
          ['2021-02-17', '2021-03-04','W（深圳百宝囊）委字[2021]83号','正常使用','szcc-5542'],
          ['2021-02-17', '2021-03-04','W（深圳百宝囊）委字[2021]83号','正常使用','szcc-5542'],
          ['2021-02-09', '2021-03-04','W（深圳百宝囊）委字[2021]42号','正常使用','szcc-5542'],
          ['2021-02-04', '2021-03-03','W（深圳百宝囊）委字[2021]42号','正常使用','szcc-5542'],
          ['2021-02-02', '2021-03-04','W（深圳百宝囊）委字[2021]42号','正常使用','szcc-5542'],
          ['2021-03-04', '2021-01-27','W（深圳广发银行）委字[2021]23号','正常使用','szcc-55422021]8'],
          ['2021-01-11', '2021-03-04','W（皇岗分局）委字[2077]001号','正常使用','szcc-5542'],
          ['2021-03-04', '2020-11-23','委字测试 [2020] 14号','正常使用','szcc-5542'],
          ['2021-03-04', '2020-11-10','委字测试 [2020] 122号','正常使用','szcc-5542'],
          ['2021-03-04', '2020-11-10','委字测试 [2020] 122号','正常使用','szcc-5542']
        ],
        index: true,
		oddRowBGC: 'rgba(9, 37, 50, 0.1)',
		evenRowBGC: 'rgba(10, 32, 50, 0.1)',
        columnWidth: [80,160,160,200,120,220],
        align: ['center','center','center','center','center'],
      }
    }
  }
}
</script>

<style lang="less">
.middle-chart-2 {
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
  .lc2-chart {
    height: calc(~"100% - 80px");
  }
}
</style>