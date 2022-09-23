<template>
  <div class="ren-yuan-left-chart-1">
    <div class="ren-yuan-lc1-header"> 人员基本情况</div>
    <!-- <div class="lc1-details">使用量<span>430</span></div> -->
    <!-- <dv-capsule-chart class="lc1-chart" :config="config" /> -->
    <div class="ren-yuan-lc1-details"> 姓名:<span>王羲值</span></div>
    <div class="ren-yuan-lc1-details"> 现专业技术职务:<span>新源汽车检测人员</span></div>
   
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>
export default {
  name: 'RenYuanLeftChart1',
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
.ren-yuan-left-chart-1 {
  width: 100%;
  height:20%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  .ren-yuan-lc1-header {
    text-align: center;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    margin-bottom: 10px;
  }
  .ren-yuan-lc1-details {
    height: 50px;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-indent: 20px;
    span {
      color: #096dd9;
      font-weight: bold;
      font-size:20px;
      // margin-left: 20px;
    }
  }
  .lc1-chart {
    flex: 1;
  }
}
</style>