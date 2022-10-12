<template>
  <div class="right-chart-Cmp-1">
     <div class="lc2-header">非标准方法</div>
     <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: 'RightChartCmp1',
  data () {
    return {
     option: {
        series: [
          {
            type: 'gauge',
            startAngle: -Math.PI / 2,
            endAngle: Math.PI * 1.5,
            arcLineWidth: 7,
            data: [
              { name: '通过数量', value: 25, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'] },
              { name: '申请数量', value: 45, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '52%' },
              { name: '其他数量', value: 25, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '28%' }
            ],
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            dataItemStyle: {
              lineCap: 'round'
            },
            backgroundArc: {
              show: false
            },
            details: {
              show: true,
              formatter: '{name}',
              position: 'start',
              offset: [-10, 0],
              style: {
                fill: '#fff',
                fontSize: 12,
                textAlign: 'right'
              }
            }
          }
        ]
      }
    }
  }
}
</script>


<style lang="less">
.right-chart-Cmp-1 {
  width: 100%;
  height:50%;
  display: flex;
  flex-direction: column;
  border-top: 2px solid rgba(1,153,209,.5);
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
  .lc2-chart {
    height: calc(~"100% - 80px");
  }
}
</style>
