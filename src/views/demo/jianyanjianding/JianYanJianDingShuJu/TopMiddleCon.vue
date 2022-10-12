<template>
  <div class="top-middle-con">
    <div class="cc-header">
      <dv-decoration-1 style="width:200px;height:50px;" />
      <div style="width: 500px;text-align: center;">
          <div style="display:inline-block;font-size:35px;">检验检测统计</div>
      </div>
      <dv-decoration-1 style="width:200px;height:50px;" />
    </div>

    <div class="middle-chart">
       <dv-charts :option="option" class="lc1-chart"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopMiddleCon',
  data () {
    return {
      option: {
        legend: {
          data: [
          ],
          textStyle: {
            fill: '#fff'
          },
          color: '#fff'
        },
        xAxis: {
          axisLine: {
            style: {
              stroke: '#fff'
            }
          },
          axisLabel: {
            style: {
              fill: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          name: '数量',
          color: '#fff',
          data: 'value',
          nameTextStyle: {
            fill: '#fff',
            fontSize: 10
          },
          min: 0,
          max:100
        },
        yAxis: {
          splitLine: {
            show: false,
            style: {
              stroke: '#d4d4d4',
              lineWidth: 22
            }
          },
          axisLine: {
            style: {
              stroke: '#fff',
            }
          },
          axisLabel: {
            style: {
              fill: '#fff',
              fontSize: 10
            }
          },
          axisTick: {
            show: false
          },
          // name: '委托单管理',
          data: ['汽车委托单', '钢铁检测单', '血液化验单', '理化委托单', '文件委托单', '新能源测试单']
        },
        series: [
          {
            name: '委托单管理',
            data: [
              84, 75, 31, 32, 80, 8
            ],
            type: 'bar',
            gradient: {
                  color: ['#37a2da', '#67e0e3']
            },
            // barStyle: {
            //   fill: '#00baff'
            // },
            label: {
              show: true,
              position: 'center',
              offset: [0, 0],
              style: {fill: '#fff'}
            },
            animationCurve: 'easeOutBack'
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
.top-middle-con {
  width: 100%;
  height: 100%;
  margin: 0px;
  // padding: 0px 50px;
  display: flex;
  flex-direction: column;
  .cc-black{cursor: pointer;width: 100px; height:40px; line-height:40px; text-align:center;float: right;font-size:18px;}
  .cc-header {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
  }
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
  .dv-charts-container{
    height: calc(100% - 50px);
  }
  .lc1-chart {
    height: calc(~"100% - 80px");
    flex: 1;
  }
}
}
</style>
