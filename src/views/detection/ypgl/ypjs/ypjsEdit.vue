<template>
    <edit :visible='visible' >

      <template v-slot:form>




        <!-- 表头按钮-->
        <div class="form-toolbar hidden-print">
          <div class="ibps-toolbar" >
            <div class="header" style="height: 30px;">
              <div class="buttons" style="float: right;margin-right:8%;">
                <!-- <ibps-toolbar
                  ref="toolbar"
                  :actions="toolbars"
                  @action-event="handleActionEvent"
                /> -->

                  <el-button type="primary" @click="backToWeiTuo()">⬅ 退回修改委托</el-button>
                  <el-button type="primary" @click="saveMe()">✔ 提交</el-button>
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
            label-width="120px"
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
               label="委托单号 : "
               prop="weiTuoDanHao">
               <ibps-auto-number
               v-model="models.jcwt.weiTuoDanHao"
               placeholder="自动生成无需填写"
               name="weiTuoDanHao"
               :autosize="autosize"
               :rows="3"
               :readonly="readonly"
               :readonly-text="readonlyText"
               clearable
               :style="{width:width}"/>
              <!-- 隐藏域-->                <el-form-item                      label="主键"                      prop="id"                      v-show="false">                      <el-input                        v-model="models.jcwt.id"                        placeholder="请输入"                        type="text"                        name="id"                        :autosize="autosize"                        :rows="3"                        :readonly="readonly"                        clearable                        :style="{width:width}"                      />                </el-form-item>

            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              label="委托单位 : "
              prop="weiTuoFang">
              <ibps-auto-number
              v-model="models.jcwt.weiTuoFang"
              name="weiTuoFang"
              :autosize="autosize"
              :rows="3"
              :readonly-text="readonlyText"
              :readonly="readonly"
              clearable
              :style="{width:width}"/>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              label="期望完成时间 : "
              prop="yaoQiuWanCheng">
              <ibps-auto-number
              v-model="models.jcwt.yaoQiuWanCheng"
              name="yaoQiuWanCheng"
              :autosize="autosize"
              :rows="3"
              :readonly-text="readonlyText"
              :readonly="readonly"
              clearable
              :style="{width:width}"/>
            </el-form-item>
          </el-col>
      </el-row>

<!--表单 第二行-->
      <el-row :gutter="25">
          <el-col :span="8">
            <el-form-item
              label="委托人 　: "
              prop="lianXiBuMenLi">
              <ibps-auto-number
                v-model="models.jcwt.lianXiBuMenLi"
                :readonly-text="readonlyText"
                name="lianXiBuMenLi"
                :autosize="autosize"
                :rows="3"
                :readonly="readonly"
                clearable
                :style="{width:width}"/>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              label="联系方式 : "
              prop="dianHua">
              <ibps-auto-number
              v-model="models.jcwt.dianHua"
              :readonly-text="readonlyText"
              name="dianHua"
              :autosize="autosize"
              :rows="3"
              :readonly="readonly"
              clearable
              :style="{width:width}"/>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              label="通讯地址 　　: "
              prop="xiangXiDiZhi">
              <ibps-auto-number
              v-model="models.jcwt.xiangXiDiZhi"
              :readonly-text="readonlyText"
              name="xiangXiDiZhi"
              :autosize="autosize"
              :rows="3"
              :readonly="readonly"
              clearable
              :style="{width:width}"/>
            </el-form-item>
          </el-col>
      </el-row>


