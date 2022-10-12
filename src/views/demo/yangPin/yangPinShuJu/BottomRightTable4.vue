<template>
  <div class="yp-bottom-right-table-4">
    <dv-border-box-6>
      <div class="table-name">
        <img src="./img/icon4.png" />样品完成处理
      </div>

      <dv-scroll-board :config="config" />
    </dv-border-box-6>
  </div>
</template>

<script>
export default {
  name: 'BottomRightTable4',
  data () {
    return {
      config: {
        data: [
          ['李松旺', '月累计：133件'],
          ['欧阳娜', '月累计：111件'],
          ['程度', '月累计：35件'],
          ['参离', '月累计：31件'],
          ['冯朝阳', '月累计：28件'],
          ['宋哲和', '月累计：12件']
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
.yp-bottom-right-table-4 {
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
