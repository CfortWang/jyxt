<template>
  <div id="water-level-chart">
    <div class="water-level-chart-title">检测任务情况</div>

    <div class="water-level-chart-details">
      累计<span>490</span>件
    </div>

    <div class="chart-container">
      <dv-conical-column-chart :config="config" v-if="config" />
    </div>
  </div>
</template>

<script>
import { tasksCompleteState } from '@/api/platform/system/jbdHome'
export default {
  name: 'WaterLevelChart',
  data () {
    return {
      dataNum:0,
      config: {
            data:[],
            showValue: true
      }
    }
  },
  mounted() {
  	this.createData()
  },
  methods:{
    createData(){
      const { config } = this
       tasksCompleteState().then(data=>{ //将参数替换成对应参数
          if(200 === data.state && data.variables.data.length>0){
               let watCont = data.variables.data
               let waterData = []
                 for(let i = 0; i　< watCont.length; i++) {
                     let watData = {}
                     if(watCont[i].org){ //筛选总数量

                        if(watCont[i].org.substring(0,3) =='DNA'){
                          watData.name =  watCont[i].org.substring(0,3)
                        }else{
                          watData.name = watCont[i].org.substring(0,2)
                        }

                       watData.value = watCont[i].Num
                       waterData.push(watData)
                     }else{
                       if(watCont[i].Num > this.dataNum){
                        this.dataNum =  watCont[i].Num
                       }
                     }
                   }
                    this.config.data = waterData
                    this.config.showValue = true
                    this.config ={ ...this.config}
          }else{
            let watCont = [{org: "受理", Num: 120},{org: "待检测", Num: 50},{org: "检测", Num: 45},{org: "审核", Num: 40},{org: "审批", Num: 30},{org: "待发放", Num: 20},{org: "已发放", Num: 15}]
            let waterData = []
            for(let i = 0; i　< watCont.length; i++) {
                let watData = {}
                if(watCont[i].org){
                  watData.name = watCont[i].org.substring(0,2)
                  watData.value = watCont[i].Num
                  waterData.push(watData)
                }else{
                  if(watCont[i].Num > this.dataNum){
                   this.dataNum =  watCont[i].Num
                  }
                }
              }
               this.config.data = waterData
               this.config.showValue = true
               this.config ={ ...this.config}
            }
       })
    }
  }
}
</script>

<style lang="less">
#water-level-chart {
  width: 24%;
  height: 100%;
  box-sizing: border-box;
  margin-left: 1%;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, .5);
  display: flex;
  flex-direction: column;
  .water-level-chart-title {
    font-weight: bold;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 20px;
    justify-content: center;
  }
  .water-level-chart-details {
    height: 15%;
    display: flex;
    justify-content: center;
    font-size: 17px;
    align-items: flex-end;
    span {
      font-size: 35px;
      color: #58a1ff;
      margin: 0 5px;
      margin-bottom: -2px;
    }
  }
  .chart-container {
    width: 95%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dv-water-pond-level {

    height: 210px;
    border: 10px;
    ellipse {
      stroke: transparent !important;
    }
    text {
      font-size: 40px;
    }
  }
}
</style>
