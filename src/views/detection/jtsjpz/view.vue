

  <template v-slot:form v-show="displayFlag">
    <div >
    <div class="dynamic-form" :class=" {'jbd-form-cont':!isDialog }">

<!-- 表头按钮-->


   <div style="width: 950px;height: 820px;">
   <div slot="header" class="el-dialog--center" style="height:40px;width: 800px;vertical-align: top;padding-top:10px;font-size: 18px;font-weight: bold;" >检测静态数据</div>
   <div slot="header" style="height:25px;width: 600px;vertical-align: top;padding-top:10px;display: inline">

     <el-form
         ref="form"
         :rules="rules"
         :element-loading-text="$t('common.loading')"
         :model="form"
         label-width="130px">

         <el-row
           :gutter="0"
           justify="start"
           align="top"
           class="widget-col"
           type="flex"
         >
           <el-col :span="20" ><el-form-item
                                 label="检测项目参数" class="el-form--label-left"
                                 prop="xiangMuCanShu">
        <el-select style="display: inline-block;"
            v-model="models.xiangMuCanShu"
            placeholder="请先选择检测项目"
            @change="changeMe"
            :readonly-text="readonlyText?'text':'original'"
            :style="{width:'360px'}"
          ><el-option v-for="item in models.canShuList" :key="item.value" :label="item.label" :value="item.value">
                       </el-option></el-select>
                       </el-form-item>
           </el-col>

         </el-row>
      </el-form>

    </div>
   <div slot="header" class="el-dialog--center" style="height:10px;width: 1200px;vertical-align: top;padding-top:10px"></div>
   <div style="width: 950px;height: 700px;height:auto!important;min-height:600px;">
     <el-tabs v-model="activeName" type="card" @tab-click="loadTab">



       <el-tab-pane label="检测步骤" name="tab1">

             <el-form
                 ref="form"
                 :rules="rules"
                 :element-loading-text="$t('common.loading')"
                 :model="form"
                 label-width="50px">

                 <el-row :gutter="1" >
                   <el-col :span="200" >
                     <el-table
                       ref="elTable1"
                       :data="models.buZhouList"
                       border
                       stripe
                     >
                     <el-table-column
                         :key="1"
                         prop="id"
                         width="15px"

                       >
                        <template slot-scope="scope"  v-if="scope.row.displayFlag">
                        步骤{{scope.$index+1}}、
                        </template>
                     </el-table-column>
                     <el-table-column
                         :key="2"
                         prop="desc"
                         width="150px"
                       >

                    <template slot-scope="scope" v-if="scope.row.displayFlag">

                         <el-row :gutter="1" >

                       <el-col :span="15" ><el-input type="textarea" v-model="scope.row.desc" style="width: 500px;" :disabled="readonly"></el-input>
                        </el-col>
                     </el-row>
                      　
              <div class="width100Precent">
                                          <div class="uploadIMG uploadSty"   >
                                              图片：<el-upload
                                                  action="#"
                                                  ref="upload1"
                                                :on-remove="()=>handleRemove(scope.row,scope.$index)"
                                                :on-success="(response,file,fileList)=>handleSuccess(response, file, fileList,scope.row)"
                                                :on-error="handleError"
                                                :http-request="(o)=>httpRequest(o,scope.row)"
                                               multiple
                                               list-type="picture-card"
                                               :auto-upload="true"
                                               :before-upload="(file)=>beforeUpload(file,scope.row,scope.$index)"

                                               accept=".jpeg,.jpg,.png,"
                                               :file-list="scope.row.fileList"
                                               :on-preview="handlePictureCardPreview"
                                               :limit="20"
                                               :class="{disUoloadSty:hideUploadEdit}" :disabled="readonly"
                                                 >
                                                  <i slot="default" class="el-icon-plus"></i>
                                              </el-upload>

                                          </div>
                  <el-dialog :visible.sync="dialogImgVisible"   title="图片" class="e-dialog"   :modal-append-to-body="true" :append-to-body="true">
                  　　<img width="100%" :src="dialogImageUrl" alt="">
              　　</el-dialog>
                                      </div>

                    </template>

                 </el-table-column>
                 </el-table>
             </el-col>
             </el-row>

             </el-form>
            </el-tab-pane>
            <el-tab-pane label="环境要求" name="tab2">


                <el-form
                    ref="form"
                    :rules="rules"
                    :element-loading-text="$t('common.loading')"
                    :model="form"
                    label-width="50px">

                    <el-row :gutter="1" >
                      <el-col :span="200" >
                        <el-table
                          ref="elTable4"
                          :data="models.hjyqList"
                          border
                          stripe

                        >
                        <el-table-column
                            :key="1"
                            prop="id"
                            width="15px"

                          >
                           <template slot-scope="scope">
                           {{scope.$index+1}}、
                           </template>
                        </el-table-column>
                        <el-table-column
                            :key="2"
                            prop="desc"
                            width="150px"
                          >
                       <template slot-scope="scope">
                       <el-input type="textarea" v-model="scope.row.desc" style="width: 500px;" :disabled="readonly"></el-input>

                       </template>

                    </el-table-column>
                    </el-table>
                </el-col>
                </el-row>

              </el-form>

            </el-tab-pane>
             <el-tab-pane label="设备使用指南" name="tab3">



                         <el-form
                             ref="form"
                             :rules="rules"
                             :element-loading-text="$t('common.loading')"
                             :model="form"
                             label-width="50px">


                             <el-row :gutter="1" >
                               <el-col :span="200" >
                                 <el-table
                                   ref="elTable1"
                                   :data="models.sbsyffList"
                                   border
                                   stripe


                                 >
                                 <el-table-column
                                     :key="1"
                                     prop="id"
                                     width="15px"

                                   >
                                    <template slot-scope="scope" v-if="scope.row.displayFlag">
                                    {{scope.$index+1}}、
                                    </template>
                                 </el-table-column>
                                 <el-table-column
                                     :key="2"
                                     prop="desc"
                                     width="150px"
                                   >
                                <template slot-scope="scope" v-if="scope.row.displayFlag">
                               <el-row :gutter="1" >
                                                     <el-col :span="2" >
                                                       设备：
                                                     </el-col>
                                                    <el-col :span="15" >
                                                       <el-input type="text" v-model="scope.row.sb" style="width: 500px;" @input="$forceUpdate()" :disabled="readonly"></el-input>
                                                    </el-col>
                                                    </el-row>
                                                     <el-row :gutter="1" >
                                                    <el-col :span="2" >
                                                       使用方法： </el-col>
                                                    <el-col :span="15" ><el-input type="text" v-model="scope.row.desc" style="width: 500px;" @input="$forceUpdate()" :disabled="readonly"></el-input>
                                                    </el-col>
                                                    </el-row>
                                               <el-button
                                                 :key="1"
                                                 type="danger"
                                                 icon="cancel"
                                                 @click="handleActionEvent({ ind:scope.$index,key: 'deleteRow',type:'sbsyff' })"
                                               >
                                               删除
                                               </el-button>
                                <div class="width100Precent">
                                                            <div class="uploadIMG uploadSty"  >
                                                                <el-upload
                                                                    action="#"
                                                                    ref="upload2"
                                                                 :on-remove="()=>handleRemove(scope.row,scope.$index)"
                                                                  :on-success="(response,file,fileList)=>handleSuccess(response, file, fileList,scope.row)"
                                                                  :on-error="handleError"
                                                                  :http-request="(o)=>httpRequest(o,scope.row)"
                                                                 multiple
                                                                 list-type="picture-card"
                                                                 :auto-upload="true"
                                                                 :before-upload="(file)=>beforeUpload(file,scope.row,scope.$index)"

                                                                 accept=".jpeg,.jpg,.png,"
                                                                 :file-list="scope.row.fileList"
                                                                 :on-preview="handlePictureCardPreview"
                                                                 :limit="20"
                                                                 :class="{disUoloadSty:hideUploadEdit}" :disabled="readonly"
                                                                   >
                                                                    <i slot="default" class="el-icon-plus"></i>
                                                                </el-upload>

                                                            </div>
             　                     <el-dialog :visible.sync="dialogImgVisible" title="图片" class="e-dialog" :modal-append-to-body="true" :append-to-body="true">
                                    　　<img width="100%" :src="dialogImageUrl" alt="">
                                　　</el-dialog>
                                                        </div>


                                　

                                </template>

                             </el-table-column>
                             </el-table>
                         </el-col>
                         </el-row>

                       </el-form>
                    </el-tab-pane>

                    <el-tab-pane label="数据处理" name="tab4">

                        <el-form
                            ref="form"
                            :rules="rules"
                            :element-loading-text="$t('common.loading')"
                            :model="form"
                            label-width="50px">

                            <el-row :gutter="1" >
                              <el-col :span="200" >
                                <el-table
                                  ref="elTable5"
                                  :data="models.sjclList"
                                  border
                                  stripe

                                >
                               <el-table-column
                                   :key="1"
                                   prop="id"
                                   width="15px"

                                 >
                                  <template slot-scope="scope">
                                  {{scope.$index+1}}、
                                  </template>
                               </el-table-column>
                                <el-table-column
                                    :key="2"
                                    prop="desc"
                                    width="150px"
                                  >
                               <template slot-scope="scope">
                               <el-input type="textarea" v-model="scope.row.desc" style="width: 500px;" :disabled="readonly"></el-input>

                               </template>

                            </el-table-column>
                            </el-table>
                        </el-col>
                        </el-row>

                      </el-form>

                    </el-tab-pane>

              <el-tab-pane label="修约要求" name="tab5">


                  <el-form
                      ref="form"
                      :rules="rules"
                      :element-loading-text="$t('common.loading')"
                      :model="form"
                      label-width="50px">

                      <el-row :gutter="1" >
                        <el-col :span="200" >
                          <el-table
                            ref="elTable4"
                            :data="models.xyList"
                            border
                            stripe

                          >
                          <el-table-column
                              :key="1"
                              prop="id"
                              width="15px"

                            >
                             <template slot-scope="scope">
                             {{scope.$index+1}}、
                             </template>
                          </el-table-column>
                          <el-table-column
                              :key="2"
                              prop="desc"
                              width="150px"
                            >
                         <template slot-scope="scope">
                         <el-input type="textarea" v-model="scope.row.desc" style="width: 500px;" :disabled="readonly"></el-input>

                         </template>

                      </el-table-column>
                      </el-table>
                  </el-col>
                  </el-row>

                </el-form>

              </el-tab-pane>
              <el-tab-pane label="符合性判断" name="tab6">


                 <el-form
                     ref="form"
                     :rules="rules"
                     :element-loading-text="$t('common.loading')"
                     :model="form"
                     label-width="50px">

                     <el-row :gutter="1" >
                       <el-col :span="200" >
                         <el-table
                           ref="elTable2"
                           :data="models.fhxpdList"
                           border
                           stripe

                         >
                         <el-table-column
                             :key="1"
                             prop="id"
                             width="15px"

                           >
                            <template slot-scope="scope">
                            {{scope.$index+1}}、
                            </template>
                         </el-table-column>
                         <el-table-column
                             :key="2"
                             prop="desc"
                             width="150px"
                           >
                        <template slot-scope="scope">
                        <el-input type="textarea" v-model="scope.row.desc" style="width: 500px;" :disabled="readonly"></el-input>

                        </template>

                     </el-table-column>
                     </el-table>
                 </el-col>
                 </el-row>

               </el-form>

              </el-tab-pane>