<!--列表-->
    <el-row>
        <el-col :span="24">
      <el-form-item
      label=""
      label-width="0"
      prop="yangPin">
    <div class="dynamic-form-table">

      <div class="dynamic-form-table__inner panel panel-info">


        <div class="panel-body">
          <el-table
            ref="elTable"
            :data="models.yangPin"
            border
            stripe
          >


          <el-table-column
            type="selection"
            width="50"
          />

          <!-- 隐藏域
          <el-table-column
            :key="0"
            prop="id"
            width="100px">
            <template slot="header">id</template>
            <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.id"
                    placeholder="请输入"
                    type="text"
                    name="id"
                    :autosize="autosize"
                    :rows="3"
                    :readonly="readonly"
                    clearable
                    :style="{width:width}"
                  />
              </template>
          </el-table-column>

          <el-table-column
            :key="1"
            prop="parentId"
            width="100px"
          >
            <template slot="header" >parentId</template>
            <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.parentId"
                    placeholder="请输入"
                    type="text"
                    name="parentId"
                    :autosize="autosize"
                    :rows="3"
                    :readonly="readonly"
                    clearable
                    :style="{width:width}"
                  />
            </template>
          </el-table-column>
          -->



          <el-table-column
            :key="2"
            prop="yangPinBianHao"
            width="100px"
          >
            <template slot="header">样品编号</template>
              <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.yangPinBianHao"
                      placeholder="请输入"
                      type="text"
                      name="yangPinBianHao"
                      :autosize="autosize"
                      :rows="3"
                      :readonly="readonly"
                      clearable
                      :style="{width:width}"
                    />
              </template>
          </el-table-column>




        <el-table-column
                  :key="3"
                  prop="yangPinMingChe"
                  width="100px">
                  <template slot="header">样品名称</template>
                  <template slot-scope="scope">
                    <el-input
                          v-model="scope.row.yangPinMingChe"
                          placeholder="请输入"
                          type="text"
                          name="yangPinMingChe"
                          :autosize="autosize"
                          :rows="3"
                          :readonly="readonly"
                          clearable
                          :style="{width:width}"
                        />
                  </template>
        </el-table-column>





  <el-table-column
          :key="4"
          prop="guiGeXingHao"
          width="155px">
          <template slot="header">规格型号</template>

           <template slot-scope="scope">

                 <el-input
                   v-model="scope.row.guiGeXingHao"
                   placeholder="请输入"
                   type="text"
                   name="guiGeXingHao"
                   :autosize="autosize"
                   :rows="3"
                   :readonly="readonly"
                   clearable
                   :style="{width:width}"
                 />

             </template>
     </el-table-column>




        <el-table-column
          :key="5"
          prop="shuLiang"
          width="155px"
        >
          <template slot="header">数量</template>
            <template slot-scope="scope">
                 <el-input
                   v-model="scope.row.shuLiang"
                   placeholder="请输入"
                   type="text"
                   name="shuLiang"
                   :autosize="autosize"
                   :rows="3"
                   :readonly="readonly"
                   clearable
                   :style="{width:width}"
                 />

             </template>
      </el-table-column>




        <el-table-column
          :key="6"
          prop="shengChanRiQi"
          width="155px"
        >
          <template slot="header">生产日期/批号</template>
            <template slot-scope="scope">
                 <el-input
                   v-model="scope.row.shengChanRiQi"
                   placeholder="请输入"
                   type="text"
                   name="shengChanRiQi"
                   :autosize="autosize"
                   :rows="3"
                   :readonly="readonly"
                   clearable
                   :style="{width:width}"
                 />

             </template>
        </el-table-column>


          </el-table>
        </div>
      </div>

    </div>
      </el-form-item>

 </el-col>
      </el-row>












        <div class="ibps-pb-10">
          <el-alert title="样品状态确认" description="" type="success" :closable="false" close-text="" icon="" effect="light" />
        </div>

        <el-row :gutter="0" justify="start" align="top" class="widget-col" type="flex">

          <el-col :span="12">
            <el-form-item label="* 样品状态　　: " prop="yuLiuZiDuanYi">
              <template>
                  <el-radio v-model="models.jcwt.yuLiuZiDuanYi" label="yes">完好</el-radio>
                  <el-radio v-model="models.jcwt.yuLiuZiDuanYi" label="no">异常</el-radio>
              </template>
            </el-form-item>

            <el-form-item label="提供工装夹具 : " prop="shiFouTiGongGongZ">
              <template>
                  <el-radio v-model="models.jcwt.shiFouTiGongGongZ" label="yes">有</el-radio>
                  <el-radio v-model="models.jcwt.shiFouTiGongGongZ" label="no">无</el-radio>
              </template>
            </el-form-item>

          </el-col>

          <el-col :span="8">
            <el-alert
                  title="注："
                  description="样品异常仍需检测时，检测部门对检测结果的准确性不予负责"
                  type="warning"
                  :closable="false"
                  close-text=""
                  center="false"
                  show-icon="false"
                  effect="light"
                />
          </el-col>

        </el-row>









      <el-row :gutter="25">
        <!--add-->
        <el-col :span="8">
            <el-form-item
              label="样品具体说明 : "
              prop="yuLiuZiDuanEr">
              <el-input
                v-model="models.jcwt.yuLiuZiDuanEr"
                placeholder="请输入意见"
                type="text"
                name="yuLiuZiDuanEr"
                :autosize="autosize"
                :rows="3"
                clearable
                :style="{width:width}"/>
            </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="25">
        <!--add-->
        <el-col :span="8">
           <el-form-item
                label="样品存放位置 : "
                prop="cunFangWeiZhi">
                <ibps-link-data
                  v-model="models.jcwt.cunFangWeiZhi"
                  template-key="yphjglsj"
                  placeholder="请选择"
                  :readonly-text="readonlyText?'text':'original'"
                  :style="{width:width}"
                />

           </el-form-item>


        </el-col>
      </el-row>

      <el-row :gutter="25">
        <el-col :span="8">
            <el-form-item
              label="确认收样　　: "
              prop="boHuiYuanYin">
              <el-input
              v-model="models.jcwt.boHuiYuanYin"
              placeholder="请输入意见"
              type="textarea"
              :rows="3"
              name="boHuiYuanYin"
              :autosize="autosize"
              :readonly=false
              clearable
              :style="{width:width}"
            />
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
import { saveData,updateData,get,selectById,backOff } from '@/api/detection/universalCRUD.js'
import IbpsUserSelector from '@/business/platform/org/selector' //用户 /组织 / 岗位选择框
import IbpsAutoNumber from '@/business/platform/system/identity/auto-number'

