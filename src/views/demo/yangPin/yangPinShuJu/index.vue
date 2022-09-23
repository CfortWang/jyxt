<template>
  <div id="data-view-yangp">
    <!-- 扫码接收的输入框-->
    <el-input
      v-model="facilityId"
      ref="redarInput"
      @change="facilityData(facilityId)"
      style="z-index: -999;"
      ></el-input>

    <dv-full-screen-container>
      <div class="main-header">

        <div class="mh-left">
          <div @click.prevent="toHome()"
                        style="width: 140px;
                           height: 40px;
                           cursor: pointer;
                           text-align:center;
                           color: #FFFFFF;
                           line-height: 40px;
                           font-size: 14px;
                           margin-left:35px;
                           ">
                    <dv-border-box-8>
                            返回首页
                          </dv-border-box-8>
          </div>
        </div>

        <div class="mh-middle">样品流转及数据监控统计</div>
        <div class="mh-right">



        </div>
      </div>

      <dv-border-box-1 class="main-container">
        <div class="mc-top">
          <Top-Left-Cmp />
          <Top-Middle-Cmp />
         <!-- <Top-right-Cmp /> -->



         <!-- 出入库管理-->
         <div>
            <div @click.prevent="openRedar('检验检测')"
                          style="width: 180px;
                            cursor: pointer;
                             text-align:center;
                             color: #FFFFFF;
                             line-height: 50px;
                             ">
                      <dv-border-box-7>
                          检验检测扫码登记
                      </dv-border-box-7>
            </div>
            <dv-decoration-8 :reverse="true" style="width:300px;height:50px;" />
            </br>
            <div @click.prevent="openRedar('待处理')"
                          style="width: 180px;
                            cursor: pointer;
                             text-align:center;
                             color: #FFFFFF;
                             line-height: 50px;
                             ">
                      <dv-border-box-7>
                          检完待处理扫码登记
                      </dv-border-box-7>
            </div>
            <dv-decoration-8 :reverse="true" style="width:300px;height:50px;" />
            </br>
            <div @click.prevent="openRedar('处理')"
                          style="width: 180px;
                            cursor: pointer;
                             text-align:center;
                             color: #FFFFFF;
                             line-height: 50px;
                             ">
                      <dv-border-box-7>
                          样品处理扫码登记
                      </dv-border-box-7>
            </div>
            <dv-decoration-8 :reverse="true" style="width:300px;height:50px;" />
         </div>

         <!-- 扫码操作组件-->

         <div class="popContainer" v-if="redar" @click="remRedar">
              <dv-decoration-12 style="width:150px;height:150px;margin:0 auto;top: 35%;">
                 开启扫描设备连接
              </dv-decoration-12>
         </div>

         <el-dialog
             width="75%"
             :modal-append-to-body='false'
             :visible.sync="visible">
                 <div style="min-height: 600px;">
                   <div style="float: left; font-weight: bold;">需要{{behavior}}操作的样品:</div>
                    <el-button @click="submitData" type="primary" style="float: right;">确认提交</el-button>
                    <el-table
                       :data="listData"
                       stripe
                       style="width: 100%">
                       <el-table-column
                         prop="sheBeiMingCheng"
                         label="设备名称"
                         >
                       </el-table-column>

                       <el-table-column
                         prop="guiGeXingHao"
                         label="规格型号"
                        >
                       </el-table-column>

                       <el-table-column
                         prop="sheBeiShiBieH"
                         label="设备识别号">
                       </el-table-column>

                       <el-table-column
                         prop="sheBeiZhuangTa"
                         label="设备状态">
                       </el-table-column>
                     </el-table>
                 </div>
           </el-dialog>

        </div>

        <!-- 其他统计组件 -->
        <div class="mc-bottom">
          <dv-border-box-6 class="bottom-left-container">
            <dv-decoration-4 class="mcb-decoration-1" style="width:5px;height:45%;" />
            <dv-decoration-4 class="mcb-decoration-2" style="width:5px;height:45%;" />
            <Bottom-Left-Chart-1 />
            <Bottom-Left-Chart-2 />
          </dv-border-box-6>

          <div class="bottom-right-container">
            <Bottom-Right-Table-1 />
            <Bottom-Right-Table-2 />
            <Bottom-Right-Table-3 />
            <Bottom-Right-Table-4 />
          </div>
        </div>
      </dv-border-box-1>

    </dv-full-screen-container>
  </div>
