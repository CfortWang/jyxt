<template>
  <banLi :visible='visible'>
  <!--  <template v-if="readonlyText">
      <div :class="isTable ? '' : dataModel ? 'ibps-field-text' :'ibps-field-text-no'">{{ dataModel||'/'}} </div>
    </template> -->

    <template v-slot:form>
      <!-- 表头按钮-->
      <div class="form-toolbar hidden-print">
        <div class="ibps-toolbar">
          <div class="header" style="height: 30px;">
            <div class="buttons" style="float: right;margin-right:8%;">
              <!-- <ibps-toolbar ref="toolbar" :actions="toolbars" @action-event="handleActionEvent" /> -->
                <el-button type="primary" icon="ibps-icon-send" @click="confirmSubmit(type='Submit')">提 交</el-button>
                <el-button type="primary" icon="ibps-icon-save" @click="confirmSubmit(type='Save')">保 存</el-button>
                   <el-button icon="el-icon-circle-close" type="danger" @click="closeDialog()">关 闭</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 表头内容-->
     <div class="form-header">
       <div class="title ibps-tc">光谱检测
       </div>
     </div>

     <div class="dynamic-form" :class=" {'jbd-form-cont':!isDialog }">

     <div class="dynamic-form">


      <el-form ref="form" :rules="rules" :element-loading-text="$t('common.loading')" :model="form" label-width="120px">

        <el-row :gutter="25">
          <el-col :span="8">
            <el-form-item label="委托单号:" prop="weiTuoDanHao">
              <el-input v-model="models.jcwt.weiTuoDanHao" placeholder="请输入"  readonly />

            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="预览：" prop="">
              <ibps-link text="委托单" :link="links" show-type="button" text-type="fixed" link-type="javascript"
                text-javascript="" type="primary" form-data="" preview-entrance icon="" />
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <div class="ibps-pb-10">
            <el-alert title="样品信息" description="" type="success" :closable="false" close-text="" icon=""
              effect="light" />
          </div>
        </el-row>

        <el-col :span="24">
          <el-form-item label="" label-width="0" prop="gdyrqcyp">
            <div class="dynamic-form-table">
              <div class="dynamic-form-table__inner panel panel-info">
                <div class="panel-heading ibps-clearfix">
                  <div class="ibps-fl dynamic-form-table__label"></div>
                </div>
                <div class="panel-body">

                  <el-table ref="elTable" :data="source" border stripe>
                    <el-table-column type="selection" width="50" />

                    <el-table-column :key="0" prop="yangPinBianHao">
                      <template slot="header">
                        样品编号
                      </template>
                      <template prop="yangPinBianHao">
                       <!-- <el-form-item  label-width="0px" :class="{
                                'dynamic-form-table-item__readonly':readonly
                              }"> -->
                          <el-input slot-scope="scope" v-model="scope.row.yangPinBianHao" placeholder="请输入" type="text"
                            name="yangPinBianHao" :autosize="autosize" :rows="3" :readonly="readonly" clearable
                            :style="{width:width}" />
                        <!-- </el-form-item> -->
                      </template>
                    </el-table-column>

                    <el-table-column :key="1" prop="yangPinMingChe">
                      <template slot="header">
                        样品名称
                      </template>
                      <template prop="yangPinMingChe">
                       <!-- <el-form-item prop="yangPinMingChe" label-width="0px" :class="{
                        'dynamic-form-table-item__readonly':readonly
                      }"> -->
                          <el-input slot-scope="scope" v-model="scope.row.yangPinMingChe" placeholder="请输入" type="text"
                            name="yangPinMingCheng" :autosize="autosize" :rows="3" :readonly="readonly" clearable
                            :style="{width:width}" />
                        <!-- </el-form-item> -->
                      </template>
                    </el-table-column>


                          <el-table-column :key="2" prop="zhuangTai">
                      <template slot="header">
                        状态
                      </template>
                      <template>
                     <!--   <el-form-item prop="zhuangTai" label-width="0px"
                          :class="{'dynamic-form-table-item__readonly':readonly}"> -->
                          <el-input slot-scope="scope" v-model="scope.row.zhuangTai" placeholder="请输入" type="text"
                           name="zhuangTai"   :autosize="autosize" :rows="3" :readonly="readonly" clearable
                           :style="{width:width}" />
                       <!-- </el-form-item> -->
                      </template>
                    </el-table-column>



                    <el-table-column :key="3" prop="guiGeXingHao">
                      <template slot="header">
                        规格型号
                      </template>
                      <template>
                        <!-- <el-form-item prop="guiGeXingHao" label-width="0px" :class="{
                        'dynamic-form-table-item__readonly':readonly
                      }"> -->
                          <el-input slot-scope="scope" v-model="scope.row.guiGeXingHao" placeholder="请输入" type="text" name="guiGeXingHao"
                            :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                     <!--   </el-form-item> -->
                      </template>
                    </el-table-column>


                    <el-table-column :key="4" prop="shuLiang" width="0px">
                      <template slot="header">
                        数量
                      </template>
                      <template>
                       <!-- <el-form-item prop="shuLiang" label-width="0px" :class="{
                        'dynamic-form-table-item__readonly':readonly
                      }"> -->
                          <el-input slot-scope="scope" v-model="scope.row.shuLiang" placeholder="请输入" type="text" name="shuLiang"
                            :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                       <!-- </el-form-item> -->
                      </template>
                    </el-table-column>
                    <el-table-column :key="5" prop="shengChanRiQiPiHa">
                      <template slot="header">
                        生产日期/批号
                      </template>
                      <template>

                       <!-- <el-form-item prop="shengChanRiQiPiHa" label-width="0px" :class="{
                        'dynamic-form-table-item__readonly':readonly
                      }"> -->
                          <el-input slot-scope="scope" v-model="scope.row.shengChanRiQiPiHa" placeholder="请输入" type="text"
                            name="shengChanRiQiPiHa" :autosize="autosize" :rows="3" :readonly="readonly" clearable
                            :style="{width:width}" />
                      <!--  </el-form-item> -->
                      </template>
                    </el-table-column>
                  </el-table>

                </div>
              </div>
            </div>
          </el-form-item>
        </el-col>

        <div class="ibps-pb-10">
          <el-alert title="标准物质信息" description="" type="success" :closable="false" close-text="" effect="light"
            icon='' />
        </div>
         <!--      <el-form-item label="委托id:" prop="weiTuoId" v-show="false">
          <el-input v-if="!readonly" v-model="models.weiTuoId" />
        </el-form-item> -->
        <el-row :gutter="0" justify="start" align="top" class="widget-col" type="flex">
          <el-col :span="12">
            <el-form-item label="标准物质：　" prop="biaoZhunWuZhi">
              <ibps-link-data v-model="models.biaoZhunWuZhi" template-key="wlgl" placeholder="请选择" :disabled="readonly"
                :readonly="readonly" :readonly-text="readonlyText?'text':'original'" :style="{width:width}" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
          </el-col>
        </el-row>
        <div class="ibps-pb-10">
          <el-alert title="设备信息" description="" type="success" :closable="false" close-text="" icon="" effect="light" />
        </div>
        <el-row :gutter="0" justify="start" align="top" class="widget-col" type="flex">
          <el-col :span="6">
            <el-form-item label="设备编号：　" prop="sheBeiBianHao">
              <ibps-link-data v-model="models.sheBeiBianHao" template-key="yqsbdhknlgl" placeholder="请选择"
                :disabled="readonly" :readonly="readonly" :readonly-text="readonlyText?'text':'original'"
                :style="{width:width}" />
            </el-form-item>
            <el-form-item label="使用前状态：" prop="sheBeiShiYong">
              <el-input v-model="models.sheBeiShiYong" placeholder="请输入" type="text" name="sheBeiShiYong"
                :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="使用后状态：" prop="HouZhuangTai">
              <el-input v-model="models.HouZhuangTai" placeholder="请输入" type="text" name="HouZhuangTai"
                :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="ibps-pb-10">
          <el-alert title="位置信息" description="" type="success" :closable="false" close-text="" icon="" effect="light" />
        </div>
        <el-form-item label="被检测位置：　" prop="beiJianCeWeiZhiTu">
          <ibps-image v-model="models.beiJianCeWeiZhiTu" width="" height="" limit=""
            accept=".jpg,.jpeg,.png,.gif,.bmp,.tif" media="" tip="" size="" upload-type="attachment"
            :disabled="readonly" />
        </el-form-item>


        <el-col :span="24"  >
          <el-form-item label="" label-width="0" prop="ljl">
            <div class="dynamic-form-table">
              <div class="dynamic-form-table__inner panel panel-info">
                <div class="panel-heading ibps-clearfix">
                  <div class="ibps-fl dynamic-form-table__label">检测数据输入</div>
                  <div class="ibps-fr hidden-print">
                    <el-button-group>
                      <el-button
                        :key="0"
                        type="default"
                        icon="import"
                        @click="handleActionEvent('import')"
                      >
                        检测数据导入
                      </el-button>


                        <el-button
                        :key="1"
                        type="default"
                        icon="export"
                        @click="handleActionEvent('export')"
                      >
                        导出检测数据输入模板
                      </el-button>
                     <el-button :key="0" type="primary" icon="add" @click="handleActionEvent('add' )">
                        添加
                      </el-button>
                      <el-button :key="1" type="danger" icon="remove" @click="handleActionEvent('remove')">
                        删除
                      </el-button>

                      <!-- <el-button :key="0" type="primary" icon="add" @click="handleActionEvent({ key: 'add' })">
                        添加
                      </el-button>
                      <el-button :key="1" type="danger" icon="remove" @click="handleActionEvent({ key:'remove'})">
                        删除
                      </el-button> -->
                    </el-button-group>
                  </div>
                </div>
                <div class="panel-body">
                    <!--选择-->

                <!-- <el-table ref="elTable" :data="models.gpljlb" border stripe> -->
                    <el-table ref="elTable" :data="models.ljl" border stripe>
                    <el-table-column type="selection" width="8"  />

