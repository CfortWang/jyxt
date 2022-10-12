<template>
  <div class="middle-pie-2">
     <div class="lc1-header">设备维修</div>
     <dv-charts class="lc1-chart" :option="option" /> 
  </div>
</template>

<script>
export default {
  name: 'MiddlePie2',
  data () {
    return {
      option: {
        series: [
          {
            type: 'pie',
            data: [
              { name: '维修数量', value: 93 },
              { name: '剩余数量', value: 32 },
              { name: '其他', value: 52 }
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
        color: ['#9fe6b8', '#3de7c9',  '#469f4b'] 
      }
    }
  }
}
</script>

<style lang="less">
.middle-pie-2 {
  width: 50%;
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