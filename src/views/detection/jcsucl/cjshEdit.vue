<template>
  <jiaoYan :visible='visible'>
    <template v-slot:form>
      <!-- 表头按钮-->
      <div class="form-toolbar hidden-print">
        <div class="ibps-toolbar">
          <div class="header" style="height: 30px;">
            <div class="buttons" style="float: right;margin-right:8%;">
             <!-- <ibps-toolbar ref="toolbar" :actions="toolbars" @action-event="handleActionEvent" /> -->
              <el-button type="primary" icon="ibps-icon-lastfm" @click="sendBack()">退回</el-button>
                <el-button type="primary" icon="ibps-icon-send" @click="confirmSubmit()">提 交</el-button>
                <!--  <ibps-toolbar ref="toolbar" :actions="toolbars" @action-event="handleActionEvent" /> -->
              <el-button icon="el-icon-circle-close" type="danger" @click="closeDialog()">关 闭</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 表头内容-->
      <div class="form-header">
        <div class="title ibps-tc">检测数据校验
        </div>
      </div>

      <div class="dynamic-form" :class=" {'jbd-form-cont':!isDialog }">

      <div class="dynamic-form">
      <el-form ref="form"  :rules="rules" :element-loading-text="$t('common.loading')" :model="form"
        label-width="80px">
        <el-row :gutter="25">
          <el-col :span="8">
            <el-form-item label="委托单号:" prop="weiTuoDanHao">
              <el-input v-model="models.jcwt.weiTuoDanHao" placeholder="请输入" />
            </el-form-item>
          </el-col>

          <el-form-item
            label="预览："

            prop="">
            <ibps-link
              text="委托单"
           link="resolve([{
          event:'afterSubmit',
          logic:`resolve({openType:'dialog',
          url:'${options.reportPash.replace('show','pdf')}39样品管理系统/GDYR-CX11-R01A 检测委托单.rpx&id_=${options.formData.id}'});` }])  "


              show-type="button"
              text-type="fixed"
              link-type="javascript"
              text-javascript=""
              type="primary"
              form-data=""
              preview-entrance
              icon=""
            /></el-form-item>

          <el-form-item label="">
            查阅：
            <div style="height: 800px">
              <iframe
                src="http://www.szjyxt.com:8080/demo/reportJsp/pdfReport.jsp?access_token = 78dce0880f8f4810b817793057f489cf&rpx=测试/39样品管理系统/广东云润汽车 原始记录.rpx&id_=e21570d3710043909a328e2310d33d4e"
                :height="'100%'" :width="'90%'" frameborder="0" scrolling="no" />
            </div>
          </el-form-item>



          <el-col :span="12">
       <!--     <el-form-item label='预览：' prop="hyperlink_0r3fj2t">
              <ibps-link text="委托单" :link="links" show-type="button" text-type="fixed" link-type="javascript"
                text-javascript="" type="primary" :form-data="dynamicForm" preview-entrance icon="" />
            </el-form-item> -->
            <el-form-item
                  label="校验意见"

                  prop="yijian">
                  </el-form-item>
                   <div class="bbb" style="width: 100%">
                             <el-form-item>
                           <el-input id="input1"
                                     type="textarea"
                                     placeholder="请输入意见"
                                     v-model="models.yijian"
                                     :rows="4"
                                     maxlength="100"
                                     show-word-limit
                                     style="width: 100%"></el-input>
                            </el-form-item>

                       </div>




          </el-col>
        </el-row>

  <!--    <el-form-item label="">
            <div style="height: 800px">
              <iframe
                src="https://www.szjyxt.com/demo/reportJsp/pdfReport.jsp?access_token%20=%200084bd4987734008933b6134947e4b59&rpx=%E4%B8%AD%E6%B1%87%E7%91%9E%E5%BE%B7%E6%A3%80%E6%B5%8B%E4%B8%AD%E5%BF%83/08%E4%BB%AA%E5%99%A8%E8%AE%BE%E5%A4%87%E7%9A%84%E4%BD%BF%E7%94%A8%E3%80%81%E7%BB%B4%E6%8A%A4%E5%92%8C%E7%AE%A1%E7%90%86%E7%A8%8B%E5%BA%8F/GDYR-CX06-R06A%20%20%E4%BB%AA%E5%99%A8%E8%AE%BE%E5%A4%87%E7%BB%B4%E6%8A%A4%E4%BF%9D%E5%85%BB%E8%AE%B0%E5%BD%95%E8%A1%A8(%E6%97%A5).rpx&she_bei_bian_hao_=GDYR-JC-YQ-010&yue_fen_s_=2022-01"
                :height="'100%'" :width="'90%'" frameborder="0" scrolling="no" />
            </div>
          </el-form-item> -->

    <!--    <el-form-item label="查阅:" prop="hyperlink_1yv1fi7">
          <ibps-link text="检测原始记录单" :link="links" show-type="link" text-type="fixed" link-type="javascript"
            text-javascript="" type="primary" :form-data="dynamicForm" preview-entrance icon="ibps-icon-file" />

        </el-form-item> -->


      </el-form>


      </div>
      </div>
    </template>
  </jiaoYan>
