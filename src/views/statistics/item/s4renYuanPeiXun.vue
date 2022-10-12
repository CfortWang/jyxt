<template>
  <div @click="toDetailed()" class="statisticsPage" :style="{width:width}">
    <div :id="id" :style="{height:height}"/>
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
  import dialogView from '../properties/s4renYuanPeiXunPro.vue'

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
        default:"s4renyuanPeiXun"
      },
      click:{
        type:String,
        default:'true'
      },
    },
    data () {
      return {
        title:'人员培训',
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
        let s4renYuanPeiXun = echarts.init(document.getElementById(this.id))

        let beginInof = GetPercent(Number(this.data.t_rypxjlnkBegin.number),Number(this.data.t_ryndpxjhBegin.number))
        let endInof = GetPercent(Number(this.data.t_rypxjlnkEnd.number),Number(this.data.t_ryndpxjhEnd.number))

         let data1 = [];
         data1.push(this.data.t_ryndpxjhBegin.number);
         data1.push(this.data.t_ryndpxjhEnd.number);
         let data2 = [];
         data2.push(this.data.t_rypxjlnkBegin.number);
         data2.push(this.data.t_rypxjlnkEnd.number);
         let data3 = [];
         data3.push(this.data.t_rypxjlnkBegin.date);
         data3.push(this.data.t_rypxjlnkEnd.date);

         var option;
       option = {
          title: {
            text: this.title,
            subtext: this.data.t_rypxjlnkBegin.date+"-"+this.data.t_rypxjlnkEnd.date+"年培训次数"
          },
          tooltip: {
                 trigger: 'axis',
                 axisPointer: {
                   type: 'shadow'
                 },
                 formatter: function (datas) {
                     var res='计划:'+datas[0].value+"<BR>"
                     res+='记录:'+datas[1].value+"<BR>"
                     res+='百分比:'+(datas[0].value==null||datas[0].value==0?"0.00":(datas[1].value/datas[0].value*100).toFixed(2))+"%"
                     return res
                 }
          },
          legend: {show:false},
           grid: {
                top: '20%',
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
          xAxis: {
            type: 'category',
            data: data3
            
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          series: [

            {
              name: ['计划'],
              type: 'bar',
              data: data1,
              itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = [
                              '#FE8463','#9BCA63','#FCCE10','#E87C25','#27727B',
                               '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                               '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },
                    }
                },
            },
            {
              name: ['记录'],
              type: 'bar',
              data: data2,
              itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = [
                              '#E87C25','#FAD860','#FCCE10','#E87C25','#27727B',
                               '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                               '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },
                    }
                },
            }
          ]
        };


       option && s4renYuanPeiXun.setOption(option);
      }
    }
  }
</script>
<style scoped>
  #s4renyuanPeiXun:hover{
    transition: all 0.5s;
    transform:scale(1.03);
  }
  .statisticsPage{
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     float: left;
  }
</style>
