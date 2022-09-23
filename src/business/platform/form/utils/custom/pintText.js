import dialog from '@/utils/dialog'

const getPint =  (tableForm,srcUrl) => {
    dialog(
            {
             data(){
               return {
                 readonly:false,
                 data:''
               }
               },

               template:'<div style="height:100%">' +
               '<iframe src="'+ srcUrl + '"'+
               'id="myiframe"  frameborder="0" scrolling="no" height="100%" width="100%"></iframe>'+
               '</div>'
             },
             {
               dialog:{
                 appendToBody:true,
                 width: '90%',
                 top: '1vh',
                 center: true,
                 title: '',
                 'custom-class':'ibps-dialog-91'
               }
             },(tpl)=>{
               tableForm.dialogTemplate =tpl
               }
            ).catch((_this)=>{
               _this.visible = false
               tableForm.dialogTemplate = null
             })
}


export default getPint
