<template>
  <div id="ranking-board">
    <div class="ranking-board-title">本年度受理</div>               <!-- 100vh; -->
    <dv-scroll-ranking-board :config="config" style="width:100%;height:70vh"></dv-scroll-ranking-board>
  </div>
</template>

<script>
import { countCaseNumData } from '@/api/platform/system/jbdHome'
export default {
  name: 'RankingBoard',
  data () {
    return {
      config: { data: [
          {
            name: '飞行公司',
            value: 55
          },
          {
            name: '网销公司',
            value: 120
          },
          {
            name: '中国立体',
            value: 78
          },
          {
            name: '力当实业',
            value: 66
          },
          {
            name: '黄宏工程',
            value: 80
          },
          {
            name: '王吉实业',
            value: 45
          },
          {
            name: '鑫辛工程',
            value: 29
          },
          {
            name: '王当制造',
            value: 29
          },
          {
            name: '绿化环境',
            value: 29
          }
        ],unit:' 份委托',
        rowNum:8}
    }
  },
 mounted () {
     const { getData } = this
     getData()
     setInterval(this.getData, 3600000)
  },
  methods:{
    getData(){
        const { config } = this
        countCaseNumData().then(data=>{ //将参数替换成对应参数
        if(200 === data.state && data.variables.data.length>1){
             let cont = JSON.parse(JSON.stringify(data.variables.data).replace(/"songJianDanWei":/g,'"name":').replace(/"ajnum":/g,'"value":'))
              cont.pop()
              this.config ={ ...this.config }
              }
         })
    },
  },
}
</script>

<style lang="less">
#ranking-board {
  width: 22%;
  box-shadow: 0 0 3px blue;
  display: flex;
  flex-direction: column;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, .5);
  box-sizing: border-box;
  padding: 0px 1.5rem;
  .ranking-board-title {
    font-weight: bold;
    height: 5%;
    display: flex;
    align-items: center;
    font-size: 1.25rem;
  }
}
</style>
