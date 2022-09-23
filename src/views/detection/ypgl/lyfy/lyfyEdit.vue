<template>
    <edit :visible='visible' >

      <template v-slot:form>
        <!-- 表头按钮-->
        <div class="form-toolbar hidden-print">
          <div class="ibps-toolbar" >
            <div class="header" style="height: 30px;">
              <div class="buttons" style="float: right;margin-right:8%;">
                  <el-button type="primary" @click="saveMe()">✔ 提交</el-button>
                  <el-button type="danger" @click="closeDialog()">❌ 关闭</el-button>
              </div>
            </div>
          </div>
        </div>


      <div class="dynamic-form">
 <!--表头
 :rules="rules"

          <el-form
            ref="form"
            v-loading="!visible"
            :hide-required-asterisk="false"
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
            </el-row> -->


           <el-form
                  ref="form"
                  :model="models"
                  :rules="rules"
                  :inline="inline"
                  :label-suffix="labelSuffix"
                  :label-width="labelWidth"
                  :label-position="labelPosition"
                  :status-icon="statusIcon"
                  :size="size"
                  :hide-required-asterisk="hideRequiredAsterisk"
                  @submit.native.prevent
                >
            <el-row  class="row-bg">
              <el-col>
                <div class="form-header">
                    <div class="title ibps-tc" style="font-size: 18px;">{{title}}</div>
                </div>
              </el-col>
            </el-row>
<!-- 平台Demo
      <el-row
        :gutter="0"
        justify="start"
        align="top"
        class="widget-col"
        type="flex"
      >

        <el-col :span="8">

      <el-form-item
      label="委托单号"

      prop="weiTuoDanHao">
      <el-input
      v-model="models.weiTuoDanHao"
      placeholder="请输入"
      type="text"
      name="weiTuoDanHao"
      :autosize="autosize"
      :rows="3"
      :readonly="false"
      clearable
      :style="{width:width}"
    />
      </el-form-item>

        </el-col>
        <el-col :span="8">

      <el-form-item
      label="委托状态"

      prop="weiTuoZhuangTai"><el-input
      v-model="models.weiTuoZhuangTai"
      placeholder="请输入"
      type="text"
      name="weiTuoZhuangTai"
      :autosize="autosize"
      :rows="3"
      :readonly="readonly"
      clearable
      :style="{width:width}"
    />
      </el-form-item>

        </el-col>

      </el-row>

      <el-row
        :gutter="0"
        justify="start"
        align="top"
        class="widget-col"
        type="flex"
      >
      <el-col :span="8">

      <el-form-item
      label="存放位置"

      prop="cunFangWeiZhi">
      <ibps-link-data
        v-model="models.cunFangWeiZhi"
        template-key="yphjglsj"
        placeholder="请选择"
        :disabled="readonly"
        :readonly="readonly"
        :readonly-text="readonlyText?'text':'original'"
        :style="{width:width}"
      />

      </el-form-item>

      <el-form-item
      label="取样人"

      prop="quYangRen"><el-input
      v-model="models.quYangRen"
      placeholder="请输入"
      type="text"
      name="quYangRen"
      :autosize="autosize"
      :rows="3"
      :readonly="readonly"
      clearable
      :style="{width:width}"
    />
      </el-form-item>

        </el-col>
        <el-col :span="8">

      <el-form-item
      label="留样日期"

      prop="liuYangRiQi"><el-date-picker
        v-model="models.liuYangRiQi"
        type="date"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        placeholder="请选择"
        :style="{width:width}"
        :readonly="readonly"
        :clearable="true"
      />
      </el-form-item>

      <el-form-item
      label="取样日期"

      prop="quYangRiQi"><el-date-picker
        v-model="models.quYangRiQi"
        type="date"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        placeholder="请选择"
        :style="{width:width}"
        :readonly="readonly"
        :clearable="true"
      />
      </el-form-item>

        </el-col>

      </el-row>-->
