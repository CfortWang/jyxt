<template>
    <el-dialog
      :visible.sync="visible"
      ref="dialog"
      :title="title+'详情'"
      width="100%"
      lock-scroll
      append-to-body
      fullscreen
      close-on-press-escape
      destroy-on-close
      v-if="visible"
      @close="handleClose">

      <div>

    <el-container>
      <el-aside style="border:0px;width: 13%;"></el-aside>
      <!-- 放统计内容-->
      <el-aside style="border:0px;width: 50%;">
          <s1jianCeItem
            :data="data"
            width="95%"
            :height="height"
            id="s1jianCePro"
            click="false"
          />
      </el-aside>
      
        <!-- 参数页面列 -->
        <el-aside style="border:0px;width: 37%;">
           <div class="dataCont" style="font-size: 14px;">
          <el-divider content-position="left">{{data.t_gdyrqcwtBegin.date}} 年度</el-divider>
            委托检测数 ：<el-tag>{{data.t_gdyrqcwtBegin.number}} 次</el-tag>
            <br>
             <el-divider content-position="left">{{data.t_gdyrqcwt2Begin.date}} 年度</el-divider>
            按期完成检测件数 ：<el-tag>{{data.t_gdyrqcwt2Begin.number}} 次</el-tag>
            <br>
             <el-divider content-position="left">{{data.t_gdyrqcwt3Begin.date}} 年度</el-divider>
            出具报告数 ：<el-tag>{{data.t_gdyrqcwt3Begin.number}} 次</el-tag>
            <br>
             <el-divider content-position="left">{{data.t_gdyrqcwt4Begin.date}} 年度</el-divider>
            逾期未完成数 ：<el-tag>{{data.t_gdyrqcwt4Begin.number}} 次</el-tag>
            <br>
             <el-divider content-position="left">{{data.t_gdyrqcwt5Begin.date}} 年度</el-divider>
            检测结果准确率 ：<el-tag>{{((data.t_gdyrqcwt5Begin.number)*100).toFixed(2)}} %</el-tag>
            <br>
             <el-divider content-position="left">{{data.t_gdyrqcwt6Begin.date}} 年度</el-divider>
            按时完成率 ：<el-tag>{{((data.t_gdyrqcwt6Begin.number)*100).toFixed(2)}} %</el-tag>
            <br>
            <el-divider content-position="left">{{data.t_gdyrqcwtEnd.date}} 年度</el-divider>
            检测总次数 ：<el-tag type="danger">{{data.t_gdyrqcwtEnd.number}} 次</el-tag>
          <br>

                     <el-divider content-position="left">{{data.t_gdyrqcwt2End.date}} 年度</el-divider>
                    按期完成检测件数 ：<el-tag>{{data.t_gdyrqcwt2End.number}} 次</el-tag>
                    <br>
                     <el-divider content-position="left">{{data.t_gdyrqcwt3End.date}} 年度</el-divider>
                    出具报告数 ：<el-tag>{{data.t_gdyrqcwt3End.number}} 次</el-tag>
                    <br>
                     <el-divider content-position="left">{{data.t_gdyrqcwt4End.date}} 年度</el-divider>
                    逾期未完成数 ：<el-tag>{{data.t_gdyrqcwt4End.number}} 次</el-tag>
                    <br>
                     <el-divider content-position="left">{{data.t_gdyrqcwt5End.date}} 年度</el-divider>
                    检测结果准确率 ：<el-tag>{{((data.t_gdyrqcwt5End.number)*100).toFixed(2)}} %</el-tag>
                    <br>
                     <el-divider content-position="left">{{data.t_gdyrqcwt6End.date}} 年度</el-divider>
                    按时完成率 ：<el-tag>{{((data.t_gdyrqcwt6End.number)*100).toFixed(2)}} %</el-tag>
           </div>

        </el-aside>
        
      </el-container>


      </div>
    </el-dialog>
</template>

<script>
  export default {
    props:{
        dialogOff:{ //当前表单示例
            type: Boolean,
            default:false,
          },
        title:{ type:String},
        data:{
          type:Object
        },
        height:{
          type:String,
          default:window.screen.height * 0.75 +'px'
        }
      },
      beforeCreate: function () {
          // 官方文档给出的是require
           this.$options.components.s1jianCeItem = () => import('../item/s1jianCe.vue')
          },

    watch:{
     dialogOff: {
       handler: function(val, oldVal) {
        this.visible = JSON.parse(JSON.stringify(val));
        this.itemShow = true
        },
        immediate: true
      }
    },
    data() {
      return {
        visible:false,
        itemShow:false,

      }
    },
    methods:{
       // 关闭窗口
      handleClose(){
       this.$emit('close', false)
      }
    }
  }
</script>

<style scoped>
  .dataCont{
    border:0px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    height: calc(100vh * 0.85);
    padding:20px;
  }
</style>