</template>




<script>
  import { validateRequired } from '@/utils/validate' //参数校验
  import IbpsUserSelector from '@/business/platform/org/selector' //用户 /组织 / 岗位选择框
  import IbpsAttachment from '@/business/platform/file/attachment/selector' //文件选择框
  import jiaoYan from '@/components/jbd-edit' //编辑对话框
  import relevanceTable from '@/business/platform/form/formrender/dynamic-form/mixins/relevanceTable' //表头懒加载
  import StatisOrRecordTable from '@/business/platform/form/formrender/dynamic-form/mixins/StatisOrRecordTable.vue'
  import IbpsLinkData from '@/business/platform/data/templaterender/link-data'
  import IbpsLink from '@/components/ibps-link'
  import IbpsImage from '@/business/platform/file/image'

  import { selectById } from '@/api/detection/universalCRUD.js'//查询回显数据
    import { submIt,rejectEd } from '@/api/detection/guangpu.js'//提交

  export default {
    components: {
      jiaoYan,
      'ibps-link-data': IbpsLinkData,
      'ibps-link': IbpsLink,
      'ibps-image': IbpsImage,
    },
    props: {
      //demo: Boolean,
         id: String,
         visible: Boolean,
         title: String,
         openType: String,
         aaa:String,
    },
    data() {
      return {
        formName: 'form',
        formLabelWidth: '120px',
        dialogVisible: this.visible,
        dialogLoading: false,
       // links:"resolve([{event:'afterSubmit',logic:`resolve({openType:'dialog',url:'${options.reportPash.replace('show','pdf')}39样品管理系统/广东云润汽车 光谱原始记录.rpx&id_=${options.formData.models.id}'});options.formData.models.weiTuoZhuangTai = '报告待审'`}])",
        defaultForm: {},
        defaulRules: {},

        models:{
          jcwt:{"weiTuoDanHao":'',
                 "weiTuoId": "",
                 },
          weiTuoDan:{
          id:"",
          weiTuoZhuangTai:"",
          nengLiFanWei:"",
          baoGaoBianHao:"",
          gdyrqcyp:[],
          weiTuoDanHao:"",}
          },
        form: {
          id: '',
          weiTuoDanHao: '',
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
    computed: {
      formId() {
        return this.id
      }
    },
    // watch: {
    //   visible: {
    //     handler: function(val, oldVal) {
    //       this.dialogVisible = this.visible
    //     },
    //     immediate: true
    //   }
    // },
    created(){
      if(this.openType=='edit'){
   let data={id:this.id,"type":"GPJC"}
   let    a="{data:'"+JSON.stringify(data)+"'}"
    selectById('sysjcwtdb','selectById',a).then(response => {
        let dbData = response.variables.data
        Object.assign(this.models,dbData)

    })
    this.toolbars.push( { key: 'cancel' })
  }
    },
    methods: {
      // 提交
       confirmSubmit(){
          console.log("进了",this.models.jcwt)
          let ss=this.models.jcwt
         let data={
            userId:this.$store.getters.userInfo.user.id,
            userName:this.$store.getters.userInfo.user.name,
             entity:ss,
           // jcwt:[this.models.jcwt],
            }
             let params = "{data:'"+JSON.stringify(data)+"'}"
             console.log("params",params)
          submIt('gpjc','submit',params).then(response => {
                  this.$emit('close', false)
                    this.$message('提交成功!')
                    this.$emit('loadData')
          })
       },

       //退回

       sendBack(){
       let data={
          userId:this.$store.getters.userInfo.user.id,
          userName:this.$store.getters.userInfo.user.name,
         // let ss=this.models.jcwt
          entity:this.models.jcwt,
               // {
               //   // id:this.id,
               //   // boHuiYuanYin:this.models.boHuiYuanYine
               //       // jcwt:this.models.jcwt,
               //       ss
               // }
          }
         let paramss = "{data:'"+JSON.stringify(data)+"'}"
         console.log("pass8888",paramss)
         rejectEd('gpjc','rejected',paramss).then(response => {
                 this.$emit('close', false)
                   this.$message("已退回！")
                   this.$emit('loadData')
          })
       },


      resolve([{
      event,logic
      }]){

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
        console.info(this.form)
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
          console.info(err)
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
      }
    }

  }
</script>
