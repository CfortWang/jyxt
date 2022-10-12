<template>
  <dv-border-box-6 class="left-chart-com-2">
      <div class="lc1-header">质量监督实施</div>
      <dv-scroll-ranking-board :config="config" class="lc1-chart"/>
  </dv-border-box-6>
</template>

<script>
export default {
  name: 'LeftChartCom2',
  data () {
    return {
      config:{
         data: [
          {name: '质量管理办公室',value:2},
          {name: 'DNA检验室',value:3},
          {name: '理化检验室',value: 0},
          {name: '声纹检验室',value: 8},
          {name: '痕迹检验室',value: 8},
          {name: '文件检验室',value: 9},
          {name: '电子证据室',value:12}
        ],
        unit: '件'
      }
    }
  },
  methods: {
    toHome() {
      this.$router.push({
        name: 'dashboard'
      })
    },
}
}
</script>

<style lang="less">
.left-chart-com-2 {
  width: 100%;
  height:60%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  margin-top:2%;
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
