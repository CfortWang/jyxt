<template>
  <dv-border-box-6 class="middle-chart-Com-2">
      <div class="lc2-header">实验室间比对一览</div>

      <dv-scroll-board :config="config" class="lc1-chart"/>

 </dv-border-box-6>
</template>

<script>
 export default {
  name: 'MiddleChartCom2',
  data () {
    return {
      config: {
      header: ['参加项目名称', '组织方', '参加实验室','参加日期','结果'],
        data: [
          ['人员能力确认', '14','	214','2414能力验证后','214'],
          ['比对DNA', 'DNA自己','DNA','能力验证后','合格'],
          ['能力验证', 'DNADNA实验室比对','DNADNA实验室比对','2020 年06 月18 日','DNADNA实验室比对'],
          ['实验间比对计划', '实验间比对计划','实验间比对计划','2020 年06 月18 日','实验间比对计划'],
            ['实验间比对计划', '实验间比对计划','实验间比对计划','2020 年06 月18 日','实验间比对计划'],
              ['实验间比对计划', '实验间比对计划','实验间比对计划','2020 年06 月18 日','实验间比对计划'],
          ['实验间比对计划', '实验间比对计划','实验间比对计划','2020 年06 月18 日','实验间比对计划']
        ],
        //index: true,
        columnWidth: [200,120,200,120,120],
        align: ['center','center','center','center','center'],
      oddRowBGC: 'rgba(9, 37, 50, 0.4)',
      evenRowBGC: 'rgba(10, 32, 50, 0.3)'
      }
    }
  }
}
</script>

<!--
 export default {
  name: 'MiddleChartCom2',
  data () {
    return {
      config: {
      header: ['参加项目名称', '组织方', '参加实验室','参加日期','结果'],
        data: [
          ['24', '14','	214','2414能力验证后','214'],
          ['比对DNA', 'DNA自己','DNA','能力验证后','合格'],
          ['DNADNA实验室比对', 'DNADNA实验室比对','DNADNA实验室比对','2020 年06 月18 日','DNADNA实验室比对'],
          ['实验间比对计划', '实验间比对计划','实验间比对计划','2020 年06 月18 日','实验间比对计划'],
          ['实验间比对计划', '实验间比对计划','实验间比对计划','2020 年06 月18 日','实验间比对计划']
        ],
        //index: true,
        columnWidth: [120,120,200,80,80],
        align: ['center','center','center','center','center'],
      oddRowBGC: 'rgba(9, 37, 50, 0.4)',
      evenRowBGC: 'rgba(10, 32, 50, 0.3)'
      }
    }
  }
}
</script> -->



<style lang="less">
.middle-chart-Com-2 {
  width: 100%;
  height:45%;
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
   height: 50px;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-indent: 20px;
    span {
      font-weight: bold;
      font-size: 35px;
      margin-left: 20px;
    }
  }
  .lc1-chart {
    height: calc(~"100% - 80px");
    flex: 1;
  }
}
</style>
