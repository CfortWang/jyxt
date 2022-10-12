<template>
  <div class="bottom-right-table-2">
      <div class="table-name">
        溶液实时使用记录
      </div>
      <dv-scroll-board :config="config" />
  </div>
</template>

<script>
export default {
  name: 'BottomRightTable2',
  data () {
    return {
      config: {
      header: ['创建时间', '配制浓度', '配制数量'],
        data: [
          ['2020-06-04', '43','34'],
          ['2020-08-06', '布吉岛','布吉岛'],
          ['2020-08-26', '1221','	1'],
          ['2020-12-19', '1','1']
        ],
        // index: true,
        columnWidth: [100],
        align: ['center','center','center'],
        oddRowBGC: 'rgba(9, 37, 50, 0.4)',
        evenRowBGC: 'rgba(10, 32, 50, 0.3)'
      }
    }
  }
}
</script>

<style lang="less">
.bottom-right-table-2 {
  width: calc(~"25% + 10px");
  height: 100%;
  margin: 10px 15px;
  .border-box-content {
    padding: 20px;
    box-sizing: border-box;
  }
  .table-name {
    height: 45px;
    font-size:28px;
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