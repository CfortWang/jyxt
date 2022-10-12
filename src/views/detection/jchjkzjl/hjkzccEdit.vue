<template>
    <edit :visible='visible'>

      <template v-slot:form>

        <!-- 表头按钮-->
        <div class="form-toolbar hidden-print">
          <div class="ibps-toolbar" >
            <div class="header" style="height: 30px;">
              <div class="buttons" style="float: right;margin-right:8%;">


              <el-button type="primary" @click="comfirmCommit()"> 确认提交</el-button>
              <el-button type="primary" @click="saveMe()">✔ 保存</el-button>
              <el-button type="danger" @click="closeDialog()">❌ 关闭</el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- <div :class="{ 'jbd-form' : !isDialog}"> -->
          <div class="jbd-replce"></div>
        <div class="dynamic-form" :class=" {'jbd-form-cont':!isDialog }">

        <div class="dynamic-form">
            <!--表头-->
            <el-form
              ref="form"
              v-loading="!visible"
              :rules="rules"
              :element-loading-text="$t('common.loading')"
              :model="form"
              label-width="180px"
              >
              <el-row  class="row-bg">
                <el-col>
                  <div class="form-header">
                      <div class="title ibps-tc" style="font-size: 18px;">{{title}}</div>
                  </div>
                </el-col>
              </el-row>
              <!--表单 第一行-->
                <el-row :gutter="25">
                    <el-col :span="8">
                      <el-form-item
                        label="参数要求　　　:　"
                        prop=""> /

                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item
                         label="委托单号　　　　:　"
                         prop="id">
                         /
                      </el-form-item>
                    </el-col>


                </el-row>
              <!--表单 第二行-->
                    <el-row :gutter="25">
                        <el-col :span="8">
                          <el-form-item
                            label="部门　　　　　:　"
                            prop="jiLuWeiZhi">
                            <ibps-user-selector
                            v-model="models.huanJing.jiLuWeiZhi"
                            placeholder="请选择"
                            type="org"
                            name="jiLuWeiZhi"
                            :style="{width:width}"/>
                          </el-form-item>
                        </el-col>

                        <el-col :span="8">
                          <el-form-item
                             label="检测项目　　　　:　"
                             prop="jianCeXiangMu">
                            <ibps-link-data
                            v-model="models.huanJing.jianCeXiangMu"
                            template-key="jclxzlyx"
                            placeholder="请选择"


                            :disabled="readonly"
                            :readonly="readonly"
                            :readonly-text="readonlyText?'text':'original'"

                            name="jianCeXiangMu"
                            :autosize="autosize"
                            :style="{width:width}"/>
                          </el-form-item>
                        </el-col>


                    </el-row>

              <!--表单 第三行-->
                    <el-row :gutter="25">
                        <el-col :span="8">
                          <el-form-item
                            label="监控日期　　　:　"
                            prop="huanJingRiQi">
                            <el-date-picker
                              v-model="models.huanJing.huanJingRiQi"
                              placeholder="请输入"
                              type="date"
                              value-format="yyyy-MM-dd"
                              format="yyyy-MM-dd"
                              name="huanJingRiQi"
                              :readonly="readonly"
                              clearable
                              :style="{width:width}"/>
                          </el-form-item>
                        </el-col>


                        <el-col :span="8">
                          <el-form-item
                            label="监控时间　　　　:　"
                            prop="jianKongShiJia">
                            <el-time-picker
                            v-model="models.huanJing.jianKongShiJia"
                            placeholder="请输入"
                            value-format="HH:mm"
                            format="HH:mm"
                            name="jianKongShiJia"
                            :readonly="readonly"
                            clearable
                            :style="{width:width}"/>
                          </el-form-item>
                        </el-col>


                    </el-row>

              <!--表单 第四行-->
                    <el-row :gutter="25">
                        <el-col :span="8">
                          <el-form-item
                            label="检测位置　　　:　"
                            prop="jianCeWeiZhi">
                            <el-input
                              v-model="models.huanJing.jianCeWeiZhi"
                              placeholder="请输入"
                              type="text"
                              name="jianCeWeiZhi"
                              :autosize="autosize"
                              :rows="3"
                              :readonly="readonly"
                              clearable
                              :style="{width:width}"/>
                          </el-form-item>
                        </el-col>

                        <el-col :span="8">
                         <el-form-item
                           label="监控人　　　　　:　"
                           prop="jiLuRen">
                           <ibps-user-selector
                           v-model="models.huanJing.jiLuRen"
                           placeholder="请选择"
                           type="user"
                           name="jiLuRen"
                           :multiple="false"
                           store="id"
                           :style="{width:width}"/>
                         </el-form-item>
                        </el-col>

                    </el-row>

              <!--表单 第五行-->
                    <el-row :gutter="25">
                        <el-col :span="8">
                          <el-form-item
                            label="检测前室内温度:　"
                            prop="jianCeQianWen">
                            <el-input
                              v-model="models.huanJing.jianCeQianWen"
                              placeholder="请输入"
                              type="text"
                              name="jianCeQianWen"
                              :autosize="autosize"
                              :rows="3"
                              :readonly="readonly"
                              clearable
                              :style="{width:width}"/>
                          </el-form-item>
                        </el-col>

                        <el-col :span="8">
                          <el-form-item
                            label="检测后室内温度　:　"
                            prop="jianCeHouWenD">
                            <el-input
                              v-model="models.huanJing.jianCeHouWenD"
                              placeholder="请输入"
                              type="text"
                              name="jianCeHouWenD"
                              :autosize="autosize"
                              :rows="3"
                              :readonly="readonly"
                              clearable
                              :style="{width:width}"/>
                          </el-form-item>
                        </el-col>

                    </el-row>


                    <!--表单 第六行-->
                          <el-row :gutter="25">
                              <el-col :span="8">
                                <el-form-item
                                  label="样品检测前温度:　"
                                  prop="yangPinJianCe">
                                  <el-input
                                    v-model="models.huanJing.yangPinJianCe"
                                    placeholder="请输入"
                                    type="text"
                                    name="yangPinJianCe"
                                    :autosize="autosize"
                                    :rows="3"
                                    :readonly="readonly"
                                    clearable
                                    :style="{width:width}"/>
                                </el-form-item>
                              </el-col>

                              <el-col :span="8">
                                <el-form-item
                                  label="样品检测后温度　:　"
                                  prop="yangPinJch">
                                  <el-input
                                    v-model="models.huanJing.yangPinJch"
                                    placeholder="请输入"
                                    type="text"
                                    name="yangPinJch"
                                    :autosize="autosize"
                                    :rows="3"
                                    :readonly="readonly"
                                    clearable
                                    :style="{width:width}"/>
                                </el-form-item>
                              </el-col>

                          </el-row>

                    <!--表单 第七行-->
                          <el-row :gutter="25">
                             <el-col :span="8">
                               <el-form-item
                                 label="探头温度℃　　:　"
                                 prop="tanTouWenDu">
                                 <el-input
                                 v-model="models.huanJing.tanTouWenDu"
                                 placeholder="请输入"
                                 type="text"
                                 name="tanTouWenDu"
                                 :autosize="autosize"
                                 :rows="3"
                                 :readonly="readonly"
                                 clearable
                                 :style="{width:width}"/>
                               </el-form-item>
                             </el-col>


                              <el-col :span="8">
                                <el-form-item
                                  label="湿度%RH　　  　:　"
                                  prop="shiDu">
                                  <el-input
                                  v-model="models.huanJing.shiDu"
                                  placeholder="请输入"
                                  type="text"
                                  name="shiDu"
                                  :autosize="autosize"
                                  :rows="3"
                                  :readonly="readonly"
                                  clearable
                                  :style="{width:width}"/>
                                </el-form-item>
                              </el-col>

                          </el-row>


                 <el-row :gutter="25">
                      <!--add-->
                      <el-col :span="8">
                          <el-form-item
                            label="查阅　　　　　:　 "
                            prop="hyperlink_0gr5l12">

                            <template>
                                <el-button type="primary" @click="huanJingButton()"> 环境记录</el-button>
                            </template>
                          </el-form-item>
                      </el-col>
                    </el-row>




                    </el-form>
          <div class="form-header">
              <div style="text-align: center;height:150px;width:1080px">&nbsp;&nbsp;&nbsp;</div>
          </div>
        </div>
