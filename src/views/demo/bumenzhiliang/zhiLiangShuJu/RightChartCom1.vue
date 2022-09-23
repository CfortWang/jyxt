<template>
  <dv-border-box-6 class="right-chart-Com-1">
     <div class="lc2-header">质量控制评审</div>
     <dv-charts :option="option" class="lc1-chart"/>
  </dv-border-box-6>
</template>

<script>
export default {
  name: 'RightChartCom1',
  data () {
    return {
     option: {
        series: [
          {
            type: 'pie',
            data: [
              { name: '质量管理办公室', value:2 },
              { name: 'DNA检验室', value: 3 },
              { name: '理化检验室', value: 0 },
              { name: '声纹检验室', value: 9 },
              { name: '痕迹检验室', value: 1 },
              { name: '文件检验室', value: 12 },
              { name: '电子证据室', value: 0 }
            ],
            radius: ['45%', '65%'],
            insideLabel: {
              show: true
            },
            outsideLabel: {
              labelLineEndLength: 10,
              formatter: '{percent}%\n{name}',
              style: {
                fontSize:12,
                fill: '#fff'
              }
            },
            showOriginValue: true
          }
        ],
        color: ['#37a2da', '#32c5e9', '#67e0e3','#9fe6b8', '#3de7c9', '#00baff', '#96bfff']
      }
    }
  }
}
</script>


<style lang="less">
.right-chart-Com-1 {
  width: 100%;
  height:40%;
  display: flex;
  flex-direction: column;
  .lc2-header {
    text-align: center;
    height: 20px;
    line-height: 20px;
    font-size: 28px;
    margin-top: 20px;
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
  .lc1-chart {
    height: calc(~"100% - 80px");
    flex: 1;
  }
}
</style>