<el-tab-pane label="检测标准" name="tab7">
        <div>
        <el-form
            ref="form"
            :rules="rules"
            :element-loading-text="$t('common.loading')"
            :model="form"
            label-width="50px">

            <el-row :gutter="1" >
              <el-col :span="200" >
                <el-table
                  ref="elTable1"
                  :data="models.buZhou2List"
                  border
                  stripe
                >

                <el-table-column
                    :key="1"
                    prop="desc"
                    width="150px"
                  >

               <template slot-scope="scope" v-if="scope.row.displayFlag">
                 <el-row :gutter="1" >
                   <el-col :span="2" >
                     方法名称：
                   </el-col>
                  <el-col :span="15" >
                     <el-input type="text" v-model="scope.row.fangFaName" style="width: 500px;" @input="$forceUpdate()" :disabled="readonly"></el-input>
                  </el-col>
                  </el-row>
                   <el-row :gutter="1" >
                  <el-col :span="2" >
                     方法编号： </el-col>
                  <el-col :span="15" ><el-input type="text" v-model="scope.row.fangFaBianHao" style="width: 500px;" @input="$forceUpdate()" :disabled="readonly"></el-input>
                  </el-col>
                  </el-row>
                   <el-row :gutter="1" >
                    <el-col :span="2" >
                     文件上传： </el-col>
                  <el-col :span="15" >
                  <span  v-for="item in scope.row.pathArray">
                    <a :href="item.path" target="_blank">{{item.fangFaName}}</a>&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>

                   </el-col>
                   </el-row>
                    <el-row :gutter="1" >
                   <el-col :span="2" >
                    说  明： </el-col>
                  <el-col :span="15" ><el-input type="text" v-model="scope.row.desc" style="width: 500px;" @input="$forceUpdate()" :disabled="readonly"></el-input>
                   </el-col>
                </el-row>



              　　
                 　

               </template>

            </el-table-column>
            </el-table>
        </el-col>
        </el-row>

        </el-form>
       </div>
       </el-tab-pane>
              <el-tab-pane label="技术文献" name="tab8">

                 <el-form
                     ref="form"
                     :rules="rules"
                     :element-loading-text="$t('common.loading')"
                     :model="form"
                     label-width="50px">

                     <el-row :gutter="1" >
                       <el-col :span="24" >

                         <el-form
                                ref="form"
                                :rules="rules"
                                :element-loading-text="$t('common.loading')"
                                :model="form"
                                label-width="50px"
                                >

                               <el-row :gutter="0">

                                     <el-col :span="3">
                                      <span>&nbsp;&nbsp;&nbsp;&nbsp;技术文献：</span>
                               </el-col>
                               <el-col :span="12">
                               <div  v-for="item in models.jswxList.pathArray" style="width:600px">
                                 <a :href="item.path" target="_blank">{{item.fangFaName}}</a>
                               </div>

                            </el-col>
                          </el-row>
                         <el-row :gutter="20">
                                  <el-col  :span="1">
                                         &nbsp;
                                  </el-col>
                                  <el-col :span="2">
                                    &nbsp;
                            </el-col>
                            <el-col :span="13">

                            </el-col>
                          </el-row>

                          </el-form>

                 </el-col>
                 </el-row>

               </el-form>

             </el-tab-pane>
     </el-tabs>
   </div><div style="height: 20px;"></div>
    <div class="el-dialog--center">

    </div>

    <div style="height: 20px;"></div>
    </div>
