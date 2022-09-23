<template>
  <div class="yp-bottom-right-table-2">
    <dv-border-box-6>
      <div class="table-name">
        <img src="./img/icon1.png" />样品种类排行
      </div>

      <dv-scroll-board :config="config" />
    </dv-border-box-6>
  </div>
</template>

<script>
export default {
  name: 'BottomRightTable2',
  data () {
    return {
      config: {
        data: [
          ['液晶显示器', '月累计：14件'],
          ['收费键盘', '月累计：13件'],
          ['车牌识别仪', '月累计：7件'],
          ['自动栏杆机', '月累计：3件'],
          ['称重仪表盘', '月累计：2件'],
          ['门架机柜空调', '月累计：1件']
        ],
        index: true,
        columnWidth: [30, 100],
        align: ['center'],
        oddRowBGC: 'rgba(9, 37, 50, 0.4)',
        evenRowBGC: 'rgba(10, 32, 50, 0.3)'
      }
    }
  }
}
</script>

<style lang="less">
.yp-bottom-right-table-2 {
  width: calc(~"25% + 10px");
  height: 100%;
  margin: 0 -5px;

  .border-box-content {
    padding: 20px;
    box-sizing: border-box;
  }

  .table-name {
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;

    img {
      width: 40px;
      height: 40px;
      margin-right: 5px;
    }
  }

  .dv-scroll-board {
    height: calc(~"100% - 60px");
  }
}
</style>
