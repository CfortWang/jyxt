<!--onlyoffice 编辑器-->
<template>
  <div>
      <div
      id="editorDiv"
      class="nav"
      ref = "editor"/>
  </div>
</template>

<script>
import { handleDocType } from './editor/editor.js'
import { showView } from '@/api/platform/file/attachment'
import { getToken } from '@/utils/auth'
export default {
  name: 'editor',
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      doctype: '',
      newId:'',
      timer:'',
      configKey:''
    }
  },
  mounted() {
    /* 调用初始化方法 ，渲染wps*/
    if (this.option.url) {
      this.setEditor(this.option)
    }
    if(this.option.mode == 'edit'){
      /* 编辑模式下，开启定时任务，每0.5秒轮询 */
      this.timer = setInterval(() => {
         if(this.configKey){
           showView({key:this.configKey}).then(response => {
           if(response.variables.data!='0' && this.newId != response.variables.data){//则返回替换文件id
                 this.newId = response.variables.data //记录当前id 且返回变动的文件id，证明有做修改。 提示并替换
                 this.$message({
                            message: '文件编辑保存成功，稍后请提交表单！',
                            type: 'success'
                          });
                  this.$emit('updateFile', this.newId)
                }
            })
         }
        /* 进行后端接口轮询，查到id则进行与当前id比较，相等则不做操作，不相等则返回id，更新页面数据。同时继续查询*/
          }, 1000);
      }

  },
   beforeDestroy() {
      // 页面关闭钱，清空定时任务
      this.clearTimer();
    },
  methods: {
    /* 定时任务关闭*/
      clearTimer() {
          if(this.timer) {
            clearInterval(this.timer);
            this.timer = null;
          }
        },

    setEditor(option) {
      this.doctype = handleDocType(option.fileType)
      let config = {
        document: {
          fileType: option.fileType,
          key: option.key,
          title: option.title,
          permissions: {
            comment: true,
            download: true,
            modifyContentControl: true,
            modifyFilter: true,
            print: true,
            edit: true,
            fillForms: true,
            review: true
          },
          url: option.url
        },
        documentType: this.doctype,
        editorConfig: {
          callbackUrl: option.editUrl,
          lang: 'zh',
          canHistoryRestore:true,
          canUseHistory:true,
          customization: {
            commentAuthorOnly: false,
            comments: true,
            compactHeader:false,
            compactToolbar:true,
            feedback:false,
            plugins:true,
        "feedback": {
          "visible": true // 隐藏反馈按钮
               },
			"forcesave": true, // true 表示强制文件保存请求添加到回调处理程序
			"atuosave":false,//取消强制保存，进行手动保存
          },
          user:{
            id:option.user.id,
            name:option.user.name
          },
          mode:option.mode,
        },
        width: '100%',
        token:getToken(),
        height:  document.body.clientHeight+'px'
      }
      let docEditor = new DocsAPI.DocEditor('editorDiv', config)
      this.configKey = config.document.key
    },
  },
  watch: {
    option: {
      handler: function (n, o) {
        this.setEditor(n)
        this.doctype = handleDocType(n.fileType)
      },
      deep: true,
    }
  }
}
</script>

<style scoped>

</style>
