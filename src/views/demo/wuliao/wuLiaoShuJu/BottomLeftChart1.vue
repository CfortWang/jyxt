<template>
  <div class="bottom-left-chart-1">
    <div class="header-name"> 物料使用占比</div>
    <div class="details-value"><span>84.23</span>%</div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: 'BottomLeftChart1',
  data () {
    return {
      option: {
        series: [
          {
            type: 'pie',
            data: [
              { name: '汽车运输物料', value: 2, radius: ['31%', '32%'] },
              { name: '检验类型物料', value: 25, radius: ['31%', '37%'] },
              { name: '化工理化物料', value: 11, radius: ['31%', '32%'] },
              { name: '计量校准物料', value: 3, radius: ['31%', '37%'] },
              { name: '医疗用品物料', value: 16, radius: ['32%', '35%'] },
              { name: '食品专供物料', value: 10, radius: ['32%', '35%'] },
              { name: '识别类型物料', value: 4, radius: ['31%', '37%'] },
              { name: '校准类型物料', value: 14, radius: ['31%', '32%'] },
              { name: '检测类型物料', value: 11, radius: ['32%', '35%'] }
            ],
            outsideLabel: {
              labelLineEndLength: 20,
              formatter: '{percent}%\n{name}',
              style: {
                fill: '#fff'
              }
            }
          },
          {
            name: 'decoration ring',
            type: 'pie',
            data: [
              { value: 10, radius: ['50%', '53%'] }
            ],
            outsideLabel: {
              show: false
            },
            pieStyle: {
              fill: 'rgba(255, 255, 255, 0.2)'
            }
          },
          {
            name: 'decoration ring',
            type: 'pie',
            data: [
              { value: 10, radius: ['45%', '46%'] }
            ],
            outsideLabel: {
              show: false
            },
            pieStyle: {
              fill: 'rgba(255, 255, 255, 0.2)'
            }
          }
        ],
        color: ['#00c0ff', '#3de7c9', '#fff', '#00c0ff', '#3de7c9', '#fb7293','#e690d1', '#32c5e9', '#96bfff']
      }
    }
  }
}
</script>

<style lang="less">
.bottom-left-chart-1 {
  position: relative;
  width: 25%;
  .header-name {
    height: 150px;
    line-height: 150px;
    font-size: 28px;
    text-align: center;
  }
  .details-value {
    height: 40px;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    span {
      color: #00c0ff;
      font-size: 45px;
    }
  }
  .dv-charts-container {
    height: calc(~"100% - 190px");
  }
  .decoration-ring {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 5px solid fade(#fefefe, 30);
    top: 190px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>