<!--第一部分 -->
        <el-row
            :gutter="0"
            justify="start"
            align="top"
            class="widget-col"
            type="flex">
          <el-col :span="8">

             <el-form-item              label="样品处理"              prop="dangQianZhuangTai">              <el-select                v-model="models.dangQianZhuangTai"                placeholder="请选择"                name="dangQianZhuangTai"                :disabled="false"                :style="{width:width}"                clearable>                 <el-option                  key="样品间留样"                  label="样品间留样"                  value="样品间留样"                  />                 <el-option                  key="返样"                  label="返样"                  value="返样"                  />              </el-select>             </el-form-item>
          </el-col>
        </el-row>

        <el-row
            :gutter="0"
            justify="start"
            align="top"
            class="widget-col"
            type="flex">
          <el-col :span="8">

            <el-form-item
              label="存放位置"
              prop="cunFangWeiZhi">
              <ibps-link-data
                v-model="models.cunFangWeiZhi"
                template-key="yphjglsj"
                placeholder="请选择"
                :disabled="false"
                :readonly="false"
                :readonly-text="readonlyText?'text':'original'"
                :style="{width:width}"
              />

            </el-form-item>

            <el-form-item
              label="取样人"
              prop="quYangRen">
              <el-input
                v-model="models.quYangRen"
                placeholder="请输入"
                type="text"
                name="quYangRen"
                :autosize="autosize"
                :rows="3"
                :readonly="false"
                clearable
                :style="{width:width}"
              />
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
              label="留样日期"
              prop="liuYangRiQi">
              <el-date-picker
                v-model="models.liuYangRiQi"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="请选择"
                :style="{width:width}"
                :readonly="false"
                :clearable="true"
              />
            </el-form-item>

            <el-form-item
              label="取样日期"
              prop="quYangRiQi">
              <el-date-picker
                v-model="models.quYangRiQi"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="请选择"
                :style="{width:width}"
                :readonly="false"
                :clearable="true"
              />
            </el-form-item>

          </el-col>

        </el-row>

               <!-- <el-form-item
                v-model="id"
                hidden = "false"
                name="id"
               ></el-form-item>
              <!-- 隐藏域-->                <el-form-item                      label="主键"                      prop="id"                      v-show="false">                      <el-input                        v-model="models.jcwt.id"                        placeholder="请输入"                        type="text"                        name="id"                        :autosize="autosize"                        :rows="3"                        :readonly="readonly"                        clearable                        :style="{width:width}"/>                </el-form-item>

            <!-- </el-form-item> -->
          <!-- </el-col> -->

       <!-- </el-row> -->



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
                    v-model="models.yangPin.id"
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
                    v-model="models.yangPin.parentId"
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
          </el-table-column>-->




          <el-table-column
            :key="2"
            prop="yangPinBianHao"
            width="100px"
          >
            <template slot="header">样品编号</template>
              <template slot-scope="scope">
                    <el-input
                      v-model="models.yangPin.yangPinBianHao"
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
                          v-model="models.yangPin.yangPinMingChe"
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
                   v-model="models.yangPin.guiGeXingHao"
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
                   v-model="models.yangPin.shuLiang"
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
                   v-model="models.yangPin.shengChanRiQi"
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

        <el-table-column
          :key="7"
          prop="zhuangTai"
          width="155px"
        >
          <template slot="header">状态</template>
            <template slot-scope="scope">
                 <el-input
                   v-model="models.yangPin.zhuangTai"
                   placeholder="请输入"
                   type="text"
                   name="zhuangTai"
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





      </el-form>
      <div class="form-header">
          <div style="text-align: center;height:150px;width:1080px">&nbsp;&nbsp;&nbsp;</div>
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