</div>
</div>
      </template>
    
    
    </edit>
</template>

<script>

import IbpsLinkData from '@/business/platform/data/templaterender/link-data'
import IbpsSignature from '@/business/platform/form/formrender/dynamic-form/components/signature'
import { getNextIdByAlias } from '@/api/platform/system/identity'
import edit from '@/components/jbd-edit'
import { saveData,updateData,selectById } from '@/api/detection/universalCRUD.js'
import IbpsUserSelector from '@/business/platform/org/selector' //用户 /组织 / 岗位选择框
import IbpsLink from '@/components/ibps-link'
import { formatDate } from "@/utils/date.js"; //转换日期格式

export default{
  components:{
    'ibps-link-data': IbpsLinkData,
    'ibps-user-selector': IbpsUserSelector,
    'ibps-signature': IbpsSignature,
    'ibps-link': IbpsLink,
     getNextIdByAlias,
     edit
  },
    props:{
      visible:Boolean,
      title:String,
      id:String,
      readonly:Boolean,
      openType:String
    },
    data() {
      return {
        width:'200px',
        widthOneCol:'1030px',
        readonlyText:true,
        autosize:'',
        models:{
          jcwt:
          {
            id:"",                //委托单号
            shouLiBuMen:"",       //部门
            jianCeLeiBie:"",      //检测项目
            jianCeWeiZhi:"",      //检测位置
            jianCeYuan:"",        //监控人
            jianCeQianWenDu:"",   //检测前温度
            jianCeHouWenDu:"",    //检测后温度
            jianKongShiJian:"",   //监控时间
            shiDu:"",             //湿度%RH
            tanTouWenDu:"",       //探头温度℃
            yangPinJianCeQian:"", //样品检测前温度
            yangPinJianCeHouW:"", //样品检测后温度
            //缺少监控日期 和 查阅
          },
           huanJing:
           {
             id:"",                  //委托单号
             jiLuWeiZhi:"",
             jianCeXiangMu:"",
             huanJingRiQi:"",
             jianKongShiJia:"",
             jianCeWeiZhi:"",
             jiLuRen:"",
             jianCeQianWen:"",
             jianCeHouWenD:"",
             yangPinJianCe:"", //样品检测前温度
             yangPinJch:"", //样品检测后温度
             tanTouWenDu:"",
             shiDu:"",
           },



        },
        formName: 'form',
        defaultForm: {},
        defaulRules: {},
        form: {
          id: ''
        },
        toolbars: [
          { key: 'save', hidden: () => { return this.readonly } },
        ],
        rules: { //参数验证
          // id: [{ required: true, message: this.$t('validate.required') }, { validator: validateKey, trigger: 'blur' }],
        },
      }
    },
    created() {
      if(this.openType=='add'){
        this.init()
        this.toolbars.push( { key: 'cancel' })
      }else if(this.openType=='edit'){
        this.models.id=this.id
        let data = {id:this.id}
        let p = "{data:'"+JSON.stringify(data)+"'}"
        selectById('sysjcwtdb','selectById',p).then(response => {
          console.log(response)
          let qwe ={jcwt:response.variables.data.jcwt}
          let qaz ={huanJing:response.variables.data.huanJing.length > 0 ? response.variables.data.huanJing[0] : response.variables.data.huanJing}
          Object.assign(this.models , qwe,qaz)
          console.log(this.models)
        })
        this.toolbars.push( { key: 'cancel' })
      }
    },
    methods:{

        huanJingButton(){
          let str = "05设施和环境条件控制程序/SGJS-CX-05-02A 环境设备条件记录表.rpx&id_="+this.models.huanJing.huanJingRiQi.substring(0,7)+"&id2_=三维坐标测量室"
          // console.log(str)
          window.open(this.$reportPash.replace("show","pdf") + str)
        },
      comfirmCommit(){
        let date = new Date()
        let data={
           userId:this.$store.getters.userInfo.user.id,
           userName:this.$store.getters.userInfo.user.name,
           entity:
                {
                  id:                 this.models.huanJing.id,
                  parentId:           this.id,
                  jiLuWeiZhi:         this.models.huanJing.jiLuWeiZhi,
                  jianCeXiangMu:      this.models.huanJing.jianCeXiangMu,
                  huanJingRiQi:       this.models.huanJing.huanJingRiQi,
                  jianKongShiJia:     this.models.huanJing.jianKongShiJia,
                  jianCeWeiZhi:       this.models.huanJing.jianCeWeiZhi,
                  jiLuRen:            this.models.huanJing.jiLuRen,
                  jianCeQianWen:      this.models.huanJing.jianCeQianWen,
                  jianCeHouWenD:      this.models.huanJing.jianCeHouWenD,
                  yangPinJianCe:      this.models.huanJing.yangPinJianCe, //样品检测前温度
                  yangPinJch:         this.models.huanJing.yangPinJch,    //样品检测后温度
                  tanTouWenDu :       this.models.huanJing.tanTouWenDu,
                  shiDu:              this.models.huanJing.shiDu,
                  bianZhiShiJian:formatDate(date, "yyyy-MM-dd HH:mm:ss")
                }
           }
           let dataStr = "{data:'"+JSON.stringify(data)+"'}"
           console.log(dataStr)
           if(this.openType=='edit'){
            updateData('jchj','add',dataStr)
            this.$message("提交成功！")
            this.closeDialog()
          }
      },
      saveMe(){
        console.log(this.models.huanJing)
        let date = new Date()
        console.log('转换后的时间格式 ',formatDate(date, "yyyy-MM-dd HH:mm:ss"))
        let data={
           userId:this.$store.getters.userInfo.user.id,
           userName:this.$store.getters.userInfo.user.name,
           leiXing:'save',
           entity:
                {
                  id:                 this.models.huanJing.id,
                  parentId:           this.id,
                  jiLuWeiZhi:         this.models.huanJing.jiLuWeiZhi,
                  jianCeXiangMu:      this.models.huanJing.jianCeXiangMu,
                  huanJingRiQi:       this.models.huanJing.huanJingRiQi,
                  jianKongShiJia:     this.models.huanJing.jianKongShiJia,
                  jianCeWeiZhi:       this.models.huanJing.jianCeWeiZhi,
                  jiLuRen:            this.models.huanJing.jiLuRen,
                  jianCeQianWen:      this.models.huanJing.jianCeQianWen,
                  jianCeHouWenD:      this.models.huanJing.jianCeHouWenD,
                  yangPinJianCe:  this.models.huanJing.yangPinJianCe, //样品检测前温度
                  yangPinJch:  this.models.huanJing.yangPinJch, //样品检测后温度
                  tanTouWenDu :       this.models.huanJing.tanTouWenDu,
                  shiDu:              this.models.huanJing.shiDu,
                  bianZhiShiJian:formatDate(date, "yyyy-MM-dd HH:mm:ss")
                }
           }
           let dataStr = "{data:'"+JSON.stringify(data)+"'}"
           console.log(dataStr)
        if(this.openType=='add'){
          console.log('add')
          saveData('jchj','add',dataStr)
          this.$message("新增成功！")
        }else if(this.openType=='edit'){
          console.log('edit')
          updateData('jchj','add',dataStr)
          this.$message("保存成功！")
          this.closeDialog()
        }
      },
      // 取消按钮 , 调用父组件关闭当前对话框，同时刷新当前表单页
     closeDialog() {
       this.$emit('close', false)
       this.$refs[this.formName].resetFields()
     },
      init(){
        getNextIdByAlias({
          alias:"gzyrwtbh"
        }).then(response => {
          let result = response.data
          this.models.id=result
        }).catch((e) => {console.log(e)})
      },
      /* 按钮事件回调*/
      handleActionEvent({ key }) {
        switch (key) {
          case 'save':
            this.saveMe();
            break
            case 'add':
                      console.info('新增')
                      // 为表格增加数据
                      if(!(this.models.ccljl && Array.isArray(this.models.ccljl))){
                        this.models.ccljl = []
                      }
                      this.models.ccljl.push({
                        id:'',
                        xuHao:'',
                        jianCeXiangMu:'',
                        danWei:'',
                        jianCeJieGuo:''
                      })
                    break
          case 'cancel':
            this.closeDialog()
            break
          default:
            break
        }
      },
      /**
       * 获取表单数据
       */
      getFormData() {
        // 1、权限校验， 如必填  等
        if (this.readonly) {
          this.rules = {}
        } else {
          this.rules = this.defaulRules
        }
        // 2、是否清空表单原内容
        if (this.$utils.isEmpty(this.formId)) {
          // 重置表单
          this.form = JSON.parse(JSON.stringify(this.defaultForm))
          this.formValidate()
          return
        }

        //3、获取传入的表单

      },
      /**
       * 表单验证
       */
      formValidate() {
        if (this.readonly) return
        this.$nextTick(() => {
          this.$refs[this.formName].validate(() => {})
        })
      }

    }

  }

