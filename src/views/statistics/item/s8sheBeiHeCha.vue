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
  import dialogView from '../properties/s8sheBeiHeChaPro.vue'
  import {GetPercent,GetMax} from  '../js/config.js'
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
        default:"s8sheBeiHeCha"
      },
      click:{
        type:String,
        default:'true'
      },
    },
    data () {
      return {
        title:'设备核查完成率',
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
        let s8sheBeiHeCha = echarts.init(document.getElementById(this.id))
         

          
        let beginInof = GetPercent(Number(this.data.t_sbhcjlbBegin.number),Number(this.data.t_sbhcjhBegin.number))
        let endInof = GetPercent(Number(this.data.t_sbhcjlbEnd.number),Number(this.data.t_sbhcjhEnd.number))
         
         let data1 = [];
         data1.push(this.data.t_sbhcjhBegin.number);
         data1.push(this.data.t_sbhcjhEnd.number);
         let data2 = [];
         data2.push(this.data.t_sbhcjlbBegin.number);
         data2.push(this.data.t_sbhcjlbEnd.number);
         let data3 = [];
         data3.push(this.data.t_sbhcjlbBegin.date);
         data3.push(this.data.t_sbhcjlbEnd.date);
         let max1=GetMax(data1)+1;
         let max2=GetMax(data2)+1;
         let maxVal=max1>max2?max1:max2;
         console.log("max1:",max1,"max2:",max2);
       let option = {
         
          grid: {
                top: '20%',
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
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
        title: {
             text: this.title,
             subtext: this.data.t_sbhcjlbBegin.date+"-"+this.data.t_sbhcjlbEnd.date+"年核查次数"
             //subtext: this.data.t_sbhcjhBegin.date+'完成率为:' + beginInof +'\n'+this.data.t_sbhcjhEnd.date+'完成率为:'+endInof,
        },
        color: ['#003366', '#006699', '#4cabce', '#e5323e'],
           legend: {
             show:false
         },
         xAxis: [
             {
                 type: 'category',
                 axisTick: {show: false},
                 data: data3
             }
         ],
         yAxis:  [
             {
               max:maxVal,
               min:0,
                 type: 'value'
             }
         ] 
         ,
         series: [
            {
                 name: '计划条数',
                 type: 'bar',
                 barGap: 0,
                 data: data1
           },
            {
                 name: '记录条数',
                 type: 'bar',
                 barGap: 0,
                 data: data2
           },
         ]
       };

       option && s8sheBeiHeCha.setOption(option);
      }
    }
  }
</script>
<style scoped>
  #s8sheBeiHeCha:hover{
    transition: all 0.5s;
    transform:scale(1.03);
  }
  .statisticsPage{
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     float: left;
  }
</style>
