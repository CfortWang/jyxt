<template>
  <div class="bottom-middle-con">
    <div class="middle-chart">
       <div class="chart-name">检验检测记录比对</div>
       <dv-conical-column-chart :config="config" class="lc1-chart"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomMiddleCon',
  data () {
    return {
      config: {
        data: [
            {name: '文件检验管理',value: 13},
            {name: '电子检验管理',value: 23},
            {name: '痕迹检验管理',value: 45},
            {name: 'DNA检验管理',value: 8},
            {name: '声纹检验管理',value: 26},
            {name: '理化检验管理',value:10}
        ],
      showValue: true
      }
    }
  }
}
</script>

<style lang="less">
.bottom-middle-con {
  width: 100%;
  height: 100%;
  margin: 0px;
  display: flex;
  flex-direction: column;
 .middle-chart {
  position: relative;
  padding: 0 20px;
  height: 100%;
  // box-sizing: border-box;
  .chart-name {
    height: 50px;
    text-indent: 20px;
    font-size: 28px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    // justify-content: center;
  }
  .lc1-chart {
    height: calc(~"100% - 80px");
    flex: 1;
  }
 }
}
</style>