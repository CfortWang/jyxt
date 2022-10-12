<template>
  <div class="middle-chart-Cmp-1">
    <div class="mh-middle">
      <span style="position: absolute;top:25px;left:805px;">检验检测方法统计</span>
    </div>


    <div class="pie-middle">
      <dv-scroll-ranking-board :config="config" style="width: auto; padding: 0 1.5rem;" />
    </div>


  </div>
</template>

<script>
  export default {
    name: 'MiddleChartCmp1',
    data() {
      return {
        config: {
          data: [{
              name: '标准方法',
              value: 104
            },
            {
              name: '非标准方法',
              value: 67
            },
            {
              name: '其他方法',
              value: 10
            },
            {
              name: '方法偏离',
              value: 30
            }
          ],
          colors: ['#00baff', '#3de7c9', '#96bfff'],
          unit: '件',
          showValue: true
        }
      }
    },
    methods: {
      allView() {
        screenfull.request() //默认显示全屏
      },
    }
  }
</script>

<style lang="less">
  .middle-chart-Cmp-1 {
    width: 100%;
    height: 40%;
    display: flex;
    flex-grow: 0;
    flex-direction: column;

    .mh-middle {
      width: 100%;
      height: 12%;
      font-size: 35px;
      text-align: center;
    }

    .pie-black {
      cursor: pointer;
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin-left: 640px;
      font-size: 18px;
      margin-top: 20px;
    }

    .pie-middle {
      width: 100%;
      height: 88%;
      margin-top: 2%;

      .pie-header {
        text-align: center;
        height: 20px;
        line-height: 20px;
        font-size: 28px;
        margin-top: 10px;
      }
    }

  }
</style>
