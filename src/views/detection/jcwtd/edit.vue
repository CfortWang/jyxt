<template>
    <edit :visible='visible' >
      <template v-slot:form>
        <div  >
          <div class="ibps-toolbar" >
            <div class="header" style="height: 30px">
              <div class="buttons" style="float: right;margin-right:8%;">
                <el-button
                  :key="0"
                  type="primary"
                  icon="save"
                  @click="handleActionEvent({ key: 'save' })"
                >
                  提交
                </el-button>

                   <el-button
                   :key="1"
                   type="danger"
                   icon="cancel"
                   @click="handleActionEvent({ key: 'cancel' })"
                 >
                   关闭
                 </el-button>
              </div>
            </div>
          </div>
        <div class="dynamic-form" :class=" {'jbd-form-cont':!isDialog }">
        <!-- 表头按钮-->
      <div class="dynamic-form">
       <!--表头-->
          <el-form
            ref="form"
            v-loading="!visible"
            :rules="rules"
            :element-loading-text="$t('common.loading')"
            :model="form"
            label-width="190px"
            >
          <div class="form-header">
            <div class="title ibps-tc" style="font-size: 18px;">{{title}}
            </div>
          </div>

                  <el-row
                    :gutter="0"
                    justify="start"
                    align="top"
                    class="widget-col"
                    type="flex"
                  >
                  <el-col :span="12">
                  <el-form-item
                                 label="委托单号" class="el-form--label-left"
                                 prop="weiTuoDanHao"><el-input
                                 v-model="models.weiTuoDan.weiTuoDanHao"
                                 placeholder="请输入"
                                 type="text"
                                 name="weiTuoDanHao"
                                 :readonly="readonly"
                                 clearable
                                 :style="'max-width:360px'"
                               />
                              </el-form-item>
                  <el-form-item
                  label="委托人" class="el-form--label-left"
                  prop="lianXiRen"><el-input
                  v-model="models.weiTuoDan.lianXiBuMenLi"
                  placeholder="请输入"
                  type="text"
                  name="lianXiBuMenLi"
                  :readonly="readonly"
                  clearable
                  :style="'max-width:360px'"
                />
                  </el-form-item>
                    </el-col>
                    <el-col :span="12">
                  <el-form-item class="el-form--label-left"
                  label="委托单位"
                  prop="weiTuoDanWei">
                <el-select
                  v-model="models.weiTuoDan.weiTuoFang"
                  placeholder="请选择"
                  name="weiTuoFang"
                  :disabled="readonly"
                  :style="'max-width:360px'"
                  clearable
                >
                    <el-option
                      key="1"
                      label="质量部"
                      value="1"
                    />
                    <el-option
                      key="2"
                      label="零件一车间"
                      value="2"
                    />
                </el-select>
                  </el-form-item>

                  <el-form-item class="el-form--label-left"
                  label="联系方式"
                  prop="dianHua"><el-input
                  v-model="models.weiTuoDan.dianHua"
                  placeholder="请输入"
                  type="text"
                  name="dianHua"
                  :autosize="autosize"
                  :rows="3"
                  :readonly="readonly"
                  clearable
                  :style="'max-width:360px'"
                />
                  </el-form-item>
                    </el-col>
                    <el-col :span="12">

                  <el-form-item
                  label="期望完成时间" class="el-form--label-left"
                  prop="yaoQiuWanCheng"><el-date-picker
                    v-model="models.weiTuoDan.yaoQiuWanCheng"
                    type="date"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    placeholder="请选择"
                    :style="'max-width:360px'"
                    style="padding-right:40px"
                    :readonly="readonly"
                    :clearable="true"
                  />
                  </el-form-item>

                  <el-form-item
                  label="通讯地址"  class="el-form--label-left"
                  prop="xiangXiDiZhi"><el-input
                  v-model="models.weiTuoDan.xiangXiDiZhi"
                  placeholder="请输入"
                  type="text"
                  name="tongXunDiZhi"
                  :autosize="autosize"
                  :rows="3"
                  :readonly="readonly"
                  clearable
                  style="padding-right:40px"
                  :style="'max-width:360px'"
                />
                  </el-form-item>
                    </el-col>
                    <el-col :span="2">

                     <el-form-item
                     label="      "  class="el-form--label-left"
                     prop="xiangXiDiZhi">
                     </el-form-item>

                      <el-form-item
                      label="      "  class="el-form--label-left"
                      prop="xiangXiDiZhi">
                      </el-form-item>
                        </el-col>
                  </el-row>
      <el-row>
        <el-col :span="24">
                <el-form-item
                label=""
                label-width="0"
                prop="yangPing">
              <div class="dynamic-form-table">
                <div class="dynamic-form-table__inner panel panel-info">
                  <div class="panel-heading ibps-clearfix">
                    <div class="ibps-fr hidden-print">
                      <el-button-group>
                          <el-button
                          :key="0"
                          type="primary"
                          icon="add"
                          @click="handleActionEvent({ key: 'add' })"
                        >
                          添加
                        </el-button>
                          <el-button
                          :key="1"
                          type="danger"
                          icon="remove"
                          @click="handleActionEvent({ key: 'remove' })"
                        >
                          删除
                        </el-button>
                      </el-button-group>
                    </div>
                  </div>
                  <div class="panel-body">
                    <el-table
                      ref="elTable"
                      :data="models.yangPing"
                      border
                      stripe
                    >

                      <el-table-column
                        type="selection"
                        max-width="20"
                      />

                  <el-table-column
                    :key="2"
                    prop="yangPinMingChe"
                    max-width="450px"
                  >
                    <template slot="header">
                     样品名称
                    </template>

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
                :style="'max-width:360px'"
              />

                    </template>
                  </el-table-column>
                  <el-table-column
                    :key="3"
                    prop="guiGeXingHao"
                    max-width="300px"
                  >
                    <template slot="header">
                      规格型号
                    </template>

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
                :style="'max-width:360px'"
              /></template>

                  </el-table-column>
                  <el-table-column
                    :key="4"
                    prop="shuLiang"
                    max-width="260px"
                  >
                    <template slot="header">
                      数量
                    </template>

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
                :style="'max-width:360px'"
              />
              </template>

                  </el-table-column>

                  <el-table-column
                          :key="4"
                          prop="shengChanRiQi"
                          max-width="260px"
                        >
                          <template slot="header">
                            生产日期/批号
                          </template>


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
                      :style="'max-width:360px'"
                    />
                     </template>


                        </el-table-column>


                <el-table-column
                  align="center"
                  fixed="right"
                  class-name="hidden-print"
                  label="操作"
                >
                  <template slot-scope="scope" >
                        <el-divider :key="0" direction="vertical" />

                        <el-button
                          :key="0"
                          type="primary"
                          icon="save"
                          @click="()=>handleRemove(scope.$index)"
                        >
                          删除
                        </el-button>

                    </template>
                    </el-table-column>


                    </el-table>
                  </div>
                </div>
              </div>
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
      <el-col :span="16">

      <el-form-item
      label="样品处置"
