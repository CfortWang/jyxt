<template>
  <dv-border-box-6 class="left-chart-com-1">
       <div class="lc1-header">不符合项报告</div>

       <div @click.prevent="toHome()"
                     style="width: 140px;
                        height: 40px;
                        position: absolute;
                        cursor: pointer;
                        color: #FFFFFF;
                        line-height: 40px;
                        font-size: 14px;
                        ">
                 <dv-border-box-8>
                      <span style="margin-top:-20px;">返回首页</span>
                       </dv-border-box-8>
       </div>

       <dv-charts :option="option" class="lc1-chart"/>
  </dv-border-box-6>
</template>

<script>
export default {
  name: 'LeftChartCom1',
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
              { name: 'DNA检验室', value: 1, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '60%' },
              { name: '理化检验室', value: 15, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '52%' },
              { name: '声纹检验室', value: 55, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '44%' },
              { name: '文件检验室', value: 32, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '36%' },
              { name: '痕迹检验室', value: 22, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '28%' },
              { name: '电子证据室', value: 0, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '20%' },
              { name: '质量管理办公室', value: 14, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '12%' },
              { name: '深圳海关缉私局司法鉴定中心', value: 0, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '4%' }
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
  },
  methods: {
	  toHome(){
      this.$router.push({
      			name:'dashboard'
      })
		 }
  }

}
</script>

<style lang="less">
.left-chart-com-1 {
  width: 100%;
  height:40%;
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
    margin-top: 10px;
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
    height: calc(~"100% - 80px");
    flex: 1;
  }
}
</style>