</script>

<style  lang="scss">
  .jbd-title-cont{
    text-align: center;
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
        text-align: center;
        padding: 8px 10px 10px;
        margin: 0;
      }
    }

    .dynamic-form {
      .el-input{
        width: 100%;
      }
      .el-select{
        width: 100%;
      }

      .el-collapse-item__header.is-active{
        border-bottom: 1px solid #EBEEF5;
        margin-bottom: 5px;
      }
      .form-header {
        border-bottom: 1px solid #2b34410d;
        margin-bottom: 5px;
        .title {
          font-size: 16px;
          font-weight: bold;
          color: #222;
          text-align: left;
          padding: 8px 10px 10px;
          margin: 0;
        }
        .desc {
          word-wrap: break-word;
          word-break: normal;
          text-indent: 0;
          line-height: 1.6;
          margin: 0 0 11px;
          padding: 3px 30px 8px;
        }
      }
      .dynamic-form-table-item__readonly{
        margin-bottom: 0;
      }

    //===================border-form====================
      .ibps-border-form {
        border: 1px solid #cfd7e5;

        .el-form-item{
          border-top: 1px solid #cfd7e5;
        }

        .el-form-item__content:before {
          width: 1px;
          background: #cfd7e5;
          display: block;
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom:-20px;
        }

        .el-form-item__content .el-form-item__error {
          left: 5px
        }

        .el-form--label-top .el-form-item__content:before,
        .no-label-form-item .el-form-item__content:before {
          background: transparent
        }

        .el-row+.el-row {
          border-top: 1px solid #cfd7e5
        }

        .el-col+.el-col {
          border-left: 1px solid #cfd7e5
        }

        .el-col {
          overflow: hidden
        }

        .el-form-item__content {
          padding: 5px;
          padding-bottom: 0
        }

        .el-form-item__label {
          padding: 5px
        }

        .el-table{
          .el-form-item{
              border-top: 0;
          }
          .el-form-item__content:before {
            width: 0;
          }
          .el-form-item__content {
            padding: 0;
          }

        }

      }

    }

      .dynamic-form-table{
        .panel-heading{
          border-bottom:0;
          border-left: 1px solid #dde7ee;
          border-right: 1px solid #dde7ee;
        }
        .dynamic-form-table__inner{
          .panel-body{
            padding: 0;
          }
        }
        .dynamic-form-table__block{
          padding-bottom:10px;
          .panel-body{
             border: 0px;
          }
        }
        .el-rate{
          position: relative;
          display: inline-block;
        }
      }
      .is-error{
        .dynamic-form-table{
          border: 1px solid #F56C6C;
        }
      }

      .is-required:not(.is-no-asterisk){
        .dynamic-form-table__label:before {
          content: '*';
          color: #F56C6C;
          margin-right: 4px;
        }
      }

</style>
