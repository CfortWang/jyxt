<template>
   <div id="jy-ranking-board">
        <div @click.prevent="toHome()"
                      style="width: 140px;
                         cursor: pointer;
                         text-align:center;
                         color: #FFFFFF;
                         line-height: 40px;
                         float: right;
                         font-size: 14px;
                         margin-left: 10px;
                         ">
                  <dv-border-box-8>
                         <div style="padding-left: 5px;">返回首页</div>
                        </dv-border-box-8>
        </div>
       <div class="ranking-board-title">送样单位 / 个人</div>
      <dv-scroll-ranking-board :config="config" />
    </div>
</template>

<script>
export default {
  name: 'TopLeftCon',
  data () {
     return {
       config: {
         data: [
           {
             name: '李涵',
             value: 55
           },
           {
             name: '王城科技',
             value: 120
           },
           {
             name: '李丹',
             value: 78
           },
           {
             name: '利达有限',
             value: 66
           },
           {
             name: '富士集团',
             value: 80
           },
           {
             name: '浮成计算',
             value: 45
           },
           {
             name: '东风集团',
             value: 29
           },
           {
             name: '尚上有限',
             value: 29
           },
           {
             name: '丽党新城',
             value: 29
           },
           {             name: '和平饭店',             value: 29            }
         ],
         rowNum: 9
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
#jy-ranking-board {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-top: 2px solid rgba(1, 153, 209, .5);
  box-sizing: border-box;
  padding: 0px 30px;
  .ranking-board-title {
    font-weight: bold;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 20px;
  }
  .dv-scroll-ranking-board {
    flex: 1;
  }
}
</style>
