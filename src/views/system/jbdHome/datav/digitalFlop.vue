<template>
  <div id="digital-flop">
    <div
      class="digital-flop-item"
      v-for="item in digitalFlopData"
      :key="item.title"
      v-if=" item.title!='委托案件'"
    >
      <div class="digital-flop-title">{{ item.title}}</div>
      <div class="digital-flop">
        <dv-digital-flop
          :config="item.number"
          style="width:80px;height:50px;font-size: 18px;"
        />
          <div class="unit">件</div>
      </div>
    </div>

    <dv-decoration-10 />
  </div>
</template>

<script>
 import { staffTaskNum } from '@/api/platform/system/jbdHome'
export default {
  name: 'DigitalFlop',
  data () {
    return {
      digitalFlopData: [],
      fontColor:['#4d99fc','#40faee','#D39745','#4d99fc','#f46827','#40faee'],
      digData :{
          title: '',
          number: {
            number: [],
            content: '{nt}',
            textAlign: 'right',
            style: {
              fill: '#f46827',
              fontWeight: 'bold'
            }
          },
          unit: '件'
        },
    }
  },
  mounted () {
      const { createData } = this
      createData()
      setInterval(this.createData, 3600000)
   },
  methods: {
    createData () {
      const { randomExtend } = this
      const { digitalFlopData } = this
      staffTaskNum().then(data=>{ //将参数替换成对应参数
          if(data.state === 200 && data.variables.data){
                this.digitalFlopData =[]
                let digCont = data.variables.data
               digCont= []
               digCont.push({taskName:'受理',taskNum:120})
               digCont.push({taskName:'待检测',taskNum:20})
               digCont.push({taskName:'检测',taskNum:15})
               digCont.push({taskName:'审核',taskNum:20})
               digCont.push({taskName:'审批',taskNum:30})
               digCont.push({taskName:'待发放',taskNum:60})
               digCont.push({taskName:'已发放',taskNum:75})
               for(let i = 0; i　< digCont.length; i++) {
                  let digData = {}
                  digData.title = digCont[i].taskName
                  digData.unit = '件'
                  digData.number={}
                  digData.number.number = [digCont[i].taskNum]
                  digData.number.content ='{nt}'
                  digData.number.textAlign = 'right'
                  digData.number.style={}
                  digData.number.style.fill = this.fontColor[randomExtend(0, 5)]
                  digData.number.style.fontWeight = 'bold'
                  this.digitalFlopData.push(digData)
                }
          }
      })
    },
    randomExtend (minNum, maxNum) {
      if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10)
      } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      }
    },
    /* 随机颜色*/
  },
}
</script>

<style lang="less">
#digital-flop {
  position: relative;
  height: 12%;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(6, 30, 93, 0.5);
  .dv-decoration-10 {
    position: absolute;
    width: 80%;
    left: 2.5%;
    height: 5px;
    bottom: 0px;
  }
  .digital-flop-item {
    width: 18%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 5px solid rgb(6, 30, 93);
  }
  .digital-flop-title {
    font-size: 16px;
    margin-bottom: 20px;
  }
  .digital-flop {
    display: flex;
  }
  .unit {
    margin-left: 10px;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    padding-bottom: 13px;
  }
}
</style>