</template>

<script>
import TopLeftCmp from './TopLeftCmp'
import TopMiddleCmp from './TopMiddleCmp'
import TopRightCmp from './TopRightCmp'

import BottomLeftChart1 from './BottomLeftChart1'
import BottomLeftChart2 from './BottomLeftChart2'

import BottomRightTable1 from './BottomRightTable1'
import BottomRightTable2 from './BottomRightTable2'
import BottomRightTable3 from './BottomRightTable3'
import BottomRightTable4 from './BottomRightTable4'
import repostCurd from '../../../../business/platform/form/utils/custom/joinCURD.js'

export default {
  name: 'DataView',
  components: {
    TopLeftCmp,
    TopMiddleCmp,
    TopRightCmp,
    BottomLeftChart1,
    BottomLeftChart2,
    BottomRightTable1,
    BottomRightTable2,
    BottomRightTable3,
    BottomRightTable4
  },
  data () {
    return {
     visible:false,
     redar:false,
     facilityId:'',
     listData:[],
     behavior:''
    }
  },
   methods: {
	  toHome(){
      this.$router.push({
      			name:'dashboard'
      })
		 },
     allView(){
       screenfull.request() //默认显示全屏
     },
     openRedar(type){
       this.behavior = type
       this.redar = true
       this.$refs.redarInput.focus();
        this.listData = []
     },
     remRedar(){
       this.redar = false
     },
     //扫码之后
     facilityData(id){
       if(id){
         for(let item of this.listData){
           if(item.id==id){
             return
             }
                   }
         this.loadData(id)
         //开始查询设备
         this.facilityId = ''
        }
     },
     /* 查询参数格式化*/
     getSearcFormData(id) {
       const params = {}
       params['Q^id_^S'] = id
       return ActionUtils.formatParams(
         params,
        {},
        {},
         )
     },
     // 提交设备
     submitData(){
         this.visible = false
         alert("提交设备 [ "+this.behavior+" ] 信息成功")
       },

     /* 获取数据*/
     loadData(id) {
       if(!id){
         return
       }
     repostCurd('select',
          '{"tableName": "t_ypgl","paramWhere":{"id_":"'+id+'"}}'
              ).then(response => {
                let cont = response.variables.data[0]

                switch(cont.yang_pin_zhuang_t){
                  case '入库':
                    this.addSamRecord(id,cont.yang_pin_bian_hao,cont.yang_pin_ming_che,"检验检测" ) //增加流转记录
                    this.updateSam(id,{yang_pin_zhuang_t:"检验检测"},"检验检测",cont.yang_pin_bian_hao)//修改样品信息
                  break;

                  case '检验检测':
                    this.addSamRecord(id,cont.yang_pin_bian_hao,cont.yang_pin_ming_che,"检完、待处理" ) //增加流转记录
                    this.updateSam(id,{yang_pin_zhuang_t:"检完、待处理",jian_ce_ri_qi_: this.sysTime() + ""},"检完、待处理",cont.yang_pin_bian_hao)//修改样品信息
                  break;

                  case '检完、待处理':
                     this.$confirm('当前状态为 [ '+ cont.yang_pin_zhuang_t +' ] 可进行以下操作', '编号 [ '+cont.yang_pin_bian_hao+' ] 的样品', {
                       cancelButtonText: '继续检验检测',
                       confirmButtonText: '样品处理 / 送还',
                       type: 'warning'
                     }).then(() => {
                       this.addSamRecord(id,cont.yang_pin_bian_hao,cont.yang_pin_ming_che,"检完、处理" ) //增加流转记录
                       this.updateSam(id,{yang_pin_zhuang_t:"检完、处理"},"检完、处理",cont.yang_pin_bian_hao)//修改样品信息
                     }).catch(() => {
                       this.addSamRecord(id,cont.yang_pin_bian_hao,cont.yang_pin_ming_che,"检验检测" ) //增加流转记录
                       this.updateSam(id,{yang_pin_zhuang_t:"检验检测"},"检验检测",cont.yang_pin_bian_hao)//修改样品信息
                     })
                  break;
                  case '检完、处理':
                    this.$message.warning("当前样品状态为: ["+cont.yang_pin_zhuang_t+" ] 无法进行操作！")
                    this.redar = false
                  break;

                   default:
                      this.$message.warning("数据库中没有找到当前样品！");
                      break;

                }
                })

     },
     // 修改样品状态
    updateSam(id,data,state,mun){
       repostCurd('update',
       '{"tableName": "t_ypgl","paramWhere":{"id_":"'+id+'"},"paramCond":'+JSON.stringify(data)+'}'
              ).then((res)=>{
                     this.$alert('<span style="font-size:16px;font-weight: bold;">状态成功变更为 [ <span style="color: #00CC66;">'+ state +'</span> ] ！！!</span>', '编号 [ '+mun+' ] 的样品', {
                              dangerouslyUseHTMLString: true,
                               type: 'success',
                        }).then(() => { this.redar = false }).catch(() => {})
             }).catch((er) => {
                this.$message.error("参数错误，或网络延迟。请联系管理员")
                this.redar = false
             })
    },
    //添加流转记录
    addSamRecord(id,num,name,state){
      let addLiuZhuan = []
      let queRen = {}
      queRen["jing_shou_shi_jia"] = this.sysTime() + "";
      queRen["yang_pin_ming_che"] = name
      queRen["yang_pin_bian_hao"] = num
      queRen["jing_shou_ren_"] = this.$store.getters.userInfo.user.id
      queRen["parent_id_"] = id
      queRen["zhuang_tai_"] = state
      addLiuZhuan.push(queRen)
      repostCurd('add',
      '{"tableName": "t_yplzjl","paramWhere":'+JSON.stringify(addLiuZhuan)+'}'
             )

    },
     sysTime(){
        var myDate = new Date();
        var year = myDate.getFullYear();
        var month = myDate.getMonth()+1;
        var date = myDate.getDate();
        var h = myDate.getHours();
        var m = myDate.getMinutes();
        var s = myDate.getSeconds();
        var now = year + '-' +(month < 10 ? "0" :"")+ month + "-"+((date < 10 ? "0" :"")) +date + " "+((h < 10 ? "0" :"")) + h + ':'+((m < 10 ? "0" :"")) + m + ":"+((s < 10 ? "0" :"")) + s;
        return now;
    },


  }
}
</script>

