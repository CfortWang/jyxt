<template>
  <div id="scroll-board">
    <dv-scroll-board :config="config"></dv-scroll-board>
  </div>
</template>

<script>
  import {
    StatisticsSelect
  } from '@/api/platform/system/jbdHome'
  export default {
    name: 'ScrollBoard',
    data() {
      return {
        config: {
          header: ['检测任务', '检测类型', '计划完成时间', '进度', '人员'],
          data: [],
          columnWidth: [130, 170, 130, 170, 130],
          align: ['center', 'center', 'center', 'center'],
          rowNum: 7,
          headerBGC: '#1981f6',
          headerHeight: 45,
          oddRowBGC: 'rgba(0, 44, 81, 0.8)',
          evenRowBGC: 'rgba(10, 29, 50, 0.8)',
        },
          cont:[{jian_ce_ren_wu:'样品登记',jian_ce_lei_xing:'尺寸类',ji_hua_wan_cheng_shi_jian:'2022-02-31',jin_du:'20%',ren_yuan:'杨小曦'},
          {jian_ce_ren_wu:'资源确认',jian_ce_lei_xing:'尺寸类',ji_hua_wan_cheng_shi_jian:'2022-02-21',jin_du:'30%',ren_yuan:'康雄'},
          {jian_ce_ren_wu:'数据处理',jian_ce_lei_xing:'光谱类',ji_hua_wan_cheng_shi_jian:'2022-03-01',jin_du:'30%',ren_yuan:'邱元军'},
          {jian_ce_ren_wu:'数据处理',jian_ce_lei_xing:'光谱类',ji_hua_wan_cheng_shi_jian:'2022-03-01',jin_du:'15%',ren_yuan:'林霖'},
          {jian_ce_ren_wu:'数据校验',jian_ce_lei_xing:'汽车耗油类',ji_hua_wan_cheng_shi_jian:'2022-04-11',jin_du:'70%',ren_yuan:'杨光辉'},
          {jian_ce_ren_wu:'数据校验',jian_ce_lei_xing:'汽车耗油类',ji_hua_wan_cheng_shi_jian:'2022-04-11',jin_du:'70%',ren_yuan:'陈东晗'},
          {jian_ce_ren_wu:'报告',jian_ce_lei_xing:'汽车排放类',ji_hua_wan_cheng_shi_jian:'2022-05-31',jin_du:'90%',ren_yuan:'周蔚'}
         ]
      }
    },
    mounted() {
      const {
        createData
      } = this
      createData()
      setInterval(this.createData, 3600000)
    },
    methods: {
      createData(val) {
            let sunData = []
            for (let i = 0; i < this.cont.length; i++) {
              let dataCont = []
              dataCont.push(this.cont[i].jian_ce_ren_wu)
              dataCont.push(this.cont[i].jian_ce_lei_xing)
              dataCont.push(this.cont[i].ji_hua_wan_cheng_shi_jian)
              dataCont.push(this.cont[i].jin_du)
               dataCont.push(this.cont[i].ren_yuan)
              sunData.push(dataCont)
            }
            this.config.data = sunData
            this.config = { ...this.config
            }
      }
    }
  }
</script>

<style lang="less">
  #scroll-board {
    width: 42%;
    box-sizing: border-box;
    margin-left: 1%;
    height: 100%;
    overflow: hidden;
  }
</style>