class="el-form--label-left"
      prop="shiFouLiuYang"><el-radio-group
          v-model="models.weiTuoDan.shiFouLiuYang"
          :disabled="readonly"
        >

          <component
          :is="'el-radio'"
          :label="'返回给委托人'"
          class="ibps-pt-5"
        >
          返回给委托人
        </component>
          <component
          :is="'el-radio'"
          :label="'自取'"
          class="ibps-pt-5"
        >
          自取
        </component>
          <component
          :is="'el-radio'"
          :label="'不取回'"
          class="ibps-pt-5"
        >
          不取回
        </component>
      </el-radio-group>
      </el-form-item>

      <el-form-item class="el-form--label-left"
      label="检测类别　　　　　　"

      prop="jianCeLeiBie"><el-radio-group
          v-model="models.weiTuoDan.jianCeLeiBie"
          :disabled="readonly"
        >

          <component
          :is="'el-radio'"
          :label="'委托检测'"
          class="ibps-pt-5"
        >
          委托检测
        </component>
          <component
          :is="'el-radio'"
          :label="'抽样检测'"
          class="ibps-pt-5"
        >
          抽样检测
        </component>
      </el-radio-group>
      </el-form-item>

      <el-form-item class="el-form--label-left"
      label="检测项目/参数　　　　"

      prop="xiangMuMingChe">
      <el-select style="display: inline-block;"
                   v-model="models.weiTuoDan.xiangMuMingChe"
                   placeholder="请先选择检测项目"
                   :disabled="readonly"
                   :readonly="readonly"
                   :readonly-text="readonlyText?'text':'original'"
                   :style="{width:'668px'}"
                 ><el-option v-for="item in models.xiangMuCanShuList" :key="item.value" :label="item.label" :value="item.value">
                              </el-option></el-select>

      </el-form-item>

      <el-form-item class="el-form--label-left"
      label="能力范围类型　　　　"

      prop="nengLiFanWeiLeiXi"><el-input
        v-model="models.weiTuoDan.jianCeDuiXiang"
        placeholder="请输入"
        type="text"
        name="jianCeDuiXiang"
        :autosize="autosize"
        :rows="3"
        :readonly="readonly"
        clearable
        :style="'max-width:668px'"
      />



      </el-form-item>

      <el-form-item class="el-form--label-left"
      label="检测方法　　　　　　"

      prop="jianCeFangFa"><el-input
        v-model="models.weiTuoDan.jianCeFangFa"
        placeholder="请输入"
        type="text"
        name="jianCeFangFa"
        :autosize="autosize"
        :rows="3"
        :readonly="readonly"
        clearable
        :style="'max-width:668px'"
      />


      </el-form-item>

      <el-form-item class="el-form--label-left"
      label="客户要求　　　　　　"

      prop="weiTuoNeiRong"><el-input
      v-model="models.weiTuoDan.weiTuoNeiRong"
      placeholder="请输入"
      type="text"
      name="weiTuoNeiRong"
      :autosize="autosize"
      :rows="3"
      :readonly="readonly"
      clearable
      :style="'max-width:668px'"
    />
      </el-form-item>

        </el-col>

      </el-row>
 <el-row>
          <div class="ibps-pb-10">
            <el-alert title="报告其他事项" description="" type="success" :closable="false" close-text="" icon=""
              effect="light" />
          </div>
        </el-row>

                  <el-row
                    :gutter="0"
                    justify="start"
                    align="top"
                    class="widget-col"
                    type="flex"
                  >
                  <el-col :span="10">

                  <el-form-item class="el-form--label-left"
                  label="取报告方式　　　　　"

                  prop="jieGuoBaoGaoS"><el-radio-group
                      v-model="models.weiTuoDan.jieGuoBaoGaoS"
                      :disabled="readonly"
                    >

                      <component
                      :is="'el-radio'"
                      :label="'自取'"
                      class="ibps-pt-5"
                    >
                      自取
                    </component>
                      <component
                      :is="'el-radio'"
                      :label="'电子邮件'"
                      class="ibps-pt-5"
                    >
                      电子邮件
                    </component>
                      <component
                      :is="'el-radio'"
                      :label="'其他'"
                      class="ibps-pt-5"
                    >
                      其他
                    </component>
                  </el-radio-group>
                  </el-form-item>

                  <el-form-item class="el-form--label-left"
                  label="报告份数　　　　　　"

                  prop="baoGaoFenShu"><el-input-number
                  v-model="models.weiTuoDan.baoGaoFenShu"
                  :max="200"
                  :min="1"
                  :step="1"
                  :controls="true"
                  controls-position=""
                  placeholder="请输入"
                  :readonly="readonly"
                  :style="'max-width:360px'"
                />
                  </el-form-item>

                    </el-col>
                    <el-col :span="12">

                  <el-form-item class="el-form--label-left"
                  label="取报告其他要求"

                  prop="jianCeBaoGaoD"><el-input
                  v-model="models.weiTuoDan.jianCeBaoGaoD"
                  placeholder="请输入"
                  type="text"
                  name="jianCeBaoGaoD"
                  :autosize="autosize"
                  :rows="3"
                  :readonly="readonly"
                  clearable
                  :style="'max-width:360px'"
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
                  <el-col :span="16">

                  <el-form-item class="el-form--label-left"
                  label="是否出意见和解释　　"

                  prop="jianCeJieGuoZuoCh"><el-radio-group
                      v-model="models.weiTuoDan.shiDouGeiChuY"
                      :disabled="readonly"
                    >

                      <component
                      :is="'el-radio'"
                      :label="'要'"
                      class="ibps-pt-5"
                    >
                      要
                    </component>
                      <component
                      :is="'el-radio'"
                      :label="'不要'"
                      class="ibps-pt-5"
                    >
                      不要
                    </component>
                  </el-radio-group>
                  </el-form-item>

                  <el-form-item class="el-form--label-left"
                  label="检测结论　　　　　　"

                  prop="jieLunPanDing"><el-radio-group
                      v-model="models.weiTuoDan.jieLunPanDing"
                      :disabled="readonly"
                    >

                      <component
                      :is="'el-radio'"
                      :label="'要'"
                      class="ibps-pt-5"
                    >
                      要
                    </component>
                      <component
                      :is="'el-radio'"
                      :label="'不要'"
                      class="ibps-pt-5"
                    >
                      不要
                    </component>
                  </el-radio-group>
                  </el-form-item>

                  <el-form-item class="el-form--label-left"
                  label="是否给出测量不确定度"

                  prop="shiFouGeiChuC"><el-radio-group
                      v-model="models.weiTuoDan.shiFouGeiChuC"
                      :disabled="readonly"
                    >

                      <component
                      :is="'el-radio'"
                      :label="'要'"
                      class="ibps-pt-5"
                    >
                      要
                    </component>
                      <component
                      :is="'el-radio'"
                      :label="'不要'"
                      class="ibps-pt-5"
                    >
                      不要
                    </component>
                  </el-radio-group>
                  </el-form-item>

                    <div class="ibps-desc">
                      <div class="title">声明：</div>


                      <div
                        class="desc"
                        v-html="`1.送样单位须保证样品的真实性、代表性.<br />
            2.本检验中心保证检测结果的公正性，对来样的检测数据负责；并对其样品及相关资料保密。<br />
            3.委托方需对送检样品的安全性和缺陷负责，一旦因样品自身问题发生事故损失的，委托方需承担相应责任。`"
                      />

                    </div>

                    </el-col>

                  </el-row>

                  <el-row
                    :gutter="0"
                    justify="start"
                    align="top"
                    class="widget-col"
                    type="flex"
                  >
                  <el-col :span="12">

                  <el-form-item class="el-form--label-left"
                  label="在线签名"

                  prop="weiTuoFangDai">
                  <ibps-signature
                    v-model="models.weiTuoDan.weiTuoFangDai"
                    placeholder="请在这里输入您的签名"

                    :disabled="readonly"
                    :style="'width:668.78px'"
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
  <div class="ibps-watermark__mask"></div>
  </div></div>
      </template>
    </edit>
</template>
<script>
import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
import IbpsLinkData from '@/business/platform/data/templaterender/link-data'
import IbpsSignature from '@/business/platform/form/formrender/dynamic-form/components/signature'
import { getNextIdByAlias } from '@/api/platform/system/identity'
import edit from '@/components/jbd-edit'
import { save,update,get } from '@/api/detection/jcwtd.js'

export default{
  components:{
    'ibps-link-data': IbpsLinkData,
    'ibps-signature': IbpsSignature,
     getNextIdByAlias,
     edit
  },
    props:{
      id:String,
      title:String,
      readonly:Boolean,
      openType:String,
      visible:Boolean
    },
    data() {
      return {
        width:'260px',
        widthOneCol:'1030px',
        readonlyText:true,
        autosize:'',
        models:{yangPing:[{yangPinMingChe:'',guiGeXingHao:'',shuLiang:'',shengChanRiQi:''}],
          weiTuoDan:{weiTuoDanHao:"",
          weiTuoFang:"",
          xiangXiDiZhi:"",
          lianXiBuMenLi:"",
          dianHua:"",
          xiangMuMingChe:"",
          xiangMuLeiBie:"",
          weiTuoNeiRong:"",
          yaoQiuWanCheng:"",
          shiFouLiuYang:"",
          shuLiang:"",
          jianCeDuiXiang:"",
          jianCeFangFa:"",
          },
          xiangMuCanShuList:[]
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
      this.toolbars.push( { key: 'cancel' })
      let that = this
      let sql = "select xiang_mu_can_shu_ FROM t_sysjtsjpz"
      curdPost('sql',sql).then(response => {
           let dbData = response.variables.data
           that.models.xiangMuCanShuList=[]
           if(dbData){
             dbData.forEach(function(e){
                that.models.xiangMuCanShuList.push({label:e.xiang_mu_can_shu_,value:e.xiang_mu_can_shu_})
             })
           }
      })

      if(that.openType=='add'){
        that.init()
      }else if(that.openType=='edit'){
        get({id:that.id}).then(response => {
            let dbData = response.variables
            Object.assign(that.models,dbData)
        })
      }

      that.$watch('models.weiTuoDan.xiangMuMingChe', () => {
        sql = "select distinct jian_ce_dui_xiang FROM t_sysjtsjpz a1 WHERE xiang_mu_can_shu_='"+that.models.weiTuoDan.xiangMuMingChe+"'"
         curdPost('sql',sql).then(response => {
              let dbData = response.variables.data
              if(dbData&&dbData[0])
                that.models.weiTuoDan.jianCeDuiXiang=dbData[0].jian_ce_dui_xiang
         })
        sql = "select distinct value_ FROM t_jtsjzb WHERE parent_id_ in (select id_ FROM t_sysjtsjpz a1 WHERE xiang_mu_can_shu_='"+that.models.weiTuoDan.xiangMuMingChe+"') and LEI_XING_='buzhou_desc'"
         curdPost('sql',sql).then(response => {
              let dbData = response.variables.data
              that.models.weiTuoDan.jianCeFangFa=""
              dbData.forEach(function(e2){
                 that.models.weiTuoDan.jianCeFangFa+=","+e2.value_
              })
              if(that.models.weiTuoDan.jianCeFangFa.length>0)
                that.models.weiTuoDan.jianCeFangFa=that.models.weiTuoDan.jianCeFangFa.substring(1,that.models.weiTuoDan.jianCeFangFa.length)
         })
      }, { immediate: true })
    },
    methods:{
      handleRemove(ind){
        this.models.yangPing.splice(ind,1)

      },
      saveMe(){
        let data={userId:this.$store.getters.userInfo.user.id,userName:this.$store.getters.userInfo.user.name,weiTuoDan:this.models.weiTuoDan,yangPing:this.models.yangPing}
        if(this.openType=='add'){
          save(JSON.stringify(data)).then(response => {
               this.$message("新增成功！")
               this.$emit('loadData')
          })
        }else if(this.openType=='edit'){
          update(JSON.stringify(data)).then(response => {
               this.$message("修改成功！")
               this.$emit('loadData')
          })
        }

      },
      init(){
        getNextIdByAlias({
          alias:"gzyrwtbh"
        }).then(response => {
          let result = response.data
          this.models.weiTuoDan.weiTuoDanHao=result
        })
      },
      /* 按钮事件回调*/
      handleActionEvent({ key }) {
        switch (key) {
          case 'save':
            this.saveMe();
            break
            case 'add':
                      this.models.yangPing.push({
                        yangPinMingChe:'',
                        guiGeXingHao:'',
                        shuLiang:'',
                        shengChanRiQi:''
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
  padding-left:82px;
  text-align: left;
}
</style>
 