<!--
                        <el-table-column :key="1" prop="xuHao" width="100px">
                      <template slot="header">
                        序号
                      </template>
                      <template>
                        <el-form-item prop="xuHao" label-width="0px" :class="{
                    'dynamic-form-table-item__readonly':readonly
                  }">
                          <el-input v-model="models.xuHao" placeholder="请输入" type="text" name="xuHao"
                            :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                        </el-form-item>
                      </template>
                    </el-table-column> 序号隐藏 -->


                    <el-table-column :key="3" prop="jianCeXiangMu" width="100px">
                      <template slot="header">
                        检测项目
                      </template>

                      <template  slot-scope="scope">
                        <el-form-item prop="jianCeXiangMu" label-width="0px" :class="{
                        'dynamic-form-table-item__readonly':readonly
                      }">
                          <el-input
                            v-model="scope.row.jianCeXiangMu"
                           placeholder="请输入" type="text" name="jianCeXiangMu"
                            :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                        </el-form-item>
                      </template>
                    </el-table-column>


                    <el-table-column :key="4" prop="danWei" width="100px">
                      <template slot="header">
                        单位
                      </template>
                      <template  slot-scope="scope">
                        <el-form-item prop="danWei" label-width="0px" :class="{
                          'dynamic-form-table-item__readonly':readonly
                        }">
                          <el-input v-model="scope.row.danWei" placeholder="请输入" type="text" name="danWei"
                            :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                        </el-form-item>
                      </template>
                    </el-table-column>


                 <el-table-column :key="5" prop="jianCeJieGuo" width="100px">
                      <template slot="header">
                        检测结果
                      </template>
                      <template slot-scope="scope">
                        <el-form-item prop="jianCeJieGuo" label-width="0px" :class="{
                            'dynamic-form-table-item__readonly':readonly
                          }">
                          <el-input v-model="scope.row.jianCeJieGuo" placeholder="请输入" type="text" name="jianCeJieGuo"
                            :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                        </el-form-item>
                      </template>
                    </el-table-column>


                        <el-table-column :key="6" prop="jianCeJieGuoEr" width="100px">
                      <template slot="header">
                        标准参考值
                      </template>
                      <template  slot-scope="scope">
                        <el-form-item prop="jianCeJieGuoEr" label-width="0px" :class="{
                          'dynamic-form-table-item__readonly':readonly
                        }">
                          <el-input v-model="scope.row.jianCeJieGuoEr" placeholder="请输入" type="text" name="jianCeJieGuoEr"
                            :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                        </el-form-item>
                      </template>
                    </el-table-column>


                    <el-table-column :key="7" prop="pingJuZhi" width="100px">
                      <template slot="header">
                        平均值
                      </template>
                      <template  slot-scope="scope">
                        <el-form-item prop="pingJuZhi" label-width="0px" :class="{
                          'dynamic-form-table-item__readonly':readonly
                        }">
                          <el-input v-model="scope.row.pingJuZhi" placeholder="请输入" type="text" name="pingJuZhi"
                            :autosize="autosize" :rows="3" :readonly="readonly" clearable :style="{width:width}" />
                        </el-form-item>
                      </template>
                    </el-table-column>


                  </el-table>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-col>

        </el-row>
      </el-form>
