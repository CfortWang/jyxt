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
  import dialogView from '../properties/s1zhiLiangMuBiaoPro.vue'

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
        default:"s1zhiLiangMuBiao"
      },
      click:{
        type:String,
        default:'true'
      },
    },
    data () {
      return {
        title:'质量目标',
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
        let s5zhiLiangMuBiao = echarts.init(document.getElementById(this.id))

         let data1 = [];
         data1.push(0);
         data1.push(0);
         let data2 = [];
         data2.push(83);
         data2.push(90);
         let data3 = [];
         data3.push(70);
         data3.push(60);
         let data4 = [];
         data4.push(2021);
         data4.push(2022);
         const posList = [
  'left',
  'right',
  'top',
  'bottom',
  'inside',
  'insideTop',
  'insideLeft',
  'insideRight',
  'insideBottom',
  'insideTopLeft',
  'insideTopRight',
  'insideBottomLeft',
  'insideBottomRight'
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
    options: posList.reduce(function (map, pos) {
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
  verticalAlign: 'center',
  position: 'bottom',
  distance: 0,
  onChange: function () {
    const labelOption = {
      rotate: app.config.rotate,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      position: app.config.position,
      distance: app.config.distance,
      color:'#FE8463'
    };
    myChart.setOption({
      series: [
        {
          label: labelOption
        },
        {
          label: labelOption
        },
        {
          label: labelOption
        },
        {
          label: labelOption
        }
      ]
    });
  }
};
const labelOption = {
  show: true,
  position: app.config.position,
  distance: app.config.distance,
  align: app.config.align,
  verticalAlign: app.config.verticalAlign,
  rotate: app.config.rotate,
  formatter: '{c}  {name|{a}}',
  fontSize: 14,
  rich: {
      name: {
          textBorderColor: '#fff'
      }
  },
  color:'#FE8463'
};
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
            subtext: "2021-2022年质量检测目标"
          },
  color : [
                              '#FE8463','#9BCA63','#FCCE10','#E87C25','#27727B',
                               '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                               '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
                 formatter: function (datas) {
                     var res='投诉处理率:'+datas[0].value+"%<BR>"
                     res+='满意度:'+datas[1].value+"%<BR>"
                     res+='培训完成率:'+datas[2].value+"%"
                     return res
                 }
  },
  legend: {show:false},
  xAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      data: data4,
      textStyle:{color:'#FE8463'},
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
                                  show: true,
                                  textStyle:{color:'#000'},
                                  interval: 'auto',
                                  formatter: '{value} %'
                                  },
    }
  ],
  series: [
    {
      name: '投诉处理率',
      type: 'bar',
      barGap: 0,
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: data1
    },
    {
      name: '满意度',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data:data2
    },
    {
      name: '培训完成率',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data:data3
    }
  ]
};

       option && s5zhiLiangMuBiao.setOption(option);
      }
    }
  }
</script>
<style scoped>
  #s5zhiLiangMuBiao:hover{
    transition: all 0.5s;
    transform:scale(1.03);
  }
  .statisticsPage{
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     float: left;
  }
</style>
