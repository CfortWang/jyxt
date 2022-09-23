<template>
  <div class="bottom-right-table-1">
      <div class="table-name">
        物料实时使用记录
      </div>
      <dv-scroll-board :config="config" />
  </div>
</template>

<script>
export default {
  name: 'BottomRightTable1',
  data () {
    return {
      config: {
        header: ['配制时间', '配制浓度', '配制数量'],
        data: [
          ['2020-12-22', '12','	212'],
          ['2020-12-22', '222','222']
         
        ],
        // index: true,
        columnWidth: [100,100,100],
        align: ['center','center','center'],
        oddRowBGC: 'rgba(9, 37, 50, 0.4)',
        evenRowBGC: 'rgba(10, 32, 50, 0.3)'
      }
    }
  }
}
</script>

<style lang="less">
.bottom-right-table-1 {
  width: calc(~"25% + 10px");
  height: 100%;
  margin:10px 15px;
  .border-box-content {
    padding: 20px;
    box-sizing: border-box;
  }
  .table-name {
    font-size:28px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    display: inline-block;
    width: 100%;
    text-align: center;
    line-height: 45px;
    img {
      width: 40px;
      height: 40px;
      margin-right: 5px;
      vertical-align: top;
    }
  }
  .dv-scroll-board {
    height: calc(~"100% - 60px");
  }
}
</style>