<div class="widget-col el-row is-align-top el-row--flex"><div class="el-col el-col-16"><!----><!----><!----></div></div>
  <div class="ibps-watermark__mask"></div>
</div></div>
 </template>


<script>

import curdPost from '@/business/platform/form/utils/custom/joinCURD.js'
import edit from '@/components/jbd-edit'
import IbpsCustomDialog from '@/business/platform/data/templaterender/custom-dialog'
import axios from 'axios'
import request from '@/utils/request'
import { getToken } from '@/utils/auth'
import { BASE_API, SYSTEM_URL } from '@/api/baseUrl'
import store from '@/store'
import { add,update,get} from '@/api/detection/jtsjpz.js'
import { uploadFile, remove } from '@/api/platform/file/attachment'
import { BASE_API as baseApi,
  BASE_GATEWAY_API as gatewayApi,
  BASE_WEBSOCKET as baseWebsocket,
  SINGLE, MULTIPLE_DOMAIN, API_DOMAIN_NAMES } from '@/constant'
import IbpsLinkData from '@/business/platform/data/templaterender/link-data'
import IbpsUserSelector from '@/business/platform/org/selector'
import { mapState, mapGetters, mapActions } from 'vuex'

const GET_IMAGE = '/platform/v3/file/getImage'

export default {
  components: {
    'ibps-user-selector':IbpsUserSelector,
    'ibps-link-data': IbpsLinkData,
     edit,
    'ibps-custom-dialog':IbpsCustomDialog,
    axios
  },
  props: {
    id:String,
    title:String,
    openType:String,
    visible:Boolean
  },


  created() {
    let that = this
    that.visible=true

    let ids = that.jianCeDuiXiangId.split(",")
    let idsVal = "'"+ids[0]+"'"
    ids.forEach(function(e,ind){
      if(ind>0){
        idsVal += ",'"+e+"'"
      }
    })
    let sql = "select id_,xiang_mu_can_shu_ FROM t_sysjtsjpz a1 WHERE id_ in("+idsVal+")"
    curdPost('sql',sql).then(response => {
         let dbData = response.variables.data
         that.models.canShuList=[]
         if(dbData){
           dbData.forEach(function(e){
              that.models.canShuList.push({label:e.xiang_mu_can_shu_,value:e.id_})
           })
         }
    })
    that.id=that.jianCeCanShuId
    that.init(that.jianCeCanShuId)
  },
  data() {
    return {
      displayFlag:true,
      form: {
        id: ''
      },
      readonly:true,
      readonlyText:'text',
      dialogImageUrl:'',
      width:'380px',
      hideUploadEdit:false,
      dialogImgVisible: false,////大图预览框
      hideUploadEdit:false,//图片个数设置 超过5张为true
      activeName:'tab1',
      defaultForm: {},
      defaulRules: {},
      options:[
        {label:'是',value:'是'},{label:'否',value:'否'}
      ],
      models:{
              duiXiangList:[],
              canShuList:[],
              leiBieList:[],
              id:'',
              bianZhiBuMen:'',
              shiFouCnas:'',
              jianCeDuiXiang:'',
              jianCeLeiBie:'',
              xiangMuCanShu:'',
              buZhou2List:[{displayFlag:true,updateId:'upload1',fangFaName:'',fangFaBianHao:'',fangFaWenJian:'',picId:[],desc:'',fileList:[]}],
              fhxpdList:[{desc:''}],
              hjyqList:[{desc:''}],
              sbsyffList:[{displayFlag:true,updateId:'upload1',picId:[],desc:'',sb:'',fileList:[]}],
              xyList:[{desc:''}],
              sjclList:[{desc:''}],
              sbList:[{desc:''}],
              buZhouList:[{picId:[],desc:''}],
              jswxList:'',
              },
      rules: {

      },
      toolbars: [
        { key: 'save', hidden: () => { return this.readonly } },
        { key: 'cancel' }
      ]
    }
  },
  computed: {
   ...mapState('ibps/param', {
     jianCeDuiXiangId: state => state.jianCeDuiXiangId,
     jianCeCanShuId: state => state.jianCeCanShuId
   }),
  },
  watch: {

  },

  methods: {
    closePopo(){
      this.displayFlag = false
      this.$emit("closePopo")
    },
    changeMe(sel){
      if(sel){
        this.init(sel)
      }
    },
    init(id){
      get({id:id}).then(response => {
            let dbData = response.variables
            Object.assign(this.models,dbData.entity)
            this.models.id=this.id
            this.$set(this.models,"id",this.id)
            this.models.buZhouList=[]
            this.models.buZhou2List=[]
            this.models.fhxpdList=[]
            this.models.sbsyffList=[]
            this.models.xyList=[]
            this.models.hjyqList=[]
            this.models.sjclList=[]
            this.models.jswjList=[]
            this.models.jswxList=[]
            //this.models.bzbbList=[]
            this.models.sbList=[]
            var maxXuHao1 = 0;
            var maxXuHao2 = 0;
            dbData.subList.forEach(function(e){
              if(e.leiXing=='buZhou2_desc'){
                if(parseInt(e.xuHao)>maxXuHao1)
                  maxXuHao1 = parseInt(e.xuHao);
              }
              if(e.leiXing=='sbsy_desc'){
                if(parseInt(e.xuHao)>maxXuHao2)
                  maxXuHao2 = parseInt(e.xuHao);
              }
            })
            //this.models.buZhouList=[]
            this.$set(this.models,'buZhou2List',[])
            for(let i=0;i<=maxXuHao1;i++){
              this.models.buZhou2List.push({})
            }
            //this.models.sbsyffList=[]
            this.$set(this.models,'sbsyffList',[])
            for(let i=0;i<=maxXuHao2;i++){
              this.models.sbsyffList.push({})
            }
            let that = this
            dbData.subList.forEach(function(e){
              let xuHao = parseInt(e.xuHao)
              switch(e.leiXing){

                case 'buZhou2_fangFaWaiJian':
                  if(!that.models.buZhou2List[xuHao]||!that.models.buZhou2List[xuHao].displayFlag){
                    that.$set(that.models.buZhou2List,xuHao,{})
                    that.$set(that.models.buZhou2List[xuHao],'picId',[])
                    that.$set(that.models.buZhou2List[xuHao],'fileList',[])
                    that.$set(that.models.buZhou2List[xuHao],'pathArray',[])
                  }
                  that.$set(that.models.buZhou2List[xuHao],'fangFaWaiJian',e.value)
                  let sql = "select t1.id_,t2.file_name_,t2.file_path_ FROM t_ffgl t1 JOIN ibps_file_attachment t2 ON fang_fa_wen_jian_ LIKE CONCAT(CONCAT('%',t2.id_),'%') WHERE t1.id_ = '"+e.value+"'"
                  curdPost('sql',sql).then(response => {
                    let colArray = response.variables.data
                    if(colArray){
                      colArray.forEach(function(e,ind){
                                   let path = e.file_path_
                                   let id = e.id_
                                   let fangFaWenJian = e.file_name_
                                   let bianHao = fangFaWenJian
                                   let name = fangFaWenJian
                                that.models.buZhou2List[xuHao]['pathArray'].push({'path':path,'id':id,'fangFaWenJian':fangFaWenJian,'fangFaName':name,'fangFaBianHao':bianHao})
                                that.$set(that.models.buZhou2List[xuHao],'displayFlag',true)
                      })
                    }
                  })

                  curdPost('select',
                              '{"tableName": "t_ffgl","paramWhere":{"id_":"'+e.value+'"}}'
                                  ).then(response => {
                                   let bianHao = response.variables.data[0].biao_zhun_fang_fa
                                   let name = response.variables.data[0].fang_fa_ming_chen
                                   let fangFaWenJian = response.variables.data[0].fang_fa_wen_jian_
                                that.$set(that.models.buZhou2List[xuHao],'fangFaWenJian',fangFaWenJian)
                                that.$set(that.models.buZhou2List[xuHao],'fangFaName',name)
                                that.$set(that.models.buZhou2List[xuHao],'fangFaBianHao',bianHao)
                   })

                  that.$set(that.models.buZhou2List[xuHao],'displayFlag',true)
                  break
                  case 'buZhou2_desc':
                    if(!that.models.buZhou2List[xuHao]||!that.models.buZhou2List[xuHao].displayFlag){
                      that.$set(that.models.buZhou2List,xuHao,{})
                      that.$set(that.models.buZhou2List[xuHao],'picId',[])
                      that.$set(that.models.buZhou2List[xuHao],'fileList',[])
                      that.$set(that.models.buZhou2List[xuHao],'pathArray',[])
                    }
                    that.$set(that.models.buZhou2List[xuHao],'desc',e.value)
                    that.$set(that.models.buZhou2List[xuHao],'displayFlag',true)
                    break
                
                case 'buZhou_desc':
                  if(!that.models.buZhouList[xuHao]||!that.models.buZhouList[xuHao].displayFlag){
                    that.$set(that.models.buZhouList,xuHao,{})
                    that.$set(that.models.buZhouList[xuHao],'picId',[])
                    that.$set(that.models.buZhouList[xuHao],'desc',[])
                  }
                  that.$set(that.models.buZhouList[xuHao],'desc',e.value)
                  that.$set(that.models.buZhouList[xuHao],'displayFlag',true)
                  break
                  case 'buZhou_picList':
                    if(!that.models.buZhouList[xuHao]||!that.models.buZhouList[xuHao].displayFlag){
                      that.$set(that.models.buZhouList,xuHao,{})
                      that.$set(that.models.buZhouList[xuHao],'picId',[])
                      that.$set(that.models.buZhouList[xuHao],'desc',[])
                    }
                    that.models.buZhouList[xuHao]['picId'].push(e.value)
                    that.$set(that.models.buZhouList[xuHao],'displayFlag',true)
                    break
                case 'sbsy_sb':
                if(!that.models.sbsyffList[xuHao]||!that.models.sbsyffList[xuHao].displayFlag){
                  that.$set(that.models.sbsyffList,xuHao,{})
                  that.$set(that.models.sbsyffList[xuHao],'picId',[])
                  that.$set(that.models.sbsyffList[xuHao],'fileList',[])
                }
                that.$set(that.models.sbsyffList[xuHao],'sb',e.value)
                that.$set(that.models.sbsyffList[xuHao],'displayFlag',true)
                break
                case 'sbsy_desc':
                  if(!that.models.sbsyffList[xuHao]||!that.models.sbsyffList[xuHao].displayFlag){
                    that.$set(that.models.sbsyffList,xuHao,{})
                    that.$set(that.models.sbsyffList[xuHao],'picId',[])
                    that.$set(that.models.sbsyffList[xuHao],'fileList',[])
                  }
                  that.$set(that.models.sbsyffList[xuHao],'desc',e.value)
                  that.$set(that.models.sbsyffList[xuHao],'displayFlag',true)
                  break
                case 'sbsy_picList':
                  if(!that.models.sbsyffList[xuHao]||!that.models.sbsyffList[xuHao].displayFlag){
                    that.$set(that.models.sbsyffList,xuHao,{})
                    that.$set(that.models.sbsyffList[xuHao],'picId',[])
                    that.$set(that.models.sbsyffList[xuHao],'fileList',[])
                  }
                  that.models.sbsyffList[xuHao]['picId'].push(e.value)
                  that.models.sbsyffList[xuHao]['fileList'].push({name:e.value,url:baseApi+GET_IMAGE+"?attachmentId="+e.value})
                  that.$set(that.models.sbsyffList[xuHao],'displayFlag',true)
                  break
                case 'fhxpd_desc':
                  if(!that.models.fhxpdList)
                    that.models.fhxpdList=[]
                  that.models.fhxpdList.push({desc:e.value})
                  break
                case 'xy_desc':
                  if(!that.models.xyList)
                    that.models.xyList=[]
                  that.models.xyList.push({desc:e.value})
                  break
                case 'hjyq_desc':
                  if(!that.models.hjyqList)
                    that.models.hjyqList=[]
                  that.models.hjyqList.push({desc:e.value})
                  break
                case 'sjcl_desc':
                  if(!that.models.sjclList)
                    that.models.sjclList=[]
                  that.models.sjclList.push({desc:e.value})
                  break

                  case 'jswx_wj':
                    if(!that.models.jswxList||!that.models.jswxList.displayFlag){
                      that.$set(that.models.jswxList,'pathArray',[])
                    }
                    that.$set(that.models.jswxList,'fangFaWaiJian',e.value)

                    sql = "select t2.file_name_,t2.file_path_ FROM ibps_file_attachment t2  WHERE '"+e.value+"' LIKE CONCAT(CONCAT('%',t2.id_),'%')"
                    curdPost('sql',sql).then(response => {
                      let colArray = response.variables.data
                      if(colArray){
                        colArray.forEach(function(e,ind){
                                     let path = e.file_path_
                                     let fangFaWenJian = e.file_name_
                                     let bianHao = fangFaWenJian
                                     let name = fangFaWenJian
                                  that.models.jswxList['pathArray'].push({'path':path,'id':id,'fangFaWenJian':fangFaWenJian,'fangFaName':name,'fangFaBianHao':bianHao})
                                  that.$set(that.models.jswxList,'displayFlag',true)
                        })
                      }
                    })
                    that.$set(that.models.jswxList,'displayFlag',true)
                    break
              }
            })



            //this.$set(this.models,'xiangMuCanShu',dbData.entity.id)
        })
    },
    selectBlur1(e){
          this.models.jianCeDuiXiang= e.target.value
        },
    selectBlur2(e){
          this.models.jianCeLeiBie= e.target.value
        },
    handleRemove(row,i) {
      row.picId.forEach(function(e1,ind){
        if(file.name==e1){
          row.picId.splice(ind,1)
        }
      })
    },
    handlePictureCardPreview:function(file){
        this.dialogImageUrl = file.url;
        this.dialogImgVisible = true;
    },
    emitCallback(fileList) {
    },
    handleError(err, file, fileList) {
      this.fileList = fileList
    },
    httpRequest(o,row) {

    },
    handleSuccess(response, file, fileList,row) {

    },
    beforeUpload(file,row,ind){

                    var that=this;
                    var fileName=file.name.substring(file.name.lastIndexOf('.')+1);
                    if(fileName!='jpg'&&fileName!='png'&&fileName!='jpeg'){
                        that.$message({
                            type:'error',
                            showClose:true,
                            duration:3000,
                            message:'文件类型不是图片文件!'
                        });
                        return false;
                    }
                    //读取文件大小
                    var fileSize=file.size;
                    if(fileSize>1048576){
                        that.$message({
                            type:'error',
                            showClose:true,
                            duration:3000,
                            message:'文件大于1M!'
                        });
                        return false;
                    }
                    const data = new FormData() // 创建form对象
                          data.append('file', file)

                          request({
                              url: SYSTEM_URL() + '/file/upload',
                              method: 'post',
                              isLoading: true,
                              gateway: true,
                              data: data
                          }).then(rsp=>{

                            if(!row.picId)
                              row.picId=[]
                            row.picId.push(rsp.data.id)
                          })

                    return true;
                } ,
          handleActionEvent({ ind,key,type }) {

        },
        getFormData(){


        },
    closeDialog() {
      this.$emit('close', false)
    },
    handleSave() {

    }
  }
}
</script>
<style>

  .el-header, .el-footer {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 630px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

 .el-form--label-left .el-form-item__label{
  padding-left:30px;
  text-align: left;
  }
  .disUoloadSty{

        display:none;   /* 上传按钮隐藏 */
    }
   .e-dialog{
     z-index: 9999!important;
   }

</style>
