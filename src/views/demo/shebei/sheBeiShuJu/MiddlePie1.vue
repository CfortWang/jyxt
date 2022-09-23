<template>
  <div class="middle-pie-1">
     <div class="lc1-header">设备保养</div>
     <dv-charts class="lc1-chart" :option="option" /> 
  </div>
</template>

<script>
export default {
  name: 'MiddlePie1',
  data () {
    return {
      option: {
        series: [
          {
            type: 'pie',
            data: [
              { name: '保养数量', value: 49 },
              { name: '剩余数量', value:58 },
              { name: '其他', value: 31 }
            ],
            radius: ['45%', '65%'],
            insideLabel: {
              show: false
            },
            outsideLabel: {
              labelLineEndLength: 10,
              formatter: '{percent}%\n{name}',
              style: {
                fontSize: 14,
                fill: '#fff'
              }
            }
          }
        ],
        color: ['#37a2da', '#32c5e9', '#96bfff']
      }
    }
  }
}
</script>

<style lang="less">
.middle-pie-1 {
  width:50%;
  height:100%;
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