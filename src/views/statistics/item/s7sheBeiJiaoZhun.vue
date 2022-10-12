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
  import dialogView from '../properties/s7sheBeiJiaoZhunPro.vue'
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
        default:"s7sheBeiJiaoZhun"
      },
      click:{
        type:String,
        default:'true'
      },
    },
    data () {
      return {
        title:'设备校准完成率',
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
        let s7sheBeiJiaoZhun = echarts.init(document.getElementById(this.id))
         var posList = [
         'left', 'right', 'top', 'bottom',
         'inside',
         'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
         'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
     ];
     app.configParameters = {
         rotate: {
             min: -90,
             max: 90
         },
         align: {
             options: {
                 left: 'left',
                 center: 'center',
                 right: 'right'
             }
         },
         verticalAlign: {
             options: {
                 top: 'top',
                 middle: 'middle',
                 bottom: 'bottom'
             }
         },
         position: {
             options: echarts.util.reduce(posList, function (map, pos) {
                 map[pos] = pos;
                 return map;
             }, {})
         },
         distance: {
             min: 0,
             max: 100
         }
     };

     app.config = {
         rotate: 90,
         align: 'left',
         verticalAlign: 'middle',
         position: 'insideBottom',
         distance: 15,
         onChange: function () {
             var labelOption = {
                 normal: {
                     rotate: app.config.rotate,
                     align: app.config.align,
                     verticalAlign: app.config.verticalAlign,
                     position: app.config.position,
                     distance: app.config.distance
                 }
             };
             s5renYuanJianDu.setOption({
                 series: [{
                     label: labelOption
                 }, {
                     label: labelOption
                 }, {
                     label: labelOption
                 }, {
                     label: labelOption
                 }]
             });
         }
     };

         var labelOption = {
         show: true,
         position: app.config.position,
         distance: app.config.distance,
         align: app.config.align,
         verticalAlign: app.config.verticalAlign,
         rotate: app.config.rotate,
         formatter: '{c}  {name|{a}}',
         fontSize: 12,
         rich: {
             name: {
                 textBorderColor: '#fff'
             }
         }
        };
        let beginInof = GetPercent(Number(this.data.t_yqsbxzjgBegin.number),Number(this.data.t_ndsbxzjdjhBegin.number))
        let endInof = GetPercent(Number(this.data.t_yqsbxzjgEnd.number),Number(this.data.t_ndsbxzjdjhEnd.number))
        let beingDate=this.data.t_ndsbxzjdjhBegin.date
        let endDate=this.data.t_yqsbxzjgEnd.date
         let data1 = [];
         data1.push("计划");
         data1.push("记录");
         data1.push("计划");
         data1.push("记录");

         let data2 = [];
         data2.push(this.data.t_ndsbxzjdjhBegin.number);
         data2.push(this.data.t_yqsbxzjgBegin.number);
         data2.push(this.data.t_ndsbxzjdjhEnd.number);
         data2.push(this.data.t_yqsbxzjgEnd.number);

       // prettier-ignore
let dataAxis = data1;
// prettier-ignore
let data = data2;
let yMax = 500;
let dataShadow = [];
for (let i = 0; i < data.length; i++) {
  dataShadow.push(yMax);
}
let option = {
   grid: {
                top: '20%',
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
  title: {
    text: this.title,
    subtext: beingDate+"-"+endDate+"年校准次数"
  },
  xAxis: {
    data: dataAxis,
    axisLabel: {
      inside: true,
      color: '#000'
    },
    axisTick: {
      show: true
    },
    axisLine: {
      show: true
    },
    z: 10
  },
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#000'
    }
  },
  dataZoom: [
    {
      type: 'inside'
    }
  ],
  tooltip: {
         trigger: 'axis',
         axisPointer: {
           type: 'shadow'
         },
         formatter: function (datas) {
             let year1 = datas[0].dataIndex==0||datas[0].dataIndex==2;
             var res=(year1?beingDate+':':endDate+':')+datas[0].name+':'+datas[0].value
             return res
         }
  },
  series: [
    {
      type: 'bar',
      showBackground: true,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' }
          ])
        }
      },
      data: data
    }
  ]
};
// Enable data zoom when user click bar.
const zoomSize = 6;
s7sheBeiJiaoZhun.on('click', function (params) {
  console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
  s7sheBeiJiaoZhun.dispatchAction({
    type: 'dataZoom',
    startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
    endValue:
      dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
  });
});

       option && s7sheBeiJiaoZhun.setOption(option);
      }
    }
  }
</script>
<style scoped>
  #s7sheBeiJiaoZhun:hover{
    transition: all 0.5s;
    transform:scale(1.03);
  }
  .statisticsPage{
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     float: left;
  }
</style>
