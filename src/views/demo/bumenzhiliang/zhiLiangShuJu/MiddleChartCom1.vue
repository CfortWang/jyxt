<template>
  <div class="middle-chart-Com-1">
      <div class="mh-middle">
         <span style="position: absolute;top:25px;left:805px;">质量管理数据大屏</span>
         <dv-decoration-5  style="height:40px;" />
      </div>

      <dv-border-box-6 class="pie-middle">
         <div class="pie-header">评审报告</div>
         <dv-charts :option="option" class="lc1-chart"/>
      </dv-border-box-6>

  </div>
</template>

<script>
export default {
  name: 'MiddleChartCom1',
  data () {
    return {
      option: {
        legend: {
          data: [
            {
              // name: '评审报告',
              // color: '#00baff'
            }
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
          name: '评审报告',
          color: '#fff',
          data: ['DNA检验室', '理化检验室', '声纹检验室', '文件检验室', '痕迹检验室', '电子证据室', '质量管理办公室'],
          nameTextStyle: {
            fill: '#fff',
            fontSize: 10
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
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
          color: '#fff',
          data: 'value',
          name: '数量',
          min: 0,
          max:30,
          nameTextStyle: {
            fill: '#fff',
            fontSize: 10
          }
        },
        series: [
          {
            name: '评审报告',
            data: [
              10, 16,10, 16, 16, 16,0
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
    allView(){
          screenfull.request() //默认显示全屏
    },
	  toHome(){
      this.$router.push({
      			name:'dashboard'
      })
		 }

  }
}
</script>

<style lang="less">
.middle-chart-Com-1 {
    width: 100%;
    height:55%;
    display: flex;
    flex-grow: 0;
    flex-direction: column;
  .mh-middle{
    width: 100%;
    height:12%;
    font-size:35px;
    text-align: center;
    // border: 2px solid rgba(1,153,209,.5);
  }
  .pie-black{cursor: pointer;width: 100px; height:40px; line-height:40px; text-align:center;margin-left:640px;font-size:18px;margin-top: 20px;}
  .pie-middle{
    width: 100%;
    height:88%;
    margin-top:2%;

  .pie-header{
    text-align: center;
    height: 20px;
    line-height: 20px;
    font-size: 28px;
    margin-top: 10px;
   }
  }
  .lc1-chart {
    height: calc(~"100% - 80px");
    flex: 1;
  }

}
</style>