<style lang="less">
#data-view-yangp {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;
  #dv-full-screen-container {
    background-image: url('./img/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .mh-left {
      font-size: 20px;
      color: rgb(1,134,187);

      a:visited {
        color: rgb(1,134,187);
      }
    }

    .mh-middle {
      font-size: 30px;
    }

    .mh-left, .mh-right {
      width: 450px;
    }
  }

  .main-container {
    height: calc(~"100% - 80px");

    .mc-top, .mc-bottom {
      box-sizing: border-box;
      padding: 30px;
      display: flex;
    }

    .mc-top {
      height: 40%;
    }

    .mc-bottom {
      height: 60%;
    }

    .yp-top-left-cmp, .bottom-left-container {
      width: 35%;
    }

    .yp-top-middle-cmp, .top-right-cmp {
      width: 58%;
    }

    .bottom-left-container {
      position: relative;

      .border-box-content {
        display: flex;
      }

      .mcb-decoration-1, .mcb-decoration-2 {
        position: absolute;
        left: 50%;
        margin-left: -2px;
      }

      .mcb-decoration-1 {
        top: 5%;
        transform: rotate(180deg);
      }

      .mcb-decoration-2 {
        top: 50%;
      }

      .yp-bottom-left-chart-1, .yp-bottom-left-chart-2 {
        width: 50%;
        height: 100%;
      }
    }

    .bottom-right-container {
      width: 68%;
      box-sizing: border-box;
      display: flex;
    }
    .popContainer{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background: rgba(0,0,0,0.7);
    }
  }
}
</style>
