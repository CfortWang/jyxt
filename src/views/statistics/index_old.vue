<template>
  <el-scrollbar ref="scrollDiv" :style="{height:height}">
  <div class="statistics">
     <div class="editDate">
       <div class="block">
        <span class="demonstration">开始:</span>
        <el-date-picker v-model="BeginDate" type="year" size="mini" value-format="yyyy" format="yyyy年"  style="width: 96px;"
          :clearable="false" @change="checkYear(BeginDate,'begin')" placeholder="选择日期">
        </el-date-picker>
      </div>

      <div class="block">
        <span class="demonstration">结束:</span>
        <el-date-picker v-model="endDate" type="year" size="mini" value-format="yyyy" format="yyyy年"  :clearable="false" style="width: 96px;"
          @change="checkYear(endDate,'end')" placeholder="选择日期">
        </el-date-picker>
      </div>

      <div class="block">
        <el-button type="primary" size="mini" plain @click="selectAll">
          查询
        </el-button>
      </div>

      </div>

      <div class="componentsData" v-if="relOf">
        <s1zhiLiangMuBiao :width="static=='row' ? '20%': '100%'"
        v-if="showAll || showComponents[1]"/>
        <s1zhiLiang1 :width="static=='row' ? '20%': '100%'"
        v-if="showAll || showComponents[2]"    />
        <s1zhiLiang2 :width="static=='row' ? '20%': '100%'"
        v-if="showAll || showComponents[3]"   />
        <s1zhiLiang3 :width="static=='row' ? '20%': '100%'"
        v-if="showAll || showComponents[4]"  />
        
        <s1jianCe :width="static=='row' ? '20%': '100%'"
        v-if="showAll || showComponents[5]" :data = "getS1jianCe()" />
         
        <s3tousu :width="static=='row' ? '20%': '100%'"
        v-if="showAll || showComponents[6]" :data = "getS3tousu()"/>
        <s2manYiDu :width="static=='row' ? '20%': '100%'"
        v-if="showAll || showComponents[7]"  :data = "getS2manYiDu()"/>
        <s4renYuanPeiXun :width="static=='row' ? '20%': '100%'"
        v-if="showAll || showComponents[8]" :data = "getS4renYuanPeiXun()"/>
        <s5renYuanJianDu :width="static=='row' ? '20%': '100%'"
        v-if="showAll || showComponents[9]" :data = "getS5renYuanJianDu()"/>
        <none :width="static=='row' ? '20%': '100%'"
        />
        <s6sheBeiWeiHu :width="static=='row' ? '20%': '100%'"
        v-if="showAll || showComponents[10]" :data = "getS6sheBeiWeiHu()"/>
        <s8sheBeiHeCha :width="static=='row' ? '20%': '100%'"
        v-if="showAll || showComponents[11]" :data = "getS8sheBeiHeCha()"/>
        <s7sheBeiJiaoZhun :width="static=='row' ? '20%': '100%'"
        v-if="showAll || showComponents[12]" :data = "getS7sheBeiJiaoZhun()"/>
     </div>


  </div>
  </el-scrollbar>
</template>