export default{
  components:{
    'ibps-link-data': IbpsLinkData,
    'ibps-signature': IbpsSignature,
     getNextIdByAlias,
     edit
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
        width:'380px',
        widthOneCol:'1030px',
        readonlyText:true,
        autosize:'',
        hideRequiredAsterisk:false,
        editData:{},    // 办理页面数据

        models:{
          id:"",
          fuZeJianCeYuan:"",
          dangQianZhuangTai:"",
          weiTuoDanHao:"",
          weiTuoZhuangTai:"",
          cunFangWeiZhi:"",
          quYangRen:"",
          liuYangRiQi:"",
          quYangRiQi:"",
          gdyrqcyp:[],
          weiTuoDanWei:"",
          lianXiRen:"",
          lianXiFangShi:"",
          yangPinZhuangTai:"",
          tiGongGongZhuangJ:"",
          yangPinJuTiShuoMi:"",


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
              zhuangTai:''
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
        // rules: { //参数验证
        //   id: [
        //   { required: true, message: this.$t('validate.required') },
        //   { validator: validateKey, trigger: 'blur' }],
        // },
        // rules:{
        //   dangQianZhuangTai: [{"required":true,"message":"必填"},{"validator":validateRequired,"message":"必填"}],
        //   quYangRen        : [{"required":true,"message":"必填"},{"validator":validateRequired,"message":"必填"}],
        //   liuYangRiQi      : [{"required":true,"message":"必填"},{"validator":validateRequired,"message":"必填"}],
        //   quYangRiQi       : [{"required":true,"message":"必填"},{"validator":validateRequired,"message":"必填"}],
        //   },
      }
    },
    created() {
      if(this.openType=='edit'){
        let data = {id:this.id}
        let p = "{data:'"+JSON.stringify(data)+"'}"
        selectById('ypjs','selectById',p).then(response => {
          console.log(response)
          let qwe ={jcwt:response.variables.jcwt}
          let qaz ={yangPin:response.variables.yangping}
          // qaz.push({yangPin:response.variables.yangping})
          Object.assign(this.models , qwe,qaz)                  // 是否是因为这里覆盖了
          console.log(this.models)
        })
        this.toolbars.push( { key: 'cancel' })

        this.onLoad(this)
      }


      console.log("load...",form)
      // if(!form.getData('dangQianZhuangTai') || form.getData('dangQianZhuangTai')=='销毁'){
      if(!form.models.dangQianZhuangTai){
        console.log("1")
        form.setFormRights('quYangRen','h')
        form.setFormRights('quYangRiQi','h')
        form.setFormRights('cunFangWeiZhi','h')
        form.setFormRights('liuYangRiQi','h')
      }else if(form.models.dangQianZhuangTai=='样品间留样'){
        console.log("2")
        form.setFormRights('quYangRen','h')
        form.setFormRights('quYangRiQi','h')
      }else{
        console.log("3")
        form.setFormRights('cunFangWeiZhi','h')
        form.setFormRights('liuYangRiQi','h')
      }



       form.$refs.dynamicForm.$watch('models.dangQianZhuangTai',function(data){
         console.log(data)
                    if(data =='样品间留样'){
        console.log("4")
                       form.setFormRights('quYangRen','h')
               		 form.setFormRights('quYangRiQi','h')
                      form.setFormRights('cunFangWeiZhi','e')
               		form.setFormRights('liuYangRiQi','e')
                    }else if(data=='返样'){
        console.log("5")
                      form.setFormRights('cunFangWeiZhi','h')
               		form.setFormRights('liuYangRiQi','h')
                      form.setFormRights('quYangRen','e')
               		form.setFormRights('quYangRiQi','e')
                      form.setData('quYangRen',form.getData('lianXiRen'))

                    }else if(data=='销毁'){
        console.log("6")
                      form.setFormRights('quYangRen','h')
               		form.setFormRights('quYangRiQi','h')
                      form.setFormRights('cunFangWeiZhi','h')
               		form.setFormRights('liuYangRiQi','h')
                    }
          })



    },
    methods:{
       onLoad(form){

       },

      saveMe(){
        let data={
           userId:this.$store.getters.userInfo.user.id,
           userName:this.$store.getters.userInfo.user.name,
           entity:
                {
                  Id:this.id,
                  yuLiuZiDuanYi:this.models.jcwt.yuLiuZiDuanYi,
                  yuLiuZiDuanEr:this.models.jcwt.yuLiuZiDuanEr,
                  shiFouTiGongGongZ:this.models.jcwt.shiFouTiGongGongZ,
                  cunFangWeiZhi:this.models.jcwt.cunFangWeiZhi
                }
           }
           let dataStr = "{data:'"+JSON.stringify(data)+"'}"
           console.log(dataStr)

        if(this.openType=='add'){
          saveData('ypjs','update',dataStr)
          this.$message("新增成功！")
        }else if(this.openType=='edit'){
          updateData('ypjs','update',dataStr)
          this.$message("修改成功！")
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
