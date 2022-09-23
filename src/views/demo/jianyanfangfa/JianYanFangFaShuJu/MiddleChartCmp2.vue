<template>
  <div class="middle-chart-Cmp-2">
     <div class="lc2-header">方法使用记录</div>
     <dv-scroll-board :config="config" />
  </div>
</template>

<script>
export default {
  name: 'MiddleChartCmp2',
  data () {
    return {
      config: {
      header: ['方法名称', '方法使用日期', '标准方法编号','使用人'],
        data: [
          ['qweqwe', '2021-03-03','tbb','饶智韬'],
          ['超科学的电子取证法', '2020-12-09','kexue12121','饶智韬'],
          ['超级科学取证法', '2020-11-11','kexue78788','刘满果'],
          ['法庭科学取证法', '2020-06-08','jyxt-hh-09-00',''],
          ['新方法电子', '2020-05-21','SSDD44',''],
          ['33412', '2020-05-19','khj',''],
          ['新的方法', '2020-05-15','lkj',''],
          ['电子的方法', '2020-05-14','poi',''],
          ['电子专属方法', '','yui',''],
          ['飞电取雷VS-40001', '2020-04-07','ert',''],
          ['都不是', '','qwe',''],
          ['电子实验室<C-T-S-A- 200198>', '2020-04-06','789',''],
          ['电子检验检测<CL-2008>', '2020-04-08','678',''],
          ['12321', '2020-04-27','456','']
        ],
        index: true,
        oddRowBGC: 'rgba(9, 37, 50, 0.4)',
        evenRowBGC: 'rgba(10, 32, 50, 0.3)',
        columnWidth: [80,220,220,200,200],
        align: ['center','center','center','center','center'],
      }
    }
  }
}
</script>

<style lang="less">
.middle-chart-Cmp-2 {
  width: 100%;
  height:55%;
  display: flex;
  flex-direction: column;
  margin-top: 1.5%;
  .lc2-header {
    text-align: center;
    height: 20px;
    line-height: 20px;
    font-size: 28px;
    // text-indent: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .lc2-details {
   height: 40px;
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