<script>

  import s1zhiLiangMuBiao from './item/s1zhiLiangMuBiao.vue'
  import s1zhiLiang1 from './item/s1zhiLiang1.vue'
  import s1zhiLiang2 from './item/s1zhiLiang2.vue'
  import s1zhiLiang3 from './item/s1zhiLiang3.vue'
  
  import s1jianCe from './item/s1jianCe.vue'
  import s2manYiDu from './item/s2manYiDu.vue'
  import s3tousu from './item/s3tousu.vue'
  import s4renYuanPeiXun from './item/s4renYuanPeiXun.vue'
  import s5renYuanJianDu from './item/s5renYuanJianDu.vue'
  import s6sheBeiWeiHu from './item/s6sheBeiWeiHu.vue'
  import s7sheBeiJiaoZhun from './item/s7sheBeiJiaoZhun.vue'
  import s8sheBeiHeCha from './item/s8sheBeiHeCha.vue'
  import none from './item/none.vue'

  import { DBData ,getConfig} from './js/selectDB.js'
  import sendDatas from './sendDatas.js'
  import repostCurd from '@/business/platform/form/utils/custom/joinCURD.js'
  export default {
    components:{
      none,
      s1zhiLiang1,
      s1zhiLiang2,
      s1zhiLiang3,
      s1zhiLiangMuBiao,
      s1jianCe,
      s2manYiDu,
      s3tousu,
      s4renYuanPeiXun,
      s5renYuanJianDu,
      s6sheBeiWeiHu,
      s7sheBeiJiaoZhun,
      s8sheBeiHeCha
    },
    props:{
    shows:{ //传入的内容显示序号
        type: Array,
        default:() => []
      },
    static:{ //显示类型，默认为横向   ,作为表单统计图的外部引用为 line
        type: String,
        default:'row'
      }
   },
    mixins: [sendDatas],
    mounted() {
      /*以shows是否有参数来判断， 是否需要仅显示部分子组件*/
      if(this.shows.length>0){
        this.showAll=false
        this.isShowComponents()
      }
      /* 开始及结束时间的默认设置*/
      if (!this.BeginDate && !this.endDate) {
        this.BeginDate = this.getDate(1) + ''
        this.endDate = this.getDate(0) + ''
      }
      this.getConfigData() //获取统计的配置
    },
    data() {
      return {
        height:(window.screen.height-200)+"px",
        BeginDate: '',
        endDate: '',
        relData: {},
        relOf: false,
        selectEnd: '',
        selectBeg: '',
        showAll:true,
        timer: '',
        showComponents:{}//显示全部统计子组件 , 若有新增，往后累计。 供动态表单进行查阅使用。
      }
    },
     beforeDestroy() {
          clearInterval(this.timer);
        },
    methods: {
      /* 判断是否统计子组件中传递过来的，是否需要隐藏。若需要则进行隐藏的遍历  */
      isShowComponents(){
        /* 将参数进行显示 */
          for(let i=0;i<this.shows.length;i++){
            this.showComponents[this.shows[i]] = true
          }
      },
      /* 查询统计配置中的完成率*/
      getConfigData() {
        repostCurd('sql', getConfig()).then(response => {
          this.config = response.variables.data //结果一定存在第0个，因为只有一条数据
          this.getData(this.BeginDate, this.endDate, true)
        })
      },
      /* 通过拼接的sql进行查询全部数据*/
      getData(beg, end, of) {
        repostCurd('sql', DBData(beg, end)).then(response => {
          this.relData = response.variables.data[0] //结果一定存在第0个，因为只有一条数据
          this.relOf = of
        })
      },
      /* 查询全部*/
      selectAll() {
        /* 上次查询时间不等于当次查询时间，    开始时间不能等于结束时间， 则开始查询。*/
        if ((this.selectEnd != this.endDate || this.selectBeg != this.BeginDate) && this.endDate != this.BeginDate) {
          this.getData(this.BeginDate, this.endDate, false)
          this.selectEnd = this.endDate
          this.selectBeg = this.BeginDate
          /* 延迟刷新*/
          this.timer = setInterval(() => {
            if (!this.relOf) {
              this.relOf = true
              clearInterval(this.timer)
            }
          }, 100);
        } else if (this.endDate == this.BeginDate) {
          this.$message({
            showClose: true,
            message: '年份相等无法进行查询对比',
            type: 'warning'
          });
        }
      },
      /* 年份不得大于当前年份*/
      checkYear(year, data) {
        if (Number(year) > Number(this.getDate(0))) {
          data == 'end' ?
            this.endDate = this.getDate(0) + '' :
            this.BeginDate = this.getDate(0) + ''

          this.$message({
            showClose: true,
            message: '年份不得大于当前年份',
            type: 'warning'
          });
        }
      },
      /* 获取当前年份*/
      getDate(year) {
        year = year || 0
        let nowDate = new Date();
        return nowDate.getFullYear() - year;
      },
    }
  }
</script>
<style lang="scss">
  .statistics {
    .editDate{
      overflow: hidden;
      background-color:rgb(249, 255, 255);

    }
    .block{
      float: left;
      font-size: 14px;
     }
  }
</style>