export default{
  components:{
    'ibps-link-data': IbpsLinkData,
    'ibps-signature': IbpsSignature,
     getNextIdByAlias,
     edit,
     'ibps-auto-number': IbpsAutoNumber,
  },
    props:{
      visible:Boolean,
      title:String,
      id:String,
      readonly:Boolean,
      openType:String,
    },
    data() {
      return {
        width:'300px',
        widthOneCol:'1030px',
        readonlyText:true,
        autosize:'',
        editData:{},    // 办理页面数据
        models:{

          yangPin:
          [
            {
              id:'',                // 主键
              parentId:'',          // 外键
              yangPinBianHao:'',
              yangPinMingChe:'',
              guiGeXingHao:'',
              shuLiang:'',
              shengChanRiQi:'',
            },
          ],

          jcwt:
          {
            id:"",                    //表单id
            weiTuoDanHao:"",          //委托单号
            weiTuoFang:"",            //委托单位
            xiangXiDiZhi:"",          //通讯地址
            lianXiBuMenLi:"",         //委托人
            dianHua:"",               //联系方式
            yaoQiuWanCheng:"",        //期望完成时间
            yuLiuZiDuanEr:"",         //样品具体说明
            yuLiuZiDuanYi:"",         //样品状态
            shiFouTiGongGongZ:"",     //提供工装夹具
            boHuiYuanYin:"",          //驳回意见
            boHuiId:"",               //驳回的id
          }
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
        let data = {id:this.id}
        let p = "{data:'"+JSON.stringify(data)+"'}"
        selectById('sysjcwtdb','selectById',p).then(response => {
          console.log(response)
          let qwe ={jcwt:response.variables.data.jcwt}
          let qaz ={yangPin:response.variables.data.yangPin}
          Object.assign(this.models , qwe,qaz)
          console.log(this.models)
        })
        this.toolbars.push( { key: 'cancel' })
      }
    },
    methods:{
      //退回修改委托按钮
      backToWeiTuo(){
        let data={
           userId:this.$store.getters.userInfo.user.id,
           userName:this.$store.getters.userInfo.user.name,
           entity:
                {
                  Id:this.id,
                  boHuiYuanYin:this.models.jcwt.boHuiYuanYin
                }
           }
           let params = "{data:'"+JSON.stringify(data)+"'}"
           console.log(params)
           backOff('ypjs','rejected',params).then(response=>{
                if(response.state == 200){
                  this.closeDialog()
                }else{
                  console.log(response.state)
                }
           })

      },
      saveMe(){
        let data={
           userId:this.$store.getters.userInfo.user.id,
           userName:this.$store.getters.userInfo.user.name,
           yangPin:this.models.yangPin,
           entity:
                {
                  id:this.id,
                  yuLiuZiDuanYi:this.models.jcwt.yuLiuZiDuanYi,
                  yuLiuZiDuanEr:this.models.jcwt.yuLiuZiDuanEr,
                  shiFouTiGongGongZ:this.models.jcwt.shiFouTiGongGongZ,
                  cunFangWeiZhi:this.models.jcwt.cunFangWeiZhi,
                  boHuiYuanYin: this.models.jcwt.boHuiYuanYin
                }
           }
           let dataStr = "{data:'"+JSON.stringify(data)+"'}"
           console.log(dataStr)

        if(this.openType=='add'){
          saveData('ypjs','update',dataStr)
          this.$message("新增成功！")
        }else if(this.openType=='edit'){
          updateData('ypjs','update',dataStr)
          this.$message("提交成功！")
            this.closeDialog()
        }
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
      // 取消按钮 , 调用父组件关闭当前对话框，同时刷新当前表单页
      closeDialog() {
        this.$emit('close', false)
        this.$refs[this.formName].resetFields()
        this.$emit('loadData') // 回调父组件的方法
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