</div>
</div>
      </el-form>
    </template>

  </banLi>
</template>




<script>
  import {
    validateRequired
  } from '@/utils/validate' //参数校验
  import IbpsUserSelector from '@/business/platform/org/selector' //用户 /组织 / 岗位选择框
  import IbpsAttachment from '@/business/platform/file/attachment/selector' //文件选择框
  import banLi from '@/components/jbd-edit' //编辑对话框
  import relevanceTable from '@/business/platform/form/formrender/dynamic-form/mixins/relevanceTable' //表头懒加载
  import StatisOrRecordTable from '@/business/platform/form/formrender/dynamic-form/mixins/StatisOrRecordTable.vue'
  import IbpsAutoNumber from '@/business/platform/system/identity/auto-number' //流水号
  import IbpsLinkData from '@/business/platform/data/templaterender/link-data'
  import IbpsLink from '@/components/ibps-link'
  import IbpsImage from '@/business/platform/file/image'
  import { getNextIdByAlias } from '@/api/platform/system/identity'

  import { selectById } from '@/api/detection/universalCRUD.js'//查询回显数据
  import { upOrAdd } from '@/api/detection/guangpu.js'//提交

  export default {
    components: {
      getNextIdByAlias,
       banLi,
      'ibps-auto-number': IbpsAutoNumber,
      'ibps-link-data': IbpsLinkData,
      'ibps-link': IbpsLink,
      'ibps-image': IbpsImage
    },
    props: {
      id: String,
      openType: String,
      visible: Boolean,

    },
    data() {
      return {
        source:null,
        sources:null,
        dataModel: this.value,
        formName: 'form',
        formLabelWidth: '120px',
        dialogVisible: this.visible,
        dialogLoading: false,
        links:"resolve([{event:'afterSubmit',logic:`resolve({openType:'dialog',url:'${options.reportPash.replace('show','pdf')}39样品管理系统/GDYR-CX11-R01A 检测委托单.rpx&id_=${options.formData.models.jcwt.id}'});` }])",//暂时id
        defaultForm: {},
        defaulRules: {},
        gdyrqcyp: {},




        models: {
          ljl:[{
               id:'',
               jianCeXiangMu:'',
               danWei:'',
               jianCeJieGuo:'',
               jianCeJieGuoEr:'',
               pingJuZhi:'',
               }],
          jianCe:[{
           id:'',
          }],




          // Gpjc:[{"weiTuoDanHao":'',
          // //"weiTuoDanHao": "",
          // "sheBeiShiYongQian": "完好",
          // "HouZhuangTai": "完好",
          // "biaoZhunWuZhi": "",
          // "sheBeiBianHao": "",
          // "beiJianCeWeiZhiTu": ""}],
          jcwt:{"weiTuoDanHao":'',
                 "weiTuoId": "", },
          // jcwt:{
          //   "weiTuoDanHao":'',
          //   "id": "",
          //   "weiTuoId": "",
          //   "qiWangWanChengShi": "",
          //   "nengLiFanWei": "",
          //   "createTime": "",
          //   "weiTuoDanHao": "",
          //   "baoGaoBianHao": "",
          //   "biaoZhunWuZhi": "",
          //   "sheBeiBianHao": "",
          //   "beiJianCeWeiZhiTu": "",
          // },
             "title":'',

           "sheBeiShiYong": "完好",
           "HouZhuangTai": "完好",
           "beiJianCeWeiZhiTu":"",

             yangPin: [{
            "id":'',
            "parentId":'',
            "yangPinMingChe": '',
            "yangPinBianHao": '',
            "zhuangTai":'',
           "shuLiang":''
          }],
        },
        form: {
          //weiTuoDanHao: '',
          id: ''
        },
        rules: {
          // id: [{ required: true, message: this.$t('validate.required') }, { validator: validateKey, trigger: 'blur' }],
        },
        toolbars: [{
          key: 'save',
          hidden: () => {
            return this.readonly
          }
        }, ],
      }
    },

    created() {
      if(this.openType=='edit'){
       let data={id:this.id,"type":"GPJC"}
       let    a="{data:'"+JSON.stringify(data)+"'}"
        selectById('sysjcwtdb','selectById',a).then(response => {
            let dbData = response.variables.data
            Object.assign(this.models,dbData)
             this.source=dbData.yangPin
             console.log("dt",dbData)
             console.log("lj",dbData.ljl)
             this.sources=dbData.ljl

        })
        this.toolbars.push( { key: 'cancel' })
      }
    },


    methods: {
      //生成报告编号
      // init(){
      //   console.log("lllll")
      //   getNextIdByAlias({
      //     alias:"yrjcbg"
      //   }).then(response => {
      //     let result = response.data
      //     console.log("result",result)
      //     this.models.baoGaoBianHao=result
      //   }).catch((e) => {console.log(e)})
      // },

     // 提交
      confirmSubmit(type){
         console.log("进了")

       // let b=this.models.beiJianCeWeiZhiTu//.toString()
       //    let c=JSON.stringify(b)
       //  console.log("b",c)
         let a     // "true" 提交按钮  "false" 保存
         let leixin
         if(type=='Submit'){
             a="true"
             leixin="提交成功！"
         }else{
            a="false"
             leixin="保存成功！"
         }
        let data={
           userId:this.$store.getters.userInfo.user.id,
           userName:this.$store.getters.userInfo.user.name,
          Gpjc:[{ //id:this.this.models.jianCe.id,
                  weiTuoId:this.models.jcwt.id,
                  weiTuoDanHao:this.models.jcwt.weiTuoDanHao,
                  biaoZhunWuZhi:this.models.biaoZhunWuZhi,
                  sheBeiBianHao:this.models.sheBeiBianHao,
                  sheBeiShiYong:this.models.sheBeiShiYong,
                  houZhuangTai:this.models.HouZhuangTai,
                  beiJianCeWeiZ:this.models.beiJianCeWeiZhiTu,//c,//this.models.beiJianCeWeiZhiTu
          }],
           // Gpljl:this.models.gpljlb,
            Gpljl:this.models.ljl,
           jcwt:[this.models.jcwt],
           confirm:a
           }
            let params = "{data:'"+JSON.stringify(data)+"'}"

         upOrAdd('gpjc','upOrAdd',params).then(response => {
                 this.$emit('close', false)
                   this.$message(leixin)
                   this.$emit('loadData')
         })
      },
      // handleActionEvent({
      //   key
      // }) {
      //   switch (key) {
      //     case 'save':
      //       this.handleSave()
      //       break
      //     case 'cancel':
      //       this.closeDialog()
      //       break
      //     default:
      //       break
      //   }
      // },
      // closeDialog() {
      //   this.$emit('close', false)
      // },

      // 取消按钮 , 调用父组件关闭当前对话框，同时刷新当前表单页
      closeDialog() {
        this.$emit('close', false)
        this.$refs[this.formName].resetFields()
      },
      /**
       * 表单验证
       */
      formValidate() {
        if (this.readonly) return
        this.$nextTick(() => {
          this.$refs[this.formName].validate(() => {})
        })
      },
      // 保存数据
      handleSave() {
        this.$refs[this.formName].validate(valid => {
          if (valid) {
            this.saveData()
          } else {
            ActionUtils.saveErrorMessage()
          }
        })
      },
      // 提交保存数据
      saveData() {

        save(this.form).then(response => {
          this.$emit('callback', this)
          ActionUtils.saveSuccessMessage(response.message, (rtn) => {
            if (this.$utils.isEmpty(this.formId)) {
              this.$refs[this.formName].resetFields()
            }
            if (rtn) {
              this.closeDialog()
            }
          })
        }).catch((err) => {

        })
      },
      // 关闭当前窗口
      closeDialog() {
        this.$emit('close', false)
        this.$refs[this.formName].resetFields()
      },
      /**
       * 获取表单数据
       */
      getFormData() {
        if (this.readonly) {
          this.rules = {}
        } else {
          this.rules = this.defaulRules
        }
        if (this.$utils.isEmpty(this.formId)) {
          // 重置表单
          this.form = JSON.parse(JSON.stringify(this.defaultForm))
          this.formValidate()
          return
        }
        this.dialogLoading = true
        get({
          id: this.formId
        }).then(response => {
          this.form = response.data
          this.dialogLoading = false
        }).catch(() => {
          this.dialogLoading = false
        })
      },
      handleActionEvent(type){
            switch (type) {
              case 'add':
                console.info('新增')
                // 为表格增加数据
                // if(!(this.models.ljl && Array.isArray(this.models.ljl))){
                 // this.models.ljl = []
                // }
               // this.models.lj1 = []
                this.models.ljl.push({
                  id:'',
      weiTuoDanHao:'',
      baoGaoBianHao:'',
      parentId:'',
      jianCeWeiZhi:'',
      jianCeXiangMu:'',
      danWei:'',
      jianCeJieGuo:'',
      jianCeJieGuoEr:'',
      pingJuZhi:''
                })

                break
              case 'edit':
                console.info('修改')
                break
              case 'remove':
                console.info('删除')
                break
              case 'import':
                console.info('导入')
                break
              case 'export':
                console.info('导出')
                break
              case 'custom':
                // 新增自定义对话框按钮
                break
              default:
                break
            }
          }

      // handleActionEvent({
      //   key
      // }) {

      //   switch (key) {
      //     case 'add':
      //       //console.info('新增')
      //       // 为表格增加数据
      //       if(!(this.models.ljl && Array.isArray(this.models.ljl))) {
      //         this.models.ljl = []
      //        }
      //       this.models.ljl.push({
      //         id: '',
      //        // weiTuoDanHao: '',
      //       //  baoGaoBianHao: '',
      //        // parentId: '',
      //        // jianCeWeiZhi: '',
      //         jianCeXiangMu: '',
      //         danWei: '',
      //         jianCeJieGuo: '',
      //         jianCeJieGuoEr: '',
      //         pingJuZhi: ''
      //       })

      //       break
      //       // case 'edit':
      //       //   console.info('修改')
      //       //   break
      //       // case 'remove':
      //       //   console.info('删除')
      //       //   break
      //       case 'import':
      //         console.info('导入')
      //         break
      //       case 'export':
      //         console.info('导出')
      //         break
      //     case 'cancel':
      //       this.closeDialog()
      //       break
      //       // case 'custom':
      //       //   // 新增自定义对话框按钮
      //       //   break
      //     default:
      //       break
      //   }
      // },


    }

  }
</script>
<style  lang="scss">
  .jbd-title-cont{
    text-align: left;
    font-weight: bold;
    background-color: #FFFFFF !important;
    width: 100;
    font-size: 18px;
    }
    .form-header {
      border-bottom: 1px solid #2b34410d;
      margin-bottom: 5px;
      .title {
        font-weight: bold;
        font-size:22px;
        font-family: SimHei;
        color: #222;
        text-align: left;
        padding: 8px 10px 10px;
        margin: 0;
      }
    }
.el-form--label-left .el-form-item__label{
  padding-left:42px;
  text-align: left;
}


</style>
