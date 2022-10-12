<template>
    <edit :visible='demo' >

      <template v-slot:form>
        <!-- 表头按钮-->
        <div class="form-toolbar hidden-print">
          <div class="ibps-toolbar" >
            <div class="header" style="height: 30px;">
              <div class="buttons" style="float: right;margin-right:8%;">
                <ibps-toolbar
                  ref="toolbar"
                  :actions="toolbars"
                  @action-event="handleActionEvent"
                />
              </div>
            </div>
          </div>
        </div>

          <!-- 表头内容-->
        <div  class="form-header">
          <div  class="title ibps-tc"> {{title}}

               <!--表头懒加载关联-->
         <!-- <relevance-table
             v-if="titleList.length>0"
             :list="titleList"
             :form ="form"
             /> -->
              <!-- 记录盒子 / 统计-->
          <!-- <Statis-or-record-table
              v-if="StaOrRec.length>0"
              :StaOrRec="StaOrRec"
              :form ="form"
              /> -->
          </div>
        </div>

          <el-form
            ref="form"
            v-loading="!demo"
            :rules="rules"
            :element-loading-text="$t('common.loading')"
            :model="form"
            label-width="80px"
            >

            <el-form-item label="外键:" prop="parentId">
              <el-input v-if="!readonly" v-model="form.parentId" />
              <span v-else>{{ form.parentId }}</span>
            </el-form-item>

            <el-form-item label="租户ID:" prop="tenantId">
              <el-input v-if="!readonly" v-model="form.tenantId" />
              <span v-else>{{ form.tenantId }}</span>
            </el-form-item>

            <el-form-item label="IP地址:" prop="ip">
              <el-input v-if="!readonly" v-model="form.ip" />
              <span v-else>{{ form.ip }}</span>
            </el-form-item>

          </el-form>


      </template>

    </edit>

</template>

<script>
import {validateRequired} from '@/utils/validate' //参数校验
import IbpsUserSelector from '@/business/platform/org/selector' //用户 /组织 / 岗位选择框
import IbpsAttachment from '@/business/platform/file/attachment/selector' //文件选择框
import edit from '@/components/jbd-edit' //编辑对话框
import relevanceTable from '@/business/platform/form/formrender/dynamic-form/mixins/relevanceTable' //表头懒加载
import StatisOrRecordTable from '@/business/platform/form/formrender/dynamic-form/mixins/StatisOrRecordTable.vue' //表头统计 / 记录盒子页

export default{
  components:{
    edit
  },
    props:{
      demo:Boolean,
      title:String,
    },
    data() {
      return {
        formName: 'form',
        readonly:false,
        defaultForm: {},
        defaulRules: {},
        form: {
          id: '',
          parentId: '',
          tenantId: '',
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
      this.defaultForm = JSON.parse(JSON.stringify(this.form)) //初始化加载默认表单
      this.defaulRules = JSON.parse(JSON.stringify(this.rules)) //初始化加载默认参数验证
    },
    methods:{
      /* 按钮事件回调*/
      handleActionEvent({ key }) {
        switch (key) {
          case 'save':
          this.open();
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
       open() {
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
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
    width: 100%;
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
</style>
