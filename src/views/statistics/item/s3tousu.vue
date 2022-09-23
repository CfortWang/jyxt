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
  import dialogView from '../properties/s3tousuPro.vue'
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
        default:"s3tousu"
      },
      click:{
        type:String,
        default:'true'
      },
    },
    data () {
      return {
        title:'投诉率',
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

        let beginInof = Number(this.data.t_complaintBegin.number)
        let endInof = Number(this.data.t_complaintEnd.number)
        let s3tousu = echarts.init(document.getElementById(this.id))
        let beingDate=this.data.t_complaintBegin.date
        let endDate=this.data.t_complaintEnd.date
        var option;
       option = {
         rotate: {
            min: -90,
            max: 90
          },
          grid: {
                top: '20%',
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
          title: {
             text: this.title,
             subtext: '    '+this.data.t_complaintBegin.date+'-'+this.data.t_complaintEnd.date,
           },
         xAxis: {
           type: 'category',
           data: ['投诉总数','投诉总数']
         },
         yAxis: {
           max:this.data.t_complaintBegin.number>this.data.t_complaintEnd.number?this.data.t_complaintBegin.number+1:this.data.t_complaintEnd.number+1,
           min:0,
           type: 'value',
           minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
         },
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

             itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = [
                              '#F0805A','#B5C334','#FCCE10','#E87C25','#27727B',
                               '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                               '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },
                    }
                },

             data: [
               {
                 value:this.data.t_complaintBegin.number,
                 itemStyle: {
                   color: '#61a0a8'
                 }

               },
               this.data.t_complaintEnd.number,
             ],
             type: 'bar',
             barWidth:50
           }
         ]
       };

       option && s3tousu.setOption(option);
      }
    }
  }
</script>
<style scoped>
  #s3tousu:hover{
    transition: all 0.5s;
    transform:scale(1.03);
  }
  .statisticsPage{
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     float: left;
  }
</style>
