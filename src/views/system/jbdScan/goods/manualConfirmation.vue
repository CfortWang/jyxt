<!-- 样品接收确认 -->
<template>
  <div class="sample-scan">
    <!-- 扫码接收的输入框-->
        <el-input
          v-model="facilityId"
          ref="redarInput"
          @change="facilityData(facilityId)"
          style="z-index: -999;"
          ></el-input>
         <!-- <el-button type="primary" @click="openRedar" >
            測試</el-button> -->
         <!-- 扫码操作组件-->
           <div class="popContainer" v-if="redar" @click="remRedar">
                <dv-decoration-12 style="width:150px;height:150px;margin:0 auto;top: 35%;">
                 <span style=" color: #66D9EF;">开启扫描设备连接-样品接收确认</span>
                </dv-decoration-12>
           </div>
              <el-dialog
               width="90%"
               :modal-append-to-body='false'
               title="      样品手动接收确认操作 - 确认样品数量、存放位置、接样确认状态 - 【位置根据是否留样二选一进行选择】"
               @close="closeDialog"
               :before-close = "handleClose"
               :visible.sync="visible"

               > <!-- 表单是否显示 -->
                   <div style="min-height: 600px;"  @click.self="handleChange">
                     <el-button @click="submitData('确认')" type="primary" style="float: right;margin: 5px;">样品确认</el-button>
                       <el-table
                           :data="listData"
                           stripe
                           style="width: 100%">

                         <el-table-column
                           prop="yang_pin_bian_hao"
                           label="样品编号">
                          </el-table-column>

                         <el-table-column
                           prop="yang_pin_ming_che"
                           label="样品名称">
                         </el-table-column>

                         <el-table-column
                           prop="shou_yang_shu_lia"
                           label="收样数量"
                           width="130px">
                         </el-table-column>

                         <el-table-column
                           label="本次确认数量"
                           width="150px">
                               <template slot-scope="scope">
                                   <el-input-number
                                    v-model="scope.row.jie_yang_shu_lian"
                                    controls-position="right"
                                    @change="handleChange"
                                    :min="1" :max="9999">
                                    </el-input-number>
                                </template>
                         </el-table-column>

                         <el-table-column
                           prop="shi_fou_liu_yang_"
                           label="是否留样"
                           width="100px">
                         </el-table-column>

                         <el-table-column
                           label="样品存放位置"
                           width="230px"
                           >
                            <template slot-scope="scope">
                              <!-- <ibps-link-data
                                v-model="scope.row.shou_yang_wei_zhi"
                                template-key = "mjyphjwzjztzly"
                              /> -->
                              <weizhiData  v-model="scope.row.shou_yang_wei_zhi"/>
                             </template>
                         </el-table-column>

                         <el-table-column
                           label="留样存放位置"
                           width="230px">
                            <template slot-scope="scope">
                              <!-- <ibps-link-data
                                v-model="scope.row.liu_yang_wei_zhi_"
                                template-key = "mjyphjwzjztzly"
                              /> -->
                              <liuyangData v-model="scope.row.liu_yang_wei_zhi_"/>
                             </template>

                         </el-table-column>

                         <el-table-column
                           label="接样确认状态"
                           width="230px">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.jie_yang_zhuang_t" placeholder="请选择">
                                  <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>

                             </template>

                         </el-table-column>

                         <el-table-column label="功能">
                                 <template slot-scope="scope">
                                     <el-button
                                       size="small"
                                       type="danger"
                                       icon="el-icon-delete"
                                       @click="deleteData(scope.row.id_)"
                                     >删除</el-button>
                                 </template>
                               </el-table-column>


                       </el-table>
                   </div>
             </el-dialog>

  </div>
</template>


<script>
import manualConfirmationJS from '../js/manualConfirmationJS.js'
import IbpsLinkData from '@/business/platform/data/templaterender/link-data'
import weizhiData from "./weizhiData.vue"
import liuyangData from "./liuyangData.vue"
 export default {
   components:{
     IbpsLinkData,
     weizhiData,
     liuyangData
   },
   mixins:[manualConfirmationJS],
   props:{scanVisible:Boolean},
   watch:{
    listData: {

           handler(val, oldName) {
            if(val.length>0){
              this.visible = true
              this.redar = false    // 扫描后就让扫描组件隐藏
            }
         },
         deep: true,
         immediate: true
         },
     scanVisible:{
       handler(val, oldName) {
          if(val){
            this.redar = false       // 扫码的组件  一开始先展示
            this.visible = true    // 结果列表   一开始没扫描就不展示

            this.$nextTick(() => {
                this.$refs.redarInput.focus(); //聚焦input
              })
            this.listData = [] //清空列表
          }else{
            this.remRedar()
          }
       },
       deep: true,
       immediate: true
     }
   },
   created() {
     this.facilityData()
   },
  data () {
    return {
     updateNum:1,
     visible:false,
     redar:false,
     facilityId:'',
     listData:[],
     options: [{
               value: '已确认',
               label: '已确认'
             }, {
               value: '未确认',
               label: '未确认'
             }],
      OriginalPosition:[],
      mjwtsqbAllResult:[]

    }
  },

  }
</script>

<style>
 .sample-scan .popContainer{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999999;
      background: rgba(0,0,0,0.7);
  }
</style>
