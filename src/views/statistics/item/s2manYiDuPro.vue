<template>
  <div @click="toDetailed()" class="statisticsPage" :style="{width:width}">
    <div id="s2manYiDuPro" :style="{height:height}"/>
    <!-- 打开详情弹窗-->
    <div v-if="dialogOff">
      <dialogView
        :dialogOff = "dialogOff"
        @close = "close"
        :title="title"
        :data="data"
      />
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {GetPercent,GetMax} from  '../js/config.js'
  import dialogView from '../properties/s2manYiDuPro.vue'

  export default {
    components:{
      dialogView
    },
    props: {
      data: {
        type: Object,
      },
      width:{
        type:String,
        default:"20%"
      },
      height:{
        type:String,
        default: window.screen.height/4+"px"
      },
      id:{
        type:String,
        default:"s2manYiDu"
      },
      click:{
        type:String,
        default:'true'
      },
    },
    data () {
      return {
        title:'客户满意度',
        dialogOff:false,
      }
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      close(){
        this.dialogOff = false
      },
      /* 跳转统计页面*/
      toDetailed(){
        if(this.click == "true"){
        this.dialogOff = true
       }
      },
      drawLine(){
        let s2manYiDu = echarts.init(document.getElementById(this.id))

        // let beginInof = GetPercent(Number(this.data.t_myddcBegin.number),Number(this.data.t_myddc2Begin.number))
        // let endInof = GetPercent(Number(this.data.t_myddcEnd.number),Number(this.data.t_myddc2End.number))

        // let data1 = [];
        //         data1.push(this.data.t_myddc1Begin.number);
        //         data1.push(this.data.t_myddc1End.number);
        //         data1.push(this.data.t_myddc2Begin.number);
        //         data1.push(this.data.t_myddc2End.number);
        //         data1.push(this.data.t_myddc3Begin.number);
        //         data1.push(this.data.t_myddc3End.number);
        //         data1.push(this.data.t_myddc4Begin.number);
        //         data1.push(this.data.t_myddc4End.number);
        //         data1.push(this.data.t_myddc5Begin.number);
        //         data1.push(this.data.t_myddc5End.number);
        //         data1.push(this.data.t_myddc6Begin.number);
        //         data1.push(this.data.t_myddc6End.number);

        //         let data3 = [];
        //         data3.push(this.data.t_myddcBegin.date+"技术水平");
        //         data3.push(this.data.t_myddcEnd.date+"技术水平");
        //         data3.push(this.data.t_myddcBegin.date+"检测效率满意度");
        //         data3.push(this.data.t_myddcEnd.date+"检测效率满意度");
        //         data3.push(this.data.t_myddcBegin.date+"工作态度");
        //         data3.push(this.data.t_myddcEnd.date+"工作态度");
        //         data3.push(this.data.t_myddcBegin.date+"检测准确性");
        //         data3.push(this.data.t_myddcEnd.date+"检测准确性");
        //         data3.push(this.data.t_myddcBegin.date+"报告完成率");
        //         data3.push(this.data.t_myddcEnd.date+"报告完成率");
        //         data3.push(this.data.t_myddcBegin.date+"检测效率");
        //         data3.push(this.data.t_myddcEnd.date+"检测效率");
        
        // let barData = []
        // for (let i = 0; i < this.data.t_khmydtjbNum.date.length; i++) {
          let e=[this.data.t_khmydtjbNum.number[0],this.data.t_khmydtjbNum.numberAll[0],this.data.t_khmydtjbNum.res[0]]
        //   barData.push(e)
        // }
        console.log(e,'e')
        let beingDate=this.data.t_myddc2Begin.date
        let endDate=this.data.t_myddc2End.date
        var option = {
          legend: {},
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
              // formatter: function (params) {
              //   return params[0].data[0] + '<br/>满意份数：' + params[0].data[1] + '<br/>调查总份数: ' + params[0].data[2];
              // }
            },
            // dataset: {
            //   source: barData
            // },
            xAxis: { type: 'category',data:['满意份数', '调查份数', '满意度']},
            yAxis: [
              {
                type: 'value',
                scale: true,
                name: '份数',
                max: this.data.t_khmydtjbNum.number[0]>this.data.t_khmydtjbNum.numberAll[0]?this.data.t_khmydtjbNum.number[0]+1:this.data.t_khmydtjbNum.numberAll[0]+1,
                min: 0,
                // boundaryGap: [0.2, 0.2]
              },
              {
                type: 'value',
                scale: true,
                name: '满意度',
                max: this.data.t_khmydtjbNum.res[0],
                min: 0,
                axisLabel: {
                  formatter: '{value} %'
                }
              }
            ],
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            // series: [{ type: 'bar' }],
            series: [
              {
                data: e,
                type: 'bar',
                itemStyle: {
                  color: '#66CCCC'
                },
                label: {
                  show: true,
                  position: 'top'
                },
              }
            ],
            grid: {
              top: '20%',
              left: '3%',
              right: '4%',
              bottom: '10%',
              containLabel: true
            },
            title: {
              text: this.title,
              subtext: "        "+endDate+"年度"
            },
        //     grid: {
        //         top: '20%',
        //         left: '3%',
        //         right: '4%',
        //         bottom: '10%',
        //         containLabel: true
        //     },
        // title: [
        //   {
        //    text: this.title,
        //    subtext: this.data.t_myddcBegin.date+"-"+this.data.t_myddcEnd.date+"年数据统计"
        //   }
        // ],
        // polar: {
        //   radius: [15, '90%']
        // },
        // angleAxis: {
        //   max: GetMax(data1)+0.1,
        //   startAngle: 75
        // },
        // radiusAxis: {
        //   type: 'category',
        //   data: data3
        // },
        // tooltip: {
        //               formatter: function (datas) {
        //                   var res=datas.name+': '+((datas.value-0.01)*100).toFixed(2)+"%"
        //                   return res
        //               }
        //           },
        // series: {
        //   itemStyle:{
        //     normal:{
        //       color:function(params){
        //         var colorList = [
        //           '#FE8463','#9BCA63','#FCCE10','#E87C25','#27727B',
        //            '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
        //            '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
        //         ];
        //         return colorList[params.dataIndex%4];
        //       }
        //     }
        //   },
        //   type: 'bar',
        //   data: data1,
        //   coordinateSystem: 'polar',
        //   label: {
        //     show: true,
        //     position: 'middle',
        //     formatter: function(a,b,c){
        //       return '{b}: {c}'
        //     }
        //   }
        // }
        };

       option && s2manYiDu.setOption(option);
      }
    }
  }
</script>
<style scoped>
  #s2manYiDu:hover{
    transition: all 0.5s;
    transform:scale(1.03);
  }
  .statisticsPage{
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     float: left;
  }
</